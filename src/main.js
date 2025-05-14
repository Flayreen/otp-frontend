import { createApp } from "vue";
import { createPinia } from "pinia";
import axios from "axios";
import App from "./App.vue";
import router from "./router";
import "./index.css";

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount("#app");

// Отримуємо параметри з URL
const params = new URLSearchParams(window.location.search);
const steamID = params.get("steamID");
const nickname = params.get("nickname");
const avatarURL = params.get("avatarurl");

// Функція для відправки статистики
const sendVisitorData = () => {
  axios.post('https://otpdayz.store:3000/sendVisitor')
  .then(response => {
    console.log('Відвідування додано', response.data);
  })
  .catch(error => {
    console.error('Помилка при відправці статистики', error);
  });
};

// Якщо є steamID, зберігаємо всі дані та очищаємо URL
if (steamID) {
  localStorage.setItem("steamID", steamID);
  localStorage.setItem("nickname", nickname || "");
  localStorage.setItem("avatarURL", avatarURL || "");
  window.history.replaceState(null, "", window.location.origin);
  window.location.href = "https://otpdayz.store:3000/";
  checkAuthorization(steamID); 

  // Викликаємо функцію для відправки статистики після збереження даних
  sendVisitorData();
} else {
  const storedSteamID = localStorage.getItem("steamID");
  if (storedSteamID) {
    checkAuthorization(storedSteamID);
  }
}


// Функція для перевірки авторизації
function checkAuthorization(steamID) {
  axios.get(`https://otpdayz.store:3000/auth/isAuthorized/${steamID}`)
    .then(response => {
      console.log("Отримана відповідь:", response.data); // Лог для перевірки структури відповіді
      if (!response.data.status) { // Перевіряємо конкретно `status`
        console.log("Користувач не авторизований, очищення localStorage...");
        
        // Очищуємо localStorage
        localStorage.removeItem("steamID");
        localStorage.removeItem("nickname");
        localStorage.removeItem("avatarURL");

        // Чекаємо, щоб зміни застосувалися, потім оновлюємо сторінку
        setTimeout(() => {
          console.log("Перезавантаження сторінки...");
          location.reload();
        }, 100);
      }
    })
    .catch(error => {
      console.error("Помилка перевірки авторизації:", error);
    });
}
