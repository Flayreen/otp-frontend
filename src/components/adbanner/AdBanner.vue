<template>
  <div 
    v-if="bannerData && isVisible" 
    class="ad-banner" 
    :style="{ backgroundColor: bannerData.backgroundColor }"
  >
    <button class="close-btn" @click="closeBanner">✖</button>
    <a :href="bannerData.websiteUrl" target="_blank" class="banner-link">
      <img class="logo" :src="bannerData.logoUrl" alt="Company Logo" />
      <div class="content">
        <h2
          class="company-name"
          :style="{ color: bannerData.companyNameColor }"
        >
          {{ bannerData.companyName }}
        </h2>
        <p 
          class="sm:truncate sm:w-[300px] md:w-auto description"
          :style="{ color: bannerData.descriptionColor }"
        >
          {{ bannerData.description }}
        </p>
      </div>
      <div class="social-media" v-if="showSocialIcons">
        <a
          v-for="(link, index) in bannerData.socialLinks"
          :key="index"
          :href="link.url"
          target="_blank"
          :style="{ fill: bannerData.companyNameColor }"
        >
          <img :src="link.icon" :alt="link.name" class="social-icon" />
        </a>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  name: "AdBanner",
  data() {
    return {
      bannerDataList: [],
      currentBannerIndex: 0,
      bannerData: null,
      showSocialIcons: false,
      isVisible: true, // Додаємо прапорець для відображення банера
    };
  },
  mounted() {
    this.fetchBannerData();
    this.startBannerRotation();
    this.updateLayout();
    window.addEventListener("resize", this.updateLayout);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.updateLayout);
  },
  methods: {
    async fetchBannerData() {
      try {
        const response = await fetch("/adBannerData.json");
        if (!response.ok) {
          throw new Error("Failed to load banner data");
        }
        this.bannerDataList = await response.json();
        this.bannerData = this.bannerDataList[this.currentBannerIndex];
      } catch (error) {
        console.error("Error loading banner data:", error);
      }
    },
    startBannerRotation() {
      setInterval(() => {
        this.currentBannerIndex = (this.currentBannerIndex + 1) % this.bannerDataList.length;
        this.bannerData = this.bannerDataList[this.currentBannerIndex];
      }, 10000);
    },
    updateLayout() {
      const width = window.innerWidth;
      this.showSocialIcons = width >= 768;
    },
    closeBanner() {
      this.isVisible = false; // Ховаємо банер при натисканні на хрестик
    },
  },
};
</script>

<style scoped>
.ad-banner {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  z-index: 500;
  border-top: 2px solid #ccc;
}

.banner-link {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  text-decoration: none;
  color: inherit;
}

.logo {
  height: 48px;
  width: auto;
}

.content {
  flex: 1;
  margin: 0 20px;
}

.company-name {
  margin: 0;
  font-size: 1.5rem;
  color: #333;
}

.description {
  margin: 5px 0 0;
  color: #666;
  font-size: 0.9rem;
}

.social-media {
  display: flex;
  gap: 10px;
}

.social-icon {
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

.social-icon:hover {
  transform: scale(1.1);
}

/* Кнопка закриття */
.close-btn {
  position: absolute;
  top: -30px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 20px;
  color: #ffffff;
  cursor: pointer;
  transition: 0.2s;
}

.close-btn:hover {
  color: #D75857;
}

/* Медіа-запити */
@media (max-width: 767px) {
  .ad-banner {
    width: 100%;
    height: 60px;
  }

  .logo {
    height: 50px;
  }

  .company-name {
    font-size: 1.1rem;
  }

  .description {
    font-size: 0.8rem;
  }

  .social-media {
    display: none;
  }
}

@media (min-width: 768px) and (max-width: 1439px) {
  .ad-banner {
    width: 100%;
    height: 80px;
  }

  .logo {
    height: 60px;
  }

  .company-name {
    font-size: 1.3rem;
  }

  .description {
    font-size: 0.9rem;
  }

  .social-media {
    display: flex;
  }
}

@media (min-width: 1440px) {
  .ad-banner {
    width: calc(100% - 280px);
    max-width: 1680px;
    height: 64px;
  }

  .logo {
    height: 48px;
  }

  .company-name {
    font-size: 1rem;
  }

  .description {
    font-size: 0.8rem;
  }

  .social-media {
    display: flex;
  }
}
</style>
