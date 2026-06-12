const MONSTERS = {
    buzzblob: {
        name: "Buzzblob",
        health: 40,
        speed: 8,
        sprite: "Buzzblob",
        moves: ["slimeDart", "sporePuff"]
    },
    blinkthorn: {
        name: "Blinkthorn",
        health: 50,
        speed: 4,
        sprite: "Blinkthorn",
        moves: ["thornShot", "bitePetal"]
    },
    snapblossom: {
        name: "Snapblossom",
        health: 45,
        speed: 5,
        sprite: "Snapblossom",
        moves: ["bitePetal", "thornShot"]
    },
    ucsc: {
        name: "U.C.S.C",
        health: 65,
        speed: 2,
        sprite: "Ultra Creepy Snail Coiler",
        moves: ["shellSlam", "sporePuff"]
    },
    treant: {
        name: "Treant",
        health: 55,
        speed: 3,
        sprite: "Treant",
        moves: ["sporePuff", "thornShot"]
    },
    emberclaw: {
        name: "Emberclaw",
        health: 60,
        speed: 6,
        sprite: "Emberclaw",
        moves: ["emberPinch", "bitePetal"]
    },
    garbat: {
        name: "Garbat",
        health: 70,
        speed: 3,
        sprite: "Garbat",
        moves: ["tongueLash", "slimeDart"]
    },
    garboslime: {
        name: "Garbo Slime",
        health: 75,
        speed: 4,
        sprite: "Garbo Slime",
        moves: ["digBite", "tongueLash"]
    },

    // Tier 2
    rocktail: {
        name: "Rocktail",
        health: 100,
        speed: 4,
        sprite: "Rocktail",
        moves: ["stoneRam", "rockThrow"]
    },
    inscorp: {
        name: "Inscorp",
        health: 75,
        speed: 7,
        sprite: "Inscorp",
        moves: ["poisonSting", "spiritStab"]
    },
    teramaw: {
        name: "Teramaw",
        health: 95,
        speed: 2,
        sprite: "Teramaw",
        moves: ["devour", "swampChomp"]
    },
    rockslime: {
        name: "Rock Slime",
        health: 85,
        speed: 3,
        sprite: "Rock Slime",
        moves: ["rockThrow", "stoneRam"]
    },
    shroomslime: {
        name: "Shroom Slime",
        health: 90,
        speed: 2,
        sprite: "Shroom Slime",
        moves: ["rootGrasp", "poisonSting"]
    },
    bogmaw: {
        name: "Bogmaw",
        health: 105,
        speed: 3,
        sprite: "Bogmaw",
        moves: ["swampChomp", "devour"]
    },
    stickler: {
        name: "Stickler",
        health: 70,
        speed: 7,
        sprite: "Stickler",
        moves: ["spiritStab", "poisonSting"]
    },
    widowmaker: {
        name: "Widow Maker",
        health: 80,
        speed: 5,
        sprite: "Widow Maker",
        moves: ["skullBash", "spiritStab"]
    },
    coiler: {
        name: "Coiler",
        health: 80,
        speed: 6,
        sprite: "Coiler",
        moves: ["waterFang", "poisonSting"]
    },

    // Tier 3
    cyclowing: {
        name: "Cyclowing",
        health: 80,
        speed: 10,
        sprite: "Cyclowing",
        moves: ["cycloneScreen", "crimsonDive"]
    },
    cerebrute: {
        name: "Cerebrute",
        health: 95,
        speed: 6,
        sprite: "Cerebrute",
        moves: ["mindBurst", "hellBolt"]
    },
    skeletonwarrior:{ 
        name: "Skeleton Warrior",
        health: 90,
        speed: 7,
        sprite: "Skeleton Warrior",
        moves: ["slash", "thrust"]
    },
    graverunner: {
        name: "Grave Runner",
        health: 120,
        speed: 9,
        sprite: "Grave Runner",
        moves: ["reaperStrike", "ambush"]
    },
    imp: {
        name: "Imp",
        health: 85,
        speed: 8,
        sprite: "Imp",
        moves: ["hellBolt", "mindBurst"]
    },
    bloodwing: {
        name: "Bloodwing",
        health: 90,
        speed: 9,
        sprite: "Bloodwing",
        moves: ["crimsonDive", "cycloneScreen"]
    },
    ogrewarrior: {
        name: "Ogre Warrior",
        health: 125,
        speed: 5,
        sprite: "Ogre Warrior",
        moves: ["frostRend", "slash"]
    },
    goblinwarrior: {
        name: "Goblin Warrior",
        health: 110,
        speed: 6,
        sprite: "Goblin Warrior",
        moves: ["thrust", "slash"]
    },
    feyhart: {
        name: "Feyhart",
        health: 100,
        speed: 8,
        sprite: "Feyhart",
        moves: ["naturesWrath", "mindBurst"]
    },
    stalkerslime: {
        name: "Stalker Slime",
        health: 130,
        speed: 4,
        sprite: "Stalker Slime",
        moves: ["ambush", "reaperStrike"]
    },

    // Tier 4
    voidshard: {
        name: "Void Shard",
        health: 130,
        speed: 8,
        sprite: "Void Shard",
        moves: ["voidBeam", "tentacleStorm"]
    },
    oculusprime: {
        name: "Oculus Prime",
        health: 150,
        speed: 6,
        sprite: "Oculus Prime",
        moves: ["eyeCannon", "voidBeam"]
    },
    rattlecoil: {
        name: "Rattle Coil",
        health: 140,
        speed: 7,
        sprite: "Rattle Coil",
        moves: ["deathCoil", "cleave"]
    },
    abyssalfish: {
        name: "Abyssal Fish",
        health: 180,
        speed: 4,
        sprite: "Abyssal Fish",
        moves: ["splash", "deathCoil"]
    },
    voidcaller: {
        name: "Void Caller",
        health: 145,
        speed: 4,
        sprite: "Void Caller",
        moves: ["tentacleStorm", "voidBeam"]
    },
    unknight: {
        name: "Unknight",
        health: 170,
        speed: 5,
        sprite: "Unknight",
        moves: ["cleave", "eyeCannon"]
    }
};

const TIER1_MONSTERS = [
    "buzzblob", "blinkthorn", "snapblossom", "ucsc",
    "treant", "emberclaw", "garbat", "garboslime"
]

const TIER2_MONSTERS = [
    "rocktail", "inscorp", "teramaw", "rockslime",
    "shroomslime", "bogmaw", "stickler", "widowmaker",
    "coiler"
]

const TIER3_MONSTERS = [
    "cyclowing", "cerebrute", "skeletonwarrior", "graverunner",
    "imp", "bloodwing", "ogrewarrior", "goblinwarrior", 
    "feyhart", "stalkerslime"
]

const TIER4_MONSTERS = [
    "voidshard", "oculusprime", "rattlecoil", "abyssalfish",
    "voidcaller", "unknight"
]