import { QuestFormData } from '../types';

export interface WebhookResult {
  success: boolean;
  message: string;
  payloadText: string;
  enquiryId: string;
}

export function formatEnquiryForDiscord(data: QuestFormData): string {
  const featuresList = data.requiredFeatures.length > 0 ? data.requiredFeatures.join(', ') : 'None specified';
  const projectTypes = data.projectType.length > 0 ? data.projectType.join(', ') : 'Custom Plugin';

  return `╔══════════════════════════════════════════════════════════════╗
  ⚔️ NEW MINECRAFT PLUGIN QUEST SUBMISSION - DEVIL STUDIO ⚔️
╚══════════════════════════════════════════════════════════════╝

👤 CLIENT DETAILS
• Client / Owner Name: ${data.clientName || 'Not specified'}
• Server / Network Name: ${data.serverBrandName || 'Not specified'}
• Discord Handle: ${data.discordHandle || 'Not provided'}
• Email Address: ${data.email || 'Not provided'}
• Server IP: ${data.serverIp || 'Not provided'}

📋 PROJECT OVERVIEW
• Title: ${data.projectTitle || 'Custom Plugin Request'}
• System Categories: ${projectTypes} ${data.customTypeOther ? `(${data.customTypeOther})` : ''}
• Timeline: ${data.timeline}
• Budget Model: ${data.budgetPreference}

🖥️ SERVER ENVIRONMENT
• Target MC Version: ${data.minecraftVersion || '1.20.4+'}
• Server Platform: ${data.serverSoftware || 'Paper / Purpur'}
• Server Type: ${data.serverType || 'SMP / Network'}
• Player Count: ${data.approxPlayerCount || 'Not specified'}

📜 PROJECT SPECIFICATIONS & CORE IDEA
${data.projectDescription || 'No description provided.'}

⚙️ REQUIRED MODULES & FEATURES
• Key Features: ${featuresList}
• Additional Notes: ${data.customFeatureNotes || 'None'}
• Reference Links / Docs: ${data.referenceLinks || 'None'}

📅 SUBMITTED AT: ${data.submittedAt || new Date().toISOString()}
════════════════════════════════════════════════════════════════`;
}

export async function submitProjectEnquiry(data: QuestFormData): Promise<WebhookResult> {
  const enquiryId = `quest_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const timestamp = new Date().toISOString();

  const completeData: QuestFormData = {
    ...data,
    id: enquiryId,
    submittedAt: timestamp,
    status: 'New',
  };

  const formattedText = formatEnquiryForDiscord(completeData);

  // Store in browser local storage for Admin Panel
  try {
    const existing: QuestFormData[] = JSON.parse(localStorage.getItem('devil_mc_enquiries') || '[]');
    existing.unshift(completeData); // prepend latest
    localStorage.setItem('devil_mc_enquiries', JSON.stringify(existing));
  } catch (e) {
    console.warn('LocalStorage save error:', e);
  }

  // Check if an environmental Discord webhook is configured
  const webhookUrl = (import.meta as unknown as { env?: { VITE_DISCORD_WEBHOOK_URL?: string } }).env?.VITE_DISCORD_WEBHOOK_URL;

  if (webhookUrl && typeof webhookUrl === 'string' && webhookUrl.startsWith('https://discord.com/api/webhooks/')) {
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: 'Devil Studio Quest Bot',
          avatar_url: 'https://cdn.discordapp.com/embed/avatars/0.png',
          embeds: [
            {
              title: `⚔️ New Quest: ${data.projectTitle || 'Custom Plugin'} [${data.clientName}]`,
              description: `**Server:** ${data.serverBrandName || 'N/A'}\n**Core Idea:**\n${data.projectDescription.substring(0, 1000)}`,
              color: 0x22c55e, // Emerald Green
              fields: [
                { name: '👤 Client Name', value: data.clientName, inline: true },
                { name: '💬 Discord', value: data.discordHandle || 'N/A', inline: true },
                { name: '📧 Email', value: data.email || 'N/A', inline: true },
                { name: '💰 Budget', value: data.budgetPreference, inline: true },
                { name: '🖥️ Platform & Version', value: `${data.serverSoftware} (${data.minecraftVersion})`, inline: true },
                { name: '⏱️ Timeline', value: data.timeline, inline: true },
                { name: '⚙️ Modules', value: data.requiredFeatures.join(', ') || 'N/A', inline: false },
              ],
              footer: { text: `Enquiry ID: ${enquiryId} · Devil Studio` },
              timestamp: timestamp,
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`Discord API returned ${response.status}`);
      }

      return {
        success: true,
        message: 'Quest transmitted directly to developer Discord queue!',
        payloadText: formattedText,
        enquiryId,
      };
    } catch (err) {
      console.warn('Webhook transmission issue, fallback to formatted clipboard copy:', err);
    }
  }

  // Graceful simulation
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    success: true,
    message: 'Project enquiry successfully generated & recorded in Admin Panel!',
    payloadText: formattedText,
    enquiryId,
  };
}
