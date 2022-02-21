const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')


const canvas_width = canvas.width = window.innerWidth;
const canvas_height = canvas.height = window.innerHeight;


///game pop and game start
window.addEventListener("load", function(){
  setTimeout(
      function open(event){
          document.querySelector(".popup").style.display = "block";
          
      },
      500
  )
});
document.querySelector("#close").addEventListener("click", function(){
  document.querySelector(".popup").style.display = "none";update()
});


//player coding
const playerImage = new Image();
playerImage.src = 'ships/bleu.png';
const earth = new Image();
earth.src = 'objects/earth.png';
const spriteWidth = 192;
const spriteHeight = 224;
let framex = 0;
let frameY = 0;
const staggerFrames = 5;
let frametime = 100;


const player = {
  w: 75,
  h: 75,
  x: canvas_width/2,
  y: canvas_height-100,
  speed: 5,
  dx: 0,
  dy: 0
};
function drawPlayer() {
  ctx.drawImage(playerImage, framex * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, player.x, player.y, player.w, player.h);
  if (gameFrame % staggerFrames == 0) {
    if (framex < 1) framex++;
    else framex = 0
  }
  if (gameFrame % frametime == 0) {
    counter++;
  }
  
  gameFrame++;
  
};
function clear() {
  ctx.clearRect(0, 0, canvas_width, canvas_height)
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
    player.y = canvas_height - player.h;
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
  if (  counter > 70  && counter < 100   ){
    if (e.key === 'ArrowLeft' || e.key === 'Left') {
      moveRight();
    } else if (e.key === 'ArrowRight' || e.key === 'Right') {
      moveLeft();
    } else if (e.key === 'ArrowDown' || e.key === 'Down') {
      moveUp();
    } else if (e.key === 'ArrowUp' || e.key === 'Up') {
      moveDown();
    } else if (e.key === 81 || e.key === 'q'){
      destroy()
    }
  }else{
    if (e.key === 'ArrowRight' || e.key === 'Right') {
      moveRight();
    } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
      moveLeft();
    } else if (e.key === 'ArrowUp' || e.key === 'Up') {
      moveUp();
    } else if (e.key === 'ArrowDown' || e.key === 'Down') {
      moveDown();
    } else if (e.key === 81 || e.key === 'q'){
      destroy()
    }
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
    e.key == 'ArrowDown' ||
    e.key == 81 ||
    e.key == 'q'
    ) {
      player.dx = 0;
      player.dy = 0;
    }
  }
  
  //enemies coding
  const enemiesArray = [];
  let enemyframe = 0;
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

