class Play extends Phaser.Scene {
    constructor(x, y) {
        super('playScene', x, y)
    }

    create() { //sets up stage for playing.
       
       //adds music, and loops it.
        this.bgmusic = this.sound.add('bg-music')
        this.bgmusic.loop = true;
        this.bgmusic.play()

        //adds a tileset for the animated starfield.
        this.starfield = this.add.tileSprite(0, 0, 1280, 960, 'starfield').setOrigin(0,0)

        //adds parallax assets.
        this.cloudsBack = this.add.tileSprite(0, 0, 1280, 960, 'blueCloud').setOrigin(0,0)
        this.cloudsMid = this.add.tileSprite(0, 0, 1280, 960, 'pinkCloud').setOrigin(0,0)
        this.cloudsFace = this.add.tileSprite(0, 0, 1280, 960, 'faceCloud').setOrigin(0,0)
            
        //the green bar for UI
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0,0)

        //the white borders around the play space. Uses the global variables from main.js.
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0)

        //enemy ships - new instances from the Spaceship.js tab. Uses (scene, x, y, texture, frame, pointValue) as a format.
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0,0)
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0)
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0)
        
        //defining keys - binds a key to its function.
        keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)

        //point tracker
        this.p1Score = 0

        let scoreConfig = {
            fontFamily: 'Impact',
            fontSize: '28px',
            backgroundColor: '#FFDF25',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig)
        this.highScore = this.add.text(borderUISize + borderPadding + 1000, borderUISize + borderPadding*2, highScore, scoreConfig)
        
        //GAME OVER
        this.gameOver = false

        //Clock funciton below
        scoreConfig.fixedWidth = 0

        this.clock = this.time.delayedCall(game.settings.gameTimer, () => { //60000 = 60 seconds
            this.add.text(game.config.width/2, game.config.height/2, 'BYE BYE',
        scoreConfig).setOrigin(0.5)
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to restart or <- for Menu.',
        scoreConfig).setOrigin(0.5)
            this.gameOver = true
        }, null, this)

        //timer - was able to tap into clock.elapsed to get the actual number.
        this.timer = this.add.text(borderUISize + borderPadding  + 200 , borderUISize + borderPadding*2, this.clock.elapsed, scoreConfig)
     
            
        }
    update() {
       
        //countdown from a minute. Uses Math.floor to round to whole number.
       this.timer.text = Math.floor((game.settings.gameTimer - this.clock.elapsed) / 1000) 
      
       //parallax movement 
       this.cloudsBack.tilePositionX -= 0.5
       this.cloudsMid.tilePositionX -= 1
       this.cloudsFace.tilePositionX -= 2


       //If "R" is pressed, it restarts the level with the same difficulty. The high score is also recorded.
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)) {
            this.bgmusic.stop()
            this.scene.restart()
            this.checkHighScore()
            
        }
        //If left key pressed during a Game Over, sends player back to the main menu. The high score is also recorded.
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.bgmusic.stop()
            this.scene.start('menuScene')
            this.checkHighScore()
            
        }
        this.starfield.tilePositionX -= 5

        if (!this.gameOver) {
        //console.log(this.clock.elapsed)
        this.p1Rocket.update()
        this.ship01.update()
        this.ship02.update()
        this.ship03.update()
        }

        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship03)
        }

        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship02)
        }

        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship01)
        }

    }
//seperate functions outside of update() for collision, explosions and high score recording. can be called in the update function even though its made after it?
    checkCollision(rocket, ship) {
        if (rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
            return true
        }   else {
            return false
        }
    }

    shipExplode(ship) {
        ship.alpha = 0
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode')
        boom.on('animationcomplete', () => {
            ship.reset()
            ship.alpha = 1
            boom.destroy()
        })
        this.p1Score += ship.points
        this.clock.elapsed -= 1000 
        this.scoreLeft.text = this.p1Score
        this.sound.play('sfx-explosion')
    }

    checkHighScore() {
        if (this.p1Score > highScore) {
            highScore = this.p1Score
        } 
    }
}