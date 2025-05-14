<template>
  <div class="max-w-[1920px] mx-auto relative lg:px-[80px] md:px-[40px] sm:px-[16px]">
    <baseheader class="absolute mt-4 mb-12"/>
    <main class="content relative z-10 lg:px-[70px] px-5">
      
      <template v-if="activeTab === 'Як почати грати'">
        <h2 data-aos="fade-down" data-aos-duration="800" data-aos-delay="100" class="text-white russo my-8 font-regular lg:text-[24px] md:text-[22px] sm:text-[20px]">
          Як почати грати: DayZ Launcher:
        </h2>
        <art class="animated-block animation-up-info animation-up" :img="'/images/info/4.png'" :reversed="true" :rounded="false">
          Для того, щоб приєднатися до нас, відкрийте лаунчер DayZ та натисніть «Сервери».
        </art>
        <art class="animated-block animation-up-info animation-up" :img="'/images/info/5.png'" :reversed="false" :rounded="false">
          Натисніть вкладку «Спільнота», або ж «Сообщество», після в пошуку введіть назву нашого серверу On The Precipice | PvP Vanilla+ | Map | Party, або ж On The Precipice та оберіть потрібний вам з переліку наших серверів. 
        </art>
        <art class="animated-block animation-up-info animation-up" :img="'/images/info/6.png'" :reversed="true" :rounded="false">
          Додайте сервер до обраних натиснувши на зірочку, як на фото. 
        </art>
        <art class="animated-block animation-up-info animation-up" :img="'/images/info/7.png'" :reversed="false" :rounded="false">
          Після цього, натискаємо на стрілочку, відкриваємо наводячись на сам сервер,  натискаємо вступити,
        </art>
        <art class="animated-block animation-up-info animation-up" :img="'/images/info/8.png'" :reversed="true" :rounded="false">
          після чого вас перекидає до вкладки із завантаженням модифікацій для нашого серверу, натискаєте «Встановити моди і доповнення та приєднатися 
        </art>
        <art class="animated-block animation-up-info animation-up" :img="'/images/info/9.png'" :reversed="false" :rounded="false">
          Якщо ж, Ви не можете знайти сервер по назві, натисніть на пряме підключення та введіть нашу IP-адресу:  
        </art>
        <art class="animated-block animation-up-info animation-up" :img="'/images/info/10.png'" :reversed="true" :rounded="false">
          Підключитись на Vanilla + 194.26.183.152:2302 Підключитись на Vanilla ++ 194.26.183.152:2402
          Підключитись на Deathmatch 193.34.77.25:2316
          Після чого приберіть порт серверу( останні 4 цифри та дві крапки) та введіть їх до відмітки порту. Додайте сервер до обраних натиснувши галочку.         </art>
        <art class="animated-block animation-up-info animation-up" :img="'/images/info/11.png'" :reversed="false" :rounded="false">
          Натисніть «Приєднатися» або «Подключиться». 
          Після чого, вас перекидає до вкладки із завантаженням модифікацій для нашого серверу, натискаєте «Встановити моди і доповнення та приєднатися». Приємної та цікавої гри).
        </art>
      </template>
      <h2 data-aos="fade-down" data-aos-duration="800" data-aos-delay="100" class="text-white russo mb-16 font-regular  lg:text-[24px] md:text-[22px] sm:text-[20px]">
        DZSA Launcher інструкція:
      </h2>
      <art class="animated-block animation-up-info animation-up" :img="'/images/info/12.png'" :reversed="true" :rounded="false">
        
      Якщо ж, у вас не знаходить наш сервер через звичайний лаунчер DayZ, не біда, скористайтесь так званим «червоним» лаунчером для входу.
 
       (Лінк на офіційний сайт - https://dayzsalauncher.com/#/  ) Після скачування дотримуйтесь інструкцій з фото.
        </art>
        <art class="animated-block animation-up-info animation-up" :img="'/images/info/13.png'" :reversed="false" :rounded="false">
          Натискаємо на файл та скачуємо його, після встановлення обираємо куди його встановити та відкриваємо. (Тут вже буде фото файлу, який ми прикріпимо в діскорді, на який натиснувши він завантажується).        </art>
        <art class="animated-block animation-up-info animation-up" :img="'/images/info/14.png'" :reversed="true" :rounded="false">
          Потім відкриваємо встановлений файл і починаємо встановлення, як на фото (Диск обираєте котрий вам буде зручно, але бажано такий самий на який встановлено гру).        </art>
        <art class="animated-block animation-up-info animation-up" :img="'/images/info/15.png'" :reversed="false" :rounded="false">
          Відкриваємо вже завантажений лаунчер, та в пошуку вводимо. 
        </art>
        <art class="animated-block animation-up-info animation-up" :img="'/images/info/16.png'" :reversed="true" :rounded="false">
          Назву серверу On The Precipice або ж IP, як на фото, без останніх 4 цифр та двокрапки 194.26.183.152, натискаємо на зірочку, щоб додати сервер до обраних, в подальшому він буде відображатися в звичайному лаунчері DayZ. 
        </art>
        <art class="animated-block animation-up-info animation-up" :img="'/images/info/17.png'" :reversed="false" :rounded="false">
          Додайте сервер до обраних натиснувши на зірочку, як на фото. 
        </art>
        <art class="animated-block animation-up-info animation-up" :img="'/images/info/18.png'" :reversed="true" :rounded="false">
          Після того, як знайшли сервер, натискаємо на трикутник праворуч від серверу, відкривається додаткова панель, тут натискаємо на Play та чекаємо на завантаження модифікацій, і автоматично приєднуємося до серверу. Приємної та цікавої гри). 
        </art>
      <template v-if="activeTab === 'Гайди'">
        <art :img="'/images/1.png'" :reversed="false" :rounded="false">
          Груповий мод та мапа, щоб ви з друзями не загубились на землях Чорнорусі
        </art>
        <art :img="'/images/2.png'" :reversed="false" :rounded="false">
          Модифіковані вузькі двері, та збільшені крафтові ящики, щоб було зручніше облаштовувати
          оселю.
        </art>
        <art :img="'/images/3.png'" :reversed="true" :rounded="false">
          Добавлено українізований одяг, щоб на сервері була по- справжньому домашня атмосфера
        </art>
      </template>
      <template v-if="activeTab === 'Інше'">
        <art :img="'/images/1.png'" :reversed="true" :rounded="true">
          Груповий мод та мапа, щоб ви з друзями не загубились на землях Чорнорусі
        </art>
        <art :img="'/images/2.png'" :reversed="false" :rounded="true">
          Модифіковані вузькі двері, та збільшені крафтові ящики, щоб було зручніше облаштовувати
          оселю.
        </art>
        <art :img="'/images/3.png'" :reversed="true" :rounded="true">
          Добавлено українізований одяг, щоб на сервері була по- справжньому домашня атмосфера
        </art>
      </template>
      <basefooter/>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import baseheader from '@/components/base/Header.vue'
import basefooter from '@/components/base/Footer.vue'
import art from '@/components/ui/ArticleBlock.vue'

let activeTab = ref('Як почати грати')
</script>

<style scoped></style>
