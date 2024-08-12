<script setup>
import HotelsData from "./components/HotelsData.vue";
import HotelsSidebar from "./components/HotelsSidebar.vue";
import { useHotelsStore } from "./stores/hotelData.js";
import { ref, reactive, computed } from "vue";
import { storeToRefs } from "pinia";
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
</template>

<style scoped>
.hotels {
  width: 100%;
  display: flex;
}

.hotel-sidebar {
  width: 15%;
}

.hotel-data {
  width: 85%;
}
</style>
