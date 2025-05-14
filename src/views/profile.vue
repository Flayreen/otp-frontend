<template>
    <div class="lg:max-w-[1920px] mx-auto">
      <ServerSelector @link-changed="handleLinkChange" />
        <div class="lg:px-[80px] md:px-[40px] sm:px-[16px] lg:h-auto relative">
          <baseheader class="lg:mb-16 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#171717d8] absolute rounded-xl" />
        </div>
        <div data-aos="fade-up" data-aos-duration="800">
          <div class="md:grid md:grid-cols-2 int:grid-cols-3 lg:grid-cols-4 sm:flex sm:flex-col sm:items-center gl:gap-10 sm:gap-[32px] lg:px-[150px] md:px-[40px] sm:px-[16px] md:max-w-[680px] int:max-w-[990px]  lg:max-w-[1530px] mx-auto lg:transform lg:scale-90 lg:transition-transform lg:duration-200 sm:mb-8 lg:mb-0">
            <!-- Перша картка, яка займає 2 комірки в першому рядку -->
            <div class="order-1 row-span-2">
              <div class="flex items-center justify-center sm:max-w-[400px] sm:min-w-[380px] md:min-w-[277px] md:max-w-[277px]  md:h-[721px] gradient-border gradient-border-mainCard">
                <div class="flex flex-col items-center gap-6 w-[260px]">
                  <div class="flex flex-col items-center gap-6">
                    <div class="flex flex-col gap-6">
                      <div class="flex flex-col gap-6">
                        <div class="flex flex-col items-center gap-6">
                          <div class="flex flex-col gap-2">
                            <h3 class="text-[14px] font-medium text-center text-AFAFAF">Ваш нікнейм</h3>
                            <h2 class="text-[24px] font-semibold text-center text-white">{{ nickname }}</h2>
                          </div>
                          <img :src="avatar" alt="Avatar" class="h-[100px] w-[100px] rounded-full">
                        </div>
                        <div class="flex flex-col gap-2">
                          <h3 class="text-[14px] font-medium text-center text-AFAFAF">Ваш Steam ID</h3>
                          <h2 class="text-[16px] font-semibold text-center text-white">{{ steamID }}</h2>
                        </div>
                      </div>
                      <div class="flex flex-col gap-2">
                        <h3 class="text-[14px] font-medium text-center text-AFAFAF letter-s-0-8px">Активний сет</h3>
                        <template v-if="PlayerSets.length > 0">
                          <div class="flex flex-col items-center">
                            <p class="text-white text-[16px] font-semibold">Сет: {{ PlayerSets[0].set }}</p>
                            <p class="text-AFAFAF text-[14px] font-medium">Дійсний протягом: {{ PlayerSets[0].valid_till }} днів</p>
                          </div>
                        </template>
                        
                        <template v-else>
                            <div class="flex flex-col items-center">
                              <p class="text-white text-[16px] font-semibold">Активні сети відсутні</p>
                              <p class="text-AFAFAF text-[14px] font-medium">Отримати їх можна в магазині</p>
                            </div>
                        </template>
                      </div>
                    </div>
                    <div class="md:w-[229px] md:h-[236px] md:min-w-[229px] md:min-h-[236px] sm:min-w-[290px] sm:min-h-[290px] border-[2px] border-D75857 rounded-[15px] flex items-center justify-center">
                      <template v-if="paidDailyReward">
                        <div class="flex flex-col items-center gap-1 p-2">
                          <img class="h-[90px] w-[90px]" src="/images/profile/premium.png" alt="" />
                          <div class="flex flex-col gap-0.5">
                            <span class="russo text-[16px] text-center text-AFAFAF">Статус:</span>
                            <div class="flex flex-col">
                              <span class="russo text-[24px] text-center text-D75857 letter-s-0-8px">
                                Premium
                              </span>
                              <span class="text-[12px] font-medium text-center text-white letter-s-0-8px">
                                Спливає через: {{ expirationPaidDailyReward }} днів
                              </span>
                            </div>
                          </div>
                        </div>
                      </template>
                      <template v-else>
                        <div class="flex flex-col items-center gap-1 p-2">
                          <img class="h-[90px] w-[90px]" src="/images/profile/premium.png" alt="" />
                          <div class="flex flex-col gap-0.5">
                            <span class="russo text-[16px] text-center text-AFAFAF">Статус:</span>
                            <div class="flex flex-col">
                              <span class="russo text-[24px] text-center text-white letter-s-0-8px">Стандарт</span>
                              <span class="text-[12px] w-[200px] font-medium text-center text-AFAFAF letter-s-0-8px">
                                При отриманні статусу преміум ви будете мати доступ до Преміум бонусів за награний час
                              </span>
                            </div>
                          </div>
                        </div>
                      </template>

                    </div>
                  </div>
                  <div class="flex flex-col items-center gap-2">
                    <span class="text-[14px] font-medium text-center text-AFAFAF">Бажаєте завершити сеанс?</span>
                    <span
                      class="text-[16px] font-semibold text-center text-D75857 cursor-pointer sm:p-6 sm:pt-0 mb:p-0"
                      @click="logout"
                    >
                      Вийти з акаунта
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <!-- Друга картка -->
            <div class="flex order-2 gap-10">
              <div class="flex sm:max-w-[400px] sm:min-w-[380px] md:min-w-[277px] md:max-w-[277px] md:h-[340px] gradient-border gradient-border-balance">
                <div class="flex flex-col items-center gap-4">
                  <img class="w-[90px] h-[90px]" src="/images/basket/Krab_Coin.png" alt="">
                  <div class="flex flex-col items-center gap-4">
                    <div class="flex flex-col items-center gap-2">
                      <span class="russo text-[16px] text-AFAFAF">Баланс:</span>
                      <div class="flex flex-col items-center">
                        <span class="russo text-[24px] text-F7CF14 letter-s-0-8px">{{ coinBalance }}</span>
                        <span class="text-[12px] font-medium text-white letter-s-0-8px">Krab Coin</span>
                      </div>
                    </div>
                    <p class="text-[12px] font-medium italic text-AFAFAF text-center sm:p-8 sm:pt-0 mb:p-0">
                      Валюта для покупок на сайті спільноти OTP. Використовується для придбання предметів, кейсів та інших привілеїв.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <!-- Третя картка -->
            <div class="flex order-3 gap-10">
              <div class="flex sm:max-w-[400px] sm:min-w-[380px] md:min-w-[277px] md:max-w-[277px] md:h-[340px] gradient-border gradient-border-priority">
                <div class="flex flex-col items-center gap-4">
                  <img class="w-[90px] h-[90px]" src="/images/profile/priority.png" alt="">
                  <div class="flex flex-col items-center gap-4">
                    <div class="flex flex-col items-center gap-2">
                      <span class="russo text-[16px] text-AFAFAF">Статус:</span>
                      <div class="flex flex-col items-center">
                        <template v-if="priority">
                          <span class="russo text-[24px] text-8468BD letter-s-0-8px">
                            Пріоритетний
                          </span>
                          <span class="text-[12px] font-medium text-white letter-s-0-8px">
                            Дійсний до: {{ expiration.substring(0, 10) }}
                          </span>
                        </template>
                        <template v-else>
                          <span class="russo text-[24px] text-white letter-s-0-8px">Непріоритетний</span>
                          <span class="text-[12px] font-medium text-white letter-s-0-8px">
                            Можна отримати в магазині
                          </span>
                        </template>
                      </div>
                    </div>
                    <p class="text-[12px] font-medium italic text-AFAFAF text-center sm:p-8 sm:pt-0 mb:p-0">
                      Пріоритетний статус дозволяє вам першочергово отримувати доступ до будь-якого сервера спільноти.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <!-- Четверта картка -->
            <div class="flex order-4 gap-10">
              <div class="flex sm:max-w-[400px] sm:min-w-[380px] md:min-w-[277px] md:max-w-[277px] md:h-[340px] gradient-border gradient-border-insurance justify-center">
                <div class="flex flex-col items-center gap-4">
                  <img class="w-[90px] h-[90px]" src="/images/profile/insurance.png" alt="">
                  <div class="flex flex-col items-center gap-4">
                    <div class="flex flex-col items-center gap-2">
                      <span class="russo text-[16px] text-AFAFAF">Предмети:</span>
                      <div class="flex flex-col items-center">
                        <template v-if="insurance">
                          <span class="russo text-[24px] text-white letter-s-0-8px">
                            Застраховано
                          </span>
                          <span class="text-[12px] font-medium text-white letter-s-0-8px">
                            Спливає через: {{ expirationInsurance.substring(0, 10) }} днів
                          </span>
                        </template>
                        <template v-else>
                          <span class="russo text-[24px] text-white letter-s-0-8px">Незастраховано</span>
                          <span class="text-[12px] font-medium text-white letter-s-0-8px">Можна отримати в магазині</span>
                        </template>
                      </div>
                    </div>
                    <p class="text-[12px] font-medium italic text-AFAFAF text-center sm:p-8 sm:pt-0 mb:p-0">
                      Страховка предметів гарантує збереження ваших предметів при переході між вайпами
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <!-- П'ята та  картка, які об'єднані (2x1) -->
            <div class="col-span-2 sm:order-6 lg:order-5">
              <div class="flex sm:max-w-[400px] sm:min-w-[380px] lg:h-[340px] md:w-[594px] md:max-w-[594px] gradient-border gradient-border-balance justify-center">
                <div class="flex flex-col items-center gap-4">
                  <div class="flex flex-col items-center gap-2">
                    <img class="w-[70px] h-[70px]" src="/icons/profile/addCoins.svg" alt="">
                    <div class="flex flex-col items-center gap-4">
                      <div class="flex flex-col items-center gap-3">
                        <span class="russo text-[16px] text-white">Поповнити гаманець</span>
                        <div class="relative">
                          <div class="absolute font-semibold text-white transform -translate-y-1/2 left-3 top-1/2">
                            <img src="/icons/profile/wallet.svg" alt="">
                          </div>
                          <input
                            v-model="amount"
                            @input="onInput"
                            class="p-3 pl-10 rounded-[10px] border-[3px] border-F7CF14 bg-transparent text-white placeholder-[#AFAFAF] text-[14px] font-semibold md:w-[535px] sm:min-w-[340px] focus:outline-none focus:ring-1 focus:ring-F7CF14 pr-[50px]"
                            type="text"
                            placeholder="Введіть сумму"
                            maxlength="12"
                          />
                          <span class="absolute font-semibold transform -translate-y-1/2 text-F7CF14 right-3 top-1/2 text-[14px]">
                            = {{ coins }} <img src="/images/basket/Krab_Coin.png" alt="icon" class="inline ml-1 w-[20px] h-[20px]" />
                          </span>
                        </div>
                      </div>
                      <div class="flex flex-col items-center gap-3">
                        <div class="flex lg:gap-[20px] sm:gap-3 items-center sm:flex-col md:flex-row">
                          <div class="flex items-center gap-5 ">
                            <div class="flex items-center gap-1">
                              <span class="text-[12px] font-medium px-1 py-0.5 border-[1px] border-white rounded-[5px] text-AFAFAF text-center">
                                +10%
                              </span>
                              <span class="text-[12px] font-medium italic text-AFAFAF text-center">
                                від 4000 грн
                              </span>
                            </div>
                            <div class="flex items-center gap-1">
                              <span class="text-[12px] font-medium px-1 py-0.5 border-[1px] border-white rounded-[5px] text-AFAFAF text-center">
                                +15%
                              </span>
                              <span class="text-[12px] font-medium italic text-AFAFAF text-center">
                                від 6000 грн
                              </span>
                            </div>
                          </div>
                          <div class="flex items-center gap-5">
                            <div class="flex items-center gap-1">
                              <span class="text-[12px] font-medium px-1 py-0.5 border-[1px] border-white rounded-[5px] text-AFAFAF text-center">
                                +20%
                              </span>
                              <span class="text-[12px] font-medium italic text-AFAFAF text-center">
                                від 10,000 грн
                              </span>
                            </div>
                          </div>
                        </div>
                        <div class="flex gap-[20px]">
                          <span class="text-[12px] lg:w-[500px] font-medium italic text-AFAFAF text-center">
                            Ви можете отримати бонус +15% до покупки, якщо коінів буде куплено більше ніж на 1к грн. Для цього здійсніть покупку через тікет в нашому діскорді
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    @click="redirectToCheckout"
                    :disabled="amount < 30"
                    :class="[
                      'rounded-[8px] w-[253px] py-2 text-[18px] letter-s-0-8px russo text-F7CF14 outline outline-2 outline-F7CF14 sm:m-4 sm:mt-0 mb:m-0',
                      coins < 300 ? 'bg-transparent cursor-not-allowed' : 'bg-F7CF14 text-black outline-0'
                    ]"
                  >
                    Оплатити
                  </button>
                </div>
              </div>
            </div>
            <!-- Восьма картка -->
            <div class="flex items-center sm:max-w-[400px] sm:min-w-[380px] md:min-w-[277px] md:max-w-[277px] md:h-[340px] gradient-border gradient-border-promo justify-center sm:order-5 lg:order-6">
              <div class="flex flex-col items-center gap-6">
                <div class="flex flex-col items-center gap-2">
                  <img class="w-[70px] h-[70px]" src="/images/profile/promo.png" alt="">
                  <div class="flex flex-col items-center gap-2">
                    <div class="flex flex-col items-center gap-3">
                      <span class="russo text-[16px] text-white">Подарунковий промокод:</span>
                      <input class="p-3 rounded-[10px] border-[3px] border-B641C4 bg-transparent text-white placeholder-AFAFAF text-[14px] font-semibold sm:min-w-[340px] md:min-w-[253px] focus:outline-none focus:ring-1 focus:ring-B641C4"
                        v-model="promoCode"
                        type="text"
                        placeholder="Введіть промокод"
                      >
                    </div>
                    <p class="text-[12px] font-medium italic text-AFAFAF text-center sm:m-4 sm:mt-0 mb:m-0">
                      Промокод є одноразовим, всі отримані предмети (за відсутності страховки) будуть видалені після вайпу
                    </p>
                  </div>
                </div>
                <button
                  @click="activatePromo"
                  :class="[
                    'rounded-[8px] w-[249px] py-2 text-[18px] letter-s-0-8px russo text-B641C4 outline outline-2 outline-B641C4 sm:m-4 sm:mt-0 mb:m-0',
                    promoCode.length >= 10 ? 'bg-B641C4 outline outline-transparent text-white' : 'bg-transparent  cursor-not-allowed'
                  ]"
                  :disabled="promoCode.length < 10"
                >
                  Отримати
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="lg:px-[150px] md:px-[40px] sm:px-[16px] mx-auto lg:transition-transform lg:duration-200 lg:transform lg:scale-90 md:max-w-[680px] int:max-w-[990px] lg:max-w-[1530px] flex flex-col flex-start gap-4 sm:items-center md:items-start">
          <span data-aos="fade-down" data-aos-duration="800" data-aos-delay="100" data-aos-offset="10" class="russo m:text-[20px] md:text-[24px] text-white letter-s-0-8px">
            Ваші предмети
          </span>

          <div data-aos="fade-up" data-aos-duration="800" data-aos-delay="200" class="sm:flex lg:grid-cols-4 md:grid md:grid-cols-2 int:grid-cols-3 md:gap-x-10 md:gap-y-8 sm:flex-col sm:gap-4">
            
            <!-- Якщо cartProducts не порожній, рендеримо продукти -->
            <template v-if="cartProducts.length > 0" v-for="(i, id) in cartProducts" :key="id"> 
              <div class="sm:w-[380px] md:w-[277px] h-[77px] border-[3px] rounded-[15px] flex gap-3 items-center pl-6">
                <img class="w-[32px] h-[32px]" :src="`/images/products/${i.product}.png`" alt="">
                <div class="flex flex-col">
                  <p class="text-white text-[16px] font-semibold">{{ i.displayName || '????' }}</p>
                  <p class="text-AFAFAF text-[14px] font-medium">Кількість: {{ i.count }}</p>
                </div>
              </div>
            </template>
            
            <!-- Якщо cartProducts порожній, рендеримо картку з повідомленням -->
            <template v-else>
              <div class="sm:w-[380px] md:w-[277px] h-[77px] border-[3px] rounded-[15px] flex gap-3 items-center pl-6">
                <div class="flex flex-col">
                  <p class="text-white text-[16px] font-semibold">Предмети відсутні</p>
                  <p class="text-AFAFAF text-[14px] font-medium">Отримати їх можна в магазині</p>
                </div>
              </div>
            </template>
            
          </div>
        </div>

        <div class="lg:px-[150px] md:px-[40px] sm:px-[16px] mx-auto lg:transition-transform lg:duration-200 lg:transform lg:scale-90 md:max-w-[680px] int:max-w-[990px]  lg:max-w-[1530px] flex flex-col flex-start sm:items-center md:items-start gap-4 sm:mb-8 lg:mb-0">
          <p data-aos="fade-down" data-aos-duration="800" data-aos-delay="100" class="russo sm:text-[20px] md:text-[24px] text-white letter-s-0-8px">
            Ваша статистика
          </p>
          <div data-aos="fade-up" data-aos-duration="800" data-aos-delay="200"   class="sm:flex lg:grid-cols-4 md:grid md:grid-cols-2 int:grid-cols-3 md:gap-x-10 md:gap-y-8 sm:flex-col sm:gap-4">
            <div class="sm:w-[380px] md:w-[277px] h-[77px] border-[3px] rounded-[15px] flex gap-3 items-center pl-6">
              <img src="/icons/myStatistic/player_kills.svg" alt="">
              <div class="flex flex-col">
                <span class="text-white text-[16px] font-semibold">{{ responsestat.player_kills || 0 }} гравців</span>
                <span class="text-AFAFAF text-[14px] font-medium">вбито</span>
              </div>
            </div>
            <div class="sm:w-[380px] md:w-[277px] h-[77px] border-[3px] rounded-[15px] flex gap-3 items-center pl-6">
              <img src="/icons/myStatistic/infected_kills.svg" alt="">
              <div class="flex flex-col">
                <span class="text-white text-[16px] font-semibold">{{ responsestat.infected_kills || 0 }} заражених</span>
                <span class="text-AFAFAF text-[14px] font-medium">вбито</span>
              </div>
            </div>
            <div class="sm:w-[380px] md:w-[277px]  h-[77px] border-[3px] rounded-[15px] flex gap-3 items-center pl-6">
              <img src="/icons/myStatistic/animal_kills.svg" alt="">
              <div class="flex flex-col">
                <span class="text-white text-[16px] font-semibold">{{ responsestat.animal_kills || 0 }} тварин</span>
                <span class="text-AFAFAF text-[14px] font-medium">вбито</span>
              </div>
            </div>
            <div class="sm:w-[380px] md:w-[277px]  h-[77px] border-[3px] rounded-[15px] flex gap-3 items-center pl-6">
              <img src="/icons/myStatistic/shots_fired.svg" alt="">
              <div class="flex flex-col">
                <span class="text-white text-[16px] font-semibold">{{ responsestat.shots_fired || 0 }} пострілів</span>
                <span class="text-AFAFAF text-[14px] font-medium">зроблено</span>
              </div>
            </div>
            <div class="sm:w-[380px] md:w-[277px]  h-[77px] border-[3px] rounded-[15px] flex gap-3 items-center pl-6">
              <img src="/icons/myStatistic/shots_hit.svg" alt="">
              <div class="flex flex-col">
                <span class="text-white text-[16px] font-semibold">{{ responsestat.shots_hit || 0 }} пострілів</span>
                <span class="text-AFAFAF text-[14px] font-medium">влучено</span>
              </div>
            </div>
            <div class="sm:w-[380px] md:w-[277px]  h-[77px] border-[3px] rounded-[15px] flex gap-3 items-center pl-6">
              <img src="/icons/myStatistic/head.svg" alt="">
              <div class="flex flex-col">
                <span class="text-white text-[16px] font-semibold">{{ responsestat.hit_zones.head || 0 }} влучань</span>
                <span class="text-AFAFAF text-[14px] font-medium">в голову</span>
              </div>
            </div>
            <div class="sm:w-[380px] md:w-[277px]  h-[77px] border-[3px] rounded-[15px] flex gap-3 items-center pl-6">
              <img src="/icons/myStatistic/torso.svg" alt="">
              <div class="flex flex-col">
                <span class="text-white text-[16px] font-semibold">{{ responsestat.hit_zones.torso || 0 }} влучань</span>
                <span class="text-AFAFAF text-[14px] font-medium">в тулуб</span>
              </div>
            </div>
            <div class="sm:w-[380px] md:w-[277px] h-[77px] border-[3px] rounded-[15px] flex gap-3 items-center pl-6">
              <img src="/icons/myStatistic/arms.svg" alt="">
              <div class="flex flex-col">
                <span class="text-white text-[16px] font-semibold">{{ responsestat.hit_zones.arms || 0 }} влучань</span>
                <span class="text-AFAFAF text-[14px] font-medium">в руки</span>
              </div>
            </div>
            <div class="sm:w-[380px] md:w-[277px]  h-[77px] border-[3px] rounded-[15px] flex gap-3 items-center pl-6">
              <img src="/icons/myStatistic/legs.svg" alt="">
              <div class="flex flex-col">
                <span class="text-white text-[16px] font-semibold">{{ responsestat.hit_zones.legs || 0 }} влучань</span>
                <span class="text-AFAFAF text-[14px] font-medium">в ноги</span>
              </div>
            </div>
            <div class="sm:w-[380px] md:w-[277px]  h-[77px] border-[3px] rounded-[15px] flex gap-3 items-center pl-6">
              <img src="/icons/myStatistic/deaths.svg" alt="">
              <div class="flex flex-col">
                <span class="text-white text-[16px] font-semibold">{{ responsestat.deaths || 0 }} смертей</span>
                <span class="text-AFAFAF text-[14px] font-medium">вами пережито</span>
              </div>
            </div>
            <div class="sm:w-[380px] md:w-[277px]  h-[77px] border-[3px] rounded-[15px] flex gap-3 items-center pl-6">
              <img src="/icons/myStatistic/distance_traveled.svg" alt="">
              <div class="flex flex-col">
                <span class="text-white text-[16px] font-semibold">{{ (responsestat.distance_traveled / 1000).toFixed(1) || 0 }} кілометрів</span>
                <span class="text-AFAFAF text-[14px] font-medium">подолано</span>
              </div>
            </div>
            <div class="sm:w-[380px] md:w-[277px] h-[77px] border-[3px] rounded-[15px] flex gap-3 items-center pl-6">
              <img src="/icons/myStatistic/kdratio.svg" alt="">
              <div class="flex flex-col">
                <span class="text-white text-[16px] font-semibold">{{ responsestat.kdratio || 0 }} коефіцієнт</span>
                <span class="text-AFAFAF text-[14px] font-medium">вбивств/смертей</span>
              </div>
            </div>
          </div>
        </div>

        <!-- <div class="lg:px-[150px] md:px-[40px] sm:px-[16px] mx-auto lg:transition-transform lg:duration-200 lg:transform lg:scale-90 md:max-w-[680px] int:max-w-[990px] lg:max-w-[1530px] flex flex-col flex-start gap-4 sm:items-center md:items-start">
          <span data-aos="fade-down" data-aos-duration="800" data-aos-delay="100" class="russo sm:text-[20px] md:text-[24px] text-white letter-s-0-8px">
            Ваші сети
          </span>
          
          <div data-aos="fade-up" data-aos-duration="800" data-aos-delay="200" class="sm:flex lg:grid-cols-4 md:grid md:grid-cols-2 int:grid-cols-3 md:gap-x-10 md:gap-y-8 sm:flex-col sm:gap-4">
            
         
            <template v-if="PlayerSets.length > 0" v-for="(set, index) in PlayerSets" :key="index">
              <div class="w-[277px] h-[77px] border-[3px] rounded-[15px] flex gap-3 items-center pl-6">
                <div class="flex flex-col">
                  <p class="text-white text-[16px] font-semibold">Сет: {{ set.set }}</p>
                  <p class="text-AFAFAF text-[14px] font-medium">Дійсний протягом: {{ set.valid_till }} днів</p>
                </div>
              </div>
            </template>
          
            <template v-else>
              <div class="w-[277px] h-[77px] border-[3px] rounded-[15px] flex gap-3 items-center pl-6">
                <div class="flex flex-col">
                  <p class="text-white text-[16px] font-semibold">Активні сети відсутні</p>
                  <p class="text-AFAFAF text-[14px] font-medium">Отримати їх можна в магазині</p>
                </div>
              </div>
            </template>
            
          </div>
        </div> -->

    
        <basefooter class="lg:px-[150px] md:px-[40px] sm:px-[16px] pt-8" />
    </div>
