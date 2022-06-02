const ITACHI = document.querySelector('.itachi');
const FIREBALL = document.querySelector('.fireball');
const GIANTFIREBALL = document.querySelector('.giantFireball');
const CLOUDS = document.querySelector('.clouds');
const LIFES = document.querySelector('.lifes');
const RESTART = document.querySelector('.restart');
const health = document.getElementById("health")

const jump = () => {
  ITACHI.classList.add('jump');

  setTimeout(() => {
    ITACHI.classList.remove('jump');
  }, 500);
}

const especial = () => {
  const fireballPosition = FIREBALL.offsetLeft;
  const cloudsPosition = CLOUDS.offsetLeft;
  ITACHI.src = 'images/mangekyou.gif';
  FIREBALL.style.animation = 'none';
  FIREBALL.style.left = fireballPosition + 'px';
  CLOUDS.style.animation = 'none';
  CLOUDS.style.left = cloudsPosition + 'px';
  health.value = 100;
  setTimeout(() => {
    ITACHI.src = 'images/susanoo.gif';
    ITACHI.style.bottom = '-20px';
    FIREBALL.style.animation = 'fireball 1.3s infinite linear';
    FIREBALL.style.left = '';
    CLOUDS.style.animation = 'clouds 10s infinite linear';
    CLOUDS.style.left = '';
  }, 1400);
  setTimeout(() => {
    ITACHI.src = 'images/itachi.gif';
  }, 5000);
}

const giantFireball = setInterval(() => {
  GIANTFIREBALL.classList.add('giantFireballAppear');
  setTimeout(() => {
    GIANTFIREBALL.classList.remove('giantFireballAppear');
  }, 1000);
}, 10000);

const loop = setInterval(() => {
  const fireballPosition = FIREBALL.offsetLeft; 
  const giantFireballPosition = GIANTFIREBALL.offsetLeft; 
  const itachiPosition = +window.getComputedStyle(ITACHI).bottom.replace('px', '');

  if (fireballPosition <= 43 && fireballPosition > 0  && itachiPosition < 40) {
    health.value -= 10;
  }
  if (giantFireballPosition <= 43 && giantFireballPosition > 0) {
    health.value = 0;
  }

  if (health.value == 0) {
    FIREBALL.style.display = 'none';
    ITACHI.src = 'images/disappear.gif';
    ITACHI.style.bottom = '-35px';
    ITACHI.style.marginRight = '90px';
    setTimeout(() => {
      ITACHI.style.display = 'none';
    }, 500);
    RESTART.style.display = 'flex';

    clearInterval(loop);
  }
}, 10);



document.addEventListener('keydown', jump);
document.addEventListener('click', especial);