<script setup>
import { ref } from "vue";
import HotelsData from "./components/HotelsData.vue";
import HotelsSidebar from "./components/HotelsSidebar.vue";

const isActive = ref(false);

function toggle() {
  isActive.value = !isActive.value;
}
</script>

<template>
  <div class="hotels">
    <aside class="hotel-sidebar">
      <HotelsSidebar />
    </aside>
    <article class="hotel-data">
      <HotelsData />
    </article>
  </div>

  <footer
    :class="[
      'bottom-sidebar-menu',
      { 'bottom-sidebar-menu-addeffect': isActive },
      { 'bottom-sidebar-menu-canceleffect': !isActive },
    ]"
  >
    <div @click="toggle">
      飯店資料
      <v-icon
        v-if="!isActive"
        icon="mdi-arrow-up-drop-circle"
        style="margin: 5px"
      />
      <v-icon v-else icon="mdi-arrow-down-drop-circle" style="margin: 5px" />
    </div>
    <HotelsSidebar />
  </footer>
</template>

<style scoped>
.bottom-sidebar-menu {
  display: none;
  position: sticky;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  bottom: 0;
  width: 100%;
  height: 40px;
  background-color: rgba(250, 235, 215);
  font-weight: bold;
  font-size: 1.2em;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-top: 2px solid;
  border-left: 2px solid;
  border-right: 2px solid;
  z-index: 3;
}

.bottom-sidebar-menu-addeffect {
  transition: 0.5s;
  height: 100vh;
}
.bottom-sidebar-menu-canceleffect {
  transition: 0.5s;
  height: 40px;
}

.hotels {
  width: 100%;
  display: flex;
}

.hotel-sidebar {
  width: 20%;
}

.hotel-data {
  width: 80%;
}

/* 針對螢幕寬度介於 1280px 至 850px 之間 */
@media (max-width: 1280px) and (min-width: 850px) {
  .hotel-sidebar {
    width: 30%;
  }
  .hotel-data {
    width: 70%;
  }
}

/* 針對螢幕寬度小於或等於 850px */
@media (max-width: 850px) and (min-width: 610px) {
  .hotel-sidebar {
    width: 50%;
  }
}

@media (max-width: 610px) {
  .bottom-sidebar-menu {
    display: flex;
  }
  .hotel-sidebar {
    display: none;
  }
  .hotel-data {
    width: 100%;
  }
}
</style>
