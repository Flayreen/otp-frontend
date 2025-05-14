<template>
    <canvas ref="canvas" class="fireflies-canvas"></canvas>
  </template>
  
  <script setup>
  import { onMounted, onBeforeUnmount, ref } from 'vue';
  
  const canvas = ref(null);
  const ctx = ref(null);
  const fireflies = [];
  const fireflyCount = 20;
  
  // Створення світлячка
  function createFirefly() {
    return {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 1 + 1.5, // Розмір світлячка
      alpha: Math.random() * 0.5 + 0.5, // Прозорість
      speedX: Math.random() * 2 - 1, // Швидкість по осі X (більша швидкість)
      speedY: Math.random() * 0.5 - 0.25, // Швидкість по осі Y (більш горизонтальний рух)
      lifespan: Math.random() * 2 + 1, // Час життя
      blinkInterval: Math.random() * 50 + 50, // Інтервал блимання
      blinkTimer: 0, // Таймер для блимання
    };
  }
  
  // Малювання світлячків
  function drawFireflies() {
    ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height);
  
    fireflies.forEach((firefly, index) => {
      // Зміщення по осях
      firefly.x += firefly.speedX;
      firefly.y += firefly.speedY;
  
      // Блимання світлячка (зменшення альфи)
      firefly.blinkTimer++;
      if (firefly.blinkTimer > firefly.blinkInterval) {
        firefly.alpha = Math.random() * 0.5 + 0.2; // Міняємо альфу для блимання
        firefly.blinkTimer = 0;
        firefly.blinkInterval = Math.random() * 50 + 50; // Випадковий інтервал блимання
      }
  
      // Якщо світлячок виходить за межі екрану, перезавантажуємо його
      if (firefly.x < 0 || firefly.x > canvas.value.width || firefly.y < 0 || firefly.y > canvas.value.height) {
        fireflies[index] = createFirefly();
      }
  
      // Малювання світлячка
      ctx.value.beginPath();
      ctx.value.arc(firefly.x, firefly.y, firefly.size, 0, Math.PI * 2);
      ctx.value.fillStyle = `rgba(255, 255, 0, ${firefly.alpha})`; // Жовтий колір
      ctx.value.fill();
    });
  
    // Створення нових світлячків через певний час, але не більше 15
    if (fireflies.length < fireflyCount && Math.random() < 0.02) {
      fireflies.push(createFirefly());
    }
  
    requestAnimationFrame(drawFireflies);
  }
  
  onMounted(() => {
    ctx.value = canvas.value.getContext('2d');
    canvas.value.width = window.innerWidth;
    canvas.value.height = window.innerHeight;
  
    // Ініціалізація масиву світлячків
    for (let i = 0; i < fireflyCount; i++) {
      fireflies.push(createFirefly());
    }
  
    drawFireflies();
  });
  
  onBeforeUnmount(() => {
    fireflies.length = 0; // Очистити масив світлячків
  });
  </script>
  
  <style scoped>
  .fireflies-canvas {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000; /* Світлячки будуть поверх усіх елементів */
    pointer-events: none; /* Щоб вони не заважали клікам */
  }
  </style>
  