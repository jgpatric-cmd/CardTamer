const MONSTERS = {
    buzzblob: {
        name: "Buzzblob",
        health: 40,
        speed: 8,
        sprite: "Buzzblob",
        moves: ["slimeDart"]
    },
    blinkthorn: {
        name: "Blinkthorn",
        health: 50,
        speed: 4,
        sprite: "Blinkthorn",
        moves: ["thornShot"]
    },
    snapblossom: {
        name: "Snapblossom",
        health: 45,
        speed: 5,
        sprite: "Snapblossom",
        moves: ["bitePetal"]
    },
    ucsc: {
        name: "Ultra Creepy Snail Coiler",
        health: 65,
        speed: 2,
        sprite: "Ultra Creepy Snail Coiler",
        moves: ["shellSlam"]
    },
    treant: {
        name: "Treant",
        health: 55,
        speed: 3,
        sprite: "Treant",
        moves: ["sporePuff"]
    },
    emberclaw: {
        name: "Emberclaw",
        health: 60,
        speed: 6,
        sprite: "Emberclaw",
        moves: ["emberPinch"]
    },
    garbat: {
        name: "Garbat",
        health: 70,
        speed: 3,
        sprite: "Garbat",
        moves: ["tongueLash"]
    },
    garboslime: {
        name: "Garbo Slime",
        health: 75,
        speed: 4,
        sprite: "Garbo Slime",
        moves: ["digBite"]
    },
    //  Tier 2
    rocktail: {
        name: "Rocktail",
        health: 100,
        speed: 4,
        sprite: "Rocktail",
        moves: ["stoneRam"]
    },
    inscorp: {
        name: "Inscorp",
        health: 75,
        speed: 7,
        sprite: "Inscorp",
        moves: ["poisonSting"]
    },
    teramaw: {
        name: "Teramaw",
        health: 95,
        speed: 2,
        sprite: "Teramaw",
        moveS: ["devour"]
    },
    rockslime: {
        name: "Rock Slime",
        health: 85,
        speed: 3,
        sprite: "Rock Slime",
        moves: ["rockThrow"]
    },
    shroomslime: {
        name: "Shroom Slime",
        health: 90,
        speed: 2,
        sprite: "Shroom Slime",
        moves: ["rootGrasp"]
    },
    bogmaw: {
        name: "Bogmaw",
        health: 105,
        speed: 3,
        sprite: "Bogmaw",
        moves: ["swampChomp"]
    },
    stickler: {
        name: "Stickler",
        health: 70,
        speed: 7,
        sprite: "Stickler",
        moves: ["spiritStab"]
    },
    widowmaker: {
        name: "Widow Maker",
        health: 80,
        speed: 5,
        sprite: "Widow Maker",
        moves: ["skullBash"]
    },
    coiler: {
        name: "Coiler",
        health: 80,
        speed: 6,
        sprite: "Coiler",
        moves: ["waterFang"]
    },
    //  Tier 3
    cyclowing: {
        name: "Cyclowing",
        health: 80,
        speed: 10,
        sprite: "Cyclowing",
        moves: ["cycloneScreen"]
    },
    cerebrute: {
        name: "Cerebrute",
        health: 95,
        speed: 6,
        sprite: "Cerebrute",
        moves: ["mindBursh"]
    },
    skeletonwarrior:{ 
        name: "Skeleton Warrior",
        health: 90,
        speed: 7,
        sprite: "Skeleton Warrior",
        moves: ["slash"]
    },
    graverunner: {
        name: "Grave Runner",
        health: 120,
        speed: 9,
        sprite: "Grave Runner",
        moves: ["reaperStrike"]
    },
    imp: {
        name: "Imp",
        health: 85,
        speed: 8,
        sprite: "Imp",
        moves: ["hellBolt"]
    },
    bloodwing: {
        name: "Bloodwing",
        health: 90,
        speed: 9,
        sprite: "Bloodwing",
        moves: ["crimsonDive"]
    },
    ogrewarrior: {
        name: "Ogre Warrior",
        health: 125,
        speed: 5,
        sprite: "Ogre Warrior",
        moves: ["frostRend"]
    },
    goblinwarrior: {
        name: "Goblin Warrior",
        health: 110,
        speed: 6,
        sprite: "Goblin Warrior",
        moves: ["thrust"]
    },
    feyhart: {
        name: "Feyhart",
        health: 100,
        speed: 8,
        sprite: "Feyhart",
        moves: ["naturesWrath"]
    },
    stalkerslime: {
        name: "Stalker Slime",
        health: 130,
        speed: 4,
        sprite: "Stalker Slime",
        moves: ["ambush"]
    },
    //  Tier 4
    voidshard: {
        name: "Void Shard",
        health: 130,
        speed: 8,
        sprite: "Void Shard",
        moves: ["voidBeam"]
    },
    oculusprime: {
        name: "Oculus Prime",
        health: 150,
        speed: 6,
        sprite: "Oculus Prime",
        moves: ["eyeCannon"]
    },
    rattlecoil: {
        name: "Rattle Coil",
        health: 140,
        speed: 7,
        sprite: "Rattle Coil",
        moves: ["deathCoil"]
    },
    abyssalfish: {
        name: "Abyssal Fish",
        health: 180,
        speed: 4,
        sprite: "Abyssal Fish",
        moves: ["splash"]
    },
    voidcaller: {
        name: "Void Caller",
        health: 145,
        speed: 4,
        sprite: "Void Caller",
        moves: ["tentacleStorm"]
    },
    unknight: {
        name: "Unknight",
        health: 170,
        speed: 5,
        sprite: "Unknight",
        moves: ["cleave"]
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