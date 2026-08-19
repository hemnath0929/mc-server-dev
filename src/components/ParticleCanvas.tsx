import React, { useEffect, useRef } from 'react';

type FloatCategory = 'block' | 'item' | 'mobHead';

type BlockType = 'grass' | 'emerald' | 'diamond' | 'obsidian' | 'command' | 'redstone' | 'tnt' | 'crafting';
type ItemType = 'diamondSword' | 'enderPearl' | 'goldenApple' | 'emeraldGem' | 'enchantedBook' | 'netheriteIngot' | 'diamondPickaxe';
type MobHeadType = 'creeper' | 'steve' | 'enderman' | 'skeleton' | 'witherSkeleton' | 'zombie';

interface FloatingEntity {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotSpeed: number;
  floatOffset: number;
  floatSpeed: number;
  category: FloatCategory;
  blockType?: BlockType;
  itemType?: ItemType;
  mobHeadType?: MobHeadType;
  opacity: number;
  glowColor: string;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
  pulseSpeed: number;
  type: 'emerald' | 'redstone' | 'portal' | 'diamond' | 'xpOrb' | 'enchantRune';
  runeChar?: string;
}

const ENCHANT_RUNES = ['ᔑ', 'ʖ', 'ᓵ', '↸', 'ᒷ', '⎓', '⍑', '╎', '⋮', 'ꖌ', 'ꖎ', 'ᒲ', 'リ', '𝙹', 'ᑑ', '∷', 'ᓭ', 'ℸ', '⚍', '⍊', '∴', '॥', '⨅', '✦', '❖', '◈', '§k', 'Ω', 'Ψ'];

const BLOCK_TYPES: BlockType[] = ['grass', 'emerald', 'diamond', 'obsidian', 'command', 'redstone', 'tnt', 'crafting'];
const ITEM_TYPES: ItemType[] = ['diamondSword', 'enderPearl', 'goldenApple', 'emeraldGem', 'enchantedBook', 'netheriteIngot', 'diamondPickaxe'];
const MOB_HEAD_TYPES: MobHeadType[] = ['creeper', 'steve', 'enderman', 'skeleton', 'witherSkeleton', 'zombie'];

