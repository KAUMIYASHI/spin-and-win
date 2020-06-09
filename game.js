
var gameOptions = {

    // slices (prizes) placed in the wheel
    slices: 8,

    // prize names, starting from 12 o'clock going clockwise
    slicePrizes: ["Killed By Zombie",
                  "Killed By Ghost",
                  "Killed By Witch",
                  "Killed By Cat",
                  "Killed By Bat",
                  "Saved By Wizard",
                  "Killed By WareWolf",
                  "Saved By Angel"],

    // wheel rotation duration, in milliseconds
    rotationTime: 3000
}

var config = {
    width : 800,
    height : 600,
    scene : {
        preload : preload,
        create : create,
        update : update,
    }
};
var game = new Phaser.Game(config);
    
function preload(){
    //load an image
    console.log(this);
    this.load.image('background',"Asset/bg-01.jpg");
    this.load.image('wheel',"Asset/wheel.png");
    
    this.load.image('stand',"Asset/stand-01.png"); this.load.image('pin',"Asset/COFFIN.png");
    this.load.image('pinPoint',"Asset/pinPoint.png");
    this.load.audio('sfx', 'Asset/horror_bass.ogg');
    this.load.audio('rotateSound', 'Asset/horror_effects.ogg');
    
}
function create(){
    //create that image
    var W = game.config.width;
    var H = game.config.height;
    
    this.add.sprite(W/2,H/2,'background').setScale(0.49);
    
    //var music = this.sound.add('sfx');
    this.music = this.sound.add('sfx', {
    mute: false,
    volume: 0.5,
    rate: 1,
    detune: 0,
    seek: 0,
    loop: true,
    delay: 0
});
    this.music.play();
    
    this.rotateSound = this.sound.add('rotateSound', {
    mute: false,
    volume: 0.5,
    rate: 1,
    detune: 0,
    seek: 0,
    loop: false,
    delay: 0
});
    
    this.input.setDefaultCursor('url(Asset/defaultCursor.cur), pointer');
    
    
    
    //let create wheel
    this.wheel = this.add.sprite(W/2,H/2,'wheel');
    this.add.sprite(W/2,H/2,'stand').setScale(0.25);
    this.wheel.setScale(0.22); 
    console.log(this.wheel.depth);
    //this.input.on("pointerdown",spinwheel,this);
    var spinMoonButton = this.add.sprite(W/2 -150,H/2+205,'pin').setScale(0.50).setInteractive(
        { cursor: 'url(Asset/handCursor1.cur), pointer', 
         
        });
    
    this.add.sprite(W/2,H-100,'pinPoint').setScale(0.35);
    
    this.prizeText = this.add.text(W/2 - 175, 50, "Welcome to Death Game", {
            font: "bold 32px Arial",
            align: "center",
            color: "white"
        });
    
    this.canSpin = true;
    spinMoonButton.on('pointerdown',spinwheel,this);
}
function update(){
    console.log("In Update");
    //this.wheel.angle -= 1;
    
}

function spinwheel(){
//    console.log("Time to spin the wheel");
//    
//    var rounds = Phaser.Math.Between(2,4);
//    console.log(rounds);
//    
//    var extra_degrees = Phaser.Math.Between(0,11)*30;
//    var total_angle = rounds*360 + extra_degrees;
//    
//    var tween = this.tweens.add({
//        targets: this.wheel,
//        angle: total_angle,
//        ease:"Cubic.easeOut",
//        duration: 3000,
//        
//    });
    
    // can we spin the wheel?
        if(this.canSpin){

            // resetting text field
            this.prizeText.setText("");

            // the wheel will spin round from 2 to 4 times. This is just coreography
            var rounds = Phaser.Math.Between(2, 5);

            // then will rotate by a random number from 0 to 360 degrees. This is the actual spin
            var degrees = Phaser.Math.Between(0,7)*45;

            // before the wheel ends spinning, we already know the prize according to "degrees" rotation and the number of slices
            var prize = degrees/45;

            // now the wheel cannot spin because it's already spinning
            this.canSpin = false;
            this.rotateSound.play();
            // animation tweeen for the spin: duration 3s, will rotate by (360 * rounds + degrees) degrees
            // the quadratic easing will simulate friction
            this.tweens.add({

                // adding the wheel to tween targets
                targets: [this.wheel],

                // angle destination
                angle: 360 * rounds + degrees,

                // tween duration
                duration: gameOptions.rotationTime,

                // tween easing
                ease: "Cubic.easeOut",

                // callback scope
                callbackScope: this,

                // function to be executed once the tween has been completed
                onComplete: function(tween){

                    // displaying prize text
                    this.prizeText.setText(gameOptions.slicePrizes[prize]);

                    // player can spin again
                    this.canSpin = true;
                }
            });
        }
}
                        
