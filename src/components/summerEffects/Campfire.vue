<template>
  <div class="cf-container" v-if="showFire">
    <div class="cf-flame-container" id="fireNodes1">
      <div class="cf-flame" v-for="i in 7" :key="'fire1-' + i"></div>
    </div>
    <div class="cf-flame-container" id="fireNodes2">
      <div class="cf-flame" v-for="i in 7" :key="'fire2-' + i"></div>
    </div>
    <div class="cf-flame-container" id="base-fire">
      <div class="cf-flame" v-for="i in 3" :key="'base-fire-' + i"></div>
    </div>
    <div class="cf-log-container">
      <div class="cf-log" v-for="i in 2" :key="'log-' + i"></div>
    </div>
  </div>
</template>
  
<script>
import anime from 'animejs';

export default {
  data() {
    return {
      showFire: window.innerWidth >= 1440,
    };
  },
  mounted() {
    window.addEventListener('resize', this.checkScreenSize);
    this.checkScreenSize();
    if (this.showFire) {
      this.animateBaseFire();
      this.animateFlame1();
      this.animateFlame2();
      this.animateFlame3();
    }
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkScreenSize);
  },
  methods: {
    checkScreenSize() {
      this.showFire = window.innerWidth >= 1440;
    },
    animateBaseFire() {
      if (!this.showFire) return;
      anime({
        targets: '.cf-flame-container#base-fire .cf-flame',
        delay: anime.stagger(300),
        translateY: () => anime.random(0, -10),
        keyframes: [
          { scale: 0.8 },
          { scale: 0.825 },
          { scale: 0.9 },
          { scale: 0.925 },
          { scale: 1 },
        ],
        duration: 2000,
        easing: 'easeInOutSine',
        loop: true,
      });
    },
    animateFlame1() {
      if (!this.showFire) return;
      anime({
        targets: '#fireNodes1 .cf-flame',
        delay: anime.stagger(100),
        translateY: () => anime.random(0, 300),
        rotate: 30,
        opacity: () => anime.random(0.5, 1),
        translateX: () => anime.random(0, -60),
        scale: 0,
        skew: () => anime.random(0, 10),
        loop: true,
        easing: 'easeInOutSine',
      });
    },
    animateFlame2() {
      if (!this.showFire) return;
      anime({
        targets: '#fireNodes2 .cf-flame',
        delay: anime.stagger(400),
        translateX: () => anime.random(-30, 0),
        translateY: () => anime.random(-260, -160),
        scale: 0,
        rotate: () => anime.random(0, 60),
        skew: () => anime.random(0, 30),
        loop: true,
        easing: 'easeInOutSine',
      });
    },
    animateFlame3() {
      if (!this.showFire) return;
      anime({
        targets: '#fireNodes1 .cf-flame',
        delay: anime.stagger(500),
        translateY: () => anime.random(-300, -200),
        opacity: () => anime.random(0, 1),
        translateX: () => anime.random(-50, 50),
        scale: 0,
        rotate: () => anime.random(0, -30),
        skew: () => anime.random(0, 20),
        loop: true,
        easing: 'easeInOutSine',
      });
    },
  },
};
</script>

  
<style scoped>
  body {
    background-color: #372113;
    width: 100vw;
    height: 100vh;
    position: relative;
  }
  
  .cf-container {
  box-sizing: content-box;
  width: 300px;
  height: 300px;
  position: fixed; /* Фіксує елемент на екрані */
  left: -70px; /* Відступ від лівого краю */
  bottom: 20px; /* Відступ від нижнього краю */
  transform: none; /* Видаляємо зсув, оскільки він більше не потрібен */
  scale: 0.6;
}
  
  .cf-container .cf-flame-container {
    width: 100px;
    height: 100px;
    bottom: 0px;
    position: absolute;
  }
  
  .cf-container .cf-log-container {
    width: 60%;
    height: 100px;
    position: absolute;
    bottom: 0px;
    left: 50px;
  }
  
  .cf-container .cf-flame-container#base-fire .cf-flame:nth-child(1) {
    background: #c63509;
    opacity: 0.95;
  }
  
  .cf-container .cf-flame-container#base-fire .cf-flame:nth-child(2) {
    background: #cd4015;
    width: 100px;
    height: 100px;
    opacity: 0.85;
    left: 75px;
  }
  
  .cf-container .cf-flame-container#base-fire .cf-flame:nth-child(3) {
    background: #d73e0f;
    width: 60px;
    height: 60px;
    opacity: 0.85;
    left: 130px;
  }
  
  .cf-container .cf-flame-container:nth-child(2) {
    width: 150px;
    height: 150px;
    bottom: 0px;
    position: absolute;
  }
  
  .cf-container .cf-flame-container:nth-child(2) .cf-flame {
    width: 75px;
    height: 75px;
    left: 75px;
  }
  
  .cf-log {
    background: #723830;
    width: 20px;
    height: 30px;
    transform-origin: center;
    position: absolute;
    bottom: 0px;
    border-radius: 0.5em;
    box-shadow: 0 3px 10px #372113;
    width: 100%;
  }
  
  .cf-log:nth-child(1) {
    transform: rotate(15deg);
  }
  
  .cf-log:nth-child(2) {
    transform: rotate(-15deg);
  }
  
  .cf-flame:nth-child(1) {
    background: #f5ed8f;
  }
  
  .cf-flame:nth-child(2) {
    background: #fde239;
  }
  
  .cf-flame:nth-child(3) {
    background: #ffdc01;
  }
  
  .cf-flame:nth-child(4) {
    background: #fdac01;
  }
  
  .cf-flame:nth-child(5) {
    background: #d73e0f;
  }
  
  .cf-flame:nth-child(6) {
    background: #cd4015;
  }
  
  .cf-flame:nth-child(7) {
    background: #c63509;
  }
  
  .cf-flame:last-child {
    background: #c63509;
  }
  
  .cf-flame {
    background: #cd4015;
    width: 100px;
    height: 100px;
    border-radius: 1em;
    position: absolute;
    bottom: 0px;
    left: 100px;
  }
  
  #fireNodes2 .cf-flame {
    animation: flameColor 1.5s ease-out infinite;
  }
  
  @keyframes flameColor {
    0% {
      background: #c63509;
    }
    20% {
      background: #cd4015;
    }
    30% {
      background: #fdac01;
    }
    50% {
      background: #ffb401;
    }
    60% {
      background: #fdac01;
    }
    70% {
      background: #ffdc01;
    }
    80% {
      background: #fde239;
    }
    100% {
      background: #f5ed8f;
    }
  }
  </style>
  