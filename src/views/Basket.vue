<template>
  <div class="relative w-full h-full p-5">
    <!-- Кнопка для відкриття кошика -->
    <button 
      class="fixed z-10 rounded-lg cursor-pointer bottom-5 left-5" 
      @click="toggleCart" 
      :disabled="isCartOpen"
    >
      <img src="/icons/basket/basket2.svg" alt="Кошик" />
    </button>

    <!-- Фон затемнення -->
    <div v-if="isCartOpen" class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-9" @click="toggleCart"></div>

    <!-- Кошик -->
    <div v-if="isCartOpen" class="fixed z-10 px-10 pt-6 pb-10 transform -translate-x-1/2 -translate-y-1/2 bg-171717  rounded-lg top-1/2 left-1/2 w-[650px] h-[540px]">
      <div class="flex items-center justify-between">
        <h2 class="text-[20px] russo text-white pb-4">Кошик для покупок</h2>
        <button @click="toggleCart">
          <img class="w-[20px] h-[20px]" src="/icons/basket/cross-close.svg" alt="">
        </button>
      </div>
      
      <div v-if="cartItems.length === 0" class="flex flex-col items-center gap-4 mt-24">
        <img src="/images/sad-cat.png" alt="" class="w-[200px] h-[200px]">
        <div class="flex flex-col gap-4">
          <span class="text-white russo text-[20px]">Кошик порожній</span>
          <span class="text-AFAFAF russo text-[14px]">Саме час це виправити ;)</span>
        </div>
      </div>
      
      <div v-else class="space-y-3">
        <div v-for="(item, index) in cartItems" :key="index" class="flex justify-between pb-4 border-b-2 border-white">
          <div class="flex gap-4">
            <div
              class="relative flex flex-col justify-center my-0 rounded-b-[5px] w-[100px] h-[100px]"
              :style="{ background: `linear-gradient(to bottom, #171717 0%, ${getColors(item.rarity).color2} 80%)` }"
            >
              <img class="rounded-2xl w-[100px] h-[100px]" :src="`/images/products/${item.itemID}.png`"/>
              <div class="h-[6px] w-full absolute bottom-0 rounded-b-[5px]" :style="{ backgroundColor: getColors(item.rarity).color1 }"></div>
            </div>
            <div class="flex flex-col gap-1 pt-2">
              <span class="text-white russo text-[14px]">{{ item.title }}</span>
              <div class="flex gap-2">
                <p class="text-[12px] russo font-small letter-s-0-8px text-F7CF14">{{ item.price * item.count }}</p>
                
              </div>
            </div>
          </div>
          <div class="flex flex-col items-end justify-between py-2">
            <button
              @click="removeProduct(item)"
              class="ml-2 text-red-500 hover:text-red-700"
            >
              <img src="/icons/basket/trash.svg" class="w-[20px] h-[20px]" alt="">
            </button>
            <div class="flex items-center">
              <button
                style="margin-right: 10px"
                @click="addcount(item, -1)"
                class="duration-300 hover:scale-110"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 13H5C4.7 13 4.4 12.9 4.3 12.7C4.1 12.5 4 12.2 4 12C4 11.7 4.1 11.5 4.3 11.3C4.4 11.1 4.7 11 5 11H19C19.3 11 19.5 11.1 19.7 11.3C19.9 11.5 20 11.7 20 12C20 12.3 19.9 12.5 19.7 12.7C19.5 12.9 19.3 13 19 13Z" fill="white"/>
                </svg>
              </button>
              <span class="russo letter-s-0-8px text-[14px] text-white">{{ item.count }}</span>
              <button
                style="margin-left: 10px"
                @click="addcount(item, 1)"
                class="duration-300 hover:scale-110 rounded-xl"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 11H13V5C13 4.7 12.9 4.4 12.7 4.3C12.5 4.1 12.2 4 12 4C11.7 4 11.5 4.1 11.3 4.3C11.1 4.4 11 4.7 11 5V11H5C4.7 11 4.4 11.1 4.3 11.3C4.1 11.5 4 11.7 4 12C4 12.3 4.1 12.5 4.3 12.7C4.4 12.9 4.7 13 5 13H11V19C11 19.3 11.1 19.5 11.3 19.7C11.5 19.9 11.7 20 12 20C12.3 20 12.5 19.9 12.7 19.7C12.9 19.5 13 19.3 13 19V13H19C19.3 13 19.5 12.9 19.7 12.7C19.9 12.5 20 12.3 20 12C20 11.7 19.9 11.5 19.7 11.3C19.5 11.1 19.3 11 19 11Z" fill="white"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <p class="text-white">Загальна сума: {{ totalPrice }}</p>
        <button class="px-4 py-2 ml-2 text-white bg-red-500 rounded hover:bg-red-700" @click="clearCart">Очистити корзину</button>
        <button class="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700" @click="checkout">Оформити замовлення</button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watchEffect, onUnmounted } from 'vue';
