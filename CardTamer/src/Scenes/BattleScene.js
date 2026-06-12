class BattleScene extends Phaser.Scene {
    constructor() {
        super({ key: "BattleScene" });
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

        //  Card Sound FX
        this.load.audio("cardPlace", "assets/Audio/kenney_casino-audio/Audio/card-place-1.ogg");
        this.load.audio("cardDraw", "assets/Audio/kenney_casino-audio/Audio/cards-pack-open-1.ogg");

        //  Hit SFX
        this.load.audio("hitSFX", "assets/Audio/Pixelbay audio/dragon-studio-impact-thud-372473_Lx6kZMgU.mp3");

        //  BG SFX
        this.load.audio("BG1", "assets/Audio/Pixelbay audio/11325622-dungeon-sound-effect-240254.mp3");
        this.load.audio("BG2", "assets/Audio/Pixelbay audio/freesound_community-dungeon-air-6983.mp3");
        this.load.audio("BG3", "assets/Audio/Pixelbay audio/freesound_community-echo-dungeon-70538.mp3");

        Object.values(MONSTERS).forEach(monster => {
            this.load.image(
                monster.sprite,`assets/Sprites/Monsters/${monster.sprite}.png`
            )
        })
    }

    create() {
        //  Set up the battle logic
        this.machine = new MonsterMachine();
        //  READD MONSTERS HERE
        this.machine.setupBattle(
            PLAYER_STATE.deck,
            PLAYER_STATE.getCurrentEnemyDeck()
        );

        this.busy = false;
        this.waitingForMonster = false;     //  Player must player a new monster

        this.playerCardMap = new Map();     //  Monster data -> MonsterCard
        this.activePlayerCard = null;
        this.activeEnemyCard = null;

        this.createBackground();
        this.createActiveSlots();
        this.createEnemyCard();
        this.createHand();
        this.setupDragDrop();
        this.createCatchButton();

        //  BG SFX
        this.startBackgroundMusic();
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
        
        //  Active Slot Zone
        this.playerSlotZone = this.add.rectangle(
            CONFIG.scene.width * 0.25,
            CONFIG.scene.height * 0.35,
            200, 320, 0xffffff, 0
        ).setStrokeStyle(2, 0x888888);

        //  Enemy Slot Zone
        this.enemySlotZone = this.add.rectangle(
            CONFIG.scene.width * 0.65,
            CONFIG.scene.height * 0.35,
            200, 320, 0xffffff, 0
        ).setStrokeStyle(2, 0x888888);

        //  Labels
        this.add.text(
            CONFIG.scene.width * 0.25,
            CONFIG.scene.height * 0.15, 
            "Your Monster", 
            { fontSize: '16px', color: '#888888'}
        ).setOrigin(0.5);

        this.add.text(
            CONFIG.scene.width * 0.65,
            CONFIG.scene.height * 0.15, 
            "Enemy Monster", 
            { fontSize: '16px', color: '#888888'}
        ).setOrigin(0.5);

        //  Status Text
        this.statusText = this.add.text(
            CONFIG.scene.width / 2,
            CONFIG.scene.height * 0.12, 
            "", 
            { fontSize: '16px', color: '#ffffff'}
        ).setOrigin(0.5);
    }

    //== =============================================//
    //  UI                                            //
    //================================================//

    createActiveSlots() {
        this.playerSlot = this.add.zone(
            CONFIG.scene.width * 0.25,
            CONFIG.scene.height * 0.25, 
            200, 320
        ).setRectangleDropZone(160, 220);
    }

    createCatchButton() {
        const x = CONFIG.scene.width * 0.90;
        const y = CONFIG.scene.height * 0.65;

        //  Button bg
        this.catchButtonBG = this.add.rectangle(x, y, 160, 50, 0x225522).setInteractive().setStrokeStyle(2, 0x44aa44);

        //  Button label
        this.catchButtonText = this.add.text(x, y - 8, "CATCH", {
            fontSize: '20px',
            color: '#fff'
        }).setOrigin(0.5);

        //  Food Cost label
        this.catchFoodText = this.add.text(x, y + 12, `Food: ${PLAYER_STATE.food}`, {
            fontSize: '14px',
            color: '#fff'
        }).setOrigin(0.5);

        //  Hover fx
        this.catchButtonBG.on('pointerover', () => {
            if (PLAYER_STATE.food > 0) this.catchButtonBG.setFillStyle(0x337733);
        });
        this.catchButtonBG.on('pointerout', () => {
            this.updateCatchButton();
        })
        
        // Click button
        this.catchButtonBG.on('pointerdown', () => {
            this.attemptCatch();
        });

        //  Update button
        this.updateCatchButton();
    }

    updateCatchButton() {
        const hasFood = PLAYER_STATE.food > 0;

        //  Grey out if no more food
        this.catchButtonBG.setFillStyle(hasFood ? 0x225522 : 0x333333);
        this.catchButtonBG.setStrokeStyle(2, hasFood ? 0x44aa44 : 0x555555);
        this.catchButtonText.setColor(hasFood ? '#fff' : '#888');
        this.catchFoodText.setText(`Food: ${PLAYER_STATE.food}`);
    }

    //== =============================================//
    //  ENEMY                                         //
    //================================================//

    createEnemyCard() {
        this.activeEnemyCard = new MonsterCard(
            this,
            CONFIG.scene.width * 0.65,
            CONFIG.scene.height * 0.35,
            this.machine.enemyMonster
        );
        this.activeEnemyCard.setActiveState();
    }

    //== =============================================//
    //  HAND                                          //
    //================================================//

    createHand() {
        this.handCards = [];
        const spacing = 220;
        const startX = CONFIG.scene.width * 0.1;
        const y = CONFIG.scene.height * 0.80;

        this.machine.playerHand.forEach((monster, index) => {
            const x = startX + index * spacing;
            const card = new MonsterCard(this, x, y, monster);

            this.playerCardMap.set(monster, card);
            this.handCards.push(card);
        });
    }

    addCardToHand(monster) {
        const x = (CONFIG.scene.width * 0.1) + this.handCards.length * 220;
        const y = CONFIG.scene.height * 0.80;

        const card = new MonsterCard(this, x, y, monster);
        this.playerCardMap.set(monster, card);
        this.handCards.push(card);

        //  SFX
        this.sound.play("cardDraw");
    }

    removeCardFromHand(card) {
        this.handCards = this.handCards.filter(c => c !== card);

        //  Reposition remaining hand cards
        this.handCards.forEach((c, index) => {
            this.tweens.add({
                targets: c,
                x: CONFIG.scene.width * 0.1 + index * 220,
                duration: 200,
                ease: 'Power1'
            });
        });
    }

    //== =============================================//
    //  DRAG AND DROP                                 //
    //================================================//

    setupDragDrop () {
        this.input.on('drag', (pointer, card, dragX, dragY) => {
            card.x = dragX;
            card.y = dragY;
        });

        this.input.on('drop', (pointer, card, zone) => {
            if (zone === this.playerSlot) {
                this.playMonsterCard(card);
            }
            else {
                card.snapBack();
            }
        });

        this.input.on('dragend', (pointer, card, dropped) => {
            if (!dropped) {
                card.snapBack();
            }
        });
    }

    //== =============================================//
    //  PLAYING A MONSTER                             //
    //================================================//

    playMonsterCard(card) {
        //  To swap monster out before it dies
        const isSwap = this.activePlayerCard && !this.waitingForMonster;

        if (isSwap) {
            const returningCard = this.activePlayerCard;

            //  Destroy the active card visually
            returningCard.destroy();

            //  Add the returning monster back to the deck
            this.machine.playerDeck.push(this.machine.playerMonster.id);
            this.machine.playerMonster = null;
            this.activePlayerCard = null;
        }

        //  Place new monster into the active slot
        this.machine.playMonster(card.monsterData);

        //  Move card to active slot
        card.x = CONFIG.scene.width * 0.25;
        card.y = CONFIG.scene.height * 0.35;
        card.startX = CONFIG.scene.width * 0.25;
        card.startY = CONFIG.scene.height * 0.5;

        card.setActiveState();
        card.setMoveButtonCallback((moveID, btn) => {
            this.handlePlayerMove(moveID, btn, card);
        });

        this.activePlayerCard = card;
        this.removeCardFromHand(card);
        this.waitingForMonster = false;
        this.busy = false;      //  Reset since new monster is placed

        this.setStatus(`${card.monsterData.name} is ready!`);

        //  Swap costs a turn
        if (isSwap) {
            this.busy = true;
            this.time.delayedCall(800, () => this.handleEnemyMove());
        }  

        //  SFX
        this.sound.play("cardPlace");
    }

    //== =============================================//
    //  TURN LOGIC                                    //
    //================================================//

    handlePlayerMove(moveID, btn, card) {
        if (this.busy) return;
        if (this.waitingForMonster) {
            this.setStatus("Play a monster first!");
            return;
        }

        this.busy = true;

        const result = this.machine.executeMove("player", moveID);

        if (!result.success) {
            this.setStatus(result.reason);
            this.busy = false;
            return;
        }

        this.setStatus(`${result.attacker} used ${result.moveName} for ${result.damage} damage!`);

        this.activeEnemyCard.flashDamage();
        this.sound.play("hitSFX");
        this.activeEnemyCard.updateHealth(
            this.machine.enemyMonster.health,
            this.machine.enemyMonster.maxHealth
        );

        //  Check if enemy fainted
        if (this.machine.isFainted("enemy")) {
            this.activeEnemyCard.playFaintAnimation(() => {
                if (this.machine.isEnemyDefeated()) {
                    this.endBattle("player");
                }
                else {
                    this.enemyPlayNext();
                    this.endPlayerTurn();
                }
            });
            return;
        }

        this.endPlayerTurn();
    }

    endPlayerTurn() {
        //  Enemy acts after a short delay
        this.updateCatchButton();
        this.time.delayedCall(800, () => this.handleEnemyMove());
    }

    handleEnemyMove() {
        //  Safety check - do not go if no active player monster
        if (!this.machine.playerMonster) {
            this.busy = false;
            return;
        }

        const moveID = this.machine.getEnemyMove();
        const result = this.machine.executeMove("enemy", moveID);

        // null result check
        if (!result) {
            this.busy = false;
            return;
        }

        //  TESTS
        // console.log("result: ", result);
        // console.log("playerMonster after attack: ", this.machine.playerMonster);
        // console.log("health: ", this.machine.playerMonster.health);
        // console.log("maxHealth: ", this.machine.playerMonster.maxHealth);

        this.setStatus(`${result.attacker} used ${result.moveName} for ${result.damage} damage!`);

        this.activePlayerCard.flashDamage();
        this.sound.play("hitSFX");
        this.activePlayerCard.updateHealth(
            this.machine.playerMonster.health,
            this.machine.playerMonster.maxHealth
        );

        //  Check if player fainted
        if (this.machine.isFainted("player")) {
            this.activePlayerCard.playFaintAnimation(() => {
                if (this.machine.isPlayerDefeated()) {
                    this.endBattle("enemy");
                }
                else {
                    this.startNextTurn(true);   //  true = must player monster first
                }
            });
            return;
        }

        this.startNextTurn(false);
    }

    attemptCatch() {
        if (this.busy) return;

        if (!this.machine.playerMonster) {
            this.setStatus("Play a monster first!");
            return;
        }
        if (PLAYER_STATE.food <= 0) {
            this.setStatus("NO food left!");
            return;
        }

        this.busy = true;

        //  Spend food
        PLAYER_STATE.spendFood(1);
        this.updateCatchButton();
        
        //  Calculate catch chance
        const enemy = this.machine.enemyMonster;
        const healthPercent = enemy.health / enemy.maxHealth;

        //  Round up to the nearest 10% and sub from 100%
        const bracket = Math.ceil(healthPercent * 10);  //  0 - 10 bracket
        const catchChance = Math.max(0.10, 1 - (bracket - 1) * 0.10);

        const roll = Math.random();
        const caught = roll < catchChance;

        //  Results
        if(caught) {
            this.setStatus(`You caught ${enemy.name}!`);
            PLAYER_STATE.catchMonster(enemy.id);

            //  Play faint animation then go on
            this.activeEnemyCard.playFaintAnimation(() => {
                this.time.delayedCall (800, () => this.endBattle("player"));
            });
        }
        else {
            this.setStatus(`${enemy.name} refuses to be caught!`);

            //  Enemy still takes turn
            this.time.delayedCall(800, () => this.handleEnemyMove());
        }
    }

    //== =============================================//
    //  TURN START                                    //
    //================================================//

    startNextTurn(mustPlayMonster) {
        //  Draw a card if deck isn't empty and hand isn't full
        if (!this.machine.isPlayerDeckEmpty() && this.handCards.length < 5) {
            const newMonster = this.machine.drawCard();
            if (newMonster) {
                this.addCardToHand(newMonster);
            }
        }

        if (mustPlayMonster) {
            this.waitingForMonster = true;
            this.busy = false;      //  Reset since monster died
            this.setStatus("Your monster fainted! Play a new one.");
        }
        else {
            this.busy = false;
            this.setStatus("Your turn - pick a move.");
        }
    }

    //== =============================================//
    //  ENEMY AI                                      //
    //================================================//

    enemyPlayNext() {
        this.activeEnemyCard.destroy();

        const nextMonster = this.machine.enemyPlayNextMonster();
        this.activeEnemyCard = new MonsterCard(
            this, 
            CONFIG.scene.width * 0.65, 
            CONFIG.scene.height * 0.35, 
            nextMonster);
        this.activeEnemyCard.setActiveState();

        this.setStatus(`Opponent played ${nextMonster.name}!`);
    }

    //== =============================================//
    //  END BATTLE                                    //
    //================================================//

    endBattle(winner) {
        this.busy = true;

        const message = winner === "player" ? "You Win!" : "You Lose!";
        const color = winner === "player" ? "#00ff00" : "#ff0000";

        //  Darken the screen
        const overlay = this.add.rectangle(
            CONFIG.scene.width / 2,
            CONFIG.scene.height / 2,
            CONFIG.scene.width,
            CONFIG.scene.height,
            0x000000, 0.7
        );

        if (winner == "player") {   //  Win
            //  Give rewards
            const foodReward = Phaser.Math.Between(1, 3);
            PLAYER_STATE.addFood(foodReward);

            //  Won - Last Level
            if (PLAYER_STATE.isLastLevel()) {   
                // Win Text
                this.add.text(
                    CONFIG.scene.width / 2,
                    CONFIG.scene.height * 0.4,
                    "YOU WIN",
                     { fontSize: '64px', color: '#ffff00' }
                ).setOrigin(0.5);

                this.add.text(
                    CONFIG.scene.width / 2,
                    CONFIG.scene.height * 0.55,
                    "You conquered all 5 levels!",
                    { fontSize: '28px', color: '#fff'}
                ).setOrigin(0.5);
            }
            //  Won - Next level
            else {
                PLAYER_STATE.advanceLevel();

                //  Win text
                this.add.text(
                    CONFIG.scene.width / 2,
                    CONFIG.scene.height * 0.35,
                    "Victory",
                    { fontSize: '64px', color: '#00ff00' }
                ).setOrigin(0.5);

                //  Rewards Text
                this.add.text(
                    CONFIG.scene.width / 2,
                    CONFIG.scene.height * 0.5,
                    `+${foodReward} Food`,
                    { fontSize: '32px', color: '#aaffaa' }
                ).setOrigin(0.5);

                //  Next Level Text
                this.add.text(
                    CONFIG.scene.width / 2,
                    CONFIG.scene.height * 0.6,
                    `Level ${PLAYER_STATE.currentLevel + 1} incoming...`,
                    { fontSize: '24px', color: '#aaaaaa' }
                ).setOrigin(0.5);

                this.time.delayedCall(3000, () => {
                    this.scene.restart();       //  With new current Level
                });
            }
        } 
        else {  // Lost
            //  Game Over Text
            this.add.text(
                CONFIG.scene.width / 2,
                CONFIG.scene.height * 0.4,
                "Game Over",
                { fontSize: '64px', color: '#ff0000'}
            ).setOrigin(0.5);

            //  Level Text
            this.add.text(
                CONFIG.scene.width / 2,
                CONFIG.scene.height * 0.55,
                `You reach level ${PLAYER_STATE.currentLevel + 1}`,
                { fontSize: '28px', color: '#aaaaaa' }
            ).setOrigin(0.5);

            this.time.delayedCall(3000, () => {
                PLAYER_STATE.reset();
                this.scene.start("MenuScene");
            });
        }
    }

    //== =============================================//
    //  BG MUSIC                                      //
    //================================================//
    startBackgroundMusic() {
        this.musicTracks = ["BG1", "BG2", "BG3"];
        this.currentTrackIndex = 0;
        this.playNextTrack();
    }

    playNextTrack() {
        const trackKey = this.musicTracks[this.currentTrackIndex];

        //  CHECK
        console.log(`Now playing: ${trackKey}`);

        this.currentMusic = this.sound.add(trackKey, {volume: 0.5 });
        this.currentMusic.play();

        //  Go to next and loop
        this.currentMusic.on('complete', () => {
            this.currentTrackIndex = (this.currentTrackIndex + 1) % this.musicTracks.length;
            this.playNextTrack();
        })
    }

    //== =============================================//
    //  HELPER FUNCTIONS                              //
    //================================================//

    setStatus(message) {
        this.statusText.setText(message);
    }
}