class Enemy {
  constructor(image, spriteWidth, spriteHeight, frames, slow, size,name,x,y,speed) {
    this.image = new Image();
    this.image.src = image;
    this.x = x || Math.random() * canvas_width;
    this.y = y || -200;
    this.speed = speed || getRandomInt(1, 3)
    this.spriteWidth = spriteWidth;
    this.spriteHeight = spriteHeight;
    this.width = this.spriteWidth * size;
    this.height = this.spriteHeight * size;
    this.frame = 0;
    this.frames = frames;
    this.slow = slow
    this.name = name
  }
  update() {
    // this.x++;
    this.y += this.speed;
    
    if (enemyframe % this.slow === 0) {
      this.frame > this.frames ? this.frame = 0 : this.frame++;
    }
  }
  draw() {
    
    ctx.drawImage(this.image, 0, this.frame * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
    
  }
}
class shooting {
  constructor(image, spriteWidth, spriteHeight, frames, slow, size) {
    this.image = new Image();
    this.image.src = image;
    this.x = player.x;
    this.y = player.y;
    this.speed = 1
    this.spriteWidth = spriteWidth;
    this.spriteHeight = spriteHeight;
    this.width = this.spriteWidth * size;
    this.height = this.spriteHeight * size;
    this.frame = 0;
    this.frames = frames;
    this.slow = slow
  }
  update() {
    // this.x++;
    this.y -= 1;
    if (enemyframe % this.slow === 0) {
      this.frame > this.frames ? this.frame = 0 : this.frame++;
    }
  }
  draw() {
    
    ctx.drawImage(this.image, 0, this.frame * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
    
  }
  
}
//enemies classes
rock = {
  image: 'objects/rock.png',
  width: 320,
  height: 240,
  frames: 23,
  slow: 3,
  size: 0.3,
  number: 6,
  name: 'rock',
}
octopus = {
  image: 'objects/octopus.png',
  width: 256,
  height: 256,
  frames: 6,
  slow: 10,
  size: 0.5,
  number: 6,
}
fireball = {
  image: 'objects/fireball.png',
  width: 586,
  height: 716,
  frames: 17,
  slow: 3,
  size: 1.5,
  number: 6,
  x: getRandomInt(0, 1),
  y: -700,
  name:'fireball'
}
fire = {
  image: 'objects/fire.png',
  width: 449,
  height: 448,
  frames: 8,
  slow: 8,
  size: 0.6,
  number: 6,
}
wing = {
  image: 'objects/wing.png',
  width: 207,
  height: 165,
  frames: 1,
  slow: 16,
  size: 0.8,
  number: 6,
}
eyes = {
  image: 'objects/eyes.png',
  width: 320,
  height: 320,
  frames: 200,
  slow: 2,
  size: 0.8,
  number: 1,
  name: 'eyes',
  speed:0.3,
}
boss = {
  image: 'ships/boss.png',
  width: 528,
  height: 358,
  frames: 2,
  slow: 1,
  size: 1,
  number: 1,
}
alien = {
  image: 'ships/alien.png',
  width: 400,
  height: 400,
  frames: 33,
  slow: 6,
  size: 0.5,
  number: 6,
}
bob = {
  image: 'ships/bob.png',
  width: 400,
  height: 400,
  frames: 23,
  slow: 6,
  size: 0.3,
  number: 3,
  name:'bob'
}
human = {
  image: 'objects/human.png',
  width: 300,
  height: 300,
  frames: 5,
  slow: 1,
  size: 0.5,
  number: 3,
  name:'bob'
}
laser = {
  image: 'objects/laser.png',
  width: 400,
  height: 400,
  frames: 1,
  slow: 6,
  size: 0.15,
  number: 3,
  name:'bob',
  speed: 3,
}


const beams = [];
const lasers = [];
//enemies function


// game function and levels

//objects showing on screeen
// function shoot (){
  //   enemiesArray.push(new Enemy(object.image, object.width, object.height, object.frames, object.slow, object.size, object.name,player.w,player.y));
  // }
  
  
  function wave(object,number){
    for (let i = 0; i < number; i++) {
      enemiesArray.push(new Enemy(object.image, object.width, object.height, object.frames, object.slow, object.size, object.name,object.x,object.y));
      // how it works ('objects/x.png',width,heigh,frames,slow,size,x,y)

     
    }
    
  }
  //levels and the order of the objects showing
  setInterval(() => {
    enemiesArray.forEach((enemy,index)=> {
      if (enemy.name === 'bob'){
        console.log(lasers.length)
        if (lasers.length<800){
          lasers.push(new Enemy(laser.image, laser.width, laser.height, laser.frames, laser.slow, laser.size, laser.name,enemy.x,enemy.y,laser.speed))
        }else {return}
      } 
    })
    //gun shoots
    if (counter === 10 ){ gun = gun+1}
    else if (counter === 20 ){ gun = gun+1}
    else if (counter === 40 ){ gun = gun+1}
    else if  (counter === 70 ){ gun = gun+1}
    else if  (counter === 100 ){ gun = gun+1}
    else if  (counter === 120 ){ gun = gun+1}
    else if  (counter === 140 ){ gun = gun+1}
    else if  (counter === 160 ){ gun = gun+1}
    else if  (counter === 180 ){ gun = gun+1}
    else if  (counter === 200 ){ gun = gun+1}
    //levels
    if (counter <=0){}
    else if ( counter < 10 &&counter> 0){ wave(rock,3); document.body.style.backgroundImage = "url('pictures/background.gif')";document.body.style.backgroundRepeat = 'no-repeat';document.body.style.backgroundSize = 'cover'; }
    else if ( counter > 10 && counter < 25 ){  wave(rock,7) }
    else if (  counter > 20  && counter < 40  ) {  wave(fireball,1) }
    else if (  counter > 40  && counter < 70  ) {  wave(alien,5); document.body.style.backgroundImage = "url('pictures/2.gif') " }
    else if (  counter > 70  && counter < 100  ) {  wave(octopus,6); document.body.style.backgroundImage = "url('pictures/invert.gif') " }
    else if (  counter > 100  && counter < 120  ) {  wave(bob,4); document.body.style.backgroundImage = "url('pictures/background.gif') " }
    else if (counter > 120 && counter < 140) {  wave(bob,4);document.body.style.backgroundRepeat = 'inherit';document.body.style.backgroundSize = '48%'; }
    else if (counter > 140 && counter < 160) {  wave(bob,5);document.body.style.backgroundRepeat = 'inherit';document.body.style.backgroundSize = '35%'; }
    else if (counter > 160 && counter < 180) {  wave(bob,6);document.body.style.backgroundRepeat = 'inherit';document.body.style.backgroundSize = '15%'; }
    else if (counter > 180 && counter < 200) {  wave(bob,7);document.body.style.backgroundRepeat = 'inherit';document.body.style.backgroundSize = '1%'; }
    else if (  counter > 200  && counter < 240  ) {  wave(eyes,2); document.body.style.backgroundImage = "url('pictures/satic2.gif')";document.body.style.backgroundRepeat = 'no-repeat';document.body.style.backgroundSize = 'cover'; gameFrame = getRandomInt(-5000000, 10000000) }
    else if  (counter > 240 && counter < 250){ document.body.style.backgroundImage = "url('pictures/satic1.gif')"; gameFrame = getRandomInt(-5000000, 10000000)}
    else if  (counter > 250){if(fixing){transmittion()};gameFrame = getRandomInt(-5000000, 10000000)}
    
    //last game popup
    
    
  }, 1000)
  function popup(){
    document.querySelector("#transmittion > .popup").style.display = "none";
    
    document.querySelector(".popups").style.display = "block"
    function typeWriter() {
      if (i < txt.length) {
        
        
        document.getElementById("text").innerText += txt.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
      }
    }
    typeWriter()
    
  };
  
