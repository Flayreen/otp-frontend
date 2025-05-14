 <template>
  <div class="flex items-center justify-center w-full min-h-screen">
    <div class="max-w-[1920px]">
      <div class="content box lg:px-[80px] md:px-[40px] sm:px-[16px]">
        <baseheader class="mb-16 rounded-xl" />
        <div>
          <div data-aos="fade-down" data-aos-duration="800" data-aos-delay="100" class="md:text-[24px] sm:text-[22px] lg:px-[70px] letter-s-0-8px russo text-white md:ml-0 sm:ml-2 mb-12 lg:mt-4">Кейси з цінним лутом:</div>
            <div data-aos="fade-up" data-aos-duration="800" data-aos-delay="200">
              <template v-for="(it, idx) in filteredChests" :key="idx">
                <div class="flex flex-col items-center mb-12 ">
                  <div class="flex items-center sm:flex-col-reverse in:flex-row  mb-20 gap-16 max-w-[1100px]">
                    <div class="flex flex-col gap-16 sm:items-center in:items-start">
                      <div class="flex flex-col gap-8 sm:items-center in:items-start">
                        <div class="flex flex-col gap-2 sm:items-center in:items-start">
                          <div class="russo">
                            <span class="text-[#ffffff] letter-s-0-8px russo lg:text-[22px] md:text-[24px] sm:text-[22px]">Кейс {{ it.displayName }}</span>
                          </div>
                          <p class="letter-s-0-8px lg:text-[12px] md:text-[14px] sm:w-[375px] lg:w-[380px] in:w-[auto]  font-semibold text-[#AFAFAF]">
                            Базовий кейс для новачків, у якому можна знайти необхідні речі для старту: аптечки, базову зброю та стандартний набір спорядження.
                          </p>
                        </div>
                        <template v-if="aviablesCases[it.chest_id]>0">
                          <p class="lg:text-[16px] md:text-[14px] font-semibold text-white">
                            Доступних кейсів {{ aviablesCases[it.chest_id]}}х
                          </p>
                        </template>
                        <template v-else>
                          <p class="text-[16px] font-semibold text-white">
                            Немає доступних кейсів
                          </p>
                        </template>
                      </div>
                      <template v-if="aviablesCases[it.chest_id]>0">
                        <button
                          @click="openCase(it.chest_id)"
                          class="rounded-[10px] h-[48px] w-[312px] bg-F7CF14 text-[18px] letter-s-0-8px font-bold text-black mb-16"
                          >
                          Відкрити Кейс
                        </button>
                      </template>
                      <template v-else>
                        <button
                          class="rounded-[10px] h-[48px] w-[312px] outline outline-2 outline-F7CF14 text-[16px] font-semibold text-white mb-16"
                          >
                          Отримайте кейс щоб відкрити
                        </button>
                      </template>
                    </div>
                    <img :src="it.displayImage" alt="" class="md:max-w-[350px] sm:max-w-[343px] sm:px-8 md:px-0" />
                  </div>
                  
                  <div class="flex justify-center mb-12 flex-wrap gap-[16px]">
                    <template v-for="(i, id) in it.drops" :key="id">
                      <div class="flex-shrink-0 flex-grow md:min-w-[168px] sm:min-w-[144px] mb-2 md:max-w-[168px] sm:max-w-[144px]">
                        <div class="md:min-w-[168px] sm:min-w-[144px] md:h-[168px] sm:h-[144px] mb-[6px] rounded-[4px] flex flex-col items-center w-full" :style="{ background: `linear-gradient(to bottom, #171717 0%, ${i.textColor2} 80%)` }">
                          <div class="w-full h-0 pb-[100%] relative">
                            <img :src="i.img" alt="" class="absolute inset-0 w-full h-full object-contain rounded-[4px]" />
                            <div class="h-[9px] w-full absolute bottom-0 rounded-b-[4px]" :style="{ backgroundColor: `${i.textColor}` }"></div>
                          </div>
                        </div>
                        <div class="flex flex-col gap-1 ml-2">
                          <p class="text-white no-wrap letter-s-0-8px font-semibold lg:text-[14px] md:text-[13px] sm:text-[11px]">{{ i.displayName || '????' }}</p>
                          <p class="text-AFAFAF font-medium letter-s-0-8px lg:text-[12px] md:text-[10px] sm:text-[10px]">{{ i.desc || '????' }}</p>
                        </div>
                      </div>
                    </template>
                  </div>
                </div>
              </template>
            </div>
        </div>
        <basefooter class="lg:px-[70px]"/>
      </div>
    </div>
  </div>
  
  <template v-if="openModal">
    <div class="fixed top-0 w-full h-full opacity-100 bg-0B0B0B z-1500" style="background-color: rgba(0, 0, 0, 0.8);"></div>
    <div class="fixed top-0 z-50 w-full h-full opacity-100 bg-0B0B0B" style="background-color: rgba(0, 0, 0, 0.8);">
      <div class="fixed w-full transform -translate-x-1/2 -translate-y-1/2 rounded-lg rolling-container bg-0B0B0B top-1/2 left-1/2">
        <div class="rolling-content" :style="{ transform: `translateX(${realOffset}px)` }">
          <template v-for="(i, id) in dataModal.rollList" :key="id">
            <div class="item">
              <div class="opacity-100 lg:w-[200px] w-full max-w-[200px] mb-4 mx-auto lg:h-[200px] relative" :style="{ background: `linear-gradient(to bottom, #171717 0%, ${i.textColor2} 80%)` }">
                <img :src="i.img" alt="" class="absolute inset-0 w-full h-full object-contain rounded-[5px]" />
                <div class="h-[11px] w-full absolute bottom-0 rounded-b-[5px]" :style="{ backgroundColor: `${i.textColor}` }"></div>
              </div>
              <p class="text-white text-[16px] letter-s-0-8px font-semibold">{{ i.displayName }}</p>
            </div>
          </template>
        </div>
      
        <div class="blur-overlay"></div>
        
        <div class="crosshair"></div>
      </div>
      
      <template v-if="openedModal">
        <div class="fixed transform -translate-x-1/2 bg-black opacity-100 bottom-1/4 left-1/2">
          <div class="absolute h-full rounded-lg bg-F7CF14 left-1/2" :style="{ width: 100-collectButtonprogressPercentage + '%', transform: 'translateX(-50%)' }"></div>
          <button class="text-[24px] text-0B0B0B font-semibold rounded-lg h-full w-full relative px-24 py-1" :disabled="isCollectButtonDisabled" @click="openModal=false, dataModal = {}, openedModal = false">Забрати</button>
        </div>
      </template>

    </div>
  </template>
