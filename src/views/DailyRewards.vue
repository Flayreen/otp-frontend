<template>
  <div class="max-w-[1920px] mx-auto">
    <div class="content relative lg:px-[80px] md:px-[40px] sm:px-[16px]">
      <baseheader class="bg-[#171717d8] z-[1000] absolute rounded-xl" />
      <div class="flex flex-col lg:px-[70px] lg:mb-16 mb-8 lg:mt-2 max-w-[1200px] mx-auto">
        <div data-aos="fade-down" data-aos-duration="800" data-aos-delay="100" class="md:text-[22px] sm:text-[20px] russo letter-s-2 text-white mb-6">Нагорода за награний час</div>
        <div data-aos="fade-up" data-aos-duration="800" data-aos-delay="200" class="flex flex-wrap justify-between sm:flex-col md:flex-row sm:items-center sm:mr-0 md:mr-[105px]">
          <template v-for="(item, index) in dailyRewards.filter(item => !item.isPaid)" :key="index">
            <div class="gradient-border" :style="{ '--border-color': item.color }">
              <div class="inner-content flex flex-col text-white p-4 rounded-xl max-w-[277px]">
                <div class="flex flex-col items-center gap-4">
                  <div class="flex flex-col items-center gap-4">
                    <img :src="item.displayImage" alt="Image" class="reward-image w-[100px] h-[100px]" />
                    <div class="flex flex-col items-center gap-2">
                      <p class="russo text-[14px] text-white letter-s-0-8px">{{ item.displayName }}</p>
                      <p class="text-[12px] font-medium text-AFAFAF letter-s-0-8px">
                        Потрібно відіграти: {{ item.required_playtime / 60 + ' год.' }}
                      </p>
                    </div>
                  </div>
                  <template v-if="playedMinutes >= item.required_playtime">
                    <template v-if="collectedRewards.includes(item.reward_id)">
                      <button class="text-[16px] russo text-title-casses letter-s-0-8px rounded-lg py-2 px-6 cursor-not-allowed" disabled>
                        Нагорода забрана
                      </button>
                    </template>
                    <template v-else>
                      <button
                        :class="['text-[16px] russo text-title-casses letter-s-0-8px rounded-lg py-2 px-6 duration-300']"
                        @click="claimReward(item.reward_id)"
                        :style="{ background: item.color }"
                      >
                        Забрати нагороду
                      </button>
                    </template>
                  </template>
                  <template v-else>
                    <button
                      class="bg-transparent text-[16px] letter-s-0-8px russo text-white rounded-lg py-2 px-6 duration-300 cursor-not-allowed border-2"
                      :style="{
                        borderColor: item.color || '#ffffff',
                        color: item.color || '#ffffff'
                      }"
                    >
                      Зіграйте ще трохи
                    </button>
                  </template>
                </div>
              </div>
            </div>
          </template>

        </div>
        <div data-aos="fade-down" data-aos-duration="800" data-aos-delay="100" class="flex h-[54px] lg:gap-4 md:gap-6 sm:gap-2 bg-171717 my-6">
          <div v-for="(hour, index) in 6" :key="index"
              class="relative hour-block"
              :class="{ 'filled': playedMinutes >= (index + 1) * 60 }"
              :style="{
                width: containerWidths[index],
                borderColor: progressColors[index],
                backgroundColor: 'transparent'
              }"
          >
            <div
              class="absolute top-0 left-0 h-full transition-all duration-500 progress-fill"
              :style="{
                width: playedMinutes > index * 60 
                  ? Math.min((playedMinutes - index * 60) / 60 * 100, 100) + '%'
                  : '0%',
                backgroundColor: progressColors[index]
              }"
            ></div>
            <p class="absolute russo text-white z-10 text-[16px] transform md:block sm:hidden">
              {{ index + 1 }} год.
            </p>
            <p class="absolute russo text-white z-10 text-[16px] transform md:hidden sm:block">
              {{ index + 1 }}h
            </p>
          </div>
        </div>

        <div 
          v-if="steamID"
          data-aos="fade-up" 
          data-aos-duration="800" 
          data-aos-delay="200" 
          class="flex flex-wrap justify-between md:ml-[70px] sm:flex-col sm:items-center sm:ml-0 md:flex-row"
        >
          <template v-for="(item, index) in dailyRewards.filter(item => item.isPaid)" :key="index">
            <div 
              class="gradient-border" 
              :style="{ '--border-color': paidDailyReward ? item.color : '#AFAFAF' }"
            >
              <div class="inner-content flex flex-col text-white p-4 rounded-xl max-w-[277px]">
                <div class="flex flex-col items-center gap-4">
                  <div class="flex flex-col items-center gap-4">
                    <img :src="item.displayImage" alt="Image" class="reward-image w-[100px] h-[100px]" />
                    <div class="flex flex-col items-center gap-2">
                      <p class="russo text-[14px] text-white letter-s-0-8px">{{ item.displayName }}</p>
                      <p class="text-[12px] font-medium text-AFAFAF letter-s-0-8px">
                        Потрібно відіграти: {{ item.required_playtime / 60 + ' год.' }}
                      </p>
                    </div>
                  </div>
                  <template v-if="playedMinutes >= item.required_playtime">
                    <template v-if="collectedRewards.includes(item.reward_id)">
                      <button class="text-[16px] russo text-title-casses letter-s-0-8px rounded-lg py-2 px-6 cursor-not-allowed" disabled>
                        Нагорода забрана
                      </button>
                    </template>
                    <template v-else>
                      <button
                        :class="['text-[16px] russo text-title-casses letter-s-0-8px rounded-lg py-2 px-6 duration-300']"
                        @click="claimReward(item.reward_id)"
                        :style="{
                          background: paidDailyReward ? item.color : '#AFAFAF',
                          color: paidDailyReward ? '#ffffff' : '#171717'
                        }"
                        :disabled="!paidDailyReward"
                      >
                        {{ paidDailyReward ? 'Забрати нагороду' : 'Потрібен преміум' }}
                      </button>
                    </template>
                  </template>
                  <template v-else>
                    <button
                      class="bg-transparent text-[16px] letter-s-0-8px russo text-white rounded-lg py-2 px-6 duration-300 cursor-not-allowed border-2"
                      :disabled="!paidDailyReward"
                      :style="{
                        borderColor: paidDailyReward ? (item.color || '#ffffff') : '#AFAFAF',
                        color: paidDailyReward ? (item.color || '#ffffff') : '#AFAFAF'
                      }"
                    >
                      {{ paidDailyReward ? 'Зіграйте ще трохи' : 'Потрібен преміум' }}
                    </button>
                  </template>
                </div>
              </div>
            </div>
          </template>
        </div>


      </div>
      <basefooter class="lg:px-[70px]"/>
    </div>
  </div>
