<template>
  <div class="player-controls-main">
    <div class="player-controls">
      <button @click="playPreviousSong" class="audio-button">
        <svg class="icons_h" width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_1030_1769)">
        <path d="M35 31.6668V8.33349C35.0001 8.04023 34.9272 7.75215 34.7887 7.49832C34.6503 7.24449 34.4511 7.0339 34.2114 6.88782C33.9716 6.74174 33.6998 6.66535 33.4233 6.66634C33.1468 6.66734 32.8755 6.74569 32.6367 6.89349L13.7802 18.5602C13.5428 18.7069 13.3458 18.9171 13.2089 19.1697C13.072 19.4224 13 19.7087 13 20.0002C13 20.2916 13.072 20.5779 13.2089 20.8306C13.3458 21.0832 13.5428 21.2934 13.7802 21.4402L32.6367 33.1068C32.8755 33.2546 33.1468 33.333 33.4233 33.334C33.6998 33.335 33.9716 33.2586 34.2114 33.1125C34.4511 32.9664 34.6503 32.7558 34.7887 32.502C34.9272 32.2482 35.0001 31.9601 35 31.6668Z" fill="white"/>
        <path d="M7.83301 33.3335C7.22067 33.3334 6.62967 33.1836 6.17208 32.9123C5.71449 32.641 5.42215 32.2672 5.35051 31.8618L5.33301 31.6668L5.33301 8.3335C5.33371 7.9087 5.57771 7.50011 6.01513 7.19122C6.45255 6.88232 7.05039 6.69644 7.68649 6.67154C8.3226 6.64665 8.94896 6.78462 9.43759 7.05727C9.92622 7.32992 10.2402 7.71667 10.3155 8.1385L10.333 8.3335L10.333 31.6668C10.333 32.1089 10.0696 32.5328 9.60078 32.8453C9.13194 33.1579 8.49605 33.3335 7.83301 33.3335Z" fill="white"/>
        </g>
        <defs>
        <clipPath id="clip0_1030_1769">
        <rect width="40" height="40" fill="white" transform="matrix(-1 0 0 -1 40 40)"/>
        </clipPath>
        </defs>
        </svg>
      </button>
      <div>
        <button @click="togglePlay">
        <svg class="icons_p" v-if="isPlaying" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_1030_1762)">
        <path d="M14.9997 6.6665H11.6663C10.7823 6.6665 9.93444 7.01769 9.30932 7.64281C8.6842 8.26794 8.33301 9.11578 8.33301 9.99984V29.9998C8.33301 30.8839 8.6842 31.7317 9.30932 32.3569C9.93444 32.982 10.7823 33.3332 11.6663 33.3332H14.9997C15.8837 33.3332 16.7316 32.982 17.3567 32.3569C17.9818 31.7317 18.333 30.8839 18.333 29.9998V9.99984C18.333 9.11578 17.9818 8.26794 17.3567 7.64281C16.7316 7.01769 15.8837 6.6665 14.9997 6.6665Z" fill="white"/>
        <path d="M28.3337 6.6665H25.0003C24.1163 6.6665 23.2684 7.01769 22.6433 7.64281C22.0182 8.26794 21.667 9.11578 21.667 9.99984V29.9998C21.667 30.8839 22.0182 31.7317 22.6433 32.3569C23.2684 32.982 24.1163 33.3332 25.0003 33.3332H28.3337C29.2177 33.3332 30.0656 32.982 30.6907 32.3569C31.3158 31.7317 31.667 30.8839 31.667 29.9998V9.99984C31.667 9.11578 31.3158 8.26794 30.6907 7.64281C30.0656 7.01769 29.2177 6.6665 28.3337 6.6665Z" fill="white"/>
        </g>
        <defs>
        <clipPath id="clip0_1030_1762">
        <rect width="40" height="40" fill="white"/>
        </clipPath>
        </defs>
        </svg>
        <svg class="icons_pl" v-else width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_1030_1766)">
        <path d="M10 6.66665V33.3333C9.99992 33.6299 10.079 33.9211 10.229 34.1769C10.379 34.4327 10.5945 34.6438 10.8534 34.7885C11.1122 34.9333 11.405 35.0063 11.7015 35.0001C11.998 34.9939 12.2874 34.9087 12.54 34.7533L34.2067 21.42C34.4493 21.2709 34.6497 21.0621 34.7888 20.8135C34.9278 20.5649 35.0008 20.2848 35.0008 20C35.0008 19.7152 34.9278 19.4351 34.7888 19.1865C34.6497 18.9379 34.4493 18.7291 34.2067 18.58L12.54 5.24665C12.2874 5.09126 11.998 5.00607 11.7015 4.99988C11.405 4.99368 11.1122 5.06671 10.8534 5.21142C10.5945 5.35613 10.379 5.56728 10.229 5.82309C10.079 6.0789 9.99992 6.3701 10 6.66665Z" fill="white"/>
        </g>
        <defs>
        <clipPath id="clip0_1030_1766">
        <rect width="40" height="40" fill="white"/>
        </clipPath>
        </defs>
        </svg>
      </button>
        <audio ref="audioPlayer">
          <source :src="currentSong.src" :type="currentSong.type" />
          Ваш браузер не підтримує аудіо.
        </audio>
      </div>
      <button @click="playNextSong" class="audio-button">
        <svg class="icons_h" width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_1029_1758)">
        <path d="M5 8.33318V31.6665C4.99992 31.9598 5.07279 32.2479 5.21126 32.5017C5.34973 32.7555 5.54889 32.9661 5.78863 33.1122C6.02838 33.2583 6.30022 33.3347 6.57671 33.3337C6.85319 33.3327 7.12454 33.2543 7.36334 33.1065L26.2198 21.4398C26.4572 21.2931 26.6542 21.0829 26.7911 20.8303C26.928 20.5776 27 20.2913 27 19.9998C27 19.7084 26.928 19.4221 26.7911 19.1694C26.6542 18.9168 26.4572 18.7066 26.2198 18.5598L7.36334 6.89318C7.12454 6.74538 6.85319 6.66702 6.57671 6.66603C6.30022 6.66503 6.02838 6.74143 5.78863 6.88751C5.54889 7.03358 5.34973 7.24417 5.21126 7.498C5.07279 7.75183 4.99992 8.03992 5 8.33318Z" fill="white"/>
        <path d="M32.167 6.6665C32.7793 6.66656 33.3703 6.81643 33.8279 7.0877C34.2855 7.35896 34.5778 7.73275 34.6495 8.13817L34.667 8.33317V31.6665C34.6663 32.0913 34.4223 32.4999 33.9849 32.8088C33.5474 33.1177 32.9496 33.3036 32.3135 33.3285C31.6774 33.3534 31.051 33.2154 30.5624 32.9427C30.0738 32.6701 29.7598 32.2833 29.6845 31.8615L29.667 31.6665V8.33317C29.667 7.89114 29.9304 7.46722 30.3992 7.15466C30.8681 6.8421 31.504 6.6665 32.167 6.6665Z" fill="white"/>
        </g>
        <defs>
        <clipPath id="clip0_1029_1758">
        <rect width="40" height="40" fill="white"/>
        </clipPath>
        </defs>
        </svg>
      </button>
    </div>
    <div v-if="isMessageVisible" class="message russo">
      <p>Ми раді представити вам нашу підбірку святкових пісень для чудового настрою!</p>
    </div>
  </div>
  