</template>

<script setup>
import baseheader from '@/components/base/Header.vue'
import basefooter from '@/components/base/Footer.vue'
import { ref, computed } from 'vue'
import axios from 'axios'

const savedPort = ref(localStorage.getItem("selectedServerPort"));
const steamID = localStorage.getItem('steamID');

let realOffset = ref(0)
let currentOffset = ref(0)
let animationInterval = ref(null)
let soundInterval = ref(null)
let Chests = ref([]);
let openedModal = ref(false)
let openModal = ref(false)
let dataModal = ref([]);
let aviablesCases = ref([]);
let isCollectButtonDisabled = ref(false)
let collectButtonprogressPercentage = ref(100)
let audio = ref(new Audio('win.m4a'))
audio.value.volume = 0.1;

const filteredChests = computed(() => {
  if (steamID) {
    return Chests.value;
  } else {
    return Chests.value.filter(chest => 
      chest.chest_id === "case_kepka" || chest.chest_id === "case_topik"
    );
  }
});

function startRolling() {
  let rollingSpeed = 200;

  audio.value = new Audio('caseroll.mp3')
  audio.value.volume = 1.0;
  audio.value.playbackRate = 2.0;
  audio.value.play()

  soundInterval.value = setInterval(() => {
    if (currentOffset.value > -18000) {
      audio.value = new Audio('caseroll.mp3')
      audio.value.volume = 0.8;
      audio.value.playbackRate = 2;
      audio.value.play()
    } else {
      clearInterval(soundInterval.value);
      audio.value = new Audio('caseroll.mp3')
      audio.value.volume = 0.4;
      audio.value.playbackRate = 1.8;
      audio.value.play()
    }
  }, 1000);

  animationInterval.value = setInterval(() => {
    if (currentOffset.value <= -(200 * 110)) {
      clearInterval(soundInterval.value);
      clearInterval(animationInterval.value);
      currentOffset.value = 0
      openedModal.value = true

      audio.value = new Audio('casedrop.mp3')
      audio.value.volume = 0.4;
      audio.value.play()
    } else {
      rollingSpeed = Math.max(2, ((currentOffset.value / (200 * 110)) + 1) * 200)
      currentOffset.value -= rollingSpeed;
      realOffset.value = currentOffset.value + window.innerWidth / 2 - 100
    }
  }, 16);
}

