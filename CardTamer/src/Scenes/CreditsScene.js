class CreditsScene extends Phaser.Scene {
    constructor() {
        super({ key: "CreditsScene" });
    }

    create() {
        // Background
        this.add.rectangle(
            CONFIG.scene.width / 2,
            CONFIG.scene.height / 2,
            CONFIG.scene.width,
            CONFIG.scene.height,
            0x1a1a2e
        );

        // Title
        this.add.text(
            CONFIG.scene.width / 2,
            CONFIG.scene.height * 0.10,
            "CREDITS",
            {
                fontSize: '64px',
                color: '#ffffff',
                stroke: '#000000',
                strokeThickness: 4
            }
        ).setOrigin(0.5);

        // Developer
        this.add.text(
            CONFIG.scene.width / 2,
            CONFIG.scene.height * 0.20,
            "DEVELOPER",
            { fontSize: '16px', color: '#888888' }
        ).setOrigin(0.5);

        //  Jefferson Patricio
        this.add.text(
            CONFIG.scene.width / 2,
            CONFIG.scene.height * 0.25,
            "Jefferson Patricio",
            { fontSize: '32px', color: '#aaaaff' }
        ).setOrigin(0.5);

        //  CMPM 120
        this.add.text(
            CONFIG.scene.width / 2,
            CONFIG.scene.height * 0.30,
            "CMPM 120",
            { fontSize: '16px', color: '#888888' }
        ).setOrigin(0.5);

        // Divider Line
        this.add.line(
            0, 0,
            CONFIG.scene.width * 0.2,
            CONFIG.scene.height * 0.40,
            CONFIG.scene.width * 0.8,
            CONFIG.scene.height * 0.40,
            0x444444
        ).setOrigin(0);

        // Assets
        this.add.text(
            CONFIG.scene.width / 2,
            CONFIG.scene.height * 0.45,
            "ASSETS",
            { fontSize: '32px', color: '#888888' }
        ).setOrigin(0.5);

        //  Sprites w/ link
        this.add.text(
            CONFIG.scene.width / 2,
            CONFIG.scene.height * 0.50,
            "Sprites: https://jinosoda.itch.io/monsterpack-32x32",
            { fontSize: '24px', color: '#ffffff' }
        ).setOrigin(0.5);

        //  Audio: Kenney 
        this.add.text(
            CONFIG.scene.width / 2,
            CONFIG.scene.height * 0.55,
            "Audio: Kenney",
            { fontSize: '24px', color: '#ffffff' }
        ).setOrigin(0.5);

        //  BG Music:  
        this.add.text(
            CONFIG.scene.width / 2,
            CONFIG.scene.height * 0.60,
            "Music: Pixabay",
            { fontSize: '24px', color: '#ffffff' }
        ).setOrigin(0.5);

        //  Card Frame
        this.add.text(
            CONFIG.scene.width / 2,
            CONFIG.scene.height * 0.65,
            "Card Frame Assets: https://cafedraw.itch.io/fantasy-card-assets#google_vignette",
            { fontSize: '24px', color: '#ffffff' }
        ).setOrigin(0.5);

        // Back button
        this.createBackButton();
    }

    createBackButton() {
        const x = CONFIG.scene.width / 2;
        const y = CONFIG.scene.height * 0.94;

        const bg = this.add.rectangle(x, y, 200, 46, 0x222255)
            .setInteractive()
            .setStrokeStyle(2, 0x4444aa);

        const text = this.add.text(x, y, "BACK", {
            fontSize: '24px',
            color: '#ffffff'
        }).setOrigin(0.5);

        bg.on('pointerover', () => {
            bg.setFillStyle(0x4444aa);
            text.setScale(1.05);
        });
        bg.on('pointerout', () => {
            bg.setFillStyle(0x222255);
            text.setScale(1.0);
        });
        bg.on('pointerdown', () => {
            this.scene.start("TitleScene");
        });
    }
}