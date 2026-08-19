import { ServiceItem, CaseStudy, TechCapability, ProcessStep, FAQItem } from '../types';

export const STUDIO_INFO = {
  name: 'Minecraft Server Engineering Studio',
  brandShort: 'Devil Studio',
  developerName: 'devil',
  developerTitle: 'Solo Minecraft Systems Engineer',
  location: 'India (Serving Server Owners Worldwide)',
  tagline: 'Custom Systems. Built for Your Server.',
  heroDescription:
    'High-performance Paper, Purpur & Folia plugins, distributed database synchronization, and bi-directional Discord bridges engineered around how your community plays.',
  discordUrl: 'https://discord.com/channels/1539681229828399154/1539681230394490941',
  email: 'hemnath0329@gmail.com',
  githubUrl: 'https://github.com',
  warrantyText: 'Anytime Free Bug Fixes & Support Warranty',
  averageTurnaround: '3 to 14 Days',
  tpsTarget: '20.00 / 20.00 TPS Guaranteed',
};

export const TECH_CAPABILITIES: TechCapability[] = [
  {
    name: 'Paper & Purpur',
    category: 'Platform',
    description: 'Modern high-performance server APIs with asynchronous event handling and zero tick drops.',
    icon: 'Terminal',
    badgeColor: 'emerald',
  },
  {
    name: 'Folia (Multi-threaded)',
    category: 'Platform',
    description: 'Regionized multithreading architecture for extreme scale and massive player counts.',
    icon: 'Cpu',
    badgeColor: 'diamond',
  },
  {
    name: 'Velocity & Bungee',
    category: 'Platform',
    description: 'Cross-server proxy synchronization, global chat queues, and Redis messaging.',
    icon: 'Network',
    badgeColor: 'portal',
  },
  {
    name: 'Java 21 & Kotlin',
    category: 'Language',
    description: 'Modern JVM features, pattern matching, virtual threads, and strictly typed memory safety.',
    icon: 'Code2',
    badgeColor: 'emerald',
  },
  {
    name: 'Adventure & MiniMessage',
    category: 'Tooling',
    description: 'Rich RGB gradients, interactive hoverable/clickable text, and responsive custom GUIs.',
    icon: 'Sparkles',
    badgeColor: 'gold',
  },
  {
    name: 'Redis Pub/Sub',
    category: 'Database',
    description: 'Sub-millisecond cross-server packet dispatch, global inventories, and instant sync.',
    icon: 'Zap',
    badgeColor: 'redstone',
  },
  {
    name: 'MySQL & PostgreSQL',
    category: 'Database',
    description: 'HikariCP connection pooling, non-blocking asynchronous queries, and atomic transactions.',
    icon: 'Database',
    badgeColor: 'diamond',
  },
  {
    name: 'Discord JDA 5',
    category: 'Integration',
    description: 'Bi-directional account linking, in-game command consoles, and role synchronization.',
    icon: 'MessageSquare',
    badgeColor: 'portal',
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'custom-gameplay',
    iconName: 'Sword',
    title: 'Custom Gameplay Systems',
    shortDesc: 'Bespoke game loops, custom combat mechanics, progression trees, and leveling systems.',
    detailedDesc:
      'Engineered from the ground up for your specific gamemode (Survival, Skyblock, RPG, Hardcore, or Minigames). Complete control over entity behavior, custom attributes, enchantments, and item abilities.',
    features: [
      'Custom Leveling & Skill Trees',
      'Entity Spawning & Boss AI Logic',
      'Custom Enchantments & Attributes',
      'Async Event Pipeline (Zero Tick Lag)',
      'PlaceholderAPI & MiniMessage Integrated',
    ],
    techStack: ['Paper API', 'Adventure', 'HikariCP', 'NMS NBT'],
    highlight: 'Zero TPS Impact',
    badgeType: 'emerald',
  },
  {
    id: 'economy-progression',
    iconName: 'Coins',
    title: 'Economy & Multi-Currency',
    shortDesc: 'Rock-solid transaction engines with atomic locking, bank systems, and Redis sync.',
    detailedDesc:
      'Prevent duplicate glitches and economy exploits with transactional write safety. Support for token shops, player-to-player markets, prestige ranks, and seasonal reset vaults.',
    features: [
      'Vault & Treasury API Compliance',
      'Anti-Dupe Atomic Transaction Locks',
      'Multi-Currency Support (Coins, Gems, Souls)',
      'Cross-Server Synchronized Balances',
      'Auto-Reconciling Database Backups',
    ],
    techStack: ['Vault API', 'Redis Pub/Sub', 'MySQL', 'HikariCP'],
    highlight: '100% Dupe-Proof',
    badgeType: 'gold',
  },
  {
    id: 'custom-guis',
    iconName: 'LayoutGrid',
    title: 'Custom GUIs & Menu Engines',
    shortDesc: 'Fluid inventory menus with pagination, animated borders, and sound feedback.',
    detailedDesc:
      'Replace clunky command-line configurations with visual chest GUIs. Full support for dynamic page builders, animated frames, sound triggers, and permission-based layout views.',
    features: [
      'Fast Non-Flickering Inventory Updates',
      'MiniMessage RGB Gradients & Badges',
      'Drag-and-Drop Interactive Slots',
      'Sound & Particle Micro-Interactions',
      '100% Configurable YAML Layouts',
    ],
    techStack: ['Paper Inventory API', 'MiniMessage', 'ProtocolLib'],
    highlight: 'Interactive UI',
    badgeType: 'diamond',
  },
  {
    id: 'discord-bridge',
    iconName: 'MessageCircle',
    title: 'Discord ↔ Minecraft Bridges',
    shortDesc: 'Bi-directional staff audit logging, role sync, in-game chat relay, and console bots.',
    detailedDesc:
      'Connect your server community with your Discord guild seamlessly. Stream real-time console logs to staff channels, link player accounts with Discord OAuth/Code, and sync Nitro booster perks.',
    features: [
      'JDA 5 Asynchronous Bot Architecture',
      'In-Game Chat ↔ Discord Channel Relay',
      'Staff Moderation Logging & Audit Webhooks',
      'Two-Way Role & Rank Synchronization',
      'Secure Token & Zero Discord Secret Leaks',
    ],
    techStack: ['JDA 5', 'Discord Webhooks', 'OAuth2', 'Redis'],
    highlight: 'Real-time Relay',
    badgeType: 'portal',
  },
  {
    id: 'performance-tuning',
    iconName: 'Activity',
    title: 'TPS Optimization & Spark Profiling',
    shortDesc: 'Deep profiling of memory leaks, entity bottlenecks, and asynchronous thread offloading.',
    detailedDesc:
      'If your server is dropping below 20.0 TPS or suffering from random lag spikes, we analyze your Spark profiles, identify blocking main-thread tasks, and optimize or rewrite problematic plugin logic.',
    features: [
      'Spark CPU & Memory Flamegraph Analysis',
      'Main-Thread Blocking Query Offloading',
      'Entity Tick & Hopper Lag Capping',
      'Chunk Loading & Network Packet Tuning',
      'Garbage Collection (Aikar Flags) Config',
    ],
    techStack: ['Spark Profiler', 'Java Async Pool', 'Paper Paperclip'],
    highlight: '20.0 TPS Target',
    badgeType: 'redstone',
  },
  {
    id: 'network-infrastructure',
    iconName: 'Server',
    title: 'Network & Velocity Architecture',
    shortDesc: 'Multi-server proxy infrastructure, global player queues, and shared inventories.',
    detailedDesc:
      'Scale your server into a resilient network with Velocity proxy, Redis messaging, and cross-server party & friend systems that handle thousands of concurrent players effortlessly.',
    features: [
      'Velocity Proxy Setup & Security Guard',
      'Cross-Server Party & Private Messaging',
      'Global Tablist & Rank Synchronization',
      'Automated Limbo & Hub Fallback Queues',
      'Distributed Redis Inventory Caching',
    ],
    techStack: ['Velocity API', 'Redis Sentinel', 'PostgreSQL', 'Docker'],
    highlight: 'Multi-Server Scale',
    badgeType: 'emerald',
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'aether-progression',
    title: 'AetherProgression',
    tagline: 'Modular Survival Scoring, Weekly Leaderboards & Async Reward Pipeline',
    category: 'Progression',
    version: '1.20.4 - 1.21+',
    platforms: ['Paper', 'Purpur', 'Folia'],
    summary:
      'Engineered an enterprise-grade survival scoring engine for an SMP network experiencing main-thread freeze during weekly leaderboard calculation across 50,000+ player records.',
    problem:
      'The client was using a legacy scoreboard plugin that ran SQL sorting queries directly on the server primary thread. When 150+ players were online during weekly reset, the server would stall for 3.2 seconds, resulting in timeout disconnects.',
    solution:
      'Designed an asynchronous compute pipeline using ForkJoinPool worker threads, caching live player score deltas in Redis memory. Leaderboard generation runs completely off-thread in 8ms with zero impact on the primary game tick.',
    features: [
      'Dynamic Quest & Activity Scoring (Mining, Mob Kills, Playtime, Building)',
      'Async Redis Caching with MySQL Historical Persistent Store',
      'Animated MiniMessage Actionbar & Holographic Leaderboards',
      'Automated Weekly Prize Tier Distribution with Claim GUI',
      'Folia Region-Aware Task Scheduling Support',
    ],
    techStack: ['Paper API 1.20.4+', 'Java 21', 'Redis Jedis', 'MySQL HikariCP', 'Adventure MiniMessage'],
    metrics: [
      { label: 'Avg Tick Cost', value: '0.04 ms', subtext: '98% reduction from legacy 3.2s freeze' },
      { label: 'Player Capacity', value: '250+ TPS 20.0', subtext: 'Maintained during peak reset events' },
      { label: 'Query Latency', value: '< 1.8 ms', subtext: 'Redis read speed on global top 100' },
    ],
    architecture: [
      { layer: '01. Event Ingestion', title: 'Paper Event Listener', description: 'Filters player action packets (BlockBreak, Kill, Quest) with zero-alloc buffers.', tech: 'Paper API' },
      { layer: '02. Async Dispatch', title: 'RingBuffer Queue', description: 'Queues events into an off-thread memory buffer to isolate from the game tick.', tech: 'Java 21 Virtual Threads' },
      { layer: '03. Cache Layer', title: 'Redis Sorted Sets', description: 'Computes real-time ranks instantly using O(log(N)) ZADD and ZREVRANGE.', tech: 'Redis In-Memory' },
      { layer: '04. Data Persistence', title: 'MySQL HikariCP Batcher', description: 'Flushes batched user state to relational storage every 120 seconds.', tech: 'MySQL HikariCP' },
      { layer: '05. View Layer', title: 'Interactive MiniMessage GUI', description: 'Presents paginated ranks and weekly reward claiming menus.', tech: 'Adventure API' },
    ],
    sparkTickBenchmark: {
      avgTickMs: 0.04,
      threadType: 'Async Pool',
      gcOverhead: '< 0.01%',
    },
    sampleConfig: `# AetherProgression System Configuration
database:
  type: REDIS_MYSQL_HYBRID
  redis:
    host: "127.0.0.1"
    port: 6379
    key_prefix: "aether_smp:"
  mysql:
    pool_size: 10
    batch_flush_interval_seconds: 120

performance:
  async_worker_threads: 4
  folia_support: true
  leaderboard_cache_ttl_seconds: 15`,
    status: 'Production Deployed',
  },
  {
    id: 'nexus-economy',
    title: 'NexusEconomy',
    tagline: 'Dupe-Proof Multi-Currency Engine with Atomic Transaction Locks & Redis Sync',
    category: 'Economy',
    version: '1.20.2 - 1.21+',
    platforms: ['Paper', 'Purpur', 'Velocity'],
    summary:
      'Engineered a zero-exploit multi-currency economy engine supporting physical bank notes, coin balances, gem tokens, and instantaneous cross-server proxy synchronization.',
    problem:
      'Cross-server network suffered from race conditions where players rapidly hopped between proxy servers to duplicate funds before SQL writes finished committing.',
    solution:
      'Built a distributed redlock mutex protocol over Redis. When a transaction initiates, an atomic lock with 250ms TTL prevents parallel execution across any proxy node, ensuring 100% mathematical transaction integrity.',
    features: [
      'Native Vault & Treasury API Interface',
      'Multi-Currency System (Coins, Gems, Event Tokens, Crypto-Style Shards)',
      'Distributed Atomic Transaction Lock (Redlock algorithm)',
      'Physical Bank Notes with Anti-Counterfeit NBT Cryptographic Signatures',
      'Transaction Audit Ledger for Server Staff Investigation',
    ],
    techStack: ['Java 21', 'Paper API', 'Redis Redlock', 'MariaDB', 'Vault Provider'],
    metrics: [
      { label: 'Dupe Incidents', value: '0 Reported', subtext: 'Across 1.8M simulated race-condition tests' },
      { label: 'Sync Delay', value: '< 4.2 ms', subtext: 'Across 6 connected Paper sub-servers' },
      { label: 'Vault Hook', value: '100% Compatible', subtext: 'Works seamlessly with 40+ third-party plugins' },
    ],
    architecture: [
      { layer: '01. API Interceptor', title: 'Vault Hook Handler', description: 'Intercepts deposit, withdraw, and transfer requests from any server plugin.', tech: 'Vault API' },
      { layer: '02. Concurrency Lock', title: 'Redis Redlock Guard', description: 'Acquires atomic lock on player UUID across the whole proxy cluster.', tech: 'Redis Distributed Lock' },
      { layer: '03. Transaction Core', title: 'Atomic Balance Engine', description: 'Executes math checks with rollback safety and anti-overflow safeguards.', tech: 'Java 21 Core' },
      { layer: '04. Cross-Server Broadcast', title: 'Redis Pub/Sub Sync', description: 'Broadcasts balance update packets to all servers on the network in < 5ms.', tech: 'Redis Pub/Sub' },
      { layer: '05. Audit Storage', title: 'MariaDB Transaction Ledger', description: 'Records immutable audit log with timestamps, player UUIDs, and balance diffs.', tech: 'MariaDB' },
    ],
    sparkTickBenchmark: {
      avgTickMs: 0.02,
      threadType: 'Async Pool',
      gcOverhead: '0.00%',
    },
    sampleConfig: `# NexusEconomy Multi-Currency Settings
currencies:
  coins:
    symbol: "⛃"
    format: "<green>%amount%⛃</green>"
    vault_primary: true
  gems:
    symbol: "✦"
    format: "<aqua>%amount%✦</aqua>"
    vault_primary: false

security:
  atomic_lock_ttl_ms: 250
  enable_transaction_audit_logging: true
  banknote_nbt_signing: true`,
    status: 'Enterprise Client Ready',
  },
  {
    id: 'vaultguard-bridge',
    title: 'VaultGuard Discord Bridge',
    tagline: 'Bi-Directional JDA 5 Server Bridge, Console Relay & Staff Audit Matrix',
    category: 'Infrastructure',
    version: '1.20 - 1.21+',
    platforms: ['Paper', 'Purpur', 'Velocity', 'Spigot'],
    summary:
      'Engineered an enterprise JDA 5 bot bridge that provides real-time chat streaming, staff command audit webhooks, role synchronization, and an in-Discord server console.',
    problem:
      'Server owners and staff team needed an ultra-responsive way to monitor in-game punishments, player reports, and server anomalies from mobile Discord without opening SSH.',
    solution:
      'Developed a multi-threaded JDA 5 daemon with Discord slash commands (`/lookup`, `/kick`, `/tps`, `/announce`) and secure encrypted token authorization that runs with negligible JVM heap footprint.',
    features: [
      'Interactive Discord Slash Commands (/lookup, /punish, /broadcast, /tps)',
      'Rich Embedded Minecraft Chat Relay with Avatar Generation',
      'Staff Command Logging with IP Masking and Action Audit Channels',
      'Nitro Booster & Patron Auto-Rank Sync with Expiration Checking',
      'Encrypted Local Token Management (Zero Webhook Leak Vulnerabilities)',
    ],
    techStack: ['JDA 5 (Java Discord API)', 'Paper API', 'Discord Webhook Client', 'SQLite / MySQL', 'OkHttp 4'],
    metrics: [
      { label: 'Relay Latency', value: '85 ms', subtext: 'In-game chat to Discord embed delivery' },
      { label: 'Heap Footprint', value: '< 18 MB', subtext: 'Optimized JDA gateway event caching' },
      { label: 'Security Score', value: '100% Safe', subtext: 'Sanitized input to prevent command injection' },
    ],
    architecture: [
      { layer: '01. Log & Chat Filter', title: 'Paper Event Listener', description: 'Captures chat messages, deaths, advancements, and staff commands.', tech: 'Paper API' },
      { layer: '02. Sanitizer & Formatter', title: 'Discord Markdown Encoder', description: 'Translates MiniMessage color tags into Discord Markdown and emojis.', tech: 'Custom Parser' },
      { layer: '03. Webhook Dispatcher', title: 'Async OkHttp Queue', description: 'Dispatches batch requests respecting Discord API rate limits.', tech: 'OkHttp / Webhooks' },
      { layer: '04. JDA Gateway Bot', title: 'Discord JDA 5 Daemon', description: 'Handles slash command interactions and permission hierarchy.', tech: 'JDA 5 API' },
      { layer: '05. Sync Controller', title: 'Role & Account Mapper', description: 'Matches Discord IDs with Minecraft UUIDs stored in database.', tech: 'SQLite / MySQL' },
    ],
    sparkTickBenchmark: {
      avgTickMs: 0.01,
      threadType: 'Async Pool',
      gcOverhead: '< 0.01%',
    },
    sampleConfig: `# VaultGuard Discord Bridge Configuration
bot:
  token: "\${VAULTGUARD_DISCORD_TOKEN}"
  guild_id: "1539681229828399154"

channels:
  chat_relay_id: "1539681230394490941"
  staff_audit_id: "1539681230394490942"
  console_stream_id: "1539681230394490943"

features:
  embed_style: "MINECRAFT_DARK"
  stream_tps_updates: true`,
    status: 'Production Deployed',
  },
  {
    id: 'dungeon-engine',
    title: 'DungeonEngine',
    tagline: 'Dynamic Instanced Dungeon Spawner, Custom Mob AI & Loot Table Engine',
    category: 'Dungeon & AI',
    version: '1.20.4 - 1.21+',
    platforms: ['Paper', 'Purpur'],
    summary:
      'Engineered an instanced procedural dungeon engine for an MMORPG server, generating temporary dungeon schematics, phase-based boss battles, and smart pathfinding mob AI.',
    problem:
      'Standard Minecraft mobs had predictable AI and players could camp spawners. Running custom entities in the main overworld caused server chunk memory bloat.',
    solution:
      'Constructed a temporary SlimeWorld / FastAsyncWorldEdit instance manager that generates lightweight dungeon rooms per party, despawning cleanly on completion with zero world file fragmentation.',
    features: [
      'Instanced Party Dungeons with Automatic Cleanup',
      'Phase-Based Custom Bosses (Attack Telegraphs, Minion Waves, Rage Modes)',
      'Custom Loot Drop Tables with Weighted Probabilities and Lore Generation',
      'Party Queue GUI with Matchmaking & Level Requirements',
      'Smart Entity Pathfinding avoiding lava, traps, and player choke points',
    ],
    techStack: ['Paper API', 'NMS Entity Controller', 'SlimeWorldManager / FAWE', 'Adventure MiniMessage'],
    metrics: [
      { label: 'Room Spawn Time', value: '< 180 ms', subtext: 'Full instanced dungeon creation' },
      { label: 'Active Instances', value: '30+ Sim', subtext: 'Simultaneous party dungeons on single Paper node' },
      { label: 'Memory Leak', value: '0 MB', subtext: 'Verified with continuous 72-hour leak test' },
    ],
    architecture: [
      { layer: '01. Queue Manager', title: 'Party Matchmaker', description: 'Groups players by level and opens ready-check GUI.', tech: 'Paper GUI API' },
      { layer: '02. Instance Allocator', title: 'SlimeWorld Loader', description: 'Loads isolated in-memory world instances without disk bloat.', tech: 'SlimeWorld / FAWE' },
      { layer: '03. AI Brain Engine', title: 'Custom Entity Pathfinder', description: 'Overrides NMS goal selectors with custom phase state machines.', tech: 'Paper NMS' },
      { layer: '04. Combat Controller', title: 'Spell & Ability Ticker', description: 'Renders particle hitboxes, telegraphed circles, and AOE damage.', tech: 'Adventure / Particle API' },
      { layer: '05. Loot Distributor', title: 'Weighted Table Generator', description: 'Rolls RNG loot tables and rewards party members with unique items.', tech: 'NBT Item API' },
    ],
    sparkTickBenchmark: {
      avgTickMs: 0.06,
      threadType: 'Main Sync & Async Split',
      gcOverhead: '< 0.02%',
    },
    sampleConfig: `# DungeonEngine Configuration
dungeons:
  crypt_of_souls:
    min_party_size: 2
    max_party_size: 4
    time_limit_minutes: 20
    boss:
      type: WITHER_SKELETON
      name: "<red><bold>Lord of the Forgotten Crypt</bold></red>"
      health: 2500
      phases: 3`,
    status: 'Core Architecture',
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    stepNumber: '01',
    icon: 'Hammer',
    minecraftItem: 'Crafting Table',
    title: 'Requirement & Idea Analysis',
    tagline: 'From your concept to an exact engineering spec',
    description:
      'We discuss your server concept, gameplay loop, target Minecraft version, database requirements, and performance boundaries. We outline all features and edge cases before a single line of code is written.',
    deliverables: ['Technical Specification Sheet', 'Gamemode Feasibility Analysis', 'Scope & Delivery Timeline'],
  },
  {
    stepNumber: '02',
    icon: 'BookOpen',
    minecraftItem: 'Enchanted Book',
    title: 'Architecture & Custom Estimate',
    tagline: 'Zero hidden surprises or unexpected roadblocks',
    description:
      'You receive a transparent project roadmap, database schema blueprint, and fixed estimate based on your exact specifications. No recurring surprise fees.',
    deliverables: ['Database Schema & Thread Model', 'Fixed Milestone Quote', 'API Hook Blueprint (Vault/Discord/PAPI)'],
  },
  {
    stepNumber: '03',
    icon: 'Terminal',
    minecraftItem: 'Command Block',
    title: 'Agile Development & Spark Profiling',
    tagline: 'Zero-lag asynchronous code engineered for scale',
    description:
      'Development begins using modern Paper/Purpur APIs, HikariCP async databases, and MiniMessage styling. Every build is rigorously tested and benchmarked with Spark profiler to guarantee 20.0 TPS stability.',
    deliverables: ['Live Development Test Server Access', 'Spark CPU & Memory Profile Report', 'Clean YAML Configuration Files'],
  },
  {
    stepNumber: '04',
    icon: 'Zap',
    minecraftItem: 'Nether Portal',
    title: 'Deployment & Anytime Bug Warranty',
    tagline: 'Delivered ready to drop directly into /plugins',
    description:
      'We assist in deploying the compiled `.jar` directly to your production server or staging testbed. Every project includes comprehensive anytime bug-fix warranty and config assistance.',
    deliverables: ['Compiled Production .jar', 'Full Setup & Permissions Documentation', 'Anytime Free Bug-Fix Warranty'],
  },
];

