

const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')

const canvas_width = canvas.width = 1519.2;
const canvas_height = canvas.height = 689;

const playerImage = new Image();
playerImage.src = 'ships/bleu.png';

//player coding
const spriteWidth = 192;
const spriteHeight = 224;
let framex = 0;
let frameY = 0;
let gameFrame = 0;
const staggerFrames = 5;
let frametime = 100;
counter = 1;


const player = {
    w: 100,
    h: 100,
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
    // enemey1
    const enemyImage = new Image();
    enemyImage.src= 'stone.png';
const enemiesArray= [];
    // const numberOfEnemies = 20
    let enemyframe= 0;
    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }
    
    class Enemy{
      constructor(image){
        this.image= new Image();
        this.image.src= image;
        this.x = Math.random() * canvas_width;
        this.y = 0;
        this.speed = getRandomInt(1,3)
        this.spriteWidth = 320;
        this.spriteHeight = 240;
        this.width = this.spriteWidth /3;
        this.height = this.spriteHeight/3;
        this.frame = 0;

      }
      update(){
        // this.x++;
        this.y += this.speed;
        // if ( this.height +this.y  > canvas_height) this.y = 0;
        if(enemyframe % 3 ===0 ){
        this.frame > 23 ? this.frame =0 : this.frame++;
        }
        console.log(this.height)
      }
      draw(){

        // ctx.fillRect(this.x,this.y,this.width,this.height)
        ctx.drawImage(enemyImage,0,this.frame * this.spriteHeight,this.spriteWidth,this.spriteHeight,this.x,this.y,this.width,this.height)

      }
    }

    // numberOfEnemies= getRandomInt(1,20)   

setInterval(() =>{
 
  for (let i = 0;i < 7 ;i++ ){
    enemiesArray.push(new Enemy('stone.png'));
  }
},1000)

// setInterval(() =>{
//   enemiesArray.splice(0,10)
//   console.log('hello' + enemiesArray.length)
// },1000)
  
  
function spawn(){
  enemiesArray.forEach(enemy =>{
    enemy.update();
    enemy.draw();
    if (enemiesArray[0].y> canvas_height){ enemiesArray.shift()}
  })

}
  function update() {
    clear();
    
    drawPlayer();
    newPos();
   
    spawn()
  
    enemyframe++;
    requestAnimationFrame(update);
    // console.log(enemiesArray)
    // console.log(counter)
}


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

