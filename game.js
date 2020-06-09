let config = {
    width : 800,
    height : 600,
    scene : {
        preload : preload,
        create : create,
        update : update,
    }
};

let game = new Phaser.Game(config);

function preload(){
    //load an image
   console.log(this); 
    this.load.image('background',"Assets/back.jpg");
   this.load.image('wheel',"Assets/wheel.png");
}

function create(){
    //create that image
    this.add.sprite(0,0,'background');
    this.add.sprite(0,0,'wheel');
}

function update(){
    console.log("In Update");
}
