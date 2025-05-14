<template>
  <div v-if="isScreenLarge" class="sound-toggle">
    <button @click="toggleSound">
      <span v-if="isSoundOn">🔊 Вимкнути</span>
      <span v-else>🔈 Увімкнути</span>
    </button>
    <audio ref="audio1" loop>
      <source src="/songs/summer/atmosphere-night.mp3" type="audio/mpeg" />
      Ваш браузер не підтримує аудіо.
    </audio>
    <audio ref="audio2" loop>
      <source src="/songs/summer/campfire.mp3" type="audio/mpeg" />
      Ваш браузер не підтримує аудіо.
    </audio>
    <audio ref="audio3" :src="audioSrc" preload="auto" />
    <img 
      v-if="isImageVisible"
      :src="imageSrc"
      :style="imageStyle"
      alt="Random Image"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isSoundOn = ref(false);
const audio1 = ref(null);
const audio2 = ref(null);
const audio3 = ref(null);
const isScreenLarge = ref(window.innerWidth >= 1440);
const isImageVisible = ref(false);
const imageSrc = '/images/summercomponents/mad-stare.png';
const audioSrc = '/songs/summer/fear.mp3';
const imageStyle = ref({
  position: 'fixed',
  top: '0px',
  left: '0px',
  width: '60px',
  height: '25px',
  opacity: 0,
  transform: 'scale(0)',
  transition: 'transform 1.5s ease, opacity 1.5s ease',
});

const checkScreenSize = () => {
  isScreenLarge.value = window.innerWidth >= 1440;
};

onMounted(() => {
  window.addEventListener('resize', checkScreenSize);
  checkScreenSize();
  
  const randomDelay = Math.floor(Math.random() * (180000 - 60000) + 60000); 

  setTimeout(() => {
    isImageVisible.value = true;
    setRandomPosition();

    setTimeout(() => {
      imageStyle.value.transform = 'scale(1)';
      imageStyle.value.opacity = 1;
      
      if (isSoundOn.value) {
        playEffectAudio();
      }

      setTimeout(() => {
        imageStyle.value.opacity = 0;
        setTimeout(() => {
          isImageVisible.value = false;
        }, 1500);
      }, 15000);
    }, 50);
  }, randomDelay);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize);
});

const toggleSound = () => {
  isSoundOn.value = !isSoundOn.value;
  if (isSoundOn.value) {
    playAudio();
  } else {
    pauseAudio();
  }
};

const playAudio = () => {
  if (audio1.value && audio2.value) {
    audio1.value.volume = 0.4;
    audio2.value.volume = 0.4;
    audio1.value.play().catch(err => console.error('Помилка відтворення аудіо 1:', err));
    audio2.value.play().catch(err => console.error('Помилка відтворення аудіо 2:', err));
  }
};

const pauseAudio = () => {
  if (audio1.value && audio2.value) {
    audio1.value.pause();
    audio2.value.pause();
  }
};

const playEffectAudio = () => {
  if (audio3.value) {
    audio3.value.volume = 1;
    audio3.value.play().catch(err => console.error('Помилка відтворення ефекту:', err));
  }
};

const setRandomPosition = () => {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  
  const randomX = Math.floor(Math.random() * (screenWidth - 100)) + 'px';
  const randomY = Math.floor(Math.random() * (screenHeight - 100)) + 'px';
  
  imageStyle.value.top = randomY;
  imageStyle.value.left = randomX;
};
</script>

<style scoped>
.sound-toggle {
  position: fixed;
  bottom: 50%;
  left: 10px;
}

button {
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px 15px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  border-radius: 5px;
}

button:hover {
  background-color: rgba(0, 0, 0, 0.9);
}

img {
  transition: transform 1.5s ease, opacity 1.5s ease, top 0.5s, left 0.5s;
}
</style>
