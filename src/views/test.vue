<template>
  <div class="max-w-[1920px] mx-auto">
    <div class="overlay daily-bg fixed h-full w-full z-0 left-0"></div>
    <div class="content relative z-10 lg:px-[150px] px-5 py-[55px]">
      <baseheader class="mb-16 bg-[#171717d8] rounded-xl" />
      <div class="flex flex-col">
        <div class="text-[45px] bg-neutral-800 rounded-xl text-white mb-6">Кейси з цінним лутом:</div>
        <div class="flex flex-col flex-wrap">
          <template v-for="(it, idx) in Chests" :key="idx">
            <div class="container mx-auto mb-20 relative">
              <template v-if="aviablesCases[it.chest_id]>0">
                <p class="absolute top-12 lg:right-1/4 right-0 bg-red-500 p-4 rounded-full w-[200px] text-white mt-10">
                  x{{ aviablesCases[it.chest_id] }} Доступних кейсів
                </p>
              </template>
              <template v-else>
                <p class="absolute top-12 lg:right-1/4 right-0 bg-gray-500 p-4 rounded-full w-[200px] text-white mt-10">
                  x0 Доступних кейсів
                </p>
              </template>
              <div class="text-[40px] text-red-600 mb-10 bg-neutral-900 rounded-full">
                {{ it.displayName }}
              </div>
              <img :src="it.displayImage" alt="" class="max-w-[180px] mx-auto mb-10" />
              <template v-if="aviablesCases[it.chest_id]>0">
                <button
                  @click="openCase(it.chest_id)"
                  class="mb-6 p-3 rounded-xl bg-green-500 text-white w-[240px] hover:bg-green-600 duration-300"
                  >
                  Відкрити Кейс
                </button>
              </template>
              <template v-else>
                <button
                  class="mb-6 p-3 rounded-xl bg-neutral-900 text-white w-[240px] hover:bg-neutral-800 duration-300"
                  >
                  Відкрити Кейс
                </button>
              </template>
              <div class="lg:flex flex-row grid grid-cols-3 items-center flex-wrap gap-1">
                <template v-for="(i, id) in it.drops" :key="id">
                  <div class="bg-[#40404060] lg:max-w-[140px] max-w-[140px] w-full h-full mx-auto p-4 rounded-xl relative">
                    <img :src="i.img" alt="" class="lg:w-[90px] w-full max-w-[80px] mx-auto lg:h-[90px] mb-3" />
                    <p class="text-white no-wrap font-bold lg:text-[13px] text-[10px]" :style="{ color: `${i.textColor}` }">{{ i.displayName || '????' }}</p>
                    <!--<p
                      class="bg-neutral-900 absolute w-[40px] h-[40px] flex justify-center items-center rounded-full text-white text-[10px] top-2 right-2"
                    >
                      {{ i.chance }}%
                    </p>-->
                  </div>
                </template>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
  <template v-if="openModal">
    <div class="fixed bg-black opacity-[0.9] z-50 w-full h-full top-0" />
    <div
      class="bg-neutral-700 rounded-lg fixed z-[60] top-2/4 left-2/4"
      style="transform: translate(-50%, -50%)"
    >
      <img :src="dataModal.img" alt="" class="max-w-[360px] mb-6 p-4" />
      <div class="max-w-[320px] mx-auto">
        <p class="text-[#a8a8a8] text-[30px]">Ви отримали:</p>
        <p class="text-[30px] my-5" :style="{ color: `${dataModal.textColor}` }">{{ dataModal.displayName }}!</p>
        <div class="relative">
          <div class="bg-neutral-700 text-white p-6 rounded-lg">
            <div class="bg-gray-700 rounded-lg h-full w-full relative">
              <div class="bg-green-500 rounded-lg h-full absolute top-0 left-1/2" :style="{ width: 100-collectButtonprogressPercentage + '%', transform: 'translateX(-50%)' }"></div>
              <button 
                class="text-white rounded-lg h-full w-full relative z-10 px-8 py-4"
                :disabled="isCollectButtonDisabled"
                @click="openModal=false, dataModal = {}"
              >
                Забрати
              </button>
            </div>
          </div>
          <div v-if="isCollectButtonDisabled" class="absolute inset-0">
            <div class="progress-bar h-full" :style="{ width: collectButtonprogressPercentage + '%' }"></div>
          </div>
        </div>
    </div>
      <!--<p
        class="bg-neutral-900 absolute w-[40px] h-[40px] flex justify-center items-center rounded-full text-white top-2 right-2"
      >
        {{ dataModal.chance }}%
      </p>-->
    </div>
  </template>
