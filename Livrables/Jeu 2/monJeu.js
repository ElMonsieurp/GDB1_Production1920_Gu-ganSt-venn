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
	this.load.image('gentil','imag/pnjgentil.png');
	this.load.image('mechant','imag/pnjmechant.png');
	this.load.spritesheet('perso','imag/pe.png',{frameWidth: 292, frameHeight: 344});
	this.load.spritesheet('vie','imag/vie.png',{frameWidth: 13, frameHeight: 10});
	this.load.spritesheet('chronometre','imag/timerv.png',{frameWidth: 31, frameHeight: 35});
	this.load.spritesheet('boule','imag/bouledefeu.png',{frameWidth: 514, frameHeight: 599});
}



function create(){
	
	this.add.image(721,500,'background');

	
	
	barredepv1 = this.add.sprite(1000,26,'vie').setScale(2);
	barredepv2 = this.add.sprite(1030,26,'vie').setScale(2);
	
	barredetemps = this.add.sprite(800,30,'chronometre').setScale(2);
	
	player = this.physics.add.sprite(730,800,'perso');
	player.setCollideWorldBounds(true);
	player.body.setGravityY(000);
	
	
	
	cursors = this.input.keyboard.createCursorKeys(); 
	
	this.anims.create({
		key:'main',
		frames: this.anims.generateFrameNumbers('perso', {start: 0, end: 5}),
		frameRate: 8,
		repeat:-1
	});
	
	
	this.anims.create({
		key:'pv',
		frames: this.anims.generateFrameNumbers('vie', {start: 0, end: 3}),
		frameRate: 9,
		repeat:-1
	});
	
	
		this.anims.create({
		key:'timer',
		frames: this.anims.generateFrameNumbers('chronometre', {start: 0, end: 14}),
		frameRate: 1,
		repeat:-1
	});
	
		this.anims.create({
		key:'feu',
		frames: this.anims.generateFrameNumbers('boule', {start: 0, end: 4}),
		frameRate: 8,
	});
	

    
	scoreText = this.add.text(40,16, 'score: 0', {fontSize: '32px', fill:'#000'});
	
	
	timerEvent3 = this.time.addEvent({ delay: 15000,callback:finjeu, timeScale: 1,startAt:0 });
	timerEvent4 = this.time.addEvent({ delay: 3000,callback:resetdespnjs, timeScale: 1,startAt:0,repeat:-1 });
	timerEvent5 = this.time.addEvent({ delay: 3000,callback:spawnpnj, timeScale: 1,startAt:2000,repeat:-1 });
	projectiles = this.physics.add.group();
	pnjs = this.add.group();
	pnjs2 = this.add.group();
	//this.physics.add.collider(projectiles,innocent, hitprojectileinnocent, null, this);
	//this.physics.add.collider(projectiles,ennemi, hitprojectile, null, this);
}