  fixing = 'hi';
  var i = 0;
  var txt = document.getElementById("text").innerHTML; /* The text */
  document.getElementById("text").innerHTML = 'program loading...'
  var speed = 200; 
  
  // }
  //spawn and detection
  function spawn() {
    
    
    
    lasers.forEach((laser,index)=> {
      laser.update()
      laser.draw()
      
      
      if(player.x +10> laser.x + laser.width ||
        //right
        player.x + player.w < laser.x +10 ||
        //down
        player.y +30> laser.y + laser.height ||
        //up
        player.y -5 + player.h< laser.y){
          ///nothing happend if the you didn t touch anything
        }
        //but if you touch
        else {if (lives <=0) gameover()
          else {lasers.splice(index,1); lives--}
        }
      })
      
      enemiesArray.forEach((enemy,index) => {
        enemy.update();
        enemy.draw();
        beams.forEach(beam => {
          beam.update();
          beam.draw();
          
          //working code
          if (enemy.name === 'fireball'){
            if  (beam.x > enemy.x + enemy.width ||
              //right
              beam.x + beam.w < enemy.x  ||
              //down
              beam.y  > enemy.y + enemy.height ||
              //up
              beam.y + beam.h< enemy.y){
              }
              
            }else
              if  (beam.x > enemy.x + enemy.width ||
              //right
              beam.x + beam.w < enemy.x  ||
              //down
              beam.y  > enemy.y + enemy.height ||
              //up
              beam.y + beam.h< enemy.y){
              }
              //but if you touch
              else{enemiesArray.splice(index,1)}
           
            })
          
          
            if (enemiesArray[0].y > canvas_height) { enemiesArray.shift() }
            if (beams[0]) { if (beams[0].y < 0) { beams.shift() }}
            if (lasers[0]) { if (lasers[0].y > canvas_height) { lasers.shift() }}
            
            
            
            
            if (enemy.name === 'bob' ){
              
              if(player.x +10> enemy.x + enemy.width ||
                //right
                player.x + player.w < enemy.x +10 ||
                //down
                player.y +30> enemy.y + enemy.height ||
                //up
                player.y -5 + player.h< enemy.y){
                  ///nothing happend if the you didn t touch anything
                }
                //but if you touch
                else {if (lives <=0) gameover();
                  else {enemiesArray.splice(index,1); lives--}
                }
                
                //eyes detection
              } else if (enemy.name === 'eyes') {
                //right
                if(player.x +75  > enemy.x + enemy.width ||
                  //left
                  player.x + player.w < enemy.x +60 ||
                  //down
                  player.y +70> enemy.y + enemy.height ||
                  //up
                  player.y -60 + player.h< enemy.y){
                    ///nothing happend if the you didn t touch anything
                  }
                  //but if you touch
                  else {
                    if (lives <=0) gameover(); //either you lose
                    else {enemiesArray.splice(index,1); lives--} //you lose a life
                  }
                  
                } else if (enemy.name === 'fireball') {
                  //right
                  if(player.x +200  > enemy.x + enemy.width ||
                    //left
                    player.x + player.w < enemy.x +200 ||
                    //down
                    player.y +200> enemy.y + enemy.height ||
                    //up
                    player.y  + player.h< enemy.y +200){
                      ///nothing happend if the you didn t touch anything
                    }
                    //but if you touch
                    else {
                      if (lives <=0) gameover(); //either you lose
                      else {; lives= (lives -0.1)} //you lose a life
                    }
                  }
                  else {
                    //right
                    if(player.x +35 > enemy.x + enemy.width ||
                      //left
                      player.x + player.w < enemy.x +30 ||
                      //down
                      player.y +5> enemy.y + enemy.height ||
                      //up
                      player.y -15 + player.h< enemy.y){
                        ///nothing happend if the you didn t touch anything
                      }
                      //but if you touch
                      else {
                        if (lives <=0) gameover(); //either you lose
                        else {enemiesArray.splice(index,1); lives--} //you lose a life
                      }
                    }
                  })
                  
                }
                
