class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)
        
        let fireConfig = {
            fontFamily: 'Impact',
            fontSize: '408px',
            color: '#FA564B',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 1200
        }
        scene.add.existing(this)
        this.isFiring = false
        this.moveSpeed = 7
        this.fireText = this.scene.add.text(config.width/2 - 50, config.height/2, "", fireConfig).setOrigin(0.5)
        console.log(borderUISize)

        this.sfxShot = scene.sound.add('sfx-shot')
    }

    update() {
        if(!this.isFiring) {
            if(keyLEFT.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.moveSpeed
            } else if(keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
                this.x += this.moveSpeed
            }
        }    

        if(Phaser.Input.Keyboard.JustDown(keyFIRE) && !this.isFiring) { //firing noise and switches firing to true
            this.isFiring = true
            this.fireText.text = "F I R E !"
            this.sfxShot.play()
        }

        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding) { //can now move when fired
            this.y -= this.moveSpeed
            if(keyLEFT.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.moveSpeed
            } else if(keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
                this.x += this.moveSpeed
            }
        }

        if(this.y <= borderUISize * 3 + borderPadding) {
            this.isFiring = false
            this.fireText.text = ""
            this.y = game.config.height - borderUISize - borderPadding
            this.scene.clock.elapsed += 5000
        }
    }

    reset() {
        this.isFiring = false
        this.y = game.config.height - borderUISize - borderPadding
        this.fireText.text = ""
    }
}