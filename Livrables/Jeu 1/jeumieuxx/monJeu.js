var config = {
	type: Phaser.AUTO,
	width: 999,
	height: 600,
	
physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
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
var saut=2;
function init(){
	var sauvesaut;
	var saut;
 	var platforms;
	var player;
	var cursors; 
	var stars;
	var scoreText;
	var bomb;
	var fdp;
	var pointdevie;
	var pvjoueur;
	var invicibilite;
	var barredepv1;
	var barredepv2;
	var barredepv3;
	var barredetemps;
}

function preload(){
	this.load.image('background','imag/fondcool.png');	
	this.load.image('fond','imag/fondcool.png');
	
	this.load.image('sol','imag/platform.png');
	this.load.spritesheet('perso','imag/magiciendemichel.png',{frameWidth: 22, frameHeight: 31});
	this.load.spritesheet('run','imag/run.png',{frameWidth: 23, frameHeight: 28});
	this.load.spritesheet('saut','imag/saut.png',{frameWidth: 21, frameHeight: 28});
	this.load.spritesheet('leftjump','imag/sautleft.png',{frameWidth: 26, frameHeight: 21});
	this.load.spritesheet('dash','imag/dash.png',{frameWidth: 34, frameHeight: 29});
	this.load.spritesheet('bomb','imag/bomb.png',{frameWidth: 27, frameHeight: 27});
	this.load.spritesheet('vie','imag/vie.png',{frameWidth: 13, frameHeight: 10});
	this.load.spritesheet('bombe','imag/bombe.png',{frameWidth: 67, frameHeight: 67});
	this.load.spritesheet('boum','imag/boum.png',{frameWidth: 67, frameHeight: 67});
	this.load.spritesheet('flamme','imag/star.png',{frameWidth: 20, frameHeight: 35});
	this.load.spritesheet('chronometre','imag/timerv.png',{frameWidth: 31, frameHeight: 35});
}



function create(){
	
	this.add.image(500,300,'background');

	platforms = this.physics.add.staticGroup();
	platforms.create(290,580,'sol');
	platforms.create(100,580,'sol');
		platforms.create(490,580,'sol');
			platforms.create(690,580,'sol');
			platforms.create(890,580,'sol');
	platforms.create(750,390,'sol');
	platforms.create(550,390,'sol');
	platforms.create(330,390,'sol');
	platforms.create(100,390,'sol');
	platforms.create(300,210,'sol');
	platforms.create(500,210,'sol');
	platforms.create(700,210,'sol');
	platforms.create(900,210,'sol');
	
	barredepv1 = this.add.sprite(700,26,'vie').setScale(2);
	barredepv2 = this.add.sprite(730,26,'vie').setScale(2);
	
	barredetemps = this.add.sprite(800,30,'chronometre').setScale(2);
	
	player = this.physics.add.sprite(100,450,'perso');
	player.setCollideWorldBounds(true);
	player.body.setGravityY(000);
	this.physics.add.collider(player,platforms);
	
	
	cursors = this.input.keyboard.createCursorKeys(); 
	
	
	this.anims.create({
		key:'left',
		frames: this.anims.generateFrameNumbers('run', {start: 0, end: 5}),
		frameRate: 11,
		repeat: -1
	});
	this.anims.create({
		key:'leftsaut',
		frames: this.anims.generateFrameNumbers('leftjump', {start: 0, end: 2}),
		frameRate: 10,
		repeat: -1
	});
	
	this.anims.create({
		key:'stop',
		frames: this.anims.generateFrameNumbers('perso', {start: 0, end: 3}),
		frameRate: 10
	});
	
	this.anims.create({
		key:'saut',
		frames: this.anims.generateFrameNumbers('saut', {start: 0, end: 2}),
		frameRate: 19,
	});
	
	this.anims.create({
		key:'pv',
		frames: this.anims.generateFrameNumbers('vie', {start: 0, end: 3}),
		frameRate: 9,
		repeat:-1
	});
	
	this.anims.create({
		key:'bombeanim',
		frames: this.anims.generateFrameNumbers('bombe', {start: 0, end: 2}),
		frameRate: 9,
		repeat:-1
	});
	this.anims.create({
		key:'boumboum',
		frames: this.anims.generateFrameNumbers('boum', {start: 0, end: 2}),
		frameRate: 10,
		repeat:-1
	});
	this.anims.create({
		key:'flammequibouge',
		frames: this.anims.generateFrameNumbers('flamme', {start: 0, end: 3}),
		frameRate: 10,
		repeat:-1
	});
		this.anims.create({
		key:'timer',
		frames: this.anims.generateFrameNumbers('chronometre', {start: 0, end: 14}),
		frameRate: 1,
		repeat:-1
	});
	
	
	
	stars = this.physics.add.group({
		key: 'etoile',
		repeat:2,
		setXY: {x:100,y:140,stepX:200}
	});
	
	stars.children.iterate(star => {
  star.play('flammequibouge'),
 star.body.setGravityY(-500);
	})
	this.physics.add.collider(stars,platforms);
	this.physics.add.overlap(player,stars,collectStar,null,this);
	
	stars = this.physics.add.group({
		key: 'etoile',
		repeat:3,
		setXY: {x:300,y:520,stepX:200}
	});
	
	stars.children.iterate(star => {
  star.play('flammequibouge'),
 star.body.setGravityY(-500);
	})
	this.physics.add.collider(stars,platforms);
	this.physics.add.overlap(player,stars,collectStar,null,this);
	
	
	
	
	stars = this.physics.add.group({
		key: 'etoile',
		repeat:3,
		setXY: {x:100,y:320,stepX:200}
	});
	

	
	stars.children.iterate(star => {
  star.play('flammequibouge'),
 star.body.setGravityY(-500);
	})
	this.physics.add.collider(stars,platforms);
	this.physics.add.overlap(player,stars,collectStar,null,this);
	
	
	
	
	

	bombs = this.physics.add.group({
		key: 'bombe',
		repeat:3,
		setXY: {x:200,y:530,stepX:200},
		
	});

	bombs.children.iterate(bomb => {
  bomb.play('bombeanim'),
 bomb.body.setGravityY(-500);
 
})
this.physics.add.collider(player,bombs, hitBomb, null, this);
	
	
	bombs = this.physics.add.group({
		key: 'bombe',
		repeat:0,
		setXY: {x:240,y:160,stepX:180},
		
	});

	bombs.children.iterate(bomb => {
  bomb.play('bombeanim'),
 bomb.body.setGravityY(-500);
 
})
this.physics.add.collider(player,bombs, hitBomb, null, this);

bombs = this.physics.add.group({
		key: 'bombe',
		repeat:0,
		setXY: {x:400,y:20,stepX:180},
		
	});

	bombs.children.iterate(bomb => {
  bomb.play('bombeanim'),
 bomb.body.setGravityY(-500);
 
})
this.physics.add.collider(player,bombs, hitBomb, null, this);
	
	
	
	
	

	bombs = this.physics.add.group({
		key: 'bombe',
		repeat:2,
		setXY: {x:200,y:340,stepX:200},
		
	});
	
	bombs.children.iterate(bomb => {
  bomb.play('bombeanim'),
 bomb.body.setGravityY(-500);
})

this.physics.add.collider(player,bombs, hitBomb, null, this);

    
	scoreText = this.add.text(16,16, 'score: 0', {fontSize: '32px', fill:'#000'});
	
	timerEvent1 =  this.time.addEvent({ delay: 4000,callback:descentebomb,  timeScale: 1,startAt:0,repeat:-1 });
    timerEvent2 = this.time.addEvent({ delay: 4000,callback:monterbomb, timeScale: 1,startAt:2000 , repeat:-1 });
	timerEvent3 = this.time.addEvent({ delay: 15000,callback:finjeu, timeScale: 1,startAt:0 });
	
	

}



function update(){
	
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
		sensprojectile=1;
		if (player.body.touching.down) {
		 
		player.anims.play('left', true);
		player.setVelocityX(-300);
		player.setFlipX(true);
		}
		else {
		player.anims.play('leftsaut', true);
		player.setVelocityX(-300);
		player.setFlipX(true);	
		}
	}else if(cursors.right.isDown){
		sensprojectile=0;
		if (player.body.touching.down) {
		 
		player.anims.play('left', true);
		player.setVelocityX(300);
		player.setFlipX(false);
		}
		else {
		player.anims.play('leftsaut', true);
		player.setVelocityX(300);
		player.setFlipX(false);	
		}
		
	}else{
		player.setVelocityX(0);
		if (player.body.touching.down && cursors.up.isUp ){
			player.anims.play('stop', true);
		}
		
	}
	
	if(cursors.up.isUp && player.body.touching.down){
		saut=2;
	} 
	if(cursors.up.isDown && sauvesaut==1 && saut>0){
		player.anims.play('saut', true);
		sauvesaut=0;
		saut=saut-1;
		if (saut==1) {
			
		player.setVelocityY(-330);
		}
		if (saut==0) {
		player.setVelocityY(-300);	
		}
	} 
	if (cursors.up.isUp) {
		sauvesaut=1;
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
	
	
	

	
	
/*	if (timerattaque<1000) {
	timerattaque=timerattaque+1;
	if (timerattaque<100) {
	timerattaque=1000;	
	}
	}
	
	if (xsauveattaque==1 && timerattaque>80) {
			monstre.setVelocityX(0);
		monstre.anims.play('monstreattaque',true);
		timerattaque=timerattaque-5;
		timertouch=timertouch+1;
		if (timerattaque<100) {
		xsauveattaque=0;
		}
		if (timertouch==100) {
		timertouch=0;
		}
		if (timertouch>=80 && timertouch<100) {
		attaquemonstre=3;	
		} else {
		attaquemonstre=0;	
		}
	}
	if (xsauveattaque==0) {
	attaquemonstre=0;
	timertouch=0;	
	} */
	

 timerEvent2;
 timerEvent1;
 barredetemps.anims.play('timer', true);
 timerEvent3;
}


function hitBomb(player, bomb){
	bomb.setVelocityX(0);
	bomb.anims.play('boumboum');

	this.time.addEvent({
    delay: 300,
    callback: ()=>{
      bomb.disableBody(true,true);
    },
    loop: true
	})
	if (invicibilite==100) {
    pvjoueur=pvjoueur-1;
	invicibilite=0;
	player.setTint(0xff6969);

	}
	if (pvjoueur==0) {
	this.physics.pause();
	player.setTint(0xff0000);
	player.anims.play('turn');
	gameOver=true;
	}
	
}
	

function collectStar(player, star){
	star.disableBody(true,true);
	score += 100;
	scoreText.setText('score: '+score);
}

function descentebomb(player, bomb){
		bombs.children.iterate(bomb => {
	bomb.setVelocityY(50);
		})
}

function monterbomb(player, bomb){
	bombs.children.iterate(bomb => {
	bomb.setVelocityY(-50);
	})
}

function finjeu() {
gameOver=true;

window.open ("Jeu/index.html", "_self");


}