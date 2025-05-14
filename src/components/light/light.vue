<template>
    <div ref="threeContainer" class="three-container"></div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import * as THREE from "three";

const threeContainer = ref(null);

onMounted(() => {
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    let renderer = new THREE.WebGLRenderer({ alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    threeContainer.value.appendChild(renderer.domElement);

    // 🌞 Сонячне світло
    let sunLight = new THREE.PointLight(0xffdd99, 10, 1000);
    sunLight.castShadow = true;
    scene.add(sunLight);

    // 🟠 Сонце (видима сфера)
    let sunGeometry = new THREE.SphereGeometry(20, 32, 32);
    let sunMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xffaa33, 
        emissive: 0xffa500 
    });
    let sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sunMesh);

    // 🌟 Ореол (глоу) навколо сонця
    let glowMaterial = new THREE.ShaderMaterial({
        uniforms: {
            color: { value: new THREE.Color(0xffcc66) },
            intensity: { value: 1.5 }
        },
        vertexShader: `
            varying vec3 vNormal;
            void main() {
                vNormal = normal;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform vec3 color;
            uniform float intensity;
            varying vec3 vNormal;
            void main() {
                float glow = 1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0));
                gl_FragColor = vec4(color * intensity * glow, glow);
            }
        `,
        blending: THREE.AdditiveBlending,
        transparent: true,
    });

    let glowMesh = new THREE.Mesh(sunGeometry, glowMaterial);
    glowMesh.scale.set(1.8, 1.8, 1.8);
    scene.add(glowMesh);

    // ⚡ Промені (sprite із shader матеріалом)
    let raysMaterial = new THREE.SpriteMaterial({
        map: generateSunRaysTexture(),
        blending: THREE.AdditiveBlending,
        opacity: 0.8
    });

    let raysSprite = new THREE.Sprite(raysMaterial);
    raysSprite.scale.set(200, 200, 1);
    scene.add(raysSprite);

    // ☁️ Туман для атмосфери
    scene.fog = new THREE.Fog(0x222233, 200, 600);

    camera.position.set(0, 50, 250);
    sunLight.position.set(-50, 100, -100);
    sunMesh.position.copy(sunLight.position);
    glowMesh.position.copy(sunLight.position);
    raysSprite.position.copy(sunLight.position);

    function animate() {
        requestAnimationFrame(animate);

        // 🔄 Анімація руху сонця
        let time = Date.now() * 0.001;
        sunLight.position.x = Math.sin(time) * 120;
        sunLight.position.y = 80 + Math.cos(time * 0.5) * 20;
        sunLight.position.z = Math.cos(time) * 120;

        sunMesh.position.copy(sunLight.position);
        glowMesh.position.copy(sunLight.position);
        raysSprite.position.copy(sunLight.position);

        renderer.render(scene, camera);
    }

    animate();
});

// 🎨 Генеруємо текстуру променів
function generateSunRaysTexture() {
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");

    const gradient = ctx.createRadialGradient(size / 2, size / 2, 10, size / 2, size / 2, size / 2);
    gradient.addColorStop(0, "rgba(255, 204, 102, 1)");
    gradient.addColorStop(0.5, "rgba(255, 204, 102, 0.5)");
    gradient.addColorStop(1, "rgba(255, 204, 102, 0)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
}
</script>

<style scoped>
.three-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    overflow: hidden;
}
</style>
