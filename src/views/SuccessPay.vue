<template>
  <div class="min-h-screen bg-gray-100 flex flex-col justify-center">
    <div class="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden md:max-w-lg">
      <div class="md:flex">
        <div class="w-full p-4">
          <div class="flex justify-between flex-col">
            <span class="text-green-500 text-lg font-medium">Оплата проведена успішно!</span>
            <span class="block text-sm text-gray-600 font-semibold">ID заказа: {{ orderId }}</span>
          </div>
          <div class="mt-4">
            <div class="text-gray-800 text-lg mb-2">Деталі покупки:</div>
            <ul class="text-sm text-gray-600">
              <li>Товар: {{ productName }}</li>
              <li>Ціна: {{ price }} {{ currency }}</li>
              <li>Дата: {{ purchaseDate }}</li>
            </ul>
          </div>
          <div class="flex justify-between items-center mt-8">
            <button class="px-4 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded hover:bg-gray-300 focus:outline-none">
              Повернутись до магазину
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderId: '123456',
      productName: 'Назва',
      price: '99.99',
      currency: 'ГРН',
      purchaseDate: '04.20.1337',
    }
  },
  // Здесь вы можете добавить логику для получения данных от Stripe
}
</script>