function update(){
	player.setDepth(1);
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
	
	if(cursors.left.isDown){
	player.setFlipX(true);
	gauche=1;
	}

     if(cursors.right.isDown){
		
	player.setFlipX(false);	
	gauche=0;
	
	}
	
	
	if(cursors.up.isDown && sauvetire==1 ){
		sauvetire=0;
		tire();
	} 
	if (cursors.up.isUp) {
		sauvetire=1;
		resettimer=1;
	}
	
	if (invicibilite<100){
	invicibilite=invicibilite+1;
	}
	if (invicibilite>90 && pvjoueur!=0) {
	player.clearTint()

	}

	if (pvjoueur==2) {

	barredepv1.anims.play('pv', true);
	barredepv2.anims.play('pv', true);
	barredepv2.setVisible(true);
	}
	if (pvjoueur==1) {
	barredepv1.anims.play('pv', true);
	barredepv1.setVisible(true);
	barredepv2.setVisible(false);
	}
	if (pvjoueur==0) {
	barredepv1.setVisible(false);
	}
	
	
	if (gauchequi==1 && gauche==1 && cursors.up.isDown && resettimer==1) {
	resettimer=0;
	
	this.time.addEvent({
    delay: 400,
    callback: ()=>{
      pnjs.children.iterate(personnagejoueur => {
     
        personnagejoueur.destroy(personnagejoueur, true)
		gauchequi=0;
    })
    },
    loop: false
	})
	
	
	score=score+100;
	}
	if (gauchequi==2 && gauche==1 && cursors.up.isDown && resettimer==1) {
		resettimer=0;
	this.time.addEvent({
    delay: 400,
    callback: ()=>{
      pnjs.children.iterate(personnagejoueur => {
     
        personnagejoueur.destroy(personnagejoueur, true)
      gauchequi=0;
    })
    },
    loop: false
	})
	pvjoueur=pvjoueur-1;
	}
	
	
		if (droitequi==1 && gauche==0 && cursors.up.isDown && resettimer==1) {
	resettimer=0;
	
	this.time.addEvent({
    delay: 400,
    callback: ()=>{
      pnjs2.children.iterate(personnagejoueur2 => {
     
        personnagejoueur2.destroy(personnagejoueur2, true)
     droitequi=0;
    })
    },
    loop: false
	})
	
	
	score=score+100;
	}
	if (droitequi==2 && gauche==0 && cursors.up.isDown && resettimer==1) {
		resettimer=0;
	this.time.addEvent({
    delay: 400,
    callback: ()=>{
      pnjs2.children.iterate(personnagejoueur2 => {
     
        personnagejoueur2.destroy(personnagejoueur2, true)
      droitequi=0;
    })
    },
    loop: false
	})
	pvjoueur=pvjoueur-1;
	}
	
	if (pvjoueur<1) {
	gameOver=true;
	this.time.addEvent({
    delay: 400,
    callback: ()=>{
      
      window.open ("Jeu/lose.html", "_self");
   
    },
    loop: false
	})

	}

	
	
player.anims.play('main', true);
	

 scoreText.setText('Score '+score);
 barredetemps.anims.play('timer', true);
 timerEvent3;
 
}


function finjeu() {
gameOver=true;
if (pvjoueur==2) {
window.open ("Jeu/gagne.html", "_self");
}
else { window.open ("Jeu/gagnebut.html", "_self"); }
}

function tire() {
	
	if (gauche==0) {
		var projectile = projectiles.create(900, 700, 'boule');
		projectile.anims.play('feu', true);
		projectile.setBounce(0);
		projectile.setFlipX(false);
	}
	if (gauche==1) {
		var projectile = projectiles.create(570, 700, 'boule');
		projectile.anims.play('feu', true);
		projectile.setBounce(0);
		projectile.setFlipX(true);
	}
}



function spawnpnj () {
	pnjqui=Phaser.Math.Between(1,2);
	if (pnjqui==1) {
		var personnagejoueur = pnjs.create(460, 530, 'mechant');
		gauchequi=1;
		
	}
	if (pnjqui==2) {
		var personnagejoueur = pnjs.create(460, 530, 'gentil');
		gauchequi=2;
	}
	pnjqui=Phaser.Math.Between(1,2);
	if (pnjqui==1) {
		var personnagejoueur2 = pnjs2.create(1060, 530, 'mechant');
		droitequi=1;
		
	}
	if (pnjqui==2) {
		var personnagejoueur2 = pnjs2.create(1060, 530, 'gentil');
		droitequi=2;
	}
}

function resetdespnjs () {
		pnjs.children.iterate(personnagejoueur => {
     
        personnagejoueur.destroy(personnagejoueur, true)
		gauchequi=0;
    })
		pnjs2.children.iterate(personnagejoueur2 => {
     
        personnagejoueur2.destroy(personnagejoueur2, true)
       droitequi=0;
    })
	
	}


/*function hitprojectileinnocent (innocent,projectile) {
	
}

function hitpojectile (ennemi,projectile) {
	
} */