</template>

<script setup>
import baseheader from '@/components/base/Header.vue'
import { ref, computed, onMounted, watch, watchEffect } from 'vue'
import axios from 'axios'

let Chests = ref([])
let openModal = ref(false)
let dataModal = ref([])
let aviablesCases = ref([])
let isCollectButtonDisabled = ref(false)
let collectButtonprogressPercentage = ref(100)
let audio = ref(new Audio('win.m4a'))
audio.value.volume = 0.1;

const selectedServerPort = ref(localStorage.getItem('selectedServerPort') || '3000'); // Default port
const getBaseUrl = () => `https://otpdayz.store:${selectedServerPort.value}`;

const fetchChests = async () => {
  try {
    const res = await axios.get(`${getBaseUrl()}/chests/getChests`);
    res.data.forEach(chest => {
      let totalChance = chest.drops.reduce((total, element) => total + parseFloat(element.chance), 0);
      chest.drops.forEach(element => {
        element.chance = ((element.chance / totalChance) * 100).toFixed(1);
      });
    });
    Chests.value = res.data;
  } catch (error) {
    console.error('Error fetching chests:', error);
  }
}

const fetchPlayerKeys = async () => {
  const steamID = localStorage.getItem('steamID');
  try {
    const res = await axios.post(`${getBaseUrl()}/chests/getPlayerKeys`, {
      steamid: steamID
    });
    aviablesCases.value = res.data;
  } catch (error) {
    console.error('Error fetching player keys:', error);
  }
}

const openCase = (val) => {
  if (aviablesCases.value[val] == 0) {
    return;
  }

  audio.value.pause();
  openModal.value = true;

  const steamID = localStorage.getItem('steamID');
  axios.post(`${getBaseUrl()}/chests/openChest`, {
    steamid: steamID,
    chest_id: val
  }).then((res) => {
    disableCollectButtonButton();
    audio.value = new Audio('win.m4a');
    audio.value.volume = 0.1;
    audio.value.play();
    dataModal.value = res.data;
    aviablesCases.value[val]--;
  }).catch(error => {
    console.error('Error opening chest:', error);
  });
}

watch(selectedServerPort, () => {
  fetchChests(); 
  fetchPlayerKeys(); 
});

onMounted(() => {
  fetchChests();
  fetchPlayerKeys();
});

function disableCollectButtonButton() {
  collectButtonprogressPercentage.value = 100;
  setTimeout(() => {
  }, 4000);
  
  const interval = setInterval(() => {
    collectButtonprogressPercentage.value -= 1;
    if (collectButtonprogressPercentage.value <= 0) {
      clearInterval(interval);
    }
  }, 1000);
}
</script>


<style>
.daily-bg {
  background: url('/images/bg-daily.png');
  background-repeat: no-repeat;
  background-size: cover;
}
.status__progress-bar {
  width: 100%;
  height: 40px;
  background-color: #e1e1e1;
  position: relative;
  border-radius: 6px;
}
.status__progress-bar span {
  border-radius: 6px 0px 0px 6px;
  display: block;
  height: 100%;
}
.rgb-text {
  background: linear-gradient(
    90deg,
    rgb(166, 166, 236),
    rgb(130, 82, 241),
    rgb(175, 94, 233),
    violet
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-weight: 600;
  display: inline;
}
</style>
