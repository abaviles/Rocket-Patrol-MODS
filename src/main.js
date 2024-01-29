//Adam Aviles - "Rocket Patrol: Return of the King Endgame IV (& Knuckles)"
let config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 960,
    scene: [Menu, Play]
}

let keyFIRE, keyRESET, keyLEFT, keyRIGHT
let game = new Phaser.Game(config)
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3
let highScore = 0