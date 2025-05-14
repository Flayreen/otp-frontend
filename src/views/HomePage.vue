<template>
   
    <div class="lg:max-w-[1920px] mx-auto">
    <div class="bg-home lg:px-[80px] md:px-[40px] sm:px-[16px] md:h-[800px] sm:h-[750px] lg:h-auto relative">
      <baseheader class="lg:mb-16 bg-[#171717d8] absolute top-0 left-1/2 transform -translate-x-1/2 rounded-xl" />

      <!-- Контейнер з текстом по центру -->
      <div data-aos="fade-up" data-aos-duration="900" class="flex items-center justify-center h-full sm:pb-64 lg:pb-0">
        <div class="relative title-block text-center sm:w-[90vw] md:w-[62vw] lg:w-[42vw] lg:p-8 md:p-6 sm:p-4 lg:pb-12 md:pb-10 sm:pb-8">
          <h2 class="title russo letter-s-1-4px lg:text-[26px] md:text-[26px] sm:text-[22px] font-regular text-white">
            Українські сервери Dayz <br><span class="text-F7CF14 letter-s-1-4px">On The Precipice</span>
          </h2>
          <h2 class="desc leading-[1.75] lg:text-[14px] md:text-[16px] sm:text-[14px] text-white">
            Зануртеся у всесвіт DayZ: широкий вибір можливостей для гравців, зручність використання, актуальна статистика для аналізу та відстеження, а також безліч інших функцій! Тут кожен знайде все необхідне для захоплюючої подорожі у ігровий світ!
          </h2>
        </div>
      </div>
    </div>

    <div class="relative z-10 lg:px-[150px] md:px-[40px] sm:px-[16px] py-[55px]">
      <div class="servers">
        <h1 data-aos="fade-down" data-aos-duration="800" data-aos-delay="100" class="russo text-white lg:text-[32px] md:text-[28px] sm:text-[24px] mb-10">Наші сервери</h1>
        <div v-for="(server, index) in serversData" 
          :key="index"
          data-aos="fade-up" data-aos-duration="800" data-aos-delay="200" 
          class="flex flex-col mb-12">
          <div class="flex flex-col items-center mb-12 lg:flex-row lg:justify-between sm:gap-8 lg:gap-0">
            <div class="flex items-center gap-12">
              <h3 class="servers text-[16px] russo hidden text-white w-[40px] h-[40px] lg:flex items-center justify-center border-2 border-white rounded-[10px]">{{ server.id }}</h3>
              <div class="flex flex-col gap-8">
                <div class="flex flex-col gap-2">
                  <p class="lg:text-[14px] sm:text-[16px] lg:max-w-[700px] sm:max-w-[1200px] letter-s-0-8px text-white">{{ server.data.name }}</p>
                  <p class="lg:text-[14px] md:text-[16px] sm:text-[14px] lg:max-w-[500px] sm:max-w-[1200px] letter-s-0-8px text-AFAFAF">{{ server.description }}</p>
                </div>
                <div class="server-banner max-w-[500px] sm:max-w-[500px]" :style="{ backgroundImage: `url(${server.banner})` }"></div>
              </div>
            </div>
            <div class="hidden gap-3 lg:flex">
              <svg width="28" height="24" viewBox="0 0 32 27" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_370_1019)">
              <path d="M4.8 7.1002C4.8 5.40281 5.47428 3.77494 6.67452 2.57471C7.87475 1.37448 9.50261 0.700195 11.2 0.700195C12.8974 0.700195 14.5253 1.37448 15.7255 2.57471C16.9257 3.77494 17.6 5.40281 17.6 7.1002C17.6 8.79758 16.9257 10.4254 15.7255 11.6257C14.5253 12.8259 12.8974 13.5002 11.2 13.5002C9.50261 13.5002 7.87475 12.8259 6.67452 11.6257C5.47428 10.4254 4.8 8.79758 4.8 7.1002ZM0 24.8152C0 19.8902 3.99 15.9002 8.915 15.9002H13.485C18.41 15.9002 22.4 19.8902 22.4 24.8152C22.4 25.6352 21.735 26.3002 20.915 26.3002H1.485C0.665 26.3002 0 25.6352 0 24.8152ZM30.465 26.3002H23.575C23.845 25.8302 24.005 25.2852 24.005 24.7002V24.3002C24.005 21.2652 22.65 18.5402 20.515 16.7102C20.635 16.7052 20.75 16.7002 20.87 16.7002H23.94C28.39 16.7002 32 20.3102 32 24.7652C32 25.6152 31.31 26.3002 30.465 26.3002ZM21.6 13.5002C20.05 13.5002 18.65 12.8702 17.635 11.8552C18.62 10.5252 19.2 8.8802 19.2 7.1002C19.2 5.7602 18.87 4.4952 18.285 3.3852C19.215 2.7052 20.36 2.3002 21.6 2.3002C24.695 2.3002 27.2 4.8052 27.2 7.9002C27.2 10.9952 24.695 13.5002 21.6 13.5002Z" fill="white"/>
              </g>
              <defs>
              <clipPath id="clip0_370_1019">
              <rect width="32" height="25.6" fill="white" transform="translate(0 0.700195)"/>
              </clipPath>
              </defs>
              </svg>
              <span class="text-[16px] text-medium text-white">{{ server.data.status.players + server.data.status.queue.size }} / {{ server.data.status.slots }}</span>
            </div>
            <div class="hidden gap-3 lg:flex">
              <svg width="28" height="28" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 2.5C8.3 2.5 2 8.8 2 16.5C2 24.2 8.3 30.5 16 30.5C23.7 30.5 30 24.2 30 16.5C30 8.8 23.7 2.5 16 2.5ZM23 17.5H16C15.4 17.5 15 17.1 15 16.5V7.5C15 6.9 15.4 6.5 16 6.5C16.6 6.5 17 6.9 17 7.5V15.5H23C23.6 15.5 24 15.9 24 16.5C24 17.1 23.6 17.5 23 17.5Z" fill="white"/>
              </svg>
              <span class="text-[14px] text-medium text-white">{{ server.data.environment.time }}</span>
            </div>
            <div class="hidden gap-2 lg:flex">
              <svg width="32" height="32" viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M45 24.5C45 12.902 35.598 3.5 24 3.5C12.402 3.5 3 12.902 3 24.5C3 36.098 12.402 45.5 24 45.5C35.598 45.5 45 36.098 45 24.5Z" fill="#38A9FB"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M45 24.5H3C3 36.098 12.402 45.5 24 45.5C35.598 45.5 45 36.098 45 24.5Z" fill="#FFE70E"/>
              </svg>
              <svg width="32" height="32" viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 45.5C35.598 45.5 45 36.098 45 24.5C45 12.902 35.598 3.5 24 3.5C12.402 3.5 3 12.902 3 24.5C3 36.098 12.402 45.5 24 45.5Z" fill="#0052B4"/>
              <path d="M24.0001 9.8916L24.7772 12.2831H27.2915L25.2572 13.761L26.0343 16.1525L24.0001 14.6744L21.9657 16.1525L22.7428 13.761L20.7085 12.2831H23.223L24.0001 9.8916Z" fill="#FFDA44"/>
              <path d="M13.6705 14.1706L15.9111 15.3121L17.6891 13.5342L17.2956 16.0176L19.5361 17.1592L17.0526 17.5526L16.6592 20.0362L15.5176 17.7957L13.0342 18.1891L14.8121 16.4112L13.6705 14.1706Z" fill="#FFDA44"/>
              <path d="M9.3916 24.5005L11.7831 23.7235V21.209L13.2609 23.2434L15.6525 22.4663L14.1744 24.5005L15.6525 26.5348L13.2609 25.7578L11.7831 27.7921V25.2776L9.3916 24.5005Z" fill="#FFDA44"/>
              <path d="M13.6705 34.8304L14.8121 32.5898L13.0342 30.8118L15.5177 31.2054L16.6591 28.9648L17.0526 31.4484L19.536 31.8418L17.2958 32.9833L17.6891 35.4668L15.9111 33.6888L13.6705 34.8304Z" fill="#FFDA44"/>
              <path d="M24.0001 39.1093L23.2229 36.7179H20.7085L22.7429 35.2399L21.9657 32.8486L24.0001 34.3265L26.0343 32.8486L25.2572 35.2399L27.2915 36.7179H24.7771L24.0001 39.1093Z" fill="#FFDA44"/>
              <path d="M34.3303 34.8304L32.0898 33.6889L30.3117 35.4669L30.7052 32.9833L28.4648 31.8418L30.9483 31.4484L31.3417 28.9648L32.4832 31.2054L34.9666 30.8118L33.1886 32.59L34.3303 34.8304Z" fill="#FFDA44"/>
              <path d="M38.6089 24.5005L36.2174 25.2776V27.7921L34.7394 25.7577L32.3481 26.5348L33.8261 24.5005L32.3481 22.4663L34.7395 23.2434L36.2174 21.209V23.7235L38.6089 24.5005Z" fill="#FFDA44"/>
              <path d="M34.3303 14.1705L33.1887 16.4111L34.9667 18.1891L32.4831 17.7955L31.3417 20.036L30.9483 17.5525L28.4648 17.159L30.7052 16.0175L30.3117 13.5342L32.0899 15.3121L34.3303 14.1705Z" fill="#FFDA44"/>
              </svg>
            </div>
            <div class="flex flex-row items-center lg:hidden md:gap-16 sm:gap-12">
              <div class="flex gap-3">
                <svg width="28" height="24" viewBox="0 0 32 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_370_1019)">
                <path d="M4.8 7.1002C4.8 5.40281 5.47428 3.77494 6.67452 2.57471C7.87475 1.37448 9.50261 0.700195 11.2 0.700195C12.8974 0.700195 14.5253 1.37448 15.7255 2.57471C16.9257 3.77494 17.6 5.40281 17.6 7.1002C17.6 8.79758 16.9257 10.4254 15.7255 11.6257C14.5253 12.8259 12.8974 13.5002 11.2 13.5002C9.50261 13.5002 7.87475 12.8259 6.67452 11.6257C5.47428 10.4254 4.8 8.79758 4.8 7.1002ZM0 24.8152C0 19.8902 3.99 15.9002 8.915 15.9002H13.485C18.41 15.9002 22.4 19.8902 22.4 24.8152C22.4 25.6352 21.735 26.3002 20.915 26.3002H1.485C0.665 26.3002 0 25.6352 0 24.8152ZM30.465 26.3002H23.575C23.845 25.8302 24.005 25.2852 24.005 24.7002V24.3002C24.005 21.2652 22.65 18.5402 20.515 16.7102C20.635 16.7052 20.75 16.7002 20.87 16.7002H23.94C28.39 16.7002 32 20.3102 32 24.7652C32 25.6152 31.31 26.3002 30.465 26.3002ZM21.6 13.5002C20.05 13.5002 18.65 12.8702 17.635 11.8552C18.62 10.5252 19.2 8.8802 19.2 7.1002C19.2 5.7602 18.87 4.4952 18.285 3.3852C19.215 2.7052 20.36 2.3002 21.6 2.3002C24.695 2.3002 27.2 4.8052 27.2 7.9002C27.2 10.9952 24.695 13.5002 21.6 13.5002Z" fill="white"/>
                </g>
                <defs>
                <clipPath id="clip0_370_1019">
                <rect width="32" height="25.6" fill="white" transform="translate(0 0.700195)"/>
                </clipPath>
                </defs>
                </svg>
                <span class="lg:text-[20px] md:text-[16px] sm:text-[14px] text-medium text-white">{{ server.data.status.players + server.data.status.queue.size }} / {{ server.data.status.slots }}</span>
              </div>
              <div class="flex items-center gap-3">
                <svg width="28" height="29" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 2.5C8.3 2.5 2 8.8 2 16.5C2 24.2 8.3 30.5 16 30.5C23.7 30.5 30 24.2 30 16.5C30 8.8 23.7 2.5 16 2.5ZM23 17.5H16C15.4 17.5 15 17.1 15 16.5V7.5C15 6.9 15.4 6.5 16 6.5C16.6 6.5 17 6.9 17 7.5V15.5H23C23.6 15.5 24 15.9 24 16.5C24 17.1 23.6 17.5 23 17.5Z" fill="white"/>
                </svg>
                <span class="lg:text-[20px] md:text-[16px] sm:text-[14px] text-medium text-white">{{ server.data.environment.time }}</span>
              </div>
              <div class="flex gap-4">
                <svg 
                class="sm:w-[28px] sm:h-[28px] lg:w-[48px] lg:h-[48px]"
                viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M45 24.5C45 12.902 35.598 3.5 24 3.5C12.402 3.5 3 12.902 3 24.5C3 36.098 12.402 45.5 24 45.5C35.598 45.5 45 36.098 45 24.5Z" fill="#38A9FB"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M45 24.5H3C3 36.098 12.402 45.5 24 45.5C35.598 45.5 45 36.098 45 24.5Z" fill="#FFE70E"/>
                </svg>
                <svg
                 class="sm:w-[28px] sm:h-[28px] lg:w-[48px] lg:h-[48px]"
                 viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 45.5C35.598 45.5 45 36.098 45 24.5C45 12.902 35.598 3.5 24 3.5C12.402 3.5 3 12.902 3 24.5C3 36.098 12.402 45.5 24 45.5Z" fill="#0052B4"/>
                <path d="M24.0001 9.8916L24.7772 12.2831H27.2915L25.2572 13.761L26.0343 16.1525L24.0001 14.6744L21.9657 16.1525L22.7428 13.761L20.7085 12.2831H23.223L24.0001 9.8916Z" fill="#FFDA44"/>
                <path d="M13.6705 14.1706L15.9111 15.3121L17.6891 13.5342L17.2956 16.0176L19.5361 17.1592L17.0526 17.5526L16.6592 20.0362L15.5176 17.7957L13.0342 18.1891L14.8121 16.4112L13.6705 14.1706Z" fill="#FFDA44"/>
                <path d="M9.3916 24.5005L11.7831 23.7235V21.209L13.2609 23.2434L15.6525 22.4663L14.1744 24.5005L15.6525 26.5348L13.2609 25.7578L11.7831 27.7921V25.2776L9.3916 24.5005Z" fill="#FFDA44"/>
                <path d="M13.6705 34.8304L14.8121 32.5898L13.0342 30.8118L15.5177 31.2054L16.6591 28.9648L17.0526 31.4484L19.536 31.8418L17.2958 32.9833L17.6891 35.4668L15.9111 33.6888L13.6705 34.8304Z" fill="#FFDA44"/>
                <path d="M24.0001 39.1093L23.2229 36.7179H20.7085L22.7429 35.2399L21.9657 32.8486L24.0001 34.3265L26.0343 32.8486L25.2572 35.2399L27.2915 36.7179H24.7771L24.0001 39.1093Z" fill="#FFDA44"/>
                <path d="M34.3303 34.8304L32.0898 33.6889L30.3117 35.4669L30.7052 32.9833L28.4648 31.8418L30.9483 31.4484L31.3417 28.9648L32.4832 31.2054L34.9666 30.8118L33.1886 32.59L34.3303 34.8304Z" fill="#FFDA44"/>
                <path d="M38.6089 24.5005L36.2174 25.2776V27.7921L34.7394 25.7577L32.3481 26.5348L33.8261 24.5005L32.3481 22.4663L34.7395 23.2434L36.2174 21.209V23.7235L38.6089 24.5005Z" fill="#FFDA44"/>
                <path d="M34.3303 14.1705L33.1887 16.4111L34.9667 18.1891L32.4831 17.7955L31.3417 20.036L30.9483 17.5525L28.4648 17.159L30.7052 16.0175L30.3117 13.5342L32.0899 15.3121L34.3303 14.1705Z" fill="#FFDA44"/>
                </svg>
              </div>
            </div>
          </div>
          <div class="h-[1px] bg-white"></div>
        </div>
      </div>
    </div>
    <div class="flex flex-col sm:gap-10 lg:gap-20 items-center lg:px-[150px] md:px-[40px] sm:px-[16px]">
      <h2 data-aos="fade-down" data-aos-duration="800" data-aos-delay="100" class="title russo letter-s-1-4px lg:text-[32px] md:text-[28px] sm:text-[24px] font-regular text-white">
        Проєкт <span class="text-F7CF14">On The Precipice</span>
      </h2>
      <div data-aos="fade-up" data-aos-duration="800" data-aos-delay="200" class="grid gap-12 lg:grid-cols-3 md:grid-cols-2">
        <div class="flex flex-col items-center gap-4 mb-8">
          <h4 class="russo text-[16px] text-white letter-s-0-8px">Активна спільнота</h4>
          <p class="sm:text-[14px] text-medium text-center text-white">
            Ми створили місце, де гравці з усього світу можуть знайти однодумців, обмінюватися досвідом і брати участь у спільних подіях. Активна спільнота — це основа для незабутнього ігрового процесу та теплих соціальних зв’язків.
          </p>
        </div>
        <div class="flex flex-col items-center gap-4 mb-8">
          <h4 class="russo text-[16px] text-white letter-s-0-8px">Надійна підтримка</h4>
          <p class="sm:text-[14px] text-medium text-center text-white">
            Наша команда підтримки завжди готова відповісти на ваші запитання та допомогти вирішити будь-які труднощі. Незалежно від часу доби ми працюємо, щоб забезпечити комфорт кожного користувача.
          </p>
        </div>
        <div class="flex flex-col items-center gap-4 mb-8">
          <h4 class="russo text-[16px] text-white letter-s-0-8px">Автоматизовані платежі</h4>
          <p class="sm:text-[14px] text-medium text-center text-white">
            Забудьте про складнощі з оплатами! Наша система автоматизованих платежів забезпечує миттєве й безпечне оброблення транзакцій, щоб ви могли зосередитися на тому, що дійсно важливо.
          </p>
        </div>
        <div class="flex flex-col items-center gap-4 mb-8">
          <h4 class="russo text-[16px] text-white letter-s-0-8px">Швидкість реакції</h4>
          <p class="sm:text-[14px] text-medium text-center text-white">
            Ваша думка для нас важлива, тому ми оперативно реагуємо на всі запити. Ми відповідаємо в короткі терміни, що забезпечує швидке вирішення ваших проблем та покращує ігровий досвід.
          </p>
        </div>
        <div class="flex flex-col items-center gap-4 mb-8">
          <h4 class="russo text-[16px] text-white letter-s-0-8px">Інноваційні рішення</h4>
          <p class="sm:text-[14px] text-medium text-center text-white">
            Ми використовуємо сучасні технології та нестандартний підхід для створення унікального досвіду. Наші нестандартні рішення роблять кожен етап вашого виживання простішим і приємнішим.
          </p>
        </div>
        <div class="flex flex-col items-center gap-4 mb-8">
          <h4 class="russo text-[16px] text-white letter-s-0-8px">Якість і стабільність</h4>
          <p class="sm:text-[14px] text-medium text-center text-white">
            Ми цінуємо вашу довіру, тому гарантуємо високу якість та стабільну роботу наших сервісів. Усі елементи розроблені для забезпечення найкращого ігрового та користувацького досвіду.
          </p>
        </div>
      </div>
    </div>
    <basefooter class="lg:px-[150px] md:px-[40px] sm:px-[16px]"/>
  </div>
 
  
