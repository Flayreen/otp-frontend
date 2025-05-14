<template>
  <div v-if="isLargeScreen" class="light-overlay" :style="lightStyle"></div>
  <slot /> <!-- Вміст сайту, до якого додається ефект світла -->
</template>

<script setup>
  import { ref, onMounted, onBeforeUnmount, computed } from 'vue';

  const lightX = ref(50);
  const lightY = ref(50);
  
  const screenWidth = ref(window.innerWidth);  // Зберігаємо ширину вікна

  // Визначаємо, чи екран великий
  const isLargeScreen = computed(() => screenWidth.value > 1440);
  
  // Функція, що оновлює координати світла
  const updateLight = (event) => {
    const { clientX, clientY } = event;
    const width = window.innerWidth;
    const height = window.innerHeight;

    lightX.value = (clientX / width) * 100;
    lightY.value = (clientY / height) * 100;
  };

  // Функція для скидання ефекту світла, коли миша виходить за межі
  const resetLight = () => {
    lightX.value = 50;
    lightY.value = 50;
  };

  // Стиль для світлової області, що залежить від координат мишки
  const lightStyle = computed(() => ({
    background: `radial-gradient(circle at ${lightX.value}% ${lightY.value}%, rgba(255, 255, 255, 0.2) 0%, rgba(23, 23, 23, 0.1) 5%)`,
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    pointerEvents: 'none',
    zIndex: 1000,
    transition: 'background 0.1s ease-out',
  }));

  // Додаємо обробники подій для миші
  onMounted(() => {
    window.addEventListener('mousemove', updateLight);
    window.addEventListener('mouseleave', resetLight);
    window.addEventListener('resize', updateScreenWidth); // Оновлюємо ширину при зміні розміру вікна
    document.body.style.cursor = 'url(/images/titles/flashlight.png), auto';
  });

  // Очищаємо обробники подій, коли компонент буде знищено
  onBeforeUnmount(() => {
    window.removeEventListener('mousemove', updateLight);
    window.removeEventListener('mouseleave', resetLight);
    window.removeEventListener('resize', updateScreenWidth);
    document.body.style.cursor = 'auto';
  });

  // Оновлення ширини екрану при зміні розміру
  const updateScreenWidth = () => {
    screenWidth.value = window.innerWidth;
  };
</script>

<style scoped>
  /* Цей стиль залишається пустим, оскільки світло вже визначено через inline стиль */
</style>
