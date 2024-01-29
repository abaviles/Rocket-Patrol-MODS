class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene')
    }

    preload() {
        this.load.image('rocket', './assets/rocket.png')
        this.load.image('spaceship', './assets/spaceship.png')
        this.load.image('starfield', './assets/starfield.png')
        this.load.image('menuBG', './assets/space_bg.jpg')
        this.load.image('blueCloud', './assets/cloud_blue.png')
        this.load.image('pinkCloud', './assets/cloud_pink.png')
        this.load.image('faceCloud', './assets/cloud_face.png')
        this.load.spritesheet('explosion', './assets/explosion.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        })
        this.load.audio('bg-music', './assets/fire background music.wav')
        this.load.audio('sfx-select', './assets/sfx-select.wav')
        this.load.audio('sfx-explosion', './assets/sfx-explosion.wav')
        this.load.audio('sfx-shot', './assets/sfx-shot.wav')
    }

    create() {
        this.fields = this.add.tileSprite(0, 0, 1280, 960, 'menuBG').setOrigin(0,0)

        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0,
            end: 9, first: 0}),
            frameRate: 30
        })

        let menuConfig = {
            fontFamily: 'Papyrus',
            fontSize: '68px',
            color: '#FFFFFF',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }



        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ROCKET PATROL!', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2, 'Use <--> arrows to move & (F) to fire', menuConfig).setOrigin(0.5)
        menuConfig.backgroundColor = '#000000'
        menuConfig.color = '#FF0000'
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press <- for Novice or -> for Expert', menuConfig).setOrigin(0.5)
       
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
    
        //this.add.text(20, 20, "Rocket Patrol Menu")
        //this.scene.start("playScene")

        //cloud BG

    }
    
    update() {


        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000,
            }
            this.sound.play('sfx-select')
            this.scene.start('playScene')
        }

        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            game.settings = {
                spaceshipSpeed: 5,
                gameTimer: 45000,
                        
            }
    
            this.sound.play('sfx-select')
            this.scene.start('playScene')
        }
    }

}