</template>

<script setup>
import baseheader from '@/components/base/Header.vue'
import basefooter from '@/components/base/Footer.vue'
import axios from 'axios'
import { ref, onMounted, computed } from 'vue'
import { servers } from '@/components/selectServer/servers'



const steamID = ref(null);

const logout = () => {
  if (localStorage.getItem('steamID')) {
    localStorage.removeItem('steamID');
    location.href = 'https://otpdayz.store';
  }
}

const ports = servers.map(server => server.port);
const descriptions = servers.map(server => server.desc);
const banners = servers.map(server => server.banner);

const serversData = ref(
  ports.map((port, index) => ({
    id: index + 1,
    port,
    description: descriptions[index],
    banner: banners[index],          
    data: { 
      name: `Server ${index + 1}`, 
      status: { players: 0, queue: { active: false, size: 0 }, slots: 0 }, 
      environment: { time: "server-offline.." } 
    },
  }))
);

const fetchServerData = () => {
  serversData.value.forEach(server => {
    axios.get(`https://otpdayz.store:3000/${server.port}/status`)
      .then(res => {
        server.data = res.data;
      })
      .catch(error => {
        console.error(`Error fetching data for server on port ${server.port}:`, error);
      });
  });
};

onMounted(() => {
  steamID.value = localStorage.getItem('steamID');
  fetchServerData();
});
</script>

