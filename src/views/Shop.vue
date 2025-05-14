<template>
  <section class="relative">
    <div class="max-w-[1920px] mx-auto">
      <div v-if="notification" class="notification">
        {{ notification }}
      </div>
      <div v-if="acceptRulesB" class="content  lg:px-[80px] md:px-[40px] sm:px-[16px] py-0">
        <baseheader class="z-[1000] top-10 bg-[#171717d8] rounded-xl" />
        <div data-aos="fade-up" data-aos-duration="800" data-aos-delay="200" class="pt-8">
          <div v-if="currentProduct" class="flex items-center justify-center">
            <div class="flex sm:flex-col-reverse in:flex-row items-center lg:mb-12 sm:mb-0 lg:gap-16 md:gap-16 max-w-[1200px] transform transition-transform duration-300 lg:hover:scale-105">
              <div class="flex flex-col gap-12 sm:items-center in:items-start">
                <div class="flex flex-col gap-8 sm:items-center in:items-start">
                  <div class="flex flex-col gap-2 sm:items-center in:items-start">
                    <div class="russo">
                      <span class="text-[#ffffff] max-w-[360px] letter-s-0-8px russo lg:text-[22px] md:text-[20px] sm:text-[18px]">
                        {{ currentProduct.title }}
                      </span>
                    </div>
                    <p class="letter-s-0-8px max-w-[360px] sm:text-[12px] font-semibold text-[#AFAFAF]" v-html="currentProduct.desc"></p>
                  </div>
                  <p v-if="currentProduct.discountPrice && currentProduct.discountPrice !== 0" class="lg:text-[14px] sm:text-[12px] russo text-F7CF14 flex items-center gap-2">
                    <span class="line-through text-AFAFAF text-[12px]">{{ currentProduct.price }}</span>
                    <span>{{ currentProduct.discountPrice }}</span>
                    <img class="w-[20px] h-[20px]" src="/images/basket/Krab_Coin.png" alt="">
                  </p>
                  <p v-else class="lg:text-[14px] sm:text-[12px] russo text-F7CF14 flex items-center gap-2">
                    {{ currentProduct.price }}
                    <img class="w-[20px] h-[20px]" src="/images/basket/Krab_Coin.png" alt="">
                  </p>
                </div>
                <button
                  @click="saveToBasketCurrent(currentProduct)"
                  class="rounded-[5px] h-[44px] md:w-[290px] russo sm:w-full bg-F7CF14 text-[16px] text-171717 mb-16 active:scale-75 transition-transform duration-300"
                >
                  Додати в кошик
                </button>
              </div>
              <img :src="`/images/products/${currentProduct.itemID}.png`" alt="" class="md:max-w-[300px] mr-8 sm:mr-0 sm:px-8 md:px-0" />
            </div>
          </div>
        </div>

        <div data-aos="fade-down" data-aos-duration="800" data-aos-delay="100" class="flex flex-col lg:px-[56px] md:flex-row mb-4">
          <div class="flex flex-col px-0 py-4 md:px-4 md:flex-row md:gap-0">
            <span
              :style="{
                backgroundColor: activeTab === 'allItems' ? '#F7CF14' : '#171717',
                color: activeTab === 'allItems' ? '#000000' : '#FFFFFF',
                borderColor: activeTab === 'allItems' ? '#171717' : '#FFFFFF',
                transform: activeTab === 'allItems' ? (windowWidth >= 768 ? 'scale(1.15)' : 'scale(1)') : 'scale(1)',
                transition: 'transform 0.3s ease'
              }"
              @click="changeTab('allItems')"
              class=" duration-300 font-bold cursor-pointer text-[14px] lg:me-10 mb-4 px-6 py-2 rounded-[8px] whitespace-nowrap border-[2px] border-white"
            >
              Усі товари
            </span>
            <template v-for="(item, idx) in categories" :key="idx">
              <span
                @click="changeTab(item)"
                :style="{
                  backgroundColor: activeTab === item.title ? '#F7CF14' : '#171717',
                  color: activeTab === item.title ? '#000000' : '#FFFFFF',
                  borderColor: activeTab === item.title ? '#171717' : '#FFFFFF',
                  transform: activeTab === item.title ? (windowWidth >= 768 ? 'scale(1.15)' : 'scale(1)') : 'scale(1)',
                  transition: 'transform 0.3s ease'
                }"
                class="text-white font-bold duration-300 cursor-pointer text-[14px] lg:me-10 mb-4 lg:w-[none] w-full px-6 py-2 rounded-[8px] whitespace-nowrap border-[2px] border-white"
              >
                {{ item.title }}
              </span>
            </template>
          </div>
        </div>

        <div data-aos="fade-up" data-aos-duration="800" data-aos-delay="200" class="text-left lg:px-[56px]">
          <div class="items-container padding-x-Custom">
            <template v-for="(item, idx) in products" :key="idx">
              <div class="rounded-2xl min-h-[150px] max-w-[180px] card-center flex flex-col justify-between lg:hover:scale-110 duration-300">
                <div class="flex flex-col gap-2">
                  <div
                    @mouseover="hoveredProduct = item.itemID"
                    @mouseleave="hoveredProduct = ''"
                    class="relative flex flex-col justify-center my-0 rounded-b-[5px]"
                    :style="{ background: `linear-gradient(to bottom, #171717 0%, ${getColors(item.rarity).color2} 80%)` }"
                  >
                    <!-- Пов'язка "АКЦІЯ" у верхньому кутку, показується, якщо discountPrice > 0 і не наведено -->
                    <div
                      v-if="item.discountPrice > 0 && hoveredProduct !== item.itemID"
                      class="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold px-2 py-[3px]"
                      style="transform-origin: top right; pointer-events: none;"
                    >
                      ЗНИЖКА
                    </div>

                    <div>
                      <div
                        v-if="hoveredProduct === item.itemID"
                        class="p-4 desc-container bg-171717"
                      >
                        <p class="pb-1 text-center" style="font-size: 14px; font-weight: 900; color: white" v-html="item.title"></p>
                        <p class="text-topcenter" style="font-size: 10px; font-weight: bold; color: white; padding: 0.5%" v-html="item.desc"></p>
                      </div>
                      <img class="rounded-2xl" :src="`/images/products/${item.itemID}.png`" alt="" />
                      <div class="h-[11px] w-full absolute bottom-0 rounded-b-[5px]" :style="{ backgroundColor: getColors(item.rarity).color1 }"></div>
                    </div>
                  </div>
                </div>
                <div class="mt-2">
                  <p class="text-[14px] russo letter-s-0-8px mb-2">{{ item.title }}</p>
                  <div class="flex gap-2">
                    <template v-if="item.discountPrice && item.discountPrice !== 0">
                      <div class="flex items-center gap-2">
                        <p class="sm:text-[14px] lg:text-[10px] russo font-small letter-s-0-8px text-AFAFAF line-through">
                          {{ item.price }}
                        </p>
                        <p class="sm:text-[14px] lg:text-[12px] russo font-small letter-s-0-8px text-F7CF14">
                          {{ item.discountPrice }}
                        </p>
                      </div>
                    </template>
                    <template v-else>
                      <p class="sm:text-[14px] lg:text-[12px] russo font-small letter-s-0-8px text-F7CF14">
                        {{ item.price }}
                      </p>
                    </template>
                    <img class="w-[16px] h-[16px]" src="/images/basket/Krab_Coin.png" alt="" />
                  </div>
                </div>
                <div class="py-3 text-left cost">
                  <div class="flex justify-between pr-2">
                    <div class="flex items-center">
                      <button
                        style="margin-right: 10px"
                        @click="addcount(item, -1)"
                        class="duration-300 hover:scale-110"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clip-path="url(#clip0_562_535)">
                            <path
                              d="M19 13H5C4.73478 13 4.48043 12.8946 4.29289 12.7071C4.10536 12.5196 4 12.2652 4 12C4 11.7348 4.10536 11.4804 4.29289 11.2929C4.48043 11.1054 4.73478 11 5 11H19C19.2652 11 19.5196 11.1054 19.7071 11.2929C19.8946 11.4804 20 11.7348 20 12C20 12.2652 19.8946 12.5196 19.7071 12.7071C19.5196 12.8946 19.2652 13 19 13Z"
                              fill="white"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_562_535">
                              <rect width="24" height="24" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </button>
                      <span class="russo letter-s-0-8px text-[14px]">{{ item.count }}</span>
                      <button
                        style="margin-left: 10px"
                        @click="addcount(item, 1)"
                        class="duration-300 hover:scale-110 rounded-xl"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clip-path="url(#clip0_562_540)">
                            <path
                              d="M19 11H13V5C13 4.73478 12.8946 4.48043 12.7071 4.29289C12.5196 4.10536 12.2652 4 12 4C11.7348 4 11.4804 4.10536 11.2929 4.29289C11.1054 4.48043 11 4.73478 11 5V11H5C4.73478 11 4.48043 11.1054 4.29289 11.2929C4.10536 11.4804 4 11.7348 4 12C4 12.2652 4.10536 12.5196 4.29289 12.7071C4.48043 12.8946 4.73478 13 5 13H11V19C11 19.2652 11.1054 19.5196 11.2929 19.7071C11.4804 19.8946 11.7348 20 12 20C12.2652 20 12.5196 19.8946 12.7071 19.7071C12.8946 19.5196 13 19.2652 13 19V13H19C19.2652 13 19.5196 12.8946 19.7071 12.7071C19.8946 12.5196 20 12.2652 20 12C20 11.7348 19.8946 11.4804 19.7071 11.2929C19.5196 11.1054 19.2652 11 19 11Z"
                              fill="white"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_562_540">
                              <rect width="24" height="24" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </button>
                    </div>
                    <button
                      @click="saveToBasket(item)"
                      class="letter-s-0-8px text-[14px] russo text-171717 bg-F7CF14 duration-300 rounded-[5px] px-4 py-1.5 active:scale-75 transition-transform"
                    >
                      Додати
                    </button>
                  </div>
                </div>
              </div>
            </template>

          </div>
        </div>
        <basefooter class="lg:px-[70px]"/>
      </div>
      <div v-else class="min-h-screen p-8 bg-gray-100">
        <div class="relative max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-lg z-100000 bg-opacity-90">
          <div class="back">
            <RouterLink to="/" class="flex flex-row items-center">
              <div class="mr-2 img">
                <svg width="24px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    <path d="M5 12H19M5 12L11 6M5 12L11 18" stroke="#000000" stroke-width="2" stroke-linecap="round"
                      stroke-linejoin="round"></path>
                  </g>
                </svg>
              </div>
              <div class="text">
                Повернутися
              </div>
            </RouterLink>
          </div>
          <h1 class="mb-4 lg:text-[20px] md:text-[16px] sm:text-[14px] font-bold text-center text-gray-800">Ласкаво просимо на сторінку магазину серверу!</h1>
          <h2 class="mt-8 mb-4 lg:text-[18px] md:text-[16px] sm:text-[14px] font-semibold text-gray-800">Інструкція з використання магазину OTP</h2>
          <p class="mb-4 text-gray-600 md:text-[14px] sm:text-[12px]">
            Для початку Вам потрібно вибрати щось з нижчеперелічених товарів,
            після чого Вас буде перенаправлено на сторінку оплати, далі здійсніть оплату.
            Коли оплата пройде успішно товар в грі ви зможете отримати відкривши меню.
          </p>
          <p class="mb-4 text-gray-600  md:text-[14px] sm:text-[12px]">
            Відкрити меню - латинська буква "B"
          </p>
          <p class="mb-4 text-gray-600  md:text-[14px] sm:text-[12px]">
            Якщо у Вас виникли труднощі при оплаті, або ви не отримали те за що заплатили, тощо.
            Звернутися за допомогою можна в наш
            <a href="https://discord.com/invite/VxCwX7cFXU" target="_blank">
              <span class="text-576DE0">Discord</span>
            </a>
          </p>
          <p class="mb-4 text-D75857 md:text-[14px] sm:text-[12px]">
            (Товар обміну/поверненню не підлягає, при вайпі серверу - корзина обнуляється!)
          </p>
          <h2 class="mt-8 mb-4 lg:text-[18px] md:text-[16px] sm:text-[14px] font-semibold text-gray-800">Географічні обмеження</h2>
          <p class="mb-4 text-gray-600 md:text-[14px] sm:text-[12px]">
            Сайт otpdayz.store призначений для користувачів, які знаходяться на території України. Доступ із інших країн, зокрема країн ЄС, здійснюється на власний ризик.
          </p>
          <h2 class="mt-8 mb-4 lg:text-[18px] md:text-[16px] sm:text-[14px] font-semibold text-gray-800">Згода користувача з умовами</h2>
          <p class="mb-4 text-gray-600 md:text-[14px] sm:text-[12px]">
            Продовжуючи використання цього сайту, ви підтверджуєте, що ознайомлені з умовами
            <a href="https://otpdayz.store/usage-conditions" target="_blank">
              <span class="text-576DE0">Користувацької угоди</span>
            </a> 
            та 
            <a href="https://otpdayz.store/privacy-policy" target="_blank">
              <span class="text-576DE0">Політики конфіденційності</span>
            </a> 
            та погоджуєтеся з ними.
          </p>
          <div class="flex flex-row items-center gap-2 mb-4">
            <input type="checkbox" id="rulesCheckbox" v-model="rememberChoice" class="w-4 h-4" />
            <label for="rulesCheckbox" class="text-gray-600 md:text-[14px] sm:text-[12px]">
              Я ознайомився з інструкцією використання магазину
            </label>
          </div>
          <div class="flex flex-row items-center gap-2 mb-4">
            <input type="checkbox" id="privasyUsage" v-model="rememberChoice2" class="w-4 h-4" />
            <label for="privasyUsage" class="text-gray-600 md:text-[14px] sm:text-[12px]">
              Я ознайомився з умовами Користувацької угоди і Політики конфіденційгності
            </label>
          </div>
          <button
          :disabled="!(rememberChoice && rememberChoice2)"
          @click="acceptRules"
          class="rounded-[5px] h-[40px] w-[343px] letter-s-0-8px bg-black russo text-white text-[18px] mb-8 disabled:bg-gray-300">
            Закрити
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import baseheader from '@/components/base/Header.vue'
import basefooter from '@/components/base/Footer.vue'
import { ref, onMounted, onBeforeUnmount, onUnmounted, watchEffect } from 'vue'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import { useCartStore } from '@/cartStore'

