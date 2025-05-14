<template>
  <div>
    <img 
      v-if="isImageVisible"
      :src="imageSrc"
      :style="imageStyle"
      alt="Random Image"
    />
    <audio ref="audio" :src="audioSrc" preload="auto" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';

const isImageVisible = ref(false);
const backgroundSound = ref(localStorage.getItem('backgroundSound') === 'true'); // Отримуємо значення з локального сховища
const imageSrc = '/images/summercomponents/mad-stare.png';
const audioSrc = '/songs/summer/fear.mp3';
const imageStyle = ref({
  position: 'fixed',
  top: '0px',
  left: '0px',
  width: '60px',
  height: '25px',
  opacity: 0.3,
  transform: 'scale(0)',
  transition: 'transform 15s ease, opacity 15s ease',
});

const setRandomPosition = () => {
  const randomTop = Math.floor(Math.random() * window.innerHeight);
  const randomLeft = Math.floor(Math.random() * window.innerWidth);

  imageStyle.value.top = `${randomTop}px`;
  imageStyle.value.left = `${randomLeft}px`;
};

const playAudio = () => {
  const audio = document.querySelector('audio');
  if (backgroundSound.value) {
    audio.currentTime = 0;
    audio.play();
  } else {
    audio.pause();
    audio.currentTime = 0;
  }
};

// Відстежуємо зміни в localStorage
const updateBackgroundSound = () => {
  backgroundSound.value = localStorage.getItem('backgroundSound') === 'true';
};

// Слухаємо зміну localStorage (якщо змінюється на іншій вкладці)
window.addEventListener('storage', (event) => {
  if (event.key === 'backgroundSound') {
    updateBackgroundSound();
  }
});

onMounted(() => {
  const randomDelay = Math.floor(Math.random() * (180000 - 60000) + 60000); 

  setTimeout(() => {
    isImageVisible.value = true;
    setRandomPosition();

    setTimeout(() => {
      imageStyle.value.transform = 'scale(1)';
      imageStyle.value.opacity = 1;

      playAudio(); // Запускаємо або ні залежно від backgroundSound

      setTimeout(() => {
        imageStyle.value.opacity = 0;
        setTimeout(() => {
          isImageVisible.value = false;
        }, 1500);
      }, 15000);
    }, 50);
  }, randomDelay); // Використовуємо випадкову затримку
});


// Відстежуємо зміни backgroundSound і оновлюємо звук
watch(backgroundSound, () => {
  playAudio();
});

// Видаляємо обробник події при знищенні компонента
onUnmounted(() => {
  window.removeEventListener('storage', updateBackgroundSound);
});
</script>

<style scoped>
img {
  transition: transform 15s ease, opacity 15s ease, top 0.5s, left 0.5s;
}
</style>