<style>
.bg-home {
  background: url('/images/title-bgd/title-bgd.png');
  background-position: top center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  max-width: 1920px;
  aspect-ratio: 16 / 6.5;
}

.russo {
  font-family: "Russo One", sans-serif;
  font-weight: 400;
  font-style: normal;
}
.absolute-line {
  width: 100%;
  position: absolute;
  height: 1px;
  background: #fff;
  animation: animationEffect 0.3s;
}

.title-block {
  display: flex;
  flex-direction: column;
  gap: 32px;
  background: rgba(23, 23, 23, 0.8); /* Напівпрозорий білий колір */
  border-radius: 15px;
}

.shadow {
  text-shadow: 0px 0px 4px rgba(0, 0, 0, 1);
}

.button {
  background-color: #F7CF14;
  padding: 8px 48px;
  font-size: 22px;
  font-weight: 600;
  letter-spacing: 1px;
  border-radius: 5px;
  max-width: 200px;
}

.server-banner {
  background-position: top center; /* Фон буде розташовуватись зверху */
  background-repeat: no-repeat; /* Фон не повторюється */
  background-size: cover; /* Фон покриває весь контейнер */
  border-radius: 15px;
  aspect-ratio: 4 / 1.5;
}


@keyframes animationEffect {
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
}

.header-item, .server-info, .players-info, .time-info, .flags-info {
  display: flex;
  align-items: center;
  justify-content: center;
}

.grid {
  display: grid;
}

.grid-cols-4 {
  grid-template-columns: repeat(4, 1fr);
}

.justify-between {
  justify-content: space-between;
}

.items-center {
  align-items: center;
}

.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}

.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.p-4 {
  padding: 1rem;
}

.mb-2 {
  margin-bottom: 0.5rem;
}

.mb-10 {
  margin-bottom: 2.5rem;
}

.mb-20 {
  margin-bottom: 5rem;
}

.mb-40 {
  margin-bottom: 10rem;
}

.rounded-2xl {
  border-radius: 1.5rem;
}

.border-2 {
  border-width: 2px;
}

.border-custom-color {
  border-color: #9A9EA180;
}

.text-white {
  color: #fff;
}

.text-green {
  color: #52D613;
}

.text-gray {
  color: #BCAEAE;
}


.font-bold {
  font-weight: bold;
}

.mr-2 {
  margin-right: 0.5rem;
}

.mr-4 {
  margin-right: 1rem;
}

.iconify {
  display: inline-block;
}

</style>

