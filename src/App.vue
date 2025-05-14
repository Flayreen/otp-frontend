<template>
  <div id="app">
    <!-- <ServerSelector @link-changed="handleLinkChange" /> -->
    <RouterView />
    <AdBanner />
    <Basket />
    <LightEffect />
    <Fireflies />
    <!-- <Randomeyes /> -->
    <BackgroundSound />
    <Campfire />
    <!-- <FireEffect /> -->
    <!-- <SunlightEffect /> -->
    <!-- <Snowflakes />  різноманітні зимові компоненти
    <SantaPeeking />
    <AudioPlayer /> -->
  </div>
</template>

<script>
// import ServerSelector from '@/components/selectServer/SelectServer.vue';
// import Snowflakes from './components/snowflakes/Snowflakes.vue';
// import SantaPeeking from './components/santapeeking/SantaPeeking.vue';
// import AudioPlayer from './components/music/AudioPlayer.vue';
// import FireEffect from './components/fire/FireEffect.vue';
import BackgroundSound from './components/summerEffects/BackgroundSound.vue';
// import Randomeyes from './components/summerEffects/Randomeyes.vue';
import Fireflies from './components/summerEffects/Fireflies.vue';
import AdBanner from './components/adbanner/AdBanner.vue';
import Basket from './components/basket/Basket.vue';
import LightEffect from './components/summerEffects/LightEffect.vue';
import Campfire from './components/summerEffects/Campfire.vue';
// import SunlightEffect from "./components/light/light.vue";;

import AOS from 'aos';
import 'aos/dist/aos.css';

export default {
  components: {
    // ServerSelector,
    // SunlightEffect,
    // FireEffect,
    Campfire,
    BackgroundSound,
    // Randomeyes,
    Fireflies,
    LightEffect,
    AdBanner,
    Basket,
    // Snowflakes,
    // SantaPeeking,
    // AudioPlayer,
  },
  data() {
    return {
      currentServerLink: '', 
    };
  },
  methods: {
    handleLinkChange(link) {
      this.currentServerLink = link;
    },
    // Оновлення AOS після зміни маршруту
    updateAOS() {
      AOS.refresh();
    },
  },
  mounted() {
    // Ініціалізація AOS
    AOS.init({
      duration: 1000, // Тривалість анімації
      once: true, // Анімація відбудеться лише один раз
    });
  },
  watch: {
    $route(to, from) {
      this.$nextTick(() => {
        // Оновлюємо AOS після зміни маршруту
        this.updateAOS();
      });
    },
  },
};
</script>


<style>
#app {
  position: relative;  
}

[data-aos="fade-up"] {
  opacity: 0; /* Початкова прозорість */
  transform: translateY(50px); /* Початкове положення (елемент буде зсунутий на 50px) */
}
[data-aos="fade-down"] {
  opacity: 0; /* Початкова прозорість */
  transform: translateY(-50px); /* Початкове положення (елемент буде зсунутий на 50px) */
}

[data-aos="fade-up"].aos-animate,
[data-aos="fade-down"].aos-animate {
  opacity: 1; /* Прозорість після анімації */
  transform: translateY(0); /* Повертання елемента до його початкової позиції */
}

</style>