                let gameFrame = 0;
                counter = 0;
                let gun = 4
                var lives = 29
                function score() {
                  if (counter > 240){ ctx.fillStyle = "black";}else{
                  ctx.fillStyle = "white";}
                  ctx.font = "bold 25px arial";
                  // ctx.shadowOffsetX = 3;
                  // ctx.shadowOffsetY = 2;
                  // ctx.shadowColor="black";
                  ctx.fillText('your score is ' +gameFrame, 10, 40)
                  ctx.fillText('lives left you have: ' +(Math.floor(lives+1)), 10, 80)
                  ctx.fillText('shots you have left ' + (gun+1), 10, 120)
                }
                
                
                function update() {
                  clear();
                  drawPlayer();
                  newPos();
                  score()
                  spawn()
                  ///earth   ctx.drawImage(earth, 600, 250, (488/3), (511/3));
                  document.body.onkeyup = function(e){
                    if(e.keyCode  == 32){
                      if (gun >= 0 ){
                        beams.push( new shooting('objects/beam.png',172,200,1,8,0.8)); gun--;
                      } else if (console.log('no ammo'))
                      beams.forEach((beam,index) => {
                        
      })
      
    }}
    if(enemiesArray.length <=1 && counter >10 && counter < 243){enemiesArray.push(new Enemy(alien.image, alien.width, alien.height, alien.frames, alien.slow, alien.size, alien.name,alien.x,alien.y))}

    enemyframe++;
   requestAnimationFrame(update);
    
  }
  const body = document.querySelector('body ')
  console.log(body.getAttribute('bg-image'))
  document.addEventListener('keydown', keyDown);
  document.addEventListener('keyup', keyUp);






function gameover(){
  document.querySelector("#gameover > .popup").style.display = "block";

counter = -1000;enemiesArray.length = 0; beams.length = 0; lasers.length = 0;

  document.querySelector("#restart").addEventListener("click", function(){
    document.querySelector("#gameover > .popup").style.display = "none";
    counter= 0; gun = 3 ; lives = 29; gameFrame = 0; lives++;

})

}
function transmittion(){
  document.querySelector("#transmittion > .popup").style.display = "block";


  document.querySelector("#transmittionclose").addEventListener("click", function(){
    document.querySelector("#transmittion > .popup").style.display = "none";
    popup(); fixing ='';

})
}
