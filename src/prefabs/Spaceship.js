class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        this.points = pointValue
        this.moveSpeed = game.settings.spaceshipSpeed
        
        this.clock = this.scene.time.delayedCall(30000, () => { //60000 = 60 seconds
            this.moveSpeed = 7
            
        }, null, this)
        
        }

    update() {
        this.x -= this.moveSpeed //constantly moving right to left
        
        if(this.x <= 0 - this.width) { //if ship hits the border then it resets to the right side
            this.x = game.config.width
        }
        

    }

    reset() {
        this.x = game.config.width
    }
}