</template>
  
<script setup>
import baseheader from '@/components/base/Header.vue';
import basefooter from '@/components/base/Footer.vue';
import ServerSelector from '@/components/selectServer/SelectServer.vue';
import axios from 'axios';
import { loadStripe } from "@stripe/stripe-js";
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

const steamID = ref(null);
const nickname = ref(null);
const avatar = ref(null);
const priority = ref(false);
const insurance = ref(false);
const paidDailyReward = ref(false);
const promoCode = ref("");
const expiration = ref(""); 
const expirationInsurance = ref("");
const expirationPaidDailyReward = ref("");
const coinBalance = ref(0);
const windowWidth = ref(window.innerWidth);
const activeTab = ref('statistic');
const cartProducts = ref([]);
const PlayerSets = ref([]);
const amount = ref('');
const numericAmount = ref(0);
const coinRatio = ref(0);
const tabs = ref([
  { key: 'statistic', title: 'Статистика' },
  { key: 'sets', title: 'Сети' },
  { key: 'products', title: 'Предмети' },
]);



const responsestat = ref({
  player_kills: 0,
  infected_kills: 0,
  animal_kills: 0,
  shots_fired: 0,
  shots_hit: 0,
  hit_zones: {
    head: 0,
    arms: 0,
    legs: 0,
    torso: 0,
  },
  deaths: 0,
  distance_traveled: 0,
  kdratio: 0,
});


