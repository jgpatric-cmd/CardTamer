"use strict";

// game config
const config = {
    parent: 'phaser-game',
    type: Phaser.CANVAS,
    render: {
        pixelArt: true  // prevent pixel art from getting blurred when scaled
    },
    width: window.innerWidth,
    height: window.innerHeight,
    scene: [TitleScene, MenuScene, BattleScene, CreditsScene]
}

const game = new Phaser.Game(config);