export const ParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    const totalEntities = width < 768 ? 12 : 24;
    const particleCount = width < 768 ? 25 : 55;

    // 1. Initialize Floating Minecraft Blocks, Items & Mob Heads
    const entities: FloatingEntity[] = [];
    for (let i = 0; i < totalEntities; i++) {
      const category: FloatCategory = i % 3 === 0 ? 'block' : i % 3 === 1 ? 'item' : 'mobHead';

      let glowColor = 'rgba(34, 197, 94, 0.6)';
      let blockType: BlockType | undefined;
      let itemType: ItemType | undefined;
      let mobHeadType: MobHeadType | undefined;

      if (category === 'block') {
        blockType = BLOCK_TYPES[i % BLOCK_TYPES.length];
        glowColor =
          blockType === 'emerald'
            ? 'rgba(34, 197, 94, 0.7)'
            : blockType === 'diamond'
            ? 'rgba(6, 182, 212, 0.7)'
            : blockType === 'obsidian'
            ? 'rgba(168, 85, 247, 0.7)'
            : blockType === 'command'
            ? 'rgba(234, 179, 8, 0.7)'
            : blockType === 'redstone' || blockType === 'tnt'
            ? 'rgba(239, 68, 68, 0.7)'
            : 'rgba(34, 197, 94, 0.4)';
      } else if (category === 'item') {
        itemType = ITEM_TYPES[i % ITEM_TYPES.length];
        glowColor =
          itemType === 'diamondSword' || itemType === 'diamondPickaxe'
            ? 'rgba(6, 182, 212, 0.8)'
            : itemType === 'enderPearl' || itemType === 'enchantedBook'
            ? 'rgba(168, 85, 247, 0.8)'
            : itemType === 'goldenApple'
            ? 'rgba(234, 179, 8, 0.8)'
            : 'rgba(34, 197, 94, 0.7)';
      } else {
        mobHeadType = MOB_HEAD_TYPES[i % MOB_HEAD_TYPES.length];
        glowColor =
          mobHeadType === 'creeper'
            ? 'rgba(34, 197, 94, 0.8)'
            : mobHeadType === 'enderman'
            ? 'rgba(168, 85, 247, 0.8)'
            : mobHeadType === 'witherSkeleton'
            ? 'rgba(100, 116, 139, 0.6)'
            : 'rgba(148, 163, 184, 0.5)';
      }

      entities.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: category === 'block' ? Math.random() * 18 + 28 : category === 'mobHead' ? Math.random() * 12 + 26 : Math.random() * 14 + 28,
        speedY: -(Math.random() * 0.22 + 0.08), // Gentle upward float
        speedX: (Math.random() - 0.5) * 0.16,
        rotation: (Math.random() - 0.5) * 0.5,
        rotSpeed: (Math.random() - 0.5) * 0.006,
        floatOffset: Math.random() * Math.PI * 2,
        floatSpeed: Math.random() * 0.02 + 0.01,
        category,
        blockType,
        itemType,
        mobHeadType,
        opacity: Math.random() * 0.35 + 0.5, // Crisp & punchy visibility
        glowColor,
      });
    }

    // 2. Initialize Ambient Dust & XP Particles
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      const isXp = Math.random() > 0.6;
      const isRune = Math.random() > 0.75;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: isXp ? Math.random() * 4 + 3 : isRune ? 13 : Math.random() * 2.5 + 1.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: -(Math.random() * 0.35 + 0.1),
        opacity: Math.random() * 0.4 + 0.2,
        color: isXp ? 'rgba(163, 230, 53, ' : isRune ? 'rgba(168, 85, 247, ' : 'rgba(34, 197, 94, ',
        pulseSpeed: Math.random() * 0.03 + 0.01,
        type: isXp ? 'xpOrb' : isRune ? 'enchantRune' : 'emerald',
        runeChar: ENCHANT_RUNES[Math.floor(Math.random() * ENCHANT_RUNES.length)],
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    // ==========================================
    // RENDER: 3D ISOMETRIC MINECRAFT BLOCKS
    // ==========================================
    const drawBlock = (b: FloatingEntity) => {
      const s = b.size * 0.6;
      const h = b.size * 0.35;
      const depth = b.size * 0.7;

      let topFill = '#4ade80';
      let leftFill = '#86efac';
      let rightFill = '#15803d';
      let accentFill = '#22c55e';

      switch (b.blockType) {
        case 'grass':
          topFill = '#5ba735';
          leftFill = '#866043';
          rightFill = '#5c3d24';
          accentFill = '#72b545';
          break;
        case 'emerald':
          topFill = '#34d399';
          leftFill = '#10b981';
          rightFill = '#047857';
          accentFill = '#a7f3d0';
          break;
        case 'diamond':
          topFill = '#38bdf8';
          leftFill = '#0284c7';
          rightFill = '#0369a1';
          accentFill = '#e0f2fe';
          break;
        case 'obsidian':
          topFill = '#3b0764';
          leftFill = '#1e1b4b';
          rightFill = '#0f172a';
          accentFill = '#7e22ce';
          break;
        case 'command':
          topFill = '#d97706';
          leftFill = '#b45309';
          rightFill = '#78350f';
          accentFill = '#fef08a';
          break;
        case 'tnt':
          topFill = '#dc2626';
          leftFill = '#b91c1c';
          rightFill = '#991b1b';
          accentFill = '#ffffff';
          break;
        case 'redstone':
          topFill = '#ef4444';
          leftFill = '#b91c1c';
          rightFill = '#7f1d1d';
          accentFill = '#fca5a5';
          break;
        case 'crafting':
          topFill = '#b45309';
          leftFill = '#92400e';
          rightFill = '#78350f';
          accentFill = '#d97706';
          break;
      }

      // Top Face (Rhombus)
      ctx.fillStyle = topFill;
      ctx.beginPath();
      ctx.moveTo(0, -h);
      ctx.lineTo(s, 0);
      ctx.lineTo(0, h);
      ctx.lineTo(-s, 0);
      ctx.closePath();
      ctx.fill();

      // Top Accent
      ctx.fillStyle = accentFill;
      ctx.beginPath();
      ctx.moveTo(0, -h * 0.5);
      ctx.lineTo(s * 0.5, 0);
      ctx.lineTo(0, h * 0.5);
      ctx.lineTo(-s * 0.5, 0);
      ctx.closePath();
      ctx.fill();

      // Left Face
      ctx.fillStyle = leftFill;
      ctx.beginPath();
      ctx.moveTo(-s, 0);
      ctx.lineTo(0, h);
      ctx.lineTo(0, h + depth);
      ctx.lineTo(-s, depth);
      ctx.closePath();
      ctx.fill();

      // Grass fringe overlay on left side
      if (b.blockType === 'grass') {
        ctx.fillStyle = '#5ba735';
        ctx.beginPath();
        ctx.moveTo(-s, 0);
        ctx.lineTo(0, h);
        ctx.lineTo(0, h + depth * 0.35);
        ctx.lineTo(-s * 0.5, depth * 0.25);
        ctx.lineTo(-s, depth * 0.35);
        ctx.closePath();
        ctx.fill();
      }

      // Right Face
      ctx.fillStyle = rightFill;
      ctx.beginPath();
      ctx.moveTo(0, h);
      ctx.lineTo(s, 0);
      ctx.lineTo(s, depth);
      ctx.lineTo(0, h + depth);
      ctx.closePath();
      ctx.fill();

      // Grass fringe overlay on right side
      if (b.blockType === 'grass') {
        ctx.fillStyle = '#488c27';
        ctx.beginPath();
        ctx.moveTo(0, h);
        ctx.lineTo(s, 0);
        ctx.lineTo(s, depth * 0.35);
        ctx.lineTo(s * 0.5, depth * 0.25);
        ctx.lineTo(0, h + depth * 0.35);
        ctx.closePath();
        ctx.fill();
      }

      // Ore Sparkling Crystals
      if (b.blockType === 'diamond' || b.blockType === 'emerald' || b.blockType === 'redstone') {
        ctx.fillStyle = accentFill;
        ctx.fillRect(-s * 0.6, depth * 0.3, s * 0.3, depth * 0.2);
        ctx.fillRect(s * 0.3, depth * 0.4, s * 0.3, depth * 0.2);
      }

      // TNT White Band
      if (b.blockType === 'tnt') {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(-s, depth * 0.3, s * 2, depth * 0.3);
        ctx.fillStyle = '#000000';
        ctx.font = `bold ${Math.round(s * 0.4)}px monospace`;
        ctx.fillText('TNT', -s * 0.5, depth * 0.55);
      }

      // Block Wireframe Outlines
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.4)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, -h);
      ctx.lineTo(s, 0);
      ctx.lineTo(s, depth);
      ctx.lineTo(0, h + depth);
      ctx.lineTo(-s, depth);
      ctx.lineTo(-s, 0);
      ctx.closePath();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, h);
      ctx.lineTo(0, h + depth);
      ctx.moveTo(0, h);
      ctx.lineTo(-s, 0);
      ctx.moveTo(0, h);
      ctx.lineTo(s, 0);
      ctx.stroke();
    };

    // ==========================================
    // RENDER: MINECRAFT MOB HEADS (8x8 Pixel Art)
    // ==========================================
    const drawMobHead = (b: FloatingEntity) => {
      const s = b.size;
      const hs = s / 2;
      const px = s / 8; // 8x8 pixel grid unit

      // Head Base Box
      ctx.save();
      ctx.translate(-hs, -hs);

      if (b.mobHeadType === 'creeper') {
        // Creeper Face
        ctx.fillStyle = '#22c55e'; // Green Base
        ctx.fillRect(0, 0, s, s);

        ctx.fillStyle = '#15803d'; // Darker green pixel noise
        ctx.fillRect(0, 0, px * 2, px * 2);
        ctx.fillRect(px * 6, px * 6, px * 2, px * 2);

        // Black Creeper Mouth & Eyes
        ctx.fillStyle = '#000000';
        // Eyes
        ctx.fillRect(px * 1, px * 2, px * 2, px * 2);
        ctx.fillRect(px * 5, px * 2, px * 2, px * 2);
        // Nose & Mouth
        ctx.fillRect(px * 3, px * 3, px * 2, px * 3);
        ctx.fillRect(px * 2, px * 4, px * 1, px * 3);
        ctx.fillRect(px * 5, px * 4, px * 1, px * 3);
        ctx.fillRect(px * 2, px * 7, px * 4, px * 1);
      } else if (b.mobHeadType === 'enderman') {
        // Enderman Face
        ctx.fillStyle = '#0a0a0a'; // Obsidian Black
        ctx.fillRect(0, 0, s, s);

        // Glowing Purple Eyes
        ctx.fillStyle = '#c084fc';
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#a855f7';
        ctx.fillRect(px * 0.5, px * 3.5, px * 2.5, px * 1);
        ctx.fillRect(px * 5, px * 3.5, px * 2.5, px * 1);
        // Bright eye core
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(px * 1.5, px * 3.5, px * 1, px * 1);
        ctx.fillRect(px * 6, px * 3.5, px * 1, px * 1);
      } else if (b.mobHeadType === 'steve') {
        // Steve Classic Face
        ctx.fillStyle = '#d97706'; // Skin
        ctx.fillRect(0, 0, s, s);

        // Brown Hair
        ctx.fillStyle = '#5c3d24';
        ctx.fillRect(0, 0, s, px * 2.5);
        ctx.fillRect(0, 0, px * 1.5, px * 4);
        ctx.fillRect(px * 6.5, 0, px * 1.5, px * 4);

        // Eyes (White + Blue)
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(px * 1.5, px * 3.5, px * 2, px * 1);
        ctx.fillRect(px * 4.5, px * 3.5, px * 2, px * 1);
        ctx.fillStyle = '#3b82f6';
        ctx.fillRect(px * 2.5, px * 3.5, px * 1, px * 1);
        ctx.fillRect(px * 4.5, px * 3.5, px * 1, px * 1);

        // Nose & Beard
        ctx.fillStyle = '#b45309';
        ctx.fillRect(px * 3.5, px * 4.5, px * 1, px * 1);
        ctx.fillStyle = '#5c3d24';
        ctx.fillRect(px * 2.5, px * 6, px * 3, px * 1);
      } else if (b.mobHeadType === 'zombie') {
        // Zombie Head
        ctx.fillStyle = '#3f6212';
        ctx.fillRect(0, 0, s, s);

        // Dark hair
        ctx.fillStyle = '#14532d';
        ctx.fillRect(0, 0, s, px * 2);

        // Dark Eye Sockets
        ctx.fillStyle = '#052e16';
        ctx.fillRect(px * 1.5, px * 3, px * 2, px * 2);
        ctx.fillRect(px * 4.5, px * 3, px * 2, px * 2);
        // Nose & Mouth
        ctx.fillRect(px * 3.5, px * 5, px * 1, px * 1);
        ctx.fillRect(px * 2.5, px * 6, px * 3, px * 1);
      } else if (b.mobHeadType === 'skeleton') {
        // Skeleton Bone Skull
        ctx.fillStyle = '#e2e8f0';
        ctx.fillRect(0, 0, s, s);

        // Dark eye sockets
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(px * 1.5, px * 2.5, px * 2, px * 2);
        ctx.fillRect(px * 4.5, px * 2.5, px * 2, px * 2);
        // Nose & Teeth
        ctx.fillRect(px * 3.5, px * 4.5, px * 1, px * 1);
        ctx.fillRect(px * 1.5, px * 6, px * 5, px * 1);
      } else {
        // Wither Skeleton
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(0, 0, s, s);
        ctx.fillStyle = '#000000';
        ctx.fillRect(px * 1.5, px * 2.5, px * 2, px * 2);
        ctx.fillRect(px * 4.5, px * 2.5, px * 2, px * 2);
        ctx.fillRect(px * 3.5, px * 4.5, px * 1, px * 1);
        ctx.fillRect(px * 1.5, px * 6, px * 5, px * 1);
      }

      // Outer Head Border
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.lineWidth = 1;
      ctx.strokeRect(0, 0, s, s);

      ctx.restore();
    };

    // ==========================================
    // RENDER: MINECRAFT ICONIC ITEMS
    // ==========================================
    const drawItem = (b: FloatingEntity) => {
      const s = b.size;
      const hs = s / 2;

      ctx.save();
      ctx.translate(-hs, -hs);

      if (b.itemType === 'diamondSword') {
        // Diamond Sword
        const u = s / 16;
        ctx.save();
        ctx.translate(s * 0.5, s * 0.5);
        ctx.rotate(-Math.PI / 4);

        // Diamond Blade
        ctx.fillStyle = '#38bdf8';
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#06b6d4';
        ctx.fillRect(-u * 1.5, -u * 7, u * 3, u * 9);
        // Blade Tip
        ctx.beginPath();
        ctx.moveTo(-u * 1.5, -u * 7);
        ctx.lineTo(0, -u * 9);
        ctx.lineTo(u * 1.5, -u * 7);
        ctx.closePath();
        ctx.fill();

        // Guard
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(-u * 4, u * 2, u * 8, u * 1.5);
        // Hilt
        ctx.fillStyle = '#78350f';
        ctx.fillRect(-u * 1, u * 3.5, u * 2, u * 3.5);
        // Pommel
        ctx.fillStyle = '#0284c7';
        ctx.fillRect(-u * 1.5, u * 7, u * 3, u * 1.5);

        ctx.restore();
      } else if (b.itemType === 'enderPearl') {
        // Ender Pearl (Cyan/Teal orb with dark cosmic center)
        ctx.fillStyle = '#0d9488';
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#14b8a6';
        ctx.beginPath();
        ctx.arc(hs, hs, hs * 0.8, 0, Math.PI * 2);
        ctx.fill();

        // Dark Inner Swirl
        ctx.fillStyle = '#042f2e';
        ctx.beginPath();
        ctx.arc(hs, hs, hs * 0.5, 0, Math.PI * 2);
        ctx.fill();

        // Bright Emerald Core
        ctx.fillStyle = '#5eead4';
        ctx.beginPath();
        ctx.arc(hs - hs * 0.2, hs - hs * 0.2, hs * 0.25, 0, Math.PI * 2);
        ctx.fill();
      } else if (b.itemType === 'goldenApple') {
        // Golden Apple
        ctx.fillStyle = '#eab308';
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#facc15';
        ctx.beginPath();
        ctx.arc(hs, hs * 1.1, hs * 0.7, 0, Math.PI * 2);
        ctx.fill();

        // Shiny Highlight
        ctx.fillStyle = '#fef08a';
        ctx.beginPath();
        ctx.arc(hs - hs * 0.25, hs * 0.9, hs * 0.25, 0, Math.PI * 2);
        ctx.fill();

        // Stem & Leaf
        ctx.fillStyle = '#854d0e';
        ctx.fillRect(hs - 1.5, hs * 0.2, 3, hs * 0.35);
        ctx.fillStyle = '#22c55e';
        ctx.fillRect(hs + 1.5, hs * 0.2, hs * 0.35, hs * 0.25);
      } else if (b.itemType === 'emeraldGem') {
        // Emerald Gem (Octagon)
        ctx.fillStyle = '#22c55e';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#4ade80';
        ctx.beginPath();
        ctx.moveTo(hs * 0.5, hs * 0.1);
        ctx.lineTo(hs * 1.5, hs * 0.1);
        ctx.lineTo(hs * 1.9, hs * 0.6);
        ctx.lineTo(hs * 1.9, hs * 1.4);
        ctx.lineTo(hs * 1.5, hs * 1.9);
        ctx.lineTo(hs * 0.5, hs * 1.9);
        ctx.lineTo(hs * 0.1, hs * 1.4);
        ctx.lineTo(hs * 0.1, hs * 0.6);
        ctx.closePath();
        ctx.fill();

        // Inner Facet
        ctx.fillStyle = '#86efac';
        ctx.beginPath();
        ctx.arc(hs, hs, hs * 0.4, 0, Math.PI * 2);
        ctx.fill();
      } else if (b.itemType === 'enchantedBook') {
        // Enchanted Book
        ctx.fillStyle = '#7e22ce';
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#c084fc';
        ctx.fillRect(hs * 0.2, hs * 0.2, hs * 1.6, hs * 1.6);

        // Gold corner latch
        ctx.fillStyle = '#eab308';
        ctx.fillRect(hs * 0.2, hs * 0.8, hs * 1.6, hs * 0.35);
        // Ribbon
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(hs * 0.85, hs * 0.2, hs * 0.3, hs * 1.7);
      } else if (b.itemType === 'diamondPickaxe') {
        // Diamond Pickaxe
        const u = s / 16;
        ctx.save();
        ctx.translate(s * 0.5, s * 0.5);
        ctx.rotate(-Math.PI / 4);

        // Pickaxe Curved Head
        ctx.fillStyle = '#38bdf8';
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#06b6d4';
        ctx.beginPath();
        ctx.arc(0, -u * 6, u * 6, Math.PI * 0.85, Math.PI * 0.15, true);
        ctx.lineWidth = u * 2.5;
        ctx.strokeStyle = '#38bdf8';
        ctx.stroke();

        // Wooden Handle
        ctx.fillStyle = '#78350f';
        ctx.fillRect(-u * 1, -u * 5, u * 2, u * 13);
        ctx.restore();
      } else {
        // Netherite Ingot
        ctx.fillStyle = '#334155';
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#64748b';
        ctx.fillRect(hs * 0.3, hs * 0.5, hs * 1.4, hs * 0.8);
        ctx.fillStyle = '#64748b';
        ctx.fillRect(hs * 0.4, hs * 0.6, hs * 1.2, hs * 0.3);
      }

      ctx.restore();
    };

    // ==========================================
    // MAIN ANIMATION LOOP
    // ==========================================
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const time = Date.now() * 0.001;

      // Mouse torchlight ambient beacon
      if (mouseX > 0 && mouseY > 0) {
        const radGrad = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 320);
        radGrad.addColorStop(0, 'rgba(34, 197, 94, 0.09)');
        radGrad.addColorStop(0.5, 'rgba(6, 182, 212, 0.03)');
        radGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = radGrad;
        ctx.fillRect(0, 0, width, height);
      }

      // 1. Draw Floating Minecraft Entities (Blocks, Items, Mob Heads)
      for (let i = 0; i < entities.length; i++) {
        const e = entities[i];

        e.y += e.speedY;
        e.x += e.speedX;
        e.rotation += e.rotSpeed;

        // Wrap around viewport bounds
        if (e.y < -90) {
          e.y = height + 90;
          e.x = Math.random() * width;
        }
        if (e.y > height + 90) e.y = -90;
        if (e.x < -90) e.x = width + 90;
        if (e.x > width + 90) e.x = -90;

        // Mouse gentle repulsion
        const dx = mouseX - e.x;
        const dy = mouseY - e.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          const force = (140 - dist) / 140;
          e.x -= (dx / dist) * force * 1.6;
          e.y -= (dy / dist) * force * 1.6;
        }

        // Render Entity
        ctx.save();
        const bobY = Math.sin(time * e.floatSpeed + e.floatOffset) * 8;
        ctx.translate(e.x, e.y + bobY);
        ctx.rotate(e.rotation);
        ctx.globalAlpha = e.opacity;

        ctx.shadowBlur = 14;
        ctx.shadowColor = e.glowColor;

        if (e.category === 'block') {
          drawBlock(e);
        } else if (e.category === 'mobHead') {
          drawMobHead(e);
        } else {
          drawItem(e);
        }

        ctx.restore();
      }

      // 2. Draw Minecraft Particles (XP Orbs, Enchantment Runes, Sparkles)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        p.opacity += Math.sin(Date.now() * p.pulseSpeed) * 0.004;
        const boundedOpacity = Math.max(0.12, Math.min(0.8, p.opacity));

        if (p.type === 'xpOrb') {
          // Minecraft XP Orb
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(Date.now() * 0.003);

          ctx.shadowBlur = 12;
          ctx.shadowColor = 'rgba(163, 230, 53, 0.9)';

          ctx.fillStyle = `rgba(163, 230, 53, ${boundedOpacity})`;
          ctx.beginPath();
          ctx.moveTo(0, -p.size);
          ctx.lineTo(p.size, 0);
          ctx.lineTo(0, p.size);
          ctx.lineTo(-p.size, 0);
          ctx.closePath();
          ctx.fill();

          ctx.fillStyle = `rgba(250, 204, 21, ${boundedOpacity + 0.2})`;
          ctx.beginPath();
          ctx.moveTo(0, -p.size * 0.5);
          ctx.lineTo(p.size * 0.5, 0);
          ctx.lineTo(0, p.size * 0.5);
          ctx.lineTo(-p.size * 0.5, 0);
          ctx.closePath();
          ctx.fill();

          ctx.restore();
        } else if (p.type === 'enchantRune') {
          // Galactic Enchantment Table Rune
          ctx.save();
          ctx.font = '13px "JetBrains Mono", monospace';
          ctx.fillStyle = `rgba(168, 85, 247, ${boundedOpacity * 0.9})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = 'rgba(168, 85, 247, 0.8)';
          ctx.fillText(p.runeChar || '✦', p.x, p.y);
          ctx.restore();
        } else {
          // Pixel dust
          ctx.fillStyle = `${p.color}${boundedOpacity})`;
          ctx.fillRect(p.x, p.y, p.size, p.size);

          if (p.size > 2) {
            ctx.shadowBlur = 8;
            ctx.shadowColor = `${p.color}0.8)`;
            ctx.fillRect(p.x, p.y, p.size, p.size);
            ctx.shadowBlur = 0;
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-90"
      aria-hidden="true"
    />
  );
};
