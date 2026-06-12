class TitleScene extends Phaser.Scene {
    constructor() {
        super({ key: "TitleScene" });
    }

    preload() {
    }

    create() {
        //  Background
        this.add.rectangle(
            CONFIG.scene.width / 2,
            CONFIG.scene.height / 2,
            CONFIG.scene.width,
            CONFIG.scene.height,
            0x1a1a2e
        );

        //  Title
        this.add.text(
            CONFIG.scene.width / 2,
            CONFIG.scene.height * 0.25,
            "Card Tamer",
            {
                fontSize: '96px',
                color: '#aaaaaa'
            }
        ).setOrigin(0.5);

        // Buttons
        this.createButton(CONFIG.scene.height * 0.52, "PLAY",    0x225522, 0x44aa44, () => this.scene.start("MenuScene"));
        this.createButton(CONFIG.scene.height * 0.63, "CREDITS", 0x222255, 0x4444aa, () => this.scene.start("CreditsScene"));
        this.createButton(CONFIG.scene.height * 0.74, "EXIT",    0x552222, 0xaa4444, () => window.close());
    }

    createButton(y, label, colorDefault, colorHover, onClick) {
        const x = CONFIG.scene.width / 2;

        const bg = this.add.rectangle(x, y, 240, 60, colorDefault).setInteractive().setStrokeStyle(2, colorHover);

        const text = this.add.text(x, y, label, {
            fontSize: '28px',
            color: '#ffffff'
        }).setOrigin(0.5);

        bg.on('pointerover', () => {
            bg.setFillStyle(colorHover);
            text.setScale(1.05);
        });

        bg.on('pointerout', () => {
            bg.setFillStyle(colorDefault);
            bg.setScale(1.0);
        });

        bg.on('pointerdown', () => onClick());
    }

}