/*Adam Aviles - "Rocket Patrol: Return of the King Endgame IV (& Knuckles)"
- ~8 hours to complete

Mods: 
- High score tracker 1
- "FIRE!" UI 1
- (copyright free) background music 1
- speed increase after time interval 1
- post-fire player control 1

- new tile background & parallax (i hand drew the clouds :D) 1 + 3 (?)
- timer display 3
- new title screen 3

- new timing/scoring mechanism 5

RESOURCES: 
parallax tutorial: https://www.joshmorony.com/how-to-create-a-parallax-background-in-phaser/
music: my roomate Brian Law
additional support: my friend Benthan Vu
*/
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