// Поточний порт сервера
const currentPort = ref(localStorage.getItem('selectedServerPort') || 'cherno_3pp');
const intervalId = ref(null);

const url = computed(() => `https://otpdayz.store:3000`);

const fetchCoinRatio = async () => {
  const response = await fetch(`${url.value}/coins/getCoinRatio`);
  const data = await response.json();
  coinRatio.value = data.ratio; // Зберігаємо відношення
};

// Обчислення кількості монет
const coins = computed(() => {
  const numericAmount = parseFloat(amount.value.replace(/[^\d.-]/g, ''));
  if (isNaN(numericAmount)) return '0';

  let bonusMultiplier = 1; // Базовий множник (100%)
  
  if (numericAmount >= 10000) {
    bonusMultiplier = 1.2; // +20%
  } else if (numericAmount >= 6000) {
    bonusMultiplier = 1.15; // +15%
  } else if (numericAmount >= 4000) {
    bonusMultiplier = 1.1; // +10%
  }

  const calculatedCoins = numericAmount * coinRatio.value * 100 * bonusMultiplier;
  return calculatedCoins.toLocaleString();
});


async function redirectToCheckout() {
  if (!steamID.value) {
    location.href = `${url.value}/auth/steam`;
    return;
  }

  const stripe = await loadStripe(
    "pk_live_51Ok97MFXJWax66WHOOrOZ18isVbXVcNOBxHRLJWqOtjpEeqovMnZ9vi7pcnjCK19vCpLuwJCRvSiMnkLQA8SZlA900g9DmPlFZ"
  );

  try {
    const response = await fetch(`${url.value}/coins/checkout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        count: numericAmount.value, 
        steamID: steamID.value
      }),
    });

    const session = await response.json();

    if (session.error) {
      alert(session.error);
      return;
    }

    const result = await stripe.redirectToCheckout({ sessionId: session.sessionId });

    if (result.error) {
      alert(result.error.message);
    }
  } catch (error) {
    console.error("Помилка перенаправлення на сторінку оплати:", error);
  }
}

// Оновлення розміру вікна
const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth;
};

const activatePromo = async () => {
  if (!promoCode.value.trim()) {
    return;
  }

  try {
    const response = await fetch(`${url.value}/activatePromocode/${steamID.value}/${promoCode.value}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" }
    });

    const data = await response.json();
    if (response.ok) {
      promoCode.value = "";
      alert("Активовано успішно");
    } else {
      alert(data.message || "Помилка при активації");
    }
  } catch (error) {
    alert("Помилка підключення до сервера");
    console.error(error);
  }
};

