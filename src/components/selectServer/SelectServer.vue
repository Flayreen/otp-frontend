<template>
  <div class="servers">
    <div class="server-selector">
      <button class="russo text-[16px] letter-s-0-8px"
        v-for="server in servers"
        :key="server.id"
        :class="{ 
          active: selectedServerId === server.id,
          hovered: hoveredServerId === server.id 
        }"
        @click="selectServer(server.id)"
        @mouseenter="hoveredServerId = server.id"
        @mouseleave="hoveredServerId = null"
      >
        <img :src="selectedServerId === server.id ? server.imageActive : server.imageInactive" alt="server image" class="server-image"/>
        <span>{{ server.name }}</span>
      </button>
    </div>

    <div v-if="notification" class="notification">
      {{ notification }}
    </div>
  </div>
</template>

<script>
import { servers } from './servers';

export default {
  data() {
    return {
      selectedServerId: null,
      hoveredServerId: null,
      servers,
      notification: '',
      defaultServerId: "1",
      defaultServerPort: "cherno_3pp",
    };
  },
  computed: {
    selectedServerPort() {
      const server = this.servers.find(s => s.id === this.selectedServerId);
      return server ? server.port : this.defaultServerPort;
    },
    selectedServerLink() {
      return this.selectedServerPort
        ? `https://otpdayz.store:3005/${this.selectedServerPort}`
        : `https://otpdayz.store:3005/${this.defaultServerPort}`;
    },
  },
  methods: {
    selectServer(id) {
      const selectedServer = this.servers.find(server => server.id === id);
      if (selectedServer) {
        this.selectedServerId = id;
        localStorage.setItem("selectedServerId", id);
        localStorage.setItem("selectedServerPort", this.selectedServerPort);

        this.notification = `Ви перейшли на сервер ${selectedServer.name}`;

        setTimeout(() => {
          this.notification = ''; // Видаляємо текст повідомлення
        }, 4000);

        this.$emit('server-selected', id);
      }
    },
    initializeLocalStorage() {
      const serverId = localStorage.getItem('selectedServerId');
      const serverPort = localStorage.getItem('selectedServerPort');

      if (!serverId || !serverPort) {
        localStorage.setItem('selectedServerId', this.defaultServerId);
        localStorage.setItem('selectedServerPort', this.defaultServerPort);
        console.log('Додано дефолтні значення в localStorage');
      } else {
        console.log('Значення в localStorage вже існують');
      }
    },
    showNotificationOnLoad() {
      const savedServerId = localStorage.getItem('selectedServerId');
      const selectedServer = this.servers.find(server => server.id === parseInt(savedServerId));
    },
  },
  mounted() {
    this.initializeLocalStorage();

    const savedServerId = localStorage.getItem('selectedServerId');
    if (savedServerId) {
      this.selectedServerId = parseInt(savedServerId);
    } else {
      this.selectedServerId = parseInt(this.defaultServerId);
    }

    this.showNotificationOnLoad();
  },
};
</script>



<style scoped>
.server-selector {
  position: fixed; 
  right: 0px; 
  top: 50%;
  transform: translate(0%, -50%);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.server-selector button {
  background-color: black;
  color: white;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden; 
  transition: width 0.3s ease;
  position: relative; 
}

@media (max-width: 1439px) {
  .server-selector button {
    width: 44px;
    height: 44px;
    margin-bottom: 16px;  
  }
  .server-selector button img {
    width: 44px;
    height: 44px;
    margin-right: 10px;
    border-radius: 50%;
  }
}


@media (min-width: 1440px) {
  .server-selector button {
    width: 44px;
    height: 44px;
    margin-bottom: 12px;
  }
  .server-selector button.hovered {
    width: 192px; 
  } 
  .server-selector button img {
    width: 44px;
    height: 44px;
  }
}

.server-selector button.active {
  background-color: #F7CF14;
  color: black;
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
  opacity: 0.6;
  border-radius: 5px;
  text-align: center;
  font-weight: bold;
  z-index: 1000;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}
</style>
