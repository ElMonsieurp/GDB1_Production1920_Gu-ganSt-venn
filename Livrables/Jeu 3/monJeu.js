var config = {
	type: Phaser.AUTO,
	width: 1442,
	height: 1001,
	
physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0},
            debug: false
        }
    },
scene: {
		init: init,
		preload: preload,
		create: create,
		update: update
	}
};

var game = new Phaser.Game(config);

var score = 0;

var pvjoueur=2;
var invicibilite=100;
var sauvetire=1;
var gauche=0;
var droitequi=0;
var pnjqui=0;
var gauchequi=0;
var resettimer=0;
var haut=1;
var sauve=1;
var sauvetiretire=1;
function init(){
	
 	var platforms;
	var player;
	var cursors; 
	var invicibilite;
	var scoreText;
	var pointdevie;
	var pvjoueur;
	var invicibilite;
	var barredepv1;
	var barredepv2;
	var sauvetire;
	var barredetemps;
	var gauche;
	var innocent;
	var ennemi;
	var projectile;
	var pnjqui;
	var gauchequi;
	var resettimer;
}


function preload(){
	this.load.image('background','imag/fondcool.png');	
	
	this.load.image('sol','imag/platform.png');
	
	this.load.image('boite','imag/boite.png');
	this.load.spritesheet('perso','imag/pehaut.png',{frameWidth: 355, frameHeight: 573});
	this.load.spritesheet('persobas','imag/pe.png',{frameWidth: 355, frameHeight: 573});
	
	this.load.spritesheet('chronometre','imag/timerv.png',{frameWidth: 31, frameHeight: 35});
	this.load.spritesheet('bouge','imag/boiteanim.png',{frameWidth: 542, frameHeight: 266});
}



function create(){
	
	this.add.image(721,500,'background');

	
	
	
	
	barredetemps = this.add.sprite(800,30,'chronometre').setScale(2);
	
	player = this.physics.add.sprite(730,500,'perso');
	player.setCollideWorldBounds(true);
	player.body.setGravityY(000);
	
	boite = this.physics.add.sprite (720,720,'boite');
	
	cursors = this.input.keyboard.createCursorKeys(); 
	
	this.anims.create({
		key:'main',
		frames: this.anims.generateFrameNumbers('perso', {start: 0, end: 5}),
		frameRate: 49,
		repeat:0
	});
	this.anims.create({
		key:'bas',
		frames: this.anims.generateFrameNumbers('persobas', {start: 0, end: 5}),
		frameRate: 49,
		repeat:0
	});
	
	
	
	this.anims.create({
		key:'bouge',
		frames: this.anims.generateFrameNumbers('bouge', {start: 0, end: 4}),
		frameRate: 20,
		
	});
	
		this.anims.create({
		key:'timer',
		frames: this.anims.generateFrameNumbers('chronometre', {start: 0, end: 14}),
		frameRate: 1,
		repeat:-1
	});
	

    
	scoreText = this.add.text(40,16, 'score: 0', {fontSize: '32px', fill:'#000'});
	
	
	timerEvent3 = this.time.addEvent({ delay: 15000,callback:finjeu, timeScale: 1,startAt:0 });
	
	//this.physics.add.collider(projectiles,innocent, hitprojectileinnocent, null, this);
	//this.physics.add.collider(projectiles,ennemi, hitprojectile, null, this);
}



function update(){
	
	boite.setDepth(1);
	if (player.y<211 && player.x>500) {
	this.physics.pause();
	if (pvjoueur==2) {
		
	window.open ("Jeu/gagne.html", "_self");
	}
	if (pvjoueur==1) {
		
	window.open ("Jeu/gagnebut.html", "_self");
	}
	gameOver=true;
	}
	
	if(cursors.down.isDown && sauvetire==1){
	sauvetire=0; haut=0;
sauve=1;
	
	
	}
	
	if(cursors.down.isUp){
	sauvetire=1;
	}
    
	
	
	
	if(cursors.up.isDown && sauvetire==1 ){
		sauvetire=0;
		haut=1;
		sauvetiretire=1;
	} 
	if (cursors.up.isUp) {
		sauvetire=1;
		resettimer=1;
	}
	

	
	if (haut==1 && sauve==1) {
player.anims.play('main', true);
  sauve=0;
	}
    if (haut==0 && sauvetiretire==1) {
player.anims.play('bas', true);	
sauvetiretire=0;	
boite.anims.play('bouge', true);
score=100+score
	}
 scoreText.setText('Score '+score);
 barredetemps.anims.play('timer', true);
 timerEvent3;
 
}


function finjeu() {
gameOver=true;
window.open ("Jeu/lose.html", "_self");
}