import axios from 'axios';
import { useCartStore } from '@/cartStore';

const allProducts = ref([]);
const isCartOpen = ref(false);
const cartItems = ref([]);
const cartStore = useCartStore();

const getBaseUrl = () => `https://otpdayz.store:3000`;

function getColors(rarity) {
  const rarityColors = {
    1: { color1: "#576DE0", color2: "rgba(62, 74, 138, 0.8)" }, 
    2: { color1: "#4F24A7", color2: "rgba(53, 28, 112, 0.7)" }, 
    3: { color1: "#B641C4", color2: "rgba(132, 44, 143, 0.7)" }, 
    4: { color1: "#D75857", color2: "rgba(111, 49, 49, 0.7)" }, 
  };
  return rarityColors[rarity] || { color1: "#FFFFFF", color2: "#DDDDDD" };
}

const toggleCart = () => {
  isCartOpen.value = !isCartOpen.value;
};

const loadCartFromLocalStorage = async () => {
  const basket = localStorage.getItem('basket');
  if (!basket) return;
  
  const storedCart = JSON.parse(basket);
  
  if (!allProducts.value.length) {
    await fetchData();
  }

  cartItems.value = storedCart.map(({ itemID, count }) => {
    const fullProduct = allProducts.value.find(product => product.itemID === itemID);
    return fullProduct ? { ...fullProduct, count } : null;
  }).filter(item => item !== null);
};
const addcount = (item, change) => {
  const index = cartItems.value.findIndex(cartItem => cartItem.itemID === item.itemID);
  if (index !== -1) {
    if (change < 0 && cartItems.value[index].count <= 1) {
      return;
    }
    cartStore.updateCount(item.itemID, cartItems.value[index].count + change);
  }
};

const removeProduct = (item) => {
  cartStore.removeFromBasket(item.itemID); // Викликаємо метод removeFromBasket з Pinia
};

const clearCart = () => {
  cartStore.clearBasket(); // Викликаємо метод clearBasket з Pinia
};

const checkout = () => {
  alert('Оплата виконана успішно!');
  clearCart();
};

const totalPrice = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + item.price * item.count, 0);
});

async function fetchData() {
  try {
    const productRes = await axios.get(`${getBaseUrl()}/store/getProducts`);
    allProducts.value = productRes.data;
    await loadCartFromLocalStorage();
  } catch (error) {
    console.error('Помилка при отриманні даних:', error);
  }
}

onMounted(fetchData);

// Listen for changes in the local storage basket
const updateCartFromLocalStorage = () => {
  loadCartFromLocalStorage();
};

// Listen to the storage event on window object for the entire app
onMounted(() => {
  window.addEventListener('storage', updateCartFromLocalStorage);
});

// Clean up the event listener when the component is destroyed
onUnmounted(() => {
  window.removeEventListener('storage', updateCartFromLocalStorage);
});
</script>







