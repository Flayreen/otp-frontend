<template>
  <header
    data-aos="fade-down" data-aos-duration="1200"
    class="relative z-20 flex flex-row justify-between py-3 pt-6 header md:mb-0 sm:mb-4 rounded-xl"
  >
    <nav class="links lg:flex hidden flex-row items-center xl:text-[20px] lg:text-[14px]">
      <div class="image w-[110px] max-w-[110px] min-w-[110px] mr-8">
        <img
          src="/images/titles/title.png"
          alt="banner"
          class="hidden w-full lg:block"
        />
      </div>
      <router-link 
        v-for="(item, idx) in visibleLinks" 
        :key="idx" 
        :to="item.link" 
        class="xl:mr-10 md:mr-4 lg:mr-6">
        <p class="text-[14px] font-bold text-[#ffffff] hover:bg-F7CF14 hover:text-black rounded-[8px] p-2 lg:px-4 duration-300">
          {{ item.title }}
        </p>
      </router-link>
    </nav>


    <div class="items-center justify-center hidden lg:flex">
      <template v-if="steamID">
        <div class="flex items-center gap-6">
          <div class="flex items-center gap-3">
            <span class="russo text-[16px] text-F7CF14">{{ coinBalance }}</span>
            <img class="w-[18px] h-[18px]" src="/images/basket/Krab_Coin.png" alt="">
          </div>
          <a href="https://discord.com/invite/VxCwX7cFXU" target="_blank" class="fixed-icon lg:bottom-16 md:bottom-32 sm:bottom-24 lg:right-8 md:right-10 sm:right-6 sm:hidden lg:block">
            <div class="flex flex-col items-center">
              <svg width="32" height="32" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M44.5022 13.0933C49.8974 21.0748 52.5618 30.0777 51.5658 40.4421C51.5616 40.486 51.5389 40.5262 51.5031 40.5527C47.4174 43.5713 43.459 45.4032 39.5561 46.6181C39.5257 46.6274 39.4931 46.6269 39.4631 46.6166C39.433 46.6064 39.4068 46.5869 39.3883 46.561C38.4866 45.2987 37.6673 43.9678 36.9495 42.5703C36.9083 42.4879 36.946 42.3888 37.0307 42.3564C38.3319 41.8631 39.5692 41.2719 40.7593 40.5719C40.853 40.5166 40.859 40.3814 40.7724 40.3165C40.5198 40.1279 40.2696 39.9296 40.0302 39.7313C39.9854 39.6947 39.9251 39.6875 39.8743 39.7121C32.1479 43.3021 23.684 43.3021 15.8663 39.7121C15.8155 39.6893 15.7552 39.6971 15.7116 39.7331C15.4728 39.9314 15.222 40.1279 14.9718 40.3165C14.8852 40.3814 14.8923 40.5166 14.9867 40.5719C16.1768 41.2586 17.4141 41.8631 18.7134 42.3588C18.7976 42.3912 18.8376 42.4879 18.7958 42.5703C18.0936 43.9696 17.2743 45.3005 16.3559 46.5628C16.3159 46.6139 16.2502 46.6373 16.1881 46.6181C12.3037 45.4032 8.34527 43.5713 4.25957 40.5527C4.22557 40.5262 4.20107 40.4842 4.19747 40.4403C3.36507 31.4752 5.06157 22.3978 11.2545 13.0915C11.2695 13.0668 11.2922 13.0476 11.3184 13.0362C14.3657 11.629 17.6302 10.5938 21.0423 10.0026C21.1044 9.99296 21.1665 10.0218 21.1987 10.0771C21.6203 10.8281 22.1022 11.7913 22.4283 12.5784C26.0248 12.0256 29.6776 12.0256 33.3494 12.5784C33.6754 11.8081 34.1406 10.8281 34.5604 10.0771C34.5753 10.0497 34.5985 10.0277 34.6266 10.0143C34.6547 10.0009 34.6863 9.99676 34.7168 10.0026C38.1307 10.5956 41.3953 11.6308 44.4401 13.0362C44.4669 13.0476 44.489 13.0668 44.5022 13.0933ZM24.2567 30.139C24.2943 27.4887 22.3739 25.2956 19.9633 25.2956C17.5723 25.2956 15.6704 27.4695 15.6704 30.139C15.6704 32.8079 17.6099 34.9817 19.9633 34.9817C22.3548 34.9817 24.2567 32.8079 24.2567 30.139ZM40.1299 30.139C40.1675 27.4887 38.2471 25.2956 35.8371 25.2956C33.4455 25.2956 31.5436 27.4695 31.5436 30.139C31.5436 32.8079 33.4831 34.9817 35.8371 34.9817C38.2471 34.9817 40.1299 32.8079 40.1299 30.139Z"
                fill="white"/>
              </svg>
            </div>
          </a>
          <div class="flex items-center gap-4 mr-2">
            <router-link to="/profile" title="Перейти до профілю">
              <img src="/icons/header/profile.svg" alt="Profile" class="cursor-pointer hover:opacity-80 w-[24px] h-[24px]">
            </router-link>
          </div>
        </div>
      </template>
      
      <template v-else>
        <a
          class="text-black font-bold letter-s-1-4px text-[14px] bg-F7CF14 hover:text-white hover:bg-neutral-800 flex justify-center items-center md:px-3 px-2 py-2 rounded-lg duration-300"
          :href="`https://otpdayz.store:3000/auth/steam`"
        >
          Авторизуватись 
        </a>
      </template>

    </div>
    <div class="flex justify-between w-full p-4 burger lg:hidden">
      <div class="icon" @click="showBurger = true">
        <svg 
        class="md:w-[32px] md:h-[32px] sm:w-[24px] sm:h-[24px]"
         viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M3 7C3 6.44771 3.44772 6 4 6H24C24.5523 6 25 6.44771 25 7C25 7.55229 24.5523 8 24 8H4C3.44772 8 3 7.55229 3 7Z"
              fill="white"
            ></path>
            <path
              d="M3 14C3 13.4477 3.44772 13 4 13H24C24.5523 13 25 13.4477 25 14C25 14.5523 24.5523 15 24 15H4C3.44772 15 3 14.5523 3 14Z"
              fill="white"
            ></path>
            <path
              d="M4 20C3.44772 20 3 20.4477 3 21C3 21.5523 3.44772 22 4 22H24C24.5523 22 25 21.5523 25 21C25 20.4477 24.5523 20 24 20H4Z"
              fill="white"
            ></path>
          </g>
        </svg>
      </div>
      <div class="flex flex-row links">
        <template v-if="steamID">
          <div class="flex items-center gap-2">
            <a href="https://discord.com/invite/VxCwX7cFXU" target="_blank" class="fixed-icon lg:bottom-16 md:bottom-32 sm:bottom-24 lg:right-8 md:right-10 sm:right-6">
              <svg width="32" height="32" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M44.5022 13.0933C49.8974 21.0748 52.5618 30.0777 51.5658 40.4421C51.5616 40.486 51.5389 40.5262 51.5031 40.5527C47.4174 43.5713 43.459 45.4032 39.5561 46.6181C39.5257 46.6274 39.4931 46.6269 39.4631 46.6166C39.433 46.6064 39.4068 46.5869 39.3883 46.561C38.4866 45.2987 37.6673 43.9678 36.9495 42.5703C36.9083 42.4879 36.946 42.3888 37.0307 42.3564C38.3319 41.8631 39.5692 41.2719 40.7593 40.5719C40.853 40.5166 40.859 40.3814 40.7724 40.3165C40.5198 40.1279 40.2696 39.9296 40.0302 39.7313C39.9854 39.6947 39.9251 39.6875 39.8743 39.7121C32.1479 43.3021 23.684 43.3021 15.8663 39.7121C15.8155 39.6893 15.7552 39.6971 15.7116 39.7331C15.4728 39.9314 15.222 40.1279 14.9718 40.3165C14.8852 40.3814 14.8923 40.5166 14.9867 40.5719C16.1768 41.2586 17.4141 41.8631 18.7134 42.3588C18.7976 42.3912 18.8376 42.4879 18.7958 42.5703C18.0936 43.9696 17.2743 45.3005 16.3559 46.5628C16.3159 46.6139 16.2502 46.6373 16.1881 46.6181C12.3037 45.4032 8.34527 43.5713 4.25957 40.5527C4.22557 40.5262 4.20107 40.4842 4.19747 40.4403C3.36507 31.4752 5.06157 22.3978 11.2545 13.0915C11.2695 13.0668 11.2922 13.0476 11.3184 13.0362C14.3657 11.629 17.6302 10.5938 21.0423 10.0026C21.1044 9.99296 21.1665 10.0218 21.1987 10.0771C21.6203 10.8281 22.1022 11.7913 22.4283 12.5784C26.0248 12.0256 29.6776 12.0256 33.3494 12.5784C33.6754 11.8081 34.1406 10.8281 34.5604 10.0771C34.5753 10.0497 34.5985 10.0277 34.6266 10.0143C34.6547 10.0009 34.6863 9.99676 34.7168 10.0026C38.1307 10.5956 41.3953 11.6308 44.4401 13.0362C44.4669 13.0476 44.489 13.0668 44.5022 13.0933ZM24.2567 30.139C24.2943 27.4887 22.3739 25.2956 19.9633 25.2956C17.5723 25.2956 15.6704 27.4695 15.6704 30.139C15.6704 32.8079 17.6099 34.9817 19.9633 34.9817C22.3548 34.9817 24.2567 32.8079 24.2567 30.139ZM40.1299 30.139C40.1675 27.4887 38.2471 25.2956 35.8371 25.2956C33.4455 25.2956 31.5436 27.4695 31.5436 30.139C31.5436 32.8079 33.4831 34.9817 35.8371 34.9817C38.2471 34.9817 40.1299 32.8079 40.1299 30.139Z"
                fill="white"/>
              </svg>
            </a>
            <router-link to="/profile" title="Перейти до профілю">
              <img src="/icons/header/profile.svg" alt="Profile" class="cursor-pointer hover:opacity-80 w-[24px] h-[24px]">
            </router-link>
          </div>
        </template>
        <template v-else>
          <a :href="`https://otpdayz.store:3000/auth/steam`" class="steam">
            <svg class="md:w-[28px] md:h-[28px] sm:w-[28px] sm:h-[28px]" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_728_1404)">
                <circle cx="24" cy="24" r="24" fill="#0B0B0B"/>
                <path d="M23.9589 0C11.3569 0 1.02292 9.72 0.0449219 22.074L12.9089 27.39C13.9989 26.648 15.3149 26.21 16.7329 26.21C16.8589 26.21 16.9829 26.218 17.1089 26.222L22.8309 17.938V17.82C22.8309 12.83 26.8869 8.772 31.8789 8.772C36.8669 8.772 40.9269 12.834 40.9269 17.826C40.9269 22.818 36.8669 26.876 31.8789 26.876H31.6689L23.5169 32.698C23.5169 32.802 23.5249 32.908 23.5249 33.016C23.5249 36.766 20.4949 39.808 16.7449 39.808C13.4749 39.808 10.7129 37.462 10.0829 34.354L0.872922 30.54C3.72492 40.614 12.9729 48 23.9589 48C37.2129 48 47.9569 37.254 47.9569 24C47.9569 10.746 37.2109 0 23.9589 0ZM15.0809 36.42L12.1349 35.2C12.6589 36.286 13.5629 37.198 14.7629 37.7C17.3569 38.778 20.3489 37.548 21.4269 34.95C21.9529 33.69 21.9549 32.312 21.4369 31.052C20.9189 29.792 19.9369 28.81 18.6829 28.286C17.4349 27.766 16.1029 27.788 14.9269 28.226L17.9729 29.486C19.8849 30.286 20.7909 32.486 19.9909 34.396C19.1969 36.31 16.9949 37.216 15.0809 36.42ZM37.9109 17.814C37.9109 14.49 35.2049 11.784 31.8809 11.784C28.5509 11.784 25.8509 14.49 25.8509 17.814C25.8509 21.144 28.5509 23.844 31.8809 23.844C35.2069 23.844 37.9109 21.144 37.9109 17.814ZM27.3649 17.804C27.3649 15.3 29.3909 13.272 31.8949 13.272C34.3929 13.272 36.4269 15.3 36.4269 17.804C36.4269 20.306 34.3929 22.334 31.8949 22.334C29.3889 22.334 27.3649 20.306 27.3649 17.804Z" fill="white"/>
              </g>
              
            </svg>
          </a>
        </template>
      </div>
    </div>
  </header>
  <template v-if="showBurger">
    <div class="fixed bg-171717 sm:w-[70%] md:w-[40%] top-0 h-[100vh] left-0 z-[1000]">
      <div class="flex flex-col items-start pt-10 pl-4">
        <router-link 
          v-for="(item, idx) in visibleLinks" 
          :key="idx" 
          :to="item.link" 
          class="russo letter-s-1-4px text-[16px]">
          <p class="p-3 text-white duration-300 xl:px-4 lg:px-2">
            {{ item.title }}
          </p>
        </router-link>
      </div>
      <div class="absolute close right-2 top-2" @click="showBurger = false">
        <svg class="w-6 h-6 mt-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M19 5L5 19M5 5L9.5 9.5M12 12L19 19"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </g>
        </svg>
      </div>
    </div>
  </template>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch, inject } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import axios from 'axios';
