<template>
    <div ref="fireCanvas" class="fire-container"></div>
  </template>
  
  <script>
  import * as THREE from 'three';
  
  export default {
    name: 'FireEffect',
    mounted() {
      this.initFireEffect();
    },
    methods: {
      initFireEffect() {
        // Створення сцени
        const scene = new THREE.Scene();
        
        // Створення камери
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        
        // Створення рендерера
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        this.$refs.fireCanvas.appendChild(renderer.domElement);
  
        // Додавання світла
        const light = new THREE.PointLight(0xffa500, 1, 50);
        light.position.set(0, 10, 0);
        scene.add(light);
  
        // Створення матеріалу для полум'я
        const flameMaterial = new THREE.MeshBasicMaterial({
          color: 0xff6600, // Оранжевий колір
          transparent: true,
          opacity: 0.6
        });
  
        // Функція для створення часток (вогню)
        function createFlameParticle() {
          const geometry = new THREE.SphereGeometry(0.2, 10, 10);
          const flame = new THREE.Mesh(geometry, flameMaterial);
          flame.position.set(Math.random() * 2 - 1, Math.random() * 2 + 1, Math.random() * 2 - 1);
          scene.add(flame);
          return flame;
        }
  
        // Створення часток багаття
        const flames = [];
        for (let i = 0; i < 100; i++) {
          flames.push(createFlameParticle());
        }
  
        // Анімація
        function animate() {
          requestAnimationFrame(animate);
  
          // Рух часток
          flames.forEach(flame => {
            flame.position.y += Math.random() * 0.1;
            flame.position.x += (Math.random() - 0.5) * 0.2;
            flame.position.z += (Math.random() - 0.5) * 0.2;
  
            // Зміна розміру та прозорості часток
            flame.scale.set(1 + Math.random() * 0.5, 1 + Math.random() * 0.5, 1 + Math.random() * 0.5);
            flame.material.opacity = Math.random() * 0.5 + 0.5;
          });
  
          // Рендер сцени
          renderer.render(scene, camera);
        }
  
        // Позиція камери
        camera.position.z = 10;
  
        // Запуск анімації
        animate();
  
        // Оновлення розміру канваса при зміні розміру вікна
        window.addEventListener('resize', () => {
          renderer.setSize(window.innerWidth, window.innerHeight);
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
        });
      }
    }
  };
  </script>
  
  <style scoped>
  .fire-container {
    width: 100%;
    height: 100vh;
    position: relative;
    overflow: hidden;
    z-index: 1000;
  }
  </style>
  