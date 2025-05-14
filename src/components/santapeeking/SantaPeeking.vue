<template>
    <div class="santa-wrapper" v-if="isScreenLarge">
      <div class="santa" :class="{ 'santa-active': isPeeking }" @animationend="resetSanta">
        <img :src="randomSantaImage" alt="Santa" />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SantaPeeking',
    data() {
      return {
        isPeeking: false,
        isScreenLarge: false,
        santaImages: [
          '/images/santapeeking/santa.png',
          '/images/santapeeking/santa2.png',
          '/images/santapeeking/santa3.png',
          '/images/santapeeking/santa4.png',
          '/images/santapeeking/santa5.png',
          '/images/santapeeking/santa6.png',
        ],
        randomSantaImage: '',
      };
    },
    mounted() {
      this.checkScreenSize();
      window.addEventListener('resize', this.checkScreenSize);
      if (this.isScreenLarge) {
        this.startAutoPeek();
      }
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.checkScreenSize);
    },
    methods: {
      checkScreenSize() {
        this.isScreenLarge = window.innerWidth > 1440;
      },
      setRandomSantaImage() {
        const randomIndex = Math.floor(Math.random() * this.santaImages.length);
        this.randomSantaImage = this.santaImages[randomIndex];
      },
      peekSanta() {
        this.setRandomSantaImage();
        this.isPeeking = true;
      },
      resetSanta() {
        this.isPeeking = false; // Вимикаємо клас після завершення анімації
      },
      startAutoPeek() {
        setInterval(() => {
          if (!this.isPeeking && this.isScreenLarge) {
            this.peekSanta();
          }
        }, 10000); // Анімація кожні 10 секунд
      },
    },
  };
</script>
  
<style scoped>
  .santa-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
  
  .santa {
    position: absolute;
    bottom: 0px;
    left: -150px;
    transform: translateY(-50%) rotate(0deg);
    transition: transform 0.5s ease-in-out;
  }
  
  .santa img {
    width: 150px;
    height: auto;
  }
  
  .santa-active {
    animation: peek 3s ease-in-out forwards;
  }
  
  @keyframes peek {
    0% {
      transform: translateY(-50%) rotate(0deg);
      left: -150px;
    }
    25% {
      left: 0;
      transform: translateY(-50%) rotate(-30deg); /* Санта нахиляється виглядаючи */
    }
    50% {
      left: 0;
      transform: translateY(-50%) rotate(10deg); /* Санта дивиться прямо */
    }
    75% {
      left: 0;
      transform: translateY(-50%) rotate(-30deg); /* Санта повертається нахиляючись */
    }
    100% {
      left: -150px;
      transform: translateY(-50%) rotate(0deg); /* Санта ховається */
    }
  }
</style>
  