import { servers } from '@/components/selectServer/servers';

const linkArray = ref([
  { title: "Головна", link: "/", requiresAuth: false },
  { title: "Магазин", link: "/store", requiresAuth: true },
  { title: "Інфо", link: "/info", requiresAuth: false },
  { title: "Лідери", link: "/leaderboard", requiresAuth: false },
  { title: "Бонуси", link: "/daily", requiresAuth: false },
  { title: "Кейси", link: "/cases", requiresAuth: false },
  { 
    title: "Адмінпанель", 
    link: "/krabikpolitsai", 
    requiresAuth: true,
    isAdminOnly: true, // Додаємо маркер, що це тільки для адмінів
  },
]);

const steamID = ref(localStorage.getItem("steamID"));
const showMenu = ref(false);
const showBurger = ref(false);
const priority = ref(false);
const expiration = ref("");
const playtimeData = ref([]);
const totalPlaytime = ref(0);
const coinBalance = ref(0);
const route = useRoute();
const isAdmin = ref(false);
const error = ref("");

const url = computed(() => `https://otpdayz.store:3000`);

const checkAdminStatus = async () => {
  try {
    if (steamID.value) {
      const res = await axios.get(`${url.value}/admin/isAdmin/${steamID.value}/admin_page`);
      isAdmin.value = res.data.isAdmin;
      error.value = res.data.error;
      
      // Фільтруємо посилання після отримання статусу адміна
      updateLinks();
    }
  } catch (error) {
    console.error("Помилка при отриманні статусу адміна:", error);
  }
};

