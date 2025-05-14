<template>
  <div class="snowflakes-container">
    <div
      v-for="snowflake in snowflakes"
      :key="snowflake.id"
      class="snowflake"
      :style="{
        left: snowflake.left,
        animationDuration: snowflake.speed,
        fontSize: snowflake.size,
        color: snowflake.color,
        animationDelay: snowflake.delay,
      }"
    >
      ❄
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      snowflakes: [],
    };
  },
  methods: {
    generateSnowflakes() {
      this.snowflakes = [];

      const screenWidth = window.innerWidth;
      let snowflakesCount;

      if (screenWidth < 768) {
        snowflakesCount = 8;
      } else if (screenWidth < 1440) {
        snowflakesCount = 20;
      } else {
        snowflakesCount = 35;
      }

      const colors = ['#FFFFFF', '#FF0000', '#70BE97', '#778CFB'];

      for (let i = 0; i < snowflakesCount; i++) {
        this.snowflakes.push({
          id: i,
          left: `${Math.random() * 100}vw`,
          speed: `${4 + Math.random() * 5}s`,
          size: `${Math.random() * 15 + 10}px`,
          color: colors[Math.floor(Math.random() * colors.length)], 
          delay: `${Math.random() * 3}s`, 
        });
      }
    },
    handleResize() {
      this.generateSnowflakes();
    },
  },
  mounted() {
    this.generateSnowflakes();
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
};
</script>


<style scoped>
.snowflakes-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: 0; 
}

.snowflake {
  position: absolute;
  top: -30px;
  animation: fall linear infinite;
  opacity: 0.8;
  animation-delay: var(--delay); 
}


@keyframes fall {
  0% {
    transform: translateY(0) rotate(0deg);
  }
  100% {
    transform: translateY(100vh) rotate(360deg);
  }
}
</style>
