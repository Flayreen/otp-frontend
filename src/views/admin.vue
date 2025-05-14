<template>
  <div v-if="permissionsLoaded">
    <div v-if="hasAdminAccess" class="content lg:max-w-[1920px] lg:px-[80px] md:px-[40px] sm:px-[16px] mx-auto relative block w-full h-full">
      <baseheader class="lg:mb-16 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#171717d8] absolute rounded-xl" />
      <div class="tabs-container relative z-10 lg:px-[70px] mt-4">
        <div class="tabs flex gap-4 mb-6 justify-between">
          <div class="flex gap-4">
            <button v-for="(tab, index) in filteredTabs" :key="index" @click="activeTab = index"
              :class="{'active-tab': activeTab === index}"
              class="tab px-4 py-2 rounded bg-transparent text-white border-2 font-semibold text-[16px]">
              {{ tab.name }}
            </button>
          </div>
          <div v-if="adminPermissions['danger_zone.wipeDB']">
            <!-- Кнопка відкриття модалки -->
            <button 
              @click="showModal = true"
              class="px-4 py-2 bg-[#D75857] text-black rounded h-[48px] text-[16px] font-semibold disabled:bg-AFAFAF"
            >
              Вайп DB
            </button>

            <!-- Модальне вікно -->
            <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div class="bg-171717 p-6 rounded w-[400px] border-2">
                <h2 class="text-white text-xl font-bold mb-4">Підтвердіть дію</h2>
                <p class="text-white mb-4">
                  Ви впевнені, що хочете <span class="text-D75857 font-semibold">вайпнути базу даних</span>? Це незворотна дія.
                </p>
                <div class="flex justify-end gap-3">
                  <button 
                    @click="showModal = false" 
                    class="px-4 py-2 bg-transparent text-white rounded border-2"
                  >
                    Відмінити
                  </button>
                  <button 
                    @click="wipeDatabase"
                    :disabled="loading"
                    class="px-4 py-2 bg-D75857 text-black rounded hover:bg-red-700 font-semibold disabled:bg-gray-400"
                  >
                    {{ loading ? "Вайп триває..." : "Підтвердити" }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
    
        <div class="tab-content text-white rounded-lg">
          <div v-if="activeTab === 0">
            <div class="flex sm:flex-col md:flex-row justify-between mb-4 items-start mt-8">
              <div v-if="adminPermissions['give_money'] || adminPermissions['edit_sets'] || adminPermissions['edit_carts'] || adminPermissions['edit_keys']"  class="flex flex-col gap-2 mb-4">
                <div class="flex items-center space-x-2">
                  <input
                    v-model="steamIdPlayer"
                    @input="validateSteamId"
                    class="px-4 py-2 rounded bg-transparent text-[16px] text-white placeholder-AFAFAF w-[220px] h-[48px] focus:outline-none shadow-[inset_0_0_0_3px_#F7CF14]"
                    type="text"
                    placeholder="Steam Id гравця"
                    maxlength="17"
                  />
                  <button
                    @click="saveSteamId"
                    :disabled="steamIdPlayer.length !== 17"
                    class="px-4 py-2 bg-[#F7CF14] text-black rounded hover:bg-[#E6B108] h-[48px] text-[16px] font-semibold disabled:bg-AFAFAF"
                  >
                    Завантажити дані
                  </button>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-F7CF14 font-semibold">Активний ID гравця:</span>
                  <span class="flex items-center gap-2 text-F7CF14 font-semibold" v-if="steamIdPlayerMain !== null">{{ steamIdPlayerMain }}</span>
                </div>
              </div>
    
    
              <div v-if="adminPermissions['give_money']" class="flex flex-col gap-2">
                <div class="flex gap-4">
                  <input v-model.number="coinsToAdd" type="number" placeholder="Сума коінів" class="px-4 py-2 rounded bg-transparent text-[16px] text-white placeholder-AFAFAF w-[220px] h-[48px] focus:outline-none shadow-[inset_0_0_0_3px_#F7CF14]"/>
                  <button @click="addCoins(coinsToAdd)" class="px-4 py-2 bg-[#F7CF14] text-black rounded hover:bg-[#E6B108] h-[48px] text-[16px] font-semibold disabled:bg-AFAFAF">Додати</button>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-F7CF14 font-semibold">Баланс:</span>
                  <span class="flex items-center gap-2 text-F7CF14 font-semibold" v-if="playerBalance !== null">{{ playerBalance }}
                    <img class="w-[18px] h-[18px]" src="/images/basket/Krab_Coin.png" alt="">
                  </span>
                </div>
              </div>
            </div>
            <div class="flex sm:flex-col md:flex-row justify-between gap-10">
              <div v-if="adminPermissions['edit_sets']" class="flex gap-6 sm:h-[100vw] md:h-[40vw] lg:h-[22vw] border-2 rounded-[10px] p-4 overflow-auto mb-12 flex-1 sm:flex-col md:flex-row ">
                <div class="flex flex-col w-full">
                  <h3 class="text-white text-[18px] font-bold mb-5 mt-2">Список усіх сетів</h3>
                  <!-- Список усіх сетів -->
                  <div class="flex flex-col overflow-y-auto sm:h-[100vw] md:h-[40vw] lg:h-[22vw] pr-2">
                    <div class="flex flex-col gap-3">
                      <div
                        v-for="(setName, setId) in availableSets"
                        :key="setId"
                        class="w-full h-[77px] border-[3px] rounded-[15px] flex gap-3 items-center pl-6 "
                      >
                        <div class="flex flex-col">
                          <p class="text-white text-[15px] font-semibold capitalize">
                            {{ setName }}
                          </p>
                          <p class="text-AFAFAF text-[14px] font-medium">ID: {{ setId }}</p>
                        </div>
                        <!-- Кнопка додавання -->
                        <button
                          @click="addSet(setId)"
                          class="bg-F7CF14 px-2 rounded text-black text-[20px] font-bold ml-auto mr-2"                  >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex flex-col w-full">
                  <div class="flex items-center justify-between">
                    <h3 class="text-white text-[18px] font-bold mb-5 mt-2">Сети гравця</h3>
                    <!-- Кнопка збереження змін -->
                    <button @click="saveSetChanges" class="bg-F7CF14 px-4 py-2 rounded text-black mb-4 text-[16px] font-semibold">
                      Зберегти зміни
                    </button>
                  </div>
                  <div class="flex flex-col overflow-y-auto sm:h-[100vw] md:h-[40vw] lg:h-[22vw] pr-2">
                    <div class="flex flex-col gap-3">
                      <div
                        v-for="(item, index) in updatedPlayerSet"
                        :key="item.set"
                        class="w-full h-[77px] border-[3px] rounded-[15px] flex gap-3 items-center pl-6 justify-between"
                      >
                        <div class="flex flex-col ">
                          <p class="text-white text-[15px] font-semibold capitalize">
                            Сет: {{ item.set || 'Невідомий набір' }}
                          </p>
                          <p class="text-[14px] text-gray-400 font-medium">Придатність:
                            <input
                              v-if="isEditing(item.set)"
                              v-model="item.valid_till"
                              type="number"
                              min="1"
                              class="bg-transparent text-gray-400 text-[14px] font-medium w-16"
                            />
                            <span v-else>{{ item.valid_till || 1 }} дн.</span>
                          </p>
                        </div>
                        <!-- Кнопка віднімання -->
                        <div class="flex items-center">
                          <button
                            @click="removeSet(item.set)"
                             class="bg-D75857 px-2.5 rounded text-black text-[20px] font-bold mr-2"
                            :disabled="(item.count || 1) <= 0"
                          >
                            -
                          </button>
                          <!-- Кнопка редагування терміну придатності -->
                          <button
                            @click="toggleEditing(item.set)"
                            class="bg-blue-500 px-2 py-[3px] rounded text-black mr-2"
                          >
                            ✎
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="adminPermissions['edit_keys']"  class="flex sm:flex-col md:flex-row gap-6 sm:h-[100vw] md:h-[40vw] lg:h-[22vw] border-2 rounded-[10px] p-4 overflow-hidden mb-8 flex-1">
                <div class="flex flex-col w-full">
                  <h3 class="text-white text-[18px] font-bold mb-5 mt-2">Список усіх кейсів</h3>
                  <!-- Список усіх кейсів -->
                  <div class="flex flex-col overflow-y-auto sm:h-[85vw] md:h-[40vw] lg:h-[22vw] md:pr-2">
                    <div class="flex flex-col gap-3">
                      <div
                        v-for="chest in chests"
                        :key="chest.chest_id"
                        class="w-full h-[77px] border-[3px] rounded-[15px] flex gap-3 items-center pl-6"
                      >
                        <img :src="chest.displayImage" :alt="chest.displayName" class="w-[32px] h-[32px]" @error="onImageError($event)"/>
                        <div class="flex flex-col">
                          <p class="text-white text-[16px] font-semibold capitalize">
                            {{ chest.displayName }}
                          </p>
                          <p class="text-AFAFAF text-[14px] font-medium">ID: {{ chest.chest_id }}</p>
                        </div>
                        <!-- Кнопка додавання -->
                        <button
                          @click="addKey(chest.chest_id)"
                          class="bg-F7CF14 px-2 rounded text-black text-[20px] font-bold ml-auto mr-2"
                          >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex flex-col w-full">
                  <div class="flex items-center justify-between">
                    <h3 class="text-white text-[18px] font-bold mb-4">Кейси гравця</h3>
                    <button @click="saveChanges" class="bg-F7CF14 px-4 py-2 rounded text-black mb-4 text-[16px] font-semibold">
                      Зберегти зміни
                    </button>
                  </div>
                  <!-- Користувацькі кейси -->
                  <div class="flex flex-col  overflow-y-auto sm:h-[85vw] md:h-[40vw] lg:h-[22vw] md:pl-2">
                    <div class="flex flex-col gap-3">
                      <div
                        v-for="(count, chestId) in updatedPlayerKeys"
                        :key="chestId"
                        class="w-full h-[77px] border-[3px] rounded-[15px] flex gap-3 items-center pl-6"
                      >
                        <img :src="getChestImage(chestId)" :alt="getChestName(chestId)" class="w-[32px] h-[32px]" @error="onImageError($event)"/>
                        <div class="flex flex-col">
                          <p class="text-white text-[16px] font-semibold capitalize">
                            {{ getChestName(chestId) }}
                          </p>
                          <p class="text-AFAFAF text-[14px] font-medium">ID: {{ chestId }}</p>
                          <p class="text-[14px] text-gray-400 font-medium">Keys: {{ count }}</p>
                        </div>
                        <!-- Кнопка віднімання -->
                        <button
                          @click="removeKey(chestId)"
                          class="bg-D75857 px-2.5 rounded text-black text-[20px] font-bold ml-auto mr-2"
                          :disabled="count <= 0"
                        >
                          -
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    
            <div v-if="adminPermissions['edit_carts']" class="flex sm:flex-col md:flex-row gap-6 sm:h-auto md:h-[40vw] lg:h-[22vw] border-2 rounded-[10px] p-4 overflow-auto">
              <!-- Список усіх товарів -->
              <div class="flex flex-col w-full">
                <!-- Заголовок для списку усіх товарів -->
                <div class="flex items-center justify-between">
                  <h3 class="text-white text-[18px] font-bold mb-4">Список усіх товарів</h3>
                  <div class="mr-6">
                    <!-- Поле для пошуку -->
                    <input
                      v-model="searchQuery"
                      type="text"
                      placeholder="Пошук за назвою або ID"
                      class="p-2 rounded mb-4 w-full text-white bg-transparent"
                    />
                  </div>
                </div>
                <div class="flex flex-wrap gap-6 overflow-y-auto sm:h-[100vw] md:h-[40vw] lg:h-[22vw] w-full">
                  <div
                    v-for="item in filteredItems"
                    :key="item.id"
                    class="sm:w-full md:w-[calc(50%-1.5rem)] h-[77px] border-[3px] rounded-[15px] flex gap-2 items-center pl-6"
                  >
                    <img :src="`/images/products/${item.id}.png`" :alt="item.displayName" class="w-[32px] h-[32px]" @error="onImageError($event)"/>
                    <div class="flex flex-col">
                      <p class="text-white text-[15px] font-semibold capitalize">
                        {{ item.displayName }}
                      </p>
                      <p class="text-AFAFAF text-[14px] font-medium">ID: {{ item.id }}</p>
                    </div>
                    <!-- Кнопка додавання -->
                    <button
                      @click="addCard(item.id)"
                      class="bg-F7CF14 px-2 rounded text-black text-[20px] font-bold ml-auto mr-2"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
    
              <!-- Список оновлених карток гравця -->
              <div class="flex flex-col w-full">
                <!-- Заголовок для списку оновлених карток гравця -->
                <div class="flex items-center justify-between">
                  <h3 class="text-white text-[18px] font-bold mb-4 ">Список предметів гравця</h3>
                  <button @click="saveCartChanges" class="bg-F7CF14 px-4 py-2 rounded text-black mb-4 text-[16px] font-semibold">
                    Зберегти зміни
                  </button>
                </div>
                <div class="flex flex-wrap gap-6 overflow-y-auto sm:h-[100vw] md:h-[40vw] lg:h-[22vw] w-full">
                  <div
                    v-for="(item, index) in updatedPlayerCard.Products"
                    :key="index"
                    class="sm:w-full md:w-[calc(50%-1.5rem)] h-[77px] border-[3px] rounded-[15px] flex gap-2 items-center pl-6"
                  >
                    <img :src="`/images/products/${item.product}.png`" :alt="item.product" class="w-[32px] h-[32px]" @error="onImageError($event)"/>
                    <div class="flex flex-col">
                      <p class="text-white text-[15px] font-semibold capitalize">
                        {{ item.displayName }}
                      </p>
                      <p class="text-[14px] text-gray-400 font-medium">Кількість: {{ item.count }}</p>
                    </div>
                    <div class="ml-auto">
                      <!-- Кнопка додавання -->
                      <button
                        @click="addCard(item.product)"
                        class="bg-F7CF14 px-2 rounded text-black text-[20px] font-bold ml-auto mr-2"
                      >
                        +
                      </button>
                      <!-- Кнопка віднімання -->
                      <button
                        @click="removeCard(item.product)"
                        class="bg-D75857 px-2.5 rounded text-black text-[20px] font-bold ml-auto mr-2"
                        :disabled="item.count <= 0"
                      >
                        -
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="activeTab === 1">  
            <div v-if="adminPermissions['sell_stats']" class="border-2 sm:h-[100vw] md:h-[40vw] lg:h-[21vw] rounded-[10px] p-4">
              <h2 class="text-white text-[20px] font-bold mb-4">Статистика продажів</h2>
              <div v-if="Object.keys(sellStats).length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 xl:grid-cols-4 gap-3 sm:h-[80vw] md:h-[32vw] lg:h-[17vw] overflow-auto">
                <div
                  v-for="(value, key, index) in sellStats"
                  :key="key"
                  class="w-full h-[77px] border-[3px] border-white rounded-[10px] flex gap-3 items-center pl-4"
                >
                  <span class="text-white text-[16px] font-semibold border-2 px-3 py-1 rounded-[10px]">{{ index + 1 }}</span>
                  <div class="flex flex-col">
                    <p class="text-white text-[16px] font-semibold">  {{ key }}</p>
                    <p class="text-AFAFAF text-[14px] font-medium">Продано {{ value }} шт.</p>
                  </div>
                </div>
              </div>
              <p v-else class="text-D75857 text-[16px] font-semibold">Немає доступу або завантаження...</p>
            </div>

            <div v-if="adminPermissions['view_admin_logs']" class="border-2 sm:h-[100vw] md:h-[40vw] lg:h-[21vw] rounded-[10px] p-4 mt-8">
              <h2 class="text-white text-[20px] font-bold mb-4">Адміністративні логи</h2>
              <ul class="sm:h-[80vw] md:h-[32vw] lg:h-[17vw] overflow-auto">
                <li
                  v-for="(log, index) in adminLogs.slice().reverse()"
                  :key="index"
                  :class="index % 2 === 0 ? 'text-white' : 'text-AFAFAF'"
                  class="sm:text-[12px] md:text-[16px] font-medium pb-1"
                >
                  {{ log }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <basefooter class="lg:px-[70px]" />
    </div>
    <p v-else>У вас немає доступу до адмін-панелі.</p>
  </div>
</template>


<script setup>
  import { ref, onMounted, computed, watch, onUnmounted } from 'vue';
  import baseheader from '@/components/base/Header.vue';
  import basefooter from '@/components/base/Footer.vue';
  import Chart from 'chart.js/auto';
  import { useRoute } from 'vue-router';
  import axios from 'axios';

  const steamID = ref(localStorage.getItem("steamID"));
  const sellStats = ref({});

  const adminLogs = ref([]);
  const intervalId = ref(null);
  const route = useRoute();


  const activeTab = ref(0);
  const adminPermissions = ref({});
  const isAdmin = ref(false);
  const error = ref("");
  const url = computed(() => `https://otpdayz.store:3000`);
  const tabs = ref([
    { name: 'Інвентар', requiredPermissions: ['edit_sets', 'give_money', 'edit_carts', 'edit_keys',] },
    { name: 'Статистика', requiredPermissions: ['sell_stats','view_admin_logs',] }
  ]);

  const steamIdPlayer = ref('');
  const steamIdPlayerMain = ref('');
  const playerBalance = ref(null);

  const chests = ref([]);
  const playerKeys = ref({}); // Поточні ключі з сервера
  const updatedPlayerKeys = ref({});

  const availableCard = ref({});
  const playerCard = ref({}); 
  const updatedPlayerCard = ref({});

  const availableSets = ref({});
  const playerSet = ref({});
  const updatedPlayerSet = ref({});
  const editingSet = ref(null); 

  const showModal = ref(false);
  const loading = ref(false);

  const searchQuery = ref(""); // Запит пошуку

  const permissionsLoaded = ref(false);

  const defaultImage = '/images/products/default.png';
  const onImageError = (event) => {
    event.target.src = defaultImage; // Замінюємо на дефолтне зображення, якщо основне не завантажилось
  };
  

  // Обчислювана властивість для фільтрації товарів
  const filteredItems = computed(() => {
    if (!searchQuery.value) {
      return availableCard.value; // Якщо немає запиту, повертаємо всі товари
    }

    return availableCard.value.filter(item => {
      const searchValue = searchQuery.value.toLowerCase();
      return (
        item.displayName.toLowerCase().includes(searchValue) || // Пошук по назві
        item.id.toString().includes(searchValue) // Пошук по ID
      );
    });
  });

  const updateLinks = () => {
    console.log("Оновлення посилань після перевірки статусу адміна...");
  };

  const validateSteamId = (event) => {
    steamIdPlayer.value = steamIdPlayer.value.replace(/\D/g, '')
  }

  const saveSteamId = () => {
    steamIdPlayerMain.value = steamIdPlayer.value; // Зберігаємо значення
    alert('SteamId збережено: ' + steamIdPlayerMain.value);
    fetchBalance();
  };

  // Перевірка статусу адміністратора
  const checkAdminStatus = async () => {
    try {
      if (!steamID.value) {
        console.error('steamID не визначено або не містить значення.');
        return;
      }

      const adminPages = [
        'sell_stats',
        'edit_sets',
        'give_money',
        'edit_carts',
        'edit_keys',
        'view_admin_logs',
        'danger_zone.wipeDB'
      ];

      const requests = adminPages.map(page =>
        axios.get(`${url.value}/admin/isAdmin/${steamID.value}/admin_page.${page}`)
      );

      const responses = await Promise.all(requests);

      adminPermissions.value = {};
      responses.forEach((res, index) => {
        const key = adminPages[index];
        adminPermissions.value[key] = res.data.isAdmin;
      });

      console.log('Адмінські дозволи:', adminPermissions.value);

      isAdmin.value = responses.some(res => res.data.isAdmin);
      console.log('Чи є адміном:', isAdmin.value);

      if (adminPermissions.value['sell_stats']) {
        getSellStats();
      }

      if (adminPermissions.value['view_admin_logs']) {
        startUpdatingLogs();
      }

    } catch (error) {
      console.error('Помилка при отриманні статусу адміна:', error);
    }
  };

  // Фільтрація табів на основі дозволів
  const filteredTabs = computed(() => {
    return tabs.value.filter(tab => 
      tab.requiredPermissions.some(permission => adminPermissions.value[permission])
    );
  });

  const getSellStats = async () => {
    try {
      const { data } = await axios.get(`${url.value}/admin/${steamID.value}/getSellStats`);
      sellStats.value = data;
    } catch (error) {
      console.error('Помилка завантаження статистики продажів:', error);
    }
  };

  const getAdminLogs = async () => {
    try {
      const { data } = await axios.get(`${url.value}/admin/${steamID.value}/getAdminLogs`);
      adminLogs.value = data;
    } catch (error) {
      console.error('Помилка завантаження логів:', error);
    }
  };

  // Функція для запуску оновлення логів
  const startUpdatingLogs = () => {
    getAdminLogs(); // Отримуємо одразу
    stopUpdatingLogs(); // Якщо був старий інтервал — чистимо

    intervalId.value = setInterval(() => {
      getAdminLogs();
    }, 2000);

    console.log('Оновлення логів запущено.');
  };

  // Функція для зупинки оновлення логів
  const stopUpdatingLogs = () => {
    if (intervalId.value) {
      clearInterval(intervalId.value);
      intervalId.value = null;
      console.log('Оновлення логів зупинено.');
    }
  };


  const fetchBalance = async () => {
    try {
      if (!adminPermissions.value['give_money'] || !steamIdPlayerMain.value) return;

      const response = await axios.get(`${url.value}/coins/balance/${steamIdPlayerMain.value}?adminID=${steamID.value}`);
      playerBalance.value = response.data.balance;

      console.log('Баланс гравця:', playerBalance.value);
    } catch (error) {
      console.error('Помилка при отриманні балансу:', error);
    }
  };

  const addCoins = async (coins) => {
    try {
      if (!adminPermissions.value['give_money']) {
        console.error('Недостатньо прав для додавання коінів.');
        return;
      }
      if (!steamIdPlayerMain.value) {
        console.error('SteamID не вказано.');
        return;
      }

      const response = await axios.post(`${url.value}/admin/${steamID.value}/addCoins`, {
        steamID: steamIdPlayerMain.value,
        coins,
      });

      console.log('Коіни додано:', response.data);
      await fetchBalance(); // Оновлення балансу після успішного додавання коінів
    } catch (error) {
      console.error('Помилка при додаванні коінів:', error);
    }
  };

  const fetchCaseData = async () => {
    try {
      if (!adminPermissions.value['edit_keys']) return;

      const res = await axios.get(`${url.value}/cases/getChests`);
      chests.value = res.data;
    } catch (error) {
      console.error("Error fetching case data:", error);
    }
  };

  // Отримання ключів гравця
  const fetchPlayerKeys = async () => {
    try {
      if (!adminPermissions.value['edit_keys']) return;

      const res = await axios.get(`${url.value}/cases/getPlayerKeys/${steamIdPlayerMain.value}?adminID=${steamID.value}`);
      playerKeys.value = res.data || {};
      updatedPlayerKeys.value = { ...res.data }; // Копіюємо значення для редагування
    } catch (error) {
      console.error("Error fetching player keys:", error);
    }
  };

  const addKey = (chestId) => {
    updatedPlayerKeys.value[chestId] = (updatedPlayerKeys.value[chestId] || 0) + 1;
  };

  const removeKey = (chestId) => {
    if (updatedPlayerKeys.value[chestId] > 0) {
      updatedPlayerKeys.value[chestId]--;
    }
  };

  // Збереження змін на сервері
  const saveChanges = async () => {
    try {
      // Формуємо повний список ключів, оновлюючи значення, якщо воно змінилося
      const formattedKeysData = Object.fromEntries(
        Object.entries(playerKeys.value).map(([chestKey, count]) => [
          chestKey,
          updatedPlayerKeys.value[chestKey] ?? count, // Якщо значення не змінилося, залишаємо старе
        ])
      );

      console.log("SteamID:", steamIdPlayerMain.value);
      console.log("Sending keys_data:", JSON.stringify(formattedKeysData, null, 2));

      await axios.post(`${url.value}/admin/${steamID.value}/savePlayerKeys`, {
        steamID: steamIdPlayerMain.value,
        keys_data: formattedKeysData,
      });

      playerKeys.value = { ...updatedPlayerKeys.value };
      console.log("✅ Keys successfully updated!", formattedKeysData);
      alert("✅ Keys successfully updated!", formattedKeysData);
    } catch (error) {
      console.error("❌ Error updating player keys:", error.response?.data || error.message);
    }
  };

  // Отримання назви кейсу за ID
  const getChestName = (chestId) => {
    const chest = chests.value.find((chest) => chest.chest_id == chestId);
    return chest ? chest.displayName : "Unknown Chest";
  };

  // Отримання зображення кейсу за ID
  const getChestImage = (chestId) => {
    const chest = chests.value.find((chest) => chest.chest_id == chestId);
    return chest ? chest.displayImage : "";
  };

  const fetchCard = async () => {
    try {
      if (!adminPermissions.value['edit_carts']) return;

      const response = await axios.get(`${url.value}/admin/${steamID.value}/getFullProductList`);
      availableCard.value = response.data;
    } catch (error) {
      console.error("Помилка при отриманні сетів:", error);
    }
  };

  // Отримання предметів гравця
  const fetchPlayerCard = async () => {
    try {
      if (!adminPermissions.value['edit_carts']) return;

      const res = await axios.get(`${url.value}/carts/getCart/${steamIdPlayerMain.value}?adminID=${steamID.value}`);
      playerCard.value = res.data || {};
      updatedPlayerCard.value = { ...res.data }; // Копіюємо значення для редагування
    } catch (error) {
      console.error("Error fetching player cart:", error);
    }
  };

  // Додавання предмету в кошик
  const addCard = (cardId) => {
    // Шукаємо товар у списку оновлених карток гравця
    const cardInCart = updatedPlayerCard.value.Products.find((item) => item.product === cardId);

    if (cardInCart) {
      cardInCart.count++;
    } else {
      // Додаємо товар, якщо його немає (цей блок залишився для першої картки)
      const itemFromStore = availableCard.value.find((item) => item.id === cardId);
      if (itemFromStore) {
        updatedPlayerCard.value.Products.push({
          product: cardId,
          count: 1,
          displayName: itemFromStore.displayName,
        });
      }
    }
  };

  // Видалення предмету з кошика
  const removeCard = (cardId) => {
    const card = updatedPlayerCard.value.Products.find((item) => item.product === cardId);
    if (card && card.count > 0) {
      card.count--;
      // Видаляємо предмет, якщо кількість стала 0
      if (card.count === 0) {
        updatedPlayerCard.value.Products = updatedPlayerCard.value.Products.filter((item) => item.product !== cardId);
      }
    }
  };

  // Збереження змін на сервері
  const saveCartChanges = async () => {
    try {
      const formattedCartData = Object.fromEntries(
        Object.entries(playerCard.value).map(([cardKey, count]) => [
          cardKey,
          updatedPlayerCard.value[cardKey] ?? count,
        ])
      );

      console.log("SteamID:", steamIdPlayerMain.value);
      console.log("Sending cart_data:", JSON.stringify(formattedCartData, null, 2));

      await axios.post(`${url.value}/admin/${steamID.value}/savePlayerCart`, {
        steamID: steamIdPlayerMain.value,
        cart_data: formattedCartData,
      });

      playerCard.value = { ...updatedPlayerCard.value };
      console.log("✅ Cart successfully updated!", formattedCartData);
      alert("✅ Cart successfully updated!", formattedCartData);
    } catch (error) {
      console.error("❌ Error updating player cart:", error.response?.data || error.message);
    }
  };

  // Отримання сетів
  const fetchSets = async () => {
    try {
      if (!adminPermissions.value['edit_sets']) return;

      const response = await axios.get(`${url.value}/sets/getAvailableSets`);
      availableSets.value = response.data;
    } catch (error) {
      console.error("Помилка при отриманні сетів:", error);
    }
  };

  // Отримання сету гравця
  const fetchPlayerSet = async () => {
    try {
      if (!adminPermissions.value['edit_sets']) return;

      const res = await axios.get(
        `${url.value}/sets/getPlayerSets/${steamIdPlayerMain.value}?adminID=${steamID.value}`
      );
      console.log("Full response:", res.data);
      playerSet.value = res.data || [];
      updatedPlayerSet.value = [...playerSet.value];
    } catch (error) {
      console.error("Error fetching player set:", error);
    }
  };

  // Додавання сета в кошик
  const addSet = (setId) => {
    const setInCart = updatedPlayerSet.value.find((item) => item.set === setId);

    // Якщо набір вже є, збільшуємо кількість
    if (setInCart) {
      setInCart.count++;
    } else {
      const setFromStore = availableSets.value[setId];
      if (setFromStore) {
        updatedPlayerSet.value.push({
          set: setId,
          count: 1,
          displayName: setFromStore,
          valid_till: 30, // Додаємо термін придатності при додаванні нового сета (30 днів за замовчуванням)
        });
      }
    }
  };

  // Видалення сета з кошика
  const removeSet = (setId) => {
    const setIndex = updatedPlayerSet.value.findIndex((item) => item.set === setId);
    
    if (setIndex !== -1) {
      // Якщо count не визначено, ставимо 1
      updatedPlayerSet.value[setIndex].count = updatedPlayerSet.value[setIndex].count || 1;
      
      if (updatedPlayerSet.value[setIndex].count > 1) {
        updatedPlayerSet.value[setIndex].count--;
      } else {
        updatedPlayerSet.value.splice(setIndex, 1);
      }
    }
  };

  // Функція для редагування терміну придатності
  const toggleEditing = (setId) => {
    if (editingSet.value === setId) {
      editingSet.value = null; // Відключити редагування, якщо той самий набір
    } else {
      editingSet.value = setId; // Включити редагування для обраного набору
    }
  };

  // Перевірка чи набір редагується
  const isEditing = (setId) => {
    return editingSet.value === setId;
  };

  // Збереження змін
  const saveSetChanges = async () => {
    try {
      // Формуємо дані в потрібному форматі [{ "set": "firefighter", "valid_till": 31 }]
      const formattedSetData = updatedPlayerSet.value.map((item) => ({
        set: item.set,
        valid_till: item.valid_till || 1, // Встановлюємо значення valid_till, якщо воно не задано
      }));

      console.log("SteamID:", steamIdPlayerMain.value);
      console.log("Sending set_data:", JSON.stringify(formattedSetData, null, 2));

      // Відправляємо дані на сервер
      await axios.post(`${url.value}/admin/${steamID.value}/savePlayerSet`, {
        steamID: steamIdPlayerMain.value,
        set_data: formattedSetData,
      });

      // Оновлюємо локальні дані
      playerSet.value = [...updatedPlayerSet.value];
      console.log("✅ Set successfully updated!", formattedSetData);
      alert("✅ Set successfully updated!", formattedSetData);
    } catch (error) {
      console.error("❌ Error updating player set:", error.response?.data || error.message);
    }
  };

  const hasAdminAccess = computed(() => 
    Object.values(adminPermissions.value).some(permission => permission)
  );

  // Після завантаження даних встановлюємо permissionsLoaded у true
  checkAdminStatus().then(() => {
    permissionsLoaded.value = true;
  });

  const wipeDatabase = async () => {
    try {
      loading.value = true;
      await axios.post(`${url.value}/admin/${steamID.value}/wipeDB`);
      alert("Базу даних успішно вайпнуто!");
    } catch (error) {
      console.error("Помилка при вайпі бази даних:", error);
      alert("Не вдалося вайпнути базу. Перевірте консоль.");
    } finally {
      loading.value = false;
      showModal.value = false;
    }
  };

  watch(steamIdPlayerMain, (newValue) => {
    if (newValue) {
      fetchBalance();
      fetchPlayerKeys();
      fetchPlayerCard();
      fetchPlayerSet();
    }
  });

  watch(adminPermissions, (newPermissions) => {
    if (newPermissions) {
      fetchSets();
      fetchCard();
      fetchCaseData();
    }
  });
  
  // Стежимо за переходом між сторінками та зупиняємо оновлення логів при виході зі сторінки
  watch(() => route.path, (newPath) => {
    if (newPath !== '/krabikpolitsai') {
      stopUpdatingLogs();
    }
  });

  onMounted(() => {
    checkAdminStatus();
  });

  onUnmounted(() => {
    stopUpdatingLogs();
  });
</script>

<style scoped>
  .tab {
    transition: background 0.3s;
  }
  .active-tab {
    background: #ffcc00;
    color: #000;
    border: none;
  }
</style>
