

const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')

const canvas_width = canvas.width = 1519.2;
const canvas_height = canvas.height = 689;


//player coding
const playerImage = new Image();
playerImage.src = 'ships/bleu.png';
const spriteWidth = 192;
const spriteHeight = 224;
let framex = 0;
let frameY = 0;
let gameFrame = 0;
const staggerFrames = 5;
let frametime = 100;
counter = -1;


const player = {
    w: 75,
    h: 75,
    x: 20,
    y: 200,
    speed: 5,
    dx: 0,
    dy: 0
  };
  function drawPlayer(){
    ctx.drawImage(playerImage,framex * spriteWidth, frameY* spriteHeight,spriteWidth,spriteHeight,player.x, player.y, player.w, player.h);
    if (gameFrame % staggerFrames == 0){
        if (framex < 1) framex++;
        else framex = 0 
    }
    if (gameFrame % frametime == 0){
   counter++;
  }

    gameFrame++;
    
};
  function clear (){
    ctx.clearRect(0,0,canvas_width,canvas_height)
}
function newPos() {
    player.x += player.dx;
    player.y += player.dy;
  
    detectWalls();
  }
  
  function detectWalls() {
    // Left wall
    if (player.x < 0) {
      player.x = 0;
    }
  
    // Right Wall
    if (player.x + player.w > canvas.width) {
      player.x = canvas.width - player.w;
    }
  
    // Top wall
    if (player.y < 0) {
      player.y = 0;
    }
  
    // Bottom Wall
    if (player.y + player.h > canvas_height) {
      player.y = canvas_height - player.h ;
    }
  }


function moveUp() {
    player.dy = -player.speed;
  }
  
  function moveDown() {
    player.dy = player.speed;
  }
  
  function moveRight() {
    player.dx = player.speed;
  }
  
  function moveLeft() {
    player.dx = -player.speed;
  }
  
  function keyDown(e) {
    if (e.key === 'ArrowRight' || e.key === 'Right') {
      moveRight();
    } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
      moveLeft();
    } else if (e.key === 'ArrowUp' || e.key === 'Up') {
      moveUp();
    } else if (e.key === 'ArrowDown' || e.key === 'Down') {
      moveDown();
    }
  }
  
  function keyUp(e) {
    if (
      e.key == 'Right' ||
      e.key == 'ArrowRight' ||
      e.key == 'Left' ||
      e.key == 'ArrowLeft' ||
      e.key == 'Up' ||
      e.key == 'ArrowUp' ||
      e.key == 'Down' ||
      e.key == 'ArrowDown'
      ) {
        player.dx = 0;
        player.dy = 0;
      }
    }

    //enemies coding
    const enemiesArray= [];
    let enemyframe= 0;
    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min); 
    }
    
    class Enemy{
      constructor(image,spriteWidth,spriteHeight,frames,slow,size,x){
        this.image= new Image();
        this.image.src= image;
        this.x =  x || Math.random() * canvas_width ;
        this.y = -100;
        this.speed = getRandomInt(1,3)
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
        this.width = this.spriteWidth *size;
        this.height = this.spriteHeight* size;
        this.frame = 0;
        this.frames = frames;
        this.slow= slow
        
      }
      update(){
        // this.x++;
        this.y += this.speed;

        if(enemyframe % this.slow ===0 ){
          this.frame > this.frames ? this.frame =0 : this.frame++;
        }
      }
      draw(){

        ctx.drawImage(this.image,0,this.frame * this.spriteHeight,this.spriteWidth,this.spriteHeight,this.x,this.y,this.width,this.height)
        
      }
    }
//enemies classes
    rock = {
      image : 'objects/rock.png',
      width : 320,
      height : 240,
      frames : 23,
      slow : 3 ,
      size : 0.3,
      number:6,
    }
    octopus = {
      image : 'objects/octopus.png',
      width : 256,
      height : 256,
      frames : 6,
      slow : 10 ,
      size : 0.5,
      number:6,
    }
    fireball = {
      image : 'objects/fireball.png',
      width : 586,
      height : 716,
      frames : 19,
      slow : 3 ,
      size : 0.25,
      number:6,
    }
    fire = {
      image : 'objects/fire.png',
      width : 449,
      height : 448,
      frames : 8,
      slow : 8,
      size : 0.6,
      number:6,
    }
    wing = {
      image : 'objects/wing.png',
      width : 207,
      height : 165,
      frames : 1,
      slow : 16,
      size : 0.8,
      number:6,
    }
    eyes = {
      image : 'objects/eyes.png',
      width : 320,
      height : 320,
      frames : 150,
      slow : 1,
      size : 0.6,
      number:3,
    }
    boss = {
      image : 'ships/boss.png',
      width : 528,
      height : 358,
      frames : 2,
      slow : 1,
      size : 1,
      number:1,
    }
    alien = {
      image : 'ships/alien.png',
      width : 400,
      height : 400,
      frames : 33,
      slow : 6,
      size : 0.5,
      number:6,
    }
    bob = {
      image : 'ships/bob.png',
      width : 400,
      height : 400,
      frames : 23,
      slow : 6,
      size : 0.3,
      number:3,
    }
    
//enemies function


// game function and levels
    setInterval(() =>{

      for (let i = 0;i < bob.number ;i++ ){
        enemiesArray.push(new Enemy(bob.image,bob.width,bob.height,bob.frames,bob.slow,bob.size)); 
        // how it works ('objects/x.png',width,heigh,frames,slow,size,x,y)
        
      }
      
    },1000)
function spawn(){
  enemiesArray.forEach(enemy =>{
    enemy.update();
    enemy.draw();
    if (enemiesArray[0].y> canvas_height){ enemiesArray.shift()}
  })

}
function score(){
  ctx.fillStyle = "white";
  ctx.font = "25px arial";
  ctx.fillText('Your Score is: '+ counter, 10,40)
}


  // main function
  function update() {
    clear(); 
    drawPlayer();
    newPos();
   score()
    spawn()
  
    enemyframe++;
    requestAnimationFrame(update);

}

//story pop up
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

update()

// window.addEventListener("load", function(){
//   setTimeout(
//       function open(event){
//           document.querySelector(".popup").style.display = "block";
//       },
//       1000
//   )
// });
// document.querySelector("#close").addEventListener("click", function(){
//   document.querySelector(".popup").style.display = "none";update()
// });