const products = ref([]) 
const allProducts = ref([]) 
const categories = ref([]) 
const activeTab = ref('allItems')
const hoveredProduct = ref(null)
const steamID = ref('')
const rememberChoice = ref(false)
const rememberChoice2 = ref(false)
const acceptRulesB = ref(false)
const currentProduct = ref(null)
const notification = ref("");
const cartStore = useCartStore();

const addcount = (item, amount) => {
  item.count = Math.max(item.count + amount, 1);
};

const saveToBasket = (item) => {
  // Формуємо копію товару з discountPrice
  const itemToAdd = { ...item, discountPrice: item.discountPrice };
  cartStore.addToCart(itemToAdd, item.count);
  notification.value = `Додано ${item.count} шт. ${item.title} в кошик`;
  setTimeout(() => {
    notification.value = "";
  }, 3000);
  item.count = 1;
};

const saveToBasketCurrent = (item) => {
  const itemToAdd = { ...item, discountPrice: item.discountPrice };
  cartStore.addToCart(itemToAdd, item.count);
  notification.value = `Додано 1 шт. ${item.title} в кошик`;
  setTimeout(() => {
    notification.value = "";
  }, 3000);
  item.count = 1;
};



const getBaseUrl = () => `https://otpdayz.store:3000`

function getColors(rarity) {
  const rarityColors = {
    1: { color1: "#576DE0", color2: "rgba(62, 74, 138, 0.8)" }, 
    2: { color1: "#4F24A7", color2: "rgba(53, 28, 112, 0.7)" }, 
    3: { color1: "#B641C4", color2: "rgba(132, 44, 143, 0.7)" }, 
    4: { color1: "#D75857", color2: "rgba(111, 49, 49, 0.7)" }, 
  };

  return rarityColors[rarity] || { color1: "#FFFFFF", color2: "#DDDDDD" };
}