</template>

<script>
export default {
  name: "AudioPlayer",
  data() {
    return {
      songs: [
        { src: '/songs/song2.mp3', type: 'audio/mpeg' },
        { src: '/songs/song3.mp3', type: 'audio/mpeg' },
        { src: '/songs/song0.mp3', type: 'audio/mpeg' },
        { src: '/songs/song4.mp3', type: 'audio/mpeg' },
        { src: '/songs/song6.mp3', type: 'audio/mpeg' },
        { src: '/songs/song5.mp3', type: 'audio/mpeg' },
        { src: '/songs/song7.mp3', type: 'audio/mpeg' },
        { src: '/songs/song1.mp3', type: 'audio/mpeg' },
      ],
      currentSongIndex: 0,
      isPlaying: false,
      isMessageVisible: true,  // Повідомлення видиме на початку
    };
  },
  computed: {
    currentSong() {
      return this.songs[this.currentSongIndex];
    }
  },
  methods: {
    togglePlay() {
      const audio = this.$refs.audioPlayer;

      if (this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }

      this.isPlaying = !this.isPlaying;
    },

    playNextSong() {
      this.currentSongIndex = (this.currentSongIndex + 1) % this.songs.length;
      this.loadAndPlay();
    },

    playPreviousSong() {
      this.currentSongIndex = (this.currentSongIndex - 1 + this.songs.length) % this.songs.length;
      this.loadAndPlay();
    },

    loadAndPlay() {
      const audio = this.$refs.audioPlayer;
      this.isPlaying = true;
      this.$nextTick(() => {
        audio.load();
        audio.play();
      });
    },

    shuffleSongs() {
      for (let i = this.songs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.songs[i], this.songs[j]] = [this.songs[j], this.songs[i]];
      }
    },

    onSongEnd() {
      this.playNextSong();
    }
  },
  mounted() {
    this.shuffleSongs();
    const audio = this.$refs.audioPlayer;

    audio.addEventListener('ended', this.onSongEnd);

    setTimeout(() => {
      this.isMessageVisible = false;
    }, 3000); 
  },
  beforeDestroy() {
    const audio = this.$refs.audioPlayer;
    audio.removeEventListener('ended', this.onSongEnd);
  }
};
</script>


<style scoped>
.player-controls-main {
  position: fixed;
  left: 0px; 
  top: 50%;
  transform: translate(0%, -50%);
  z-index: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.player-controls {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

button {
  background-color: #C30000;
  color: white;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.audio-button {
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: #C30000;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

@media (max-width: 1439px) {
  .message {
    margin-left: 12px;
    max-width: 180px;
    font-size: 12px;
    padding: 8px 16px;
  }
  .icons_pl {
    width: 22px;
    height: 22px;
  }
  .icons_p {
    width: 24px;
    height: 24px;
  }
  .icons_h {
    width: 20px;
    height: 20px;
  }
  .player-controls {
    gap: 16px;
  }
  button {
    width: 44px;
    height: 44px;
  }
  .audio-button {
    width: 44px;
    height: 44px;
  }
}


@media (min-width: 1440px) {
  .audio-button:hover {
    background-color: #0B0B0B;
  }
  button:hover {
    background-color: #0B0B0B;
  }
  .message {
    margin-left: 20px;
    max-width: 300px;
    font-size: 16px;
    padding: 12px 24px;
  }
  .icons_pl {
    width: 28px;
    height: 28px;
  }
  .icons_p {
    width: 32px;
    height: 32px;
  }
  .icons_h {
    width: 24px;
    height: 24px;
  }
  .player-controls {
    gap: 12px;
  }
  button {
    width: 56px;
    height: 56px;
  }
  .audio-button {
    width: 56px;
    height: 56px;
  }
}

.message {
  background-color: rgba(195, 0, 0, 0.6);
  border-radius: 8px;
  color: white;
}

@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 0.6; }
}

@keyframes fadeOut {
  0% { opacity: 0.6; }
  100% { opacity: 0; }
}

.message {
  animation: fadeIn 0s ease-in-out, fadeOut 4s ease-in-out 4s;
}
</style>
