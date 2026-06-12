class MenuScene extends Phaser.Scene {
    constructor() {
        super({key: "MenuScene" });
    }

    preload() {
        //  Card Parts
        this.load.image("cardFrame", 
            "assets/Sprites/CardFrames/cardFrame.png");
        this.load.image("cardBackground", "assets/Sprites/CardFrames/cardBackground.png");
        this.load.image("cardBackgroundFloor", "assets/Sprites/CardFrames/cardBackgroundFloor.png");
        this.load.image("frameBorder_Bronze", "assets/Sprites/CardFrames/frameBorder_Bronze.png");
        this.load.image("moveFrame", "assets/Sprites/CardFrames/moveFrame.png");
        this.load.image("healthBorder", "assets/Sprites/CardFrames/healthBorder.png");
        this.load.image("speedBorder", "assets/Sprites/CardFrames/speedBorder.png");

        //   Monster Sprites
        Object.values(MONSTERS).forEach(monster => {
            this.load.image(
                monster.sprite,
                `assets/Sprites/Monsters/${monster.sprite}.png`
            );
        });
    }

    create() {
        PLAYER_STATE.reset();   //  New run

        this.pickNumber = 0;    //  Keeps track of which pick number
        this.totalPicks = 3;
        this.currentCards = []; //  Cards currently displayed

        this.createBackground();
        this.showNextPick();
    }

    //== =============================================//
    //  BACKGROUND                                    //
    //================================================//
    createBackground() {
        this.add.rectangle(
            CONFIG.scene.width / 2,
            CONFIG.scene.height / 2,
            CONFIG.scene.width,
            CONFIG.scene.height,
            0x1a1a2e
        );

        this.titleText = this.add.text(
            CONFIG.scene.width / 2,
            CONFIG.scene.height * 0.1,
            "Choose your Monster",
            { fontSize: '48px', color: '#ffffff' }
        ).setOrigin(0.5);

        this.pickText = this.add.text(
            CONFIG.scene.width / 2,
            CONFIG.scene.height * 0.18,
            "Pick 1 of 3",
            { fontSize: '24px', color: '#aaaaaa' }
        ).setOrigin(0.5);
    }

    //== =============================================//
    //  PICK LOGIC                                    //
    //================================================//
    showNextPick() {
        //  Clear the previous cards
        this.currentCards.forEach(card => card.destroy());
        this.currentCards = [];

        //  Update the pick number text
        this.pickText.setText(`Pick ${this.pickNumber + 1} of ${this.totalPicks}`);

        //  Pick 3 random cards from the tier 1 monsters
        const pool = [...TIER1_MONSTERS];
        const choices = [];

        for (let i = 0; i < this.totalPicks; i++) {
            const index = Math.floor(Math.random() * pool.length);
            choices.push(pool.splice(index, 1)[0]);
        }

        //  Center the 3 cards on the screen
        //  Set up Vars
        const spacing = CONFIG.card.width + 80;
        const totalWidth = spacing * 2;
        const startX = (CONFIG.scene.width / 2) - (totalWidth / 2);
        const y = CONFIG.scene.height * 0.55;

        //  Actually move the cards
        choices.forEach((monsterID, index) => {
            const x = startX + index * spacing;
            const monsterData = MONSTERS[monsterID];

            //  Create monster object for the card
            const liveMonster = {
                id: monsterID,
                name: monsterData.name,
                health: monsterData.health,
                maxHealth: monsterData.health,
                speed: monsterData.speed,
                sprite: monsterData.sprite,
                moves: monsterData.moves.map(moveID => ({
                    id: moveID,
                    uses: MOVES[moveID].uses === Infinity ? Infinity : MOVES[moveID].uses
                })),
                statusEffect: null
            };

            const card = new MonsterCard(this, x, y, liveMonster);

            //  Set to active
            card.setActiveState()
            
            //  Disable dragging since we just need to click it
            card.disableInteractive();

            //  Make the card background interactable 
            card.background.setInteractive();
            card.background.on('pointerover', () => card.highlight());
            card.background.on('pointerout', () => card.unhighlight());
            card.background.on('pointerdown', () => this.selectMonster(monsterID, card));

            this.currentCards.push(card);
        });
    }

    //  Select Monster to add to Deck
    selectMonster(monsterID, selectedCard) {
        //  Add to player's deck
        PLAYER_STATE.addToDeck(monsterID);

        //  User feedback - flash card
        this.tweens.add({
            targets: selectedCard,
            alpha: 0,
            scaleX: 1.3,
            scaleY: 1.3,
            duration: 300,
            ease: 'Power2',
            onComplete: () => {
                this.pickNumber++;

                if (this.pickNumber >= this.totalPicks) {
                    this.startGame();
                }
                else {
                    this.showNextPick();
                }
            }
        });
    }

    startGame() {
        this.scene.start("BattleScene");
    }
}