</template>

<script setup>
import baseheader from '@/components/base/Header.vue';
import basefooter from '@/components/base/Footer.vue'
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

let playedMinutes = ref(0);
let dailyRewards = ref([]);
let timeReset = ref(0);
let collectedRewards = ref([]);
const paidDailyReward = ref(false);
const expirationPaidDailyReward = ref(0)

const containerWidths = ref(['15%', '15%', '15%', '15%', '15%', '15%']);

const progressColors = [
  '#4F24A7', 
  '#B641C4', 
  '#B641C4', 
  '#D75857', 
  '#D75857', 
  '#D75857', 
];

const urlBattlepass = computed(() => `https://otpdayz.store:3000`);

const steamID = localStorage.getItem('steamID');

const fetchRewards = async () => {
  try {
    const res = await axios.get(`${urlBattlepass.value}/dailyReward/getRewards`);
    dailyRewards.value = res.data;
  } catch (error) {
    console.error("Помилка при отриманні нагород:", error);
  }
};
const getPaidDailyReward = async () => {
  try {
    if (steamID) {
      const res = await axios.get(`${urlBattlepass.value}/getSubscription/${steamID}/paidDailyReward`);
      paidDailyReward.value = res.data.status;
      expirationPaidDailyReward.value = res.data.expiration;
    }
  } catch (error) {
    console.error("Помилка при отриманні страховки:", error);
  }
};

const fetchPlaytime = async () => {
  try {
    const res = await axios.get(`${urlBattlepass.value}/dailyReward/getPlaytime/${steamID}`);
    collectedRewards.value = res.data.collected_rewards;
    timeReset.value = res.data.resetTime;
    playedMinutes.value = Math.min(res.data.playtime, 360);
  } catch (error) {
    console.error("Помилка при отриманні часу гри:", error);
  }
};

fetchRewards();
fetchPlaytime();
getPaidDailyReward();

const claimReward = async (val) => {
  try {
    await axios.post(`${urlBattlepass.value}/dailyReward/collectReward`, {
      steamid: steamID,
      reward_id: val
    });
    collectedRewards.value.push(val);
  } catch (error) {
    console.error("Помилка при зборі нагороди:", error);
  }
};
</script>

<style>

.hour-block {
  height: 44px;
  background-color: transparent;
  border: 4px solid;
  border-radius: 10px;
  transition: background-color 0.3s;
  position: relative;
}

.hour-block.filled {
  background-color: transparent;
}

.progress-fill {
  transition: width 0.3s ease;
}

.letter-s-2px {
  letter-spacing: 2px;
}

.letter-s-1-4px {
  letter-spacing: 1.4px;
}

.text-title-casses {
  text-align: center;
}

.hour-block p {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.reward-image {
  width: 100%;
  
  height: auto;
}

.gradient-border {
  /* Градієнт для зовнішнього контейнера */
  --border-width: 4px;
  border-radius: 16px;
  background: linear-gradient(to bottom, #171717 20%, var(--border-color));
  padding: var(--border-width);
  display: inline-block;
}

.inner-content {
  /* Фон, який буде видно всередині градієнтного бордера */
  border-radius: calc(16px - var(--border-width));
  background: #171717; /* або інший бажаний фон */
}
</style>


