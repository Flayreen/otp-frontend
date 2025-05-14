import { defineStore } from 'pinia';

export const useCartStore = defineStore('basket', {
  state: () => {
    const storedBasket = localStorage.getItem('basket');
    const initialBasket = storedBasket ? JSON.parse(storedBasket) : [];
    return { basket: initialBasket };
  },
  actions: {
    addToCart(item, count = 1) {
      // Підтягуємо актуальний кошик з localStorage
      const storedBasket = localStorage.getItem('basket');
      const basket = storedBasket ? JSON.parse(storedBasket) : [];
    
      // Шукаємо товар за itemID
      const existingProduct = basket.find(cartItem => cartItem.itemID === item.itemID);
    
      if (existingProduct) {
        // Якщо товар є в кошику, збільшуємо його кількість і оновлюємо discountPrice
        existingProduct.count += count;
        existingProduct.discountPrice = item.discountPrice;
      } else {
        // Якщо товару немає в кошику, додаємо його з discountPrice
        basket.push({ itemID: item.itemID, count, discountPrice: item.discountPrice });
      }
    
      // Оновлюємо localStorage з актуальними даними
      localStorage.setItem('basket', JSON.stringify(basket));
    },
    updateCount(itemID, newCount) {
        const product = this.basket.find(item => item.itemID === itemID);
        if (product) {
          product.count = newCount;
          if (product.count <= 0) {
            this.removeFromBasket(itemID);
          }
        }
        this.saveBasket();
    },
    removeFromBasket(itemID) {
      this.basket = this.basket.filter(item => item.itemID !== itemID);
      this.saveBasket();
    },
    clearBasket() {
      this.basket = [];
      this.saveBasket();
    },
    saveBasket() {
      localStorage.setItem('basket', JSON.stringify(this.basket));
      console.log('Оновлений кошик у localStorage:', JSON.parse(localStorage.getItem('basket')));
    }
  }
});