const onInput = () => {
  amount.value = formatNumber(amount.value);
  numericAmount.value = (parseFloat(amount.value.replace(/\D/g, '')) || 0) * 10;
  // Видаляємо початковий нуль, якщо він є
  if (amount.value.startsWith("0")) {
    amount.value = amount.value.replace(/^0+/, "");
  }

  // Обмежуємо довжину введення до 10 цифр
  amount.value = amount.value.slice(0, 12);
};

const formatNumber = (number) => {
  // Видаляємо все, що не є цифрами
  const numericValue = number.replace(/\D/g, '');
  
  // Форматуємо число з пробілами як роздільниками тисяч
  return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

// Логаут
const logout = async () => {
  if (steamID.value) {
    localStorage.clear();
    location.href = "https://otpdayz.store";// Перенаправляємо на нову адресу
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

const fetchCart = async () => {
  try {
    const res = await axios.get(`${url.value}/carts/getCart/${steamID.value}`);
    cartProducts.value = res.data.Products;
  } catch (error) {
    console.error("Помилка при отриманні кошика:", error);
  }
};

const fetchPlayerSets = async () => {
  try {
    if (steamID.value) {
      const res = await axios.get(`${url.value}/sets/getPlayerSets/${steamID.value}`);
      PlayerSets.value = res.data; // Збереження даних
    }
  } catch (error) {
    console.error("Помилка при отриманні даних наборів:", error);
  }
};

// Отримання пріоритету
const getPriority = async () => {
  try {
    if (steamID.value) {
      const res = await axios.get(`${url.value}/getPriority/${steamID.value}`);
      priority.value = res.data.status === "true"; // Приводимо до Boolean
      expiration.value = res.data.expiration;
    }
  } catch (error) {
    console.error("Помилка при отриманні пріоритету:", error);
  }
};


// Отримання страховки
const getInsurance = async () => {
  try {
    if (steamID.value) {
      const res = await axios.get(`${url.value}/getSubscription/${steamID.value}/insurance`);
      insurance.value = Boolean(res.data.status); 
      expirationInsurance.value = String(res.data.expiration); // Явно приводимо до рядка
    }
  } catch (error) {
    console.error("Помилка при отриманні страховки:", error);
  }
};


const getPaidDailyReward = async () => {
  try {
    if (steamID.value) {
      const res = await axios.get(`${url.value}/getSubscription/${steamID.value}/paidDailyReward`);
      paidDailyReward.value = res.data.status;
      expirationPaidDailyReward.value = res.data.expiration;
    }
  } catch (error) {
    console.error("Помилка при отриманні страховки:", error);
  }
};

// Отримання статистики гравця
const fetchPlayerStats = async () => {
  try {
    if (steamID.value) {
      const res = await axios.get(`${url.value}/${currentPort.value}/getStats/${steamID.value}`);
      responsestat.value = res.data;
    }
  } catch (error) {
    console.error("Помилка при отриманні статистики гравця:", error);
  }
};

// Перевірка зміни порту
const checkForPortChange = () => {
  const newPort = localStorage.getItem('selectedServerPort') || 'cherno_3pp';
  if (newPort !== currentPort.value) {
    currentPort.value = newPort;
    fetchPlayerStats();
    fetchPlayerSets();
  }
};

// Монтування
onMounted(() => {
  const storedSteamID = localStorage.getItem('steamID');
  const storedNick = localStorage.getItem('nickname');
  const storedAvatar = localStorage.getItem('avatarURL');
  if (storedSteamID) {
    steamID.value = storedSteamID;
    nickname.value = storedNick;
    avatar.value = storedAvatar;
    getPriority();
    fetchPlayerStats();
    fetchPlayerSets();
    fetchCart();
    balance();
    getInsurance();
    getPaidDailyReward();
    fetchCoinRatio();
  }
  intervalId.value = setInterval(checkForPortChange, 1000);
  window.addEventListener('resize', updateWindowWidth);
});

// Демонтування
onBeforeUnmount(() => {
  if (intervalId.value) {
    clearInterval(intervalId.value);
  }
  window.removeEventListener('resize', updateWindowWidth);
});

</script>

<style scoped>
.gradient-border {
  position: relative;
  border-radius: 15px;
  padding: 10px; 
  border: 5px solid transparent;
}

.gradient-border-mainCard {
  background: linear-gradient(#171717, #171717) padding-box,
              linear-gradient(to bottom, #171717 10%, rgba(111, 49, 49, 0.7) 100%) border-box;
}

.gradient-border-balance {
  background: linear-gradient(#171717, #171717) padding-box,
              linear-gradient(to bottom, #171717 10%, rgba(247, 207, 20, 0.7) 100%) border-box;
}

.gradient-border-priority {
  background: linear-gradient(#171717, #171717) padding-box,
              linear-gradient(to bottom, #171717 0%, rgba(53, 28, 112, 0.7) 80%) border-box;
}

.gradient-border-insurance {
  background: linear-gradient(#171717, #171717) padding-box,
              linear-gradient(to bottom, #171717 10%, rgba(255, 255, 255, 1.0) 80%) border-box;
}

.gradient-border-promo {
  background: linear-gradient(#171717, #171717) padding-box,
              linear-gradient(to bottom, #171717 0%, rgba(132, 44, 143, 0.7) 80%) border-box;
}



</style>
  