function acceptRules() {
  localStorage.setItem('acceptRules', 'true')
  location.reload() 
}

function changeTab(item) {
  if (typeof item === 'object' && item !== null && 'title' in item) {
    activeTab.value = item.title

    const productsInCategory = allProducts.value.filter(
      (product) => product.categoryID === item.id
    )
    products.value = productsInCategory
  } else {
    activeTab.value = item
    products.value = allProducts.value
  }
}

const basket = ref(JSON.parse(localStorage.getItem("basket")) || []);

async function fetchData() {
  try {
    const [productRes, categoryRes, discountRes] = await Promise.all([
      axios.get(`${getBaseUrl()}/store/getProducts`),
      axios.get(`${getBaseUrl()}/store/getCategories`),
      axios.get(`${getBaseUrl()}/getDiscountStatus`)
    ])

    const discountData = discountRes.data
    const discountPercent = discountData.discount_percent
    const otherDiscounts = discountData.other_discounts || {}

    allProducts.value = productRes.data.map(product => {
      let discountPrice = 0

      // Якщо є загальна знижка
      if (discountPercent > 0) {
        discountPrice = Math.round(product.price * (1 - discountPercent / 100))
      }

      // Якщо є персональна знижка для цього товару
      for (const [percent, items] of Object.entries(otherDiscounts)) {
        if (items.includes(product.itemID)) {
          discountPrice = Math.round(product.price * (1 - percent / 100))
          break // Використовуємо тільки першу знайдену знижку
        }
      }

      return {
        ...product,
        count: 1, // Зберігаємо властивість count: 1
        discountPrice,
        ...getColors(product.rarity)
      }
    })

    products.value = [...allProducts.value]
    categories.value = categoryRes.data

    selectRandomProduct()
  } catch (error) {
    console.error('Помилка при отриманні даних:', error)
  }
}



