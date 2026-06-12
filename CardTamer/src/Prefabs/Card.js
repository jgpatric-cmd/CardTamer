class Card extends Phaser.GameObjects.Container {
    constructor(scene, x, y, cardData) {
        super(scene, x, y);

        this.scene = scene;
        this.cardName = cardData.name;
        this.startX = x;
        this.startY = y;


        //  Outer Card Frame
        this.background = scene.add.image(0, 0, "cardFrame").setDisplaySize(CONFIG.card.width, CONFIG.card.height);

        //  Monster Name at top
        this.nameText = scene.add.text(
            0,
            -(CONFIG.card.height / 2) +26,
            this.cardName,
            {
                fontSize: '24px',
                color: '#000000',
                stroke: '#ffffff',
                strokeThickness: 0.5
            }
        ).setOrigin(0.5);

        this.add ([
            this.background,
            this.nameText,
        ]);

        scene.add.existing(this);
        this.makeDraggable();
    }

    makeDraggable() {
        this.setSize(CONFIG.card.width,CONFIG.card.height);
        this.setInteractive();
        this.scene.input.setDraggable(this);

        this.on('drag', (pointer, dragX, dragY) => {
            this.x = dragX;
            this.y = dragY;
        });

        this.on('pointerover', () => this.highlight());
        this.on('pointerout', () => this.unhighlight());
    }

    snapBack() {
        this.scene.tweens.add({
            targets: this,
            x: this.startX,
            y: this.startY,
            duration: 200,
            ease: 'Back.Out'
        });
    }

    highlight() {
        this.setScale(1.1);
    }

    unhighlight() {
        this.setScale(1.0);
    }
}