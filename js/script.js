const ITACHI = document.querySelector('.itachi');
const FIREBALL = document.querySelector('.fireball');
const GIANTFIREBALL = document.querySelector('.giantFireball');
const CLOUDS = document.querySelector('.clouds');
const LIFES = document.querySelector('.lifes');
const RESTART = document.querySelector('.restart');
const health = document.getElementById("health")
let metros = 0;
const metrosSpan = document.getElementById("metros")
const barraDeVida = document.getElementById("healthValue")
let ultado = false;
let mangekyou = false;
const velocidedaBola = 4.7;
const velocidedaBolaGigante = 4;
const velocidadeJump = 3.3;
let puloNormal = false;
let chegueiNoMaximoNormal = false;
const alturaPuloNormal = 200;
let doubleJump = false;
let alturadoubleJump = 150;
let chegueiNoMaximoDoubleJump = false;
let fireballPositionLeft = 2000;
let giantFireballPositionLeft = 2000;
let itachiBottom = 0;





const jump = () => {
  if(!mangekyou && !ultado){
    if(!puloNormal){
      puloNormal = true;
    }else if(puloNormal && !doubleJump){
      doubleJump = true;
      alturadoubleJump = itachiBottom + 100; 
    }
  }
}

const especial = () => {
  const cloudsPosition = CLOUDS.offsetLeft;
  mangekyou = true;
  fireballPositionLeft = FIREBALL.style.left;
  fireballPositionLeft = GIANTFIREBALL.style.left;
  ITACHI.src = 'images/mangekyou.gif';
  itachiBottom = -100;
  ITACHI.style.left = '-35px';
  CLOUDS.style.animation = 'none';
  CLOUDS.style.left = cloudsPosition + 'px';
  health.value = 100;
  setTimeout(() => {
    mangekyou = false;
    ultado = true;
    itachiBottom = -80;
    ITACHI.style.left = '-30px';
    ITACHI.src = 'images/susanoo.gif';
    CLOUDS.style.animation = 'clouds 10s infinite linear';
    CLOUDS.style.left = '';
  }, 1400);
  setTimeout(() => {
    ultado = false;
    ITACHI.style.bottom = 0;
    ITACHI.style.left = '170px'
    ITACHI.src = 'images/itachi.gif';
  }, 5000);
}


const corrida = setInterval(()=>{
  metros += 1;
},90)

const loop = setInterval(() => {
  metrosSpan.innerHTML = metros
  barraDeVida.innerHTML = health.value;
  if(puloNormal && !doubleJump){
    if(itachiBottom <= alturaPuloNormal && !chegueiNoMaximoNormal){
      itachiBottom += velocidadeJump;
    }else if(itachiBottom > alturaPuloNormal && !chegueiNoMaximoNormal){
      chegueiNoMaximoNormal = true;
    }else if(chegueiNoMaximoNormal){
      if(itachiBottom <= 0){
        itachiBottom = 0;
        puloNormal = false;
        chegueiNoMaximoNormal = false;
      }else{
        itachiBottom -= velocidadeJump; 
      }
    }
  }else if(puloNormal && doubleJump){
    if(!chegueiNoMaximoDoubleJump){
      if(itachiBottom <= alturadoubleJump){
        itachiBottom += velocidadeJump;
      }else if(itachiBottom >= alturadoubleJump){
        chegueiNoMaximoDoubleJump = true;
      }
    }else if(chegueiNoMaximoDoubleJump){
      itachiBottom-= velocidadeJump;
      if(itachiBottom <= 0){
        itachiBottom = 0;
        puloNormal = false;
        doubleJump = false;
        chegueiNoMaximoNormal = false;
        chegueiNoMaximoDoubleJump = false;
      }
    }
  }
  ITACHI.style.bottom = itachiBottom + 'px'
  if (!mangekyou) {
    fireballPositionLeft -= velocidedaBola;
    giantFireballPositionLeft -= velocidedaBolaGigante;
    FIREBALL.style.left = fireballPositionLeft + "px";
    GIANTFIREBALL.style.left = giantFireballPositionLeft + "px";
  } else {
    fireballPositionLeft = FIREBALL.offsetLeft;
    giantFireballPositionLeft = GIANTFIREBALL.offsetLeft;
  }

  if (fireballPositionLeft < -500) {
    fireballPositionLeft = 2000;
  }

  if (giantFireballPositionLeft < -500) {
    giantFireballPositionLeft = 2500;
  }


  const itachiPositionBottom = +window.getComputedStyle(ITACHI).bottom.replace('px', '');
  const itachiPositionLeft = +window.getComputedStyle(ITACHI).left.replace('px', '');

  if (fireballPositionLeft <= (70 + itachiPositionLeft) && fireballPositionLeft > itachiPositionLeft && itachiPositionBottom < 40 && !ultado) {
    health.value -= 10;
    fireballPositionLeft = 2000;

  }else if(fireballPositionLeft <= (340 + itachiPositionLeft) && itachiPositionBottom < 57 && ultado){
    fireballPositionLeft = 2000;
  }


  if (giantFireballPositionLeft <= (80 + itachiPositionLeft) && giantFireballPositionLeft > itachiPositionLeft && !ultado && itachiBottom < 125) {
    health.value = 0;
  }else if (giantFireballPositionLeft <= (350 + itachiPositionLeft) && ultado){
    giantFireballPositionLeft = 2000;
  }




  if (health.value == 0) {
    barraDeVida.innerHTML = health.value;
    GIANTFIREBALL.style.display = 'none';
    FIREBALL.style.display = 'none';
    ITACHI.src = 'images/disappear.gif';
    ITACHI.style.bottom = '-35px';
    ITACHI.style.marginRight = '90px';
    setTimeout(() => {
      ITACHI.style.display = 'none';
    }, 980);
    RESTART.style.display = 'flex';

    clearInterval(loop);
  }
}, 1);



document.addEventListener('keydown', jump);
document.addEventListener('click', especial);