function selectRandomProduct() {

  const allowedItemIDs = ["case_limited", "case_royal", "bk1"];

  const filteredProducts = allProducts.value.filter(product => 
    allowedItemIDs.includes(product.itemID)
  );

  if (filteredProducts.length) {
    const randomIndex = Math.floor(Math.random() * filteredProducts.length);
    currentProduct.value = filteredProducts[randomIndex];
  }
}

const windowWidth = ref(window.innerWidth)

const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth
}

onMounted(() => {
  fetchData()
  window.addEventListener('resize', updateWindowWidth)
  acceptRulesB.value = localStorage.getItem('acceptRules') === 'true';
  const storedBasket = localStorage.getItem("basket");
  if (storedBasket) {
    basket.value = JSON.parse(storedBasket);
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', updateWindowWidth)
})

</script>

<style scoped>
.items-container {
  display: grid;
  grid-template-columns: repeat(6, 1fr); 
  grid-gap: 32px;
  grid-row-gap: 32px;
  padding-bottom: 100px;
  align-items: center;
  justify-items: center;
}

@media (max-width: 768px) {
  .padding-x-Custom {
    padding: 0px;
  }
  .scrolled-mobile {
    display: none;
  }
  .card-center {
    max-width: 340px;
    margin: 0 auto;
  }
  .items-container {
    grid-gap: 20px;
  }
  .container {
    width: unset;
  }
}

.desc-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  opacity: 0.95;
}

.content {
  color: white;
}

.background-car {
  width: 100%;
  background-image: url('/images/bg_shop.png');
  height: 100%;
  background-size: cover;
}

.fz-24 {
  font-size: 24px;
}

.h-min-411 {
  min-height: 411px;
}

.h-min-413 {
  min-height: 413px;
}

.cars-title {
  font-size: 32px;
}

.bg-gray {
  background-color: #ababab;
  color: black;
}

.cost {
  font-size: 22px;
  border-radius: 0 0 0.25rem 0.25rem;
}

@media (max-width: 768px) {
  .container {
    padding: 0 5px;
  }

  .hidden-mobile {
    display: none;
  }
}

.notification {
  font-size: 12px;
  position: fixed;
  top: 60px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  background-color: #F7CF14;
  color: black;
  border-radius: 5px;
  text-align: center;
  font-weight: bold;
  z-index: 1000;

}
</style>