const balance = async () => {
  try {
    if (!steamID.value) {
      console.log("steamID не знайдено.");
      return;  // Якщо steamID немає, припиняємо виконання функції
    }

    const res = await axios.get(`${url.value}/coins/balance/${steamID.value}`);
    if (res.data && res.data.balance !== undefined) {
      coinBalance.value = res.data.balance;
    } else {
      console.error("Невірна структура відповіді:", res);
    }
  } catch (error) {
    console.error("Помилка при отриманні балансу:", error);
    coinBalance.value = 0;  // Встановлюємо значення 0 на випадок помилки
  }
};

// Викликаємо функцію balance кожну секунду (1000 мс)
setInterval(balance, 5000);

const fetchPlaytimeForAllServers = async () => {
  if (steamID.value) {
    try {
      const promises = servers.map((server) =>
        axios
          .get(`https://otpdayz.store:3000/${server.port}/getStats/${steamID.value}`)
          .then((response) => ({
            port: server.port,
            playtime: response.data.playtime || 0,
          }))
          .catch((error) => {
            console.error(`Помилка при отриманні playtime з порту ${server.port}:`, error);
            return { port: server.port, playtime: 0 };
          })
      );

      playtimeData.value = await Promise.all(promises);

      totalPlaytime.value = playtimeData.value.reduce((sum, server) => sum + server.playtime, 0);

      console.log("Масив з playtime:", playtimeData.value);
      console.log("Загальний час гри:", totalPlaytime.value);

      const excludedSteamID = "76561199046220555";

      //76561199020651435
      //76561198150622856

      // if (window.innerWidth > 1440 && totalPlaytime.value < 60 && steamID.value !== excludedSteamID) {
      //   localStorage.removeItem("steamID");
      //   steamID.value = null;
      // }

    } catch (error) {
      console.error("Загальна помилка при отриманні playtime:", error);
    }
  }
};

const visibleLinks = computed(() =>
  linkArray.value.filter(link => {
    if (link.requiresAuth && !steamID.value) {
      return false;
    }
    if (link.onlyFor && link.onlyFor !== steamID.value) {
      return false;
    }
    return true;
  })
);

const filteredLinks = computed(() => 
  linkArray.value.filter(link => !link.isAdminOnly || isAdmin.value)
);

const updateLinks = () => {
  linkArray.value = linkArray.value.filter(link => !link.isAdminOnly || isAdmin.value);
};

onMounted(() => {
  balance();
  fetchPlaytimeForAllServers();
  checkAdminStatus();
});
</script>


<style scoped>
.shadow-text {
  text-shadow: 3px 3px 4px rgba(0, 0, 0, 0.8);
}


</style>