export const PRICING_TIERS = [
  {
    id: 'starter-utility',
    name: 'Small Utility & Mechanic',
    itemIcon: 'Wrench',
    suitability: 'Single-purpose mechanics, custom commands, quality-of-life tools, or custom GUIs.',
    typicalScope: [
      'Single focused plugin module',
      'Configurable MiniMessage YAML messages',
      'SQLite or local YAML data storage',
      'PlaceholderAPI (PAPI) integration',
      'Fast 3 to 7-day turnaround',
    ],
    pricingModel: 'Custom Quote / Scope Estimate',
    tag: 'Quick Delivery',
  },
  {
    id: 'custom-system',
    name: 'Complete Gameplay System',
    itemIcon: 'ShieldCheck',
    suitability: 'Progression engines, custom economies, rank systems, or complex mini-games.',
    typicalScope: [
      'Comprehensive gameplay loops & GUI menus',
      'MySQL / MariaDB / Redis persistence',
      'Zero-dupe transaction handling',
      'Deep Vault, WorldGuard & PAPI hooks',
      'Spark profiling & 20.0 TPS guarantee',
      '1 to 2-week turnaround',
    ],
    pricingModel: 'Custom Quote / Scope Estimate',
    tag: 'Most Popular',
    isPopular: true,
  },
  {
    id: 'network-ecosystem',
    name: 'Multi-Server & Network Core',
    itemIcon: 'Crown',
    suitability: 'Large-scale networks with Velocity proxy, Discord bot bridge, and cross-server sync.',
    typicalScope: [
      'Velocity / Bungee proxy synchronization',
      'Bi-directional JDA 5 Discord bot bridge',
      'Redis Pub/Sub real-time communication',
      'Instanced worlds / Folia compatibility',
      'Priority development & direct Discord war-room',
      'Full architecture blueprint included',
    ],
    pricingModel: 'Custom Quote / Scope Estimate',
    tag: 'Enterprise Scale',
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'versions-supported',
    category: 'Compatibility',
    question: 'Which Minecraft versions and server platforms do you build for?',
    answer:
      'We support all modern Minecraft versions (1.20.x, 1.20.4, 1.20.6, 1.21+) as well as legacy 1.8.8–1.19 if your network requires backward compatibility. Supported platforms include Paper, Purpur, Spigot, Folia (multithreaded), Velocity, and BungeeCord.',
  },
  {
    id: 'custom-quote-pricing',
    category: 'Development',
    question: 'How do you determine the price for a custom plugin?',
    answer:
      'Because every Minecraft server has unique mechanics, we provide clear, upfront custom estimates based on the required features, database complexity, GUI depth, and timeline. Once agreed upon, your quote is fixed—no hidden surprise fees.',
  },
  {
    id: 'how-enquiry-works',
    category: 'Process',
    question: 'How does the "Build My Plugin" quest process work?',
    answer:
      'Click the "Build My Plugin" button, complete the 7-step quest intake (describing your idea, server software, and desired features), and submit. You can also join our Discord directly. We will review your requirements, confirm feasibility, and send back a structured roadmap and quote within 24 hours.',
  },
  {
    id: 'turnaround-time',
    category: 'Process',
    question: 'How long does a custom plugin typically take to build?',
    answer:
      'Small utilities and standalone GUI tools typically take 3 to 7 business days. Medium systems (such as economy, ranks, or leveling) take 1 to 2 weeks. Massive multi-server network cores take 2 to 4 weeks with weekly milestones.',
  },
  {
    id: 'warranty-support',
    category: 'Support',
    question: 'What happens if a bug or edge-case is discovered after delivery?',
    answer:
      'Every delivered plugin includes an anytime free bug-fix warranty and configuration support. Whenever an unintended behavior or error log appears, we patch and update the build immediately at zero extra cost.',
  },
  {
    id: 'folia-compatibility',
    category: 'Compatibility',
    question: 'Can you build plugins that are fully compatible with Folia multithreading?',
    answer:
      'Yes! Folia requires regionized asynchronous schedulers rather than standard Bukkit runnable tasks. We write Folia-native code ensuring region thread safety, zero concurrency race conditions, and optimal chunk parallelization.',
  },
  {
    id: 'discord-integration',
    category: 'Development',
    question: 'Can my plugin sync in-game stats, chat, and roles with my Discord server?',
    answer:
      'Yes. Using JDA 5 (Java Discord API) and secure webhooks, we can build custom slash commands, audit logs, account verification links, and role synchronization tailored to your server staff hierarchy.',
  },
  {
    id: 'source-code',
    category: 'Development',
    question: 'Do I get the source code or just the compiled .jar file?',
    answer:
      'You receive the fully compiled, production-ready `.jar` along with documentation. If your project includes private repository source code ownership, clean, well-commented Gradle/Maven source repositories can be provided upon request.',
  },
];