const progressBarWidth = computed(() => {
  const maxMinutes = 6 * 60
  let width = (playedMinutes.value / maxMinutes) * 100 + '%'
  return width
})

function disableCollectButtonButton() {
  isCollectButtonDisabled.value = true;
  collectButtonprogressPercentage.value = 100;
  setTimeout(() => {
    isCollectButtonDisabled.value = false;
  }, 4000);
  const interval = setInterval(() => {
    collectButtonprogressPercentage.value -= 1;
    if (collectButtonprogressPercentage.value <= 0) {
      clearInterval(interval);
    }
  }, 40);
}

const urlChests = computed(() => `https://otpdayz.store:3000/cases`);
const urlBattlepass = computed(() => `https://otpdayz.store:3000/battlepass`);


axios.get(`${urlChests.value}/getChests`).then((res) => {
  res.data.forEach(chest => {
    let totalChance = chest.drops.reduce((total, element) => total + parseFloat(element.chance), 0);
    chest.drops.forEach(element => {
      element.chance = ((element.chance / totalChance) * 100).toFixed(1);
    });
  });
  Chests.value = res.data;
});

axios.get(`${urlChests.value}/getPlayerKeys/${steamID}`).then((res) => {
  aviablesCases.value = res.data;
})

const openCase = (val) => {
  if (aviablesCases.value[val] == 0) {
    return
  }
  audio.value.pause()
  openModal.value = true

  axios
    .post(`${urlChests.value}/openChest`, {
      steamid: steamID,
      chest_id: val
    })
    .then((res) => {
      console.log(res.data.product_id)
      startRolling()
      disableCollectButtonButton()
      dataModal.value = res.data
      aviablesCases.value[val]--;
    })
}
</script>

<style>
.blur-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  background: radial-gradient(circle, transparent 30%, rgba(0, 0, 0, 0.9) 60%);
  
  z-index: 1500;
}

.box {
  box-sizing: border-box;
}
.letter-s-0-8px {
  letter-spacing: 0.8px;
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
.gradient-bg1 {
  background: linear-gradient(to bottom, #171717 0%, rgb(87, 109, 224, 0.7) 80%);
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
.rolling-container {
  overflow: hidden;
  width: 100%;
  position: relative;
}

.rolling-content {
  display: flex;
  transition: transform 0.5s ease-out;
}

.item {
  display: inline-block;
  text-align: center;
  padding: 10px;
}

.item-img {
  width: 200px; /* Adjust based on your design */
  height: 200px; /* Adjust based on your design */
  margin-bottom: 10px;
}

.crosshair {
  position: absolute;
  top: 0;
  left: 50%;
  width: 4px;
  height: 100%;
  background-color: #C30000;
  transform: translateX(-50%);
  pointer-events: none;
}

</style>
