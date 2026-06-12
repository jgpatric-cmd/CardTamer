class MonsterCard extends Card {
    constructor(scene, x, y, monsterData) {
        super(scene, x, y, {
            name: monsterData.name,
        });

        this.monsterData = monsterData;
        this.isActive = false;
        this.startX = x;
        this.startY = y;

        //===============================================//
        //  SPRITE WINDOW                                //
        //===============================================//
        const windowY = -45;

        //  Background inside the window
        this.cardBg = scene.add.image(0, windowY - 13, "cardBackground").setDisplaySize(
            CONFIG.cardParts.spriteWindow.width,
            CONFIG.cardParts.spriteWindow.height - 40
        );

        //  Floor inside the window
        this.cardFloor = scene.add.image(0, windowY + 35, "cardBackgroundFloor").setDisplaySize(
            CONFIG.cardParts.spriteWindow.width,
            CONFIG.cardParts.spriteWindow.height - 80
        );

        //  Monster Sprite
        this.monsterSprite = scene.add.image(0, windowY - 5, monsterData.sprite).setDisplaySize(100, 100);

        //  Bronze border for the window
        this.frameBorder = scene.add.image(0, windowY, "frameBorder_Bronze").setDisplaySize(
            CONFIG.cardParts.spriteWindow.width,
            CONFIG.cardParts.spriteWindow.height
        );

        //===============================================//
        //  STAT BADGES                                  //
        //===============================================//

        const badgeY = windowY + (CONFIG.cardParts.spriteWindow.height / 2);
        const badgeW = CONFIG.cardParts.statBadge.width;
        const badgeH = CONFIG.cardParts.statBadge.height;
        const halfWindow = CONFIG.cardParts.spriteWindow.width / 2;

        //  Health Badge
        this.healthBadge = scene.add.image(-halfWindow, badgeY, "healthBorder")
        .setDisplaySize(badgeW, badgeH);

        //  Health Badge Text
        // console.log("monsterData: ", monsterData);          //  TEST
        this.healthText = scene.add.text(-halfWindow, badgeY,
            `${monsterData.health}`,
            {
                fontFamily: 'monospace',
                fontSize: '18px',
                color: '#fff',
                stroke: '#00000',
                strokeThickness: 4
            }
        ).setOrigin(0.5);

        //  Speed Badge
        this.speedBadge = scene.add.image(
            halfWindow, badgeY, "speedBorder")
        .setDisplaySize( badgeW, badgeH);

        //  Speed Badge Text
        this.speedText = scene.add.text(halfWindow, badgeY, `${monsterData.speed}`,
            {
                fontFamily: 'monospace',
                fontSize: '18px',
                color: '#fff',
                stroke: '#00000',
                strokeThickness: 4
            }
        ).setOrigin(0.5);

        //===============================================//
        //  MOVE BUTTONS                                 //
        //===============================================//
        this.moveButtons = [];
        this.createMoveButtons(monsterData.moves);

        //===============================================//
        //  ADD TO CONTAINER                             //
        //===============================================//

        this.add([
            this.cardBg,
            this.cardFloor,
            this.monsterSprite,
            this.frameBorder,
            this.healthBadge,
            this.speedBadge,
            this.healthText,
            this.speedText,
        ]);

        //  Start in hand state
        this.setHandState();
    }

    //== =============================================//
    //  MOVE BUTTONS                                  //
    //================================================//

    createMoveButtons(moves) {
        //  Start just under the sprite window
        const startY = 50;
        const spacing = CONFIG.cardParts.moveFrame.height + 5;

        moves.forEach((move, index) => {
            const moveData = MOVES[move.id];
            const y = startY + index * spacing;

            //  Button Background
            const bg = this.scene.add.image(0, y, "moveFrame").setDisplaySize(
                CONFIG.cardParts.moveFrame.width - 20,
                CONFIG.cardParts.moveFrame.height
            );

            //  Make the button interactive
            bg.setInteractive();

            //  Button Label
            const label = this.scene.add.text(
                -CONFIG.cardParts.moveFrame.width / 2 + 13,
                y - 10,
                `${moveData.name} (${moveData.power})`,
                {
                    fontFamily: 'monospace',
                    fontSize: '14px',
                    color: '#fff',
                    stroke: '#000',
                    strokeThickness: 4
                }
            ).setOrigin(0);

            //  Uses label
            const usesLabel = this.scene.add.text(
                CONFIG.cardParts.moveFrame.width / 3,
                y,
                move.uses === Infinity ? 'Inf' : `${move.uses}`,
                {
                    fontFamily: 'monospace',
                    fontSize: '18px',
                    color: '#fff',
                    stroke: '#000',
                    strokeThickness: 4
                }
            ).setOrigin(0.5);
            //  Hover Effects
            bg.on('pointerover', () => bg.setTint(0xdddddd));
            bg.on('pointerout', () => bg.clearTint());

            this.add([bg, label, usesLabel]);

            //  Store together so we can update the label later
            this.moveButtons.push({ container: bg, label, usesLabel, moveID: move.id });
        });
    }

    setMoveButtonCallback(callback) {
        this.moveButtons.forEach(btn => {
            //  Remove any existing listener first
            btn.container.off('pointerdown');
            btn.container.on('pointerdown', () => callback(btn.moveID, btn));
        });
    }

    updateMoveButton(moveID) {
        const btn = this.moveButtons.find(b => b.moveID === moveID);
        if (!btn) return;

        const move = this.monsterData.moves.find(m => m.id === moveID);
        if (!move) return;

        const uses = move.uses === Infinity ? 'Inf' : move.uses;
        btn.usesLabel.setText(`${uses}`);

        //  Grey out if exhausted
        if (move.uses <= 0) {
            btn.container.setTint(0x666666);
            btn.container.disableInteractive();
        }
    }

    //== =============================================//
    //  STATES                                        //
    //================================================//

    setHandState() {
        this.isActive = false;

        //  Hide moveButtons
        this.moveButtons.forEach(btn => {
            btn.container.setVisible(true);
            btn.label.setVisible(true);
            btn.usesLabel.setVisible(true);
            btn.container.disableInteractive(); //  not clickable in hand
        });

        //  Make card draggable
        this.setInteractive();
        this.scene.input.setDraggable(this);
    }

    setActiveState() {
        this.isActive = true;

        //  Show move buttons
        this.moveButtons.forEach(btn => {
            btn.container.setVisible(true);
            btn.label.setVisible(true);
            btn.usesLabel.setVisible(true);
            btn.container.setInteractive();     //  clickable in active state
        });

        //  No longer draggable
        this.disableInteractive();
    }   

    //== =============================================//
    //  HEALTH                                        //
    //================================================//

    updateHealth(current, max) {
        this.healthText.setText(`${current}`);
    }

    //== =============================================//
    //  VISUAL FEEDBACK                               //
    //================================================//

    flashDamage() {
        this.scene.tweens.add({
            targets: this,
            alpha: 0.2,
            duration: 100,
            yoyo: true,
            repeat: 2
        });
    }

    playFaintAnimation(onComplete) {
        this.scene.tweens.add({
            targets: this,
            alpha: 0,
            y: this.y + 30,
            duration: 500,
            ease: 'Power2',
            onComplete: () => {
                this.destroy();
                if (onComplete) onComplete();
            }
        });
    }
}