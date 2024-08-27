<script setup>
import { hotels_fastapi } from "../stores/pinia_axios_hotels.js";
import { storeToRefs } from "pinia";
import { onMounted, shallowRef } from "vue";

let hotel_name = shallowRef("");

const hotelsData = hotels_fastapi();
const { rtn_hotel_data } = storeToRefs(hotelsData);

function search_hotel_name(hotel_name) {
  if (hotel_name == "") {
    hotelsData.get_hotels_all_info();
  } else {
    hotelsData.get_hotel_info_with_hotel_cn(hotel_name);
  }
}

function delete_hotel_data(hotel_id) {
  const userConfirmed = confirm("您確定要執行這個操作嗎？");
  if (userConfirmed) {
    hotelsData.delete_hotel_info(hotel_id);
  }
}

onMounted(() => {
  hotelsData.get_hotels_all_info();
});
</script>

<template>
  <header class="search-bar">
    <div class="title" style="margin: 10px">
      <h2 style="flex-shrink: 0">房間資料</h2>
      <input
        v-model="hotel_name"
        placeholder="熱門搜尋 : 雙人"
        style="
          border: none;
          background: transparent;
          outline: none;
          font-size: 1.2em;
          border-bottom: 1px solid;
          margin: 0 5px;
          width: clamp(200px, 30%, 800px);
        "
      />
      <button
        @click="search_hotel_name(hotel_name)"
        style="font-size: 1.1em; flex-shrink: 0"
      >
        搜尋
      </button>
    </div>
    <div>
      <hr />
    </div>
  </header>

  <div class="hotels-layout">
    <div v-for="hotel in rtn_hotel_data" :key="hotel.id" class="hotel">
      <div class="hotel-banner">
        <div class="hotel-pic">
          <!-- <v-img :src="hotel.hotel_pic" cover /> -->
          <img :src="hotel.hotel_pic" />
          <div class="cancel-btn" @click="delete_hotel_data(hotel.id)">
            <v-icon icon="mdi-close-thick" style="margin: 5px" />
          </div>
          <div class="zh-name">{{ hotel.hotel_cn }}</div>
        </div>

        <div class="hotel-info">
          <h3 class="en-name">{{ hotel.hotel_eng }}</h3>
          <div class="origin-price">原價 : NT.${{ hotel.hotel_price }}</div>
          <div class="discount">
            折扣 :
            <span style="font-weight: bold">{{ hotel.mount * 10 }}</span> 折
          </div>
          <div class="discount-price">
            特價 :
            <span style="color: red; font-weight: bold"
              >NT.${{ Math.floor(hotel.hotel_price * hotel.mount) }}</span
            >
          </div>

          <h4>提供服務</h4>
          <div class="service">
            <div
              v-if="hotel.equipments_wifi == true"
              style="color: green"
              class="title service_status"
            >
              <v-icon icon="mdi-wifi" style="margin-right: 5px" />
              <h4>免費Wi-Fi</h4>
            </div>
            <div
              v-if="hotel.equipments_bathtub == true"
              style="color: deepskyblue"
              class="title service_status"
            >
              <v-icon icon="mdi-bathtub" style="margin-right: 5px" />
              <h4>私人浴缸</h4>
            </div>
            <div
              v-if="hotel.equipments_breakfast == true"
              style="color: orange"
              class="title service_status"
            >
              <v-icon icon="mdi-coffee" style="margin-right: 5px" />
              <h4>中/西式早餐</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.title {
  display: flex;
  align-items: center;
}

.search-bar {
  position: sticky;
  top: 0;
  z-index: 2;
  background-color: white;
}

hr {
  width: 95%;
  margin: auto;
}

.hotels-layout {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 5px;
}

.hotel {
  height: auto;
  padding: 10px;
}

.hotel-banner {
  width: 100%;
  height: 100%;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  overflow: hidden;
}

.hotel-pic {
  width: 100%;
  height: 200px; /*有修改 : 200px*/
  position: relative;
}

img {
  width: 100%;
  height: 100%;
}

.cancel-btn {
  position: absolute;
  right: 0;
  top: 0;
  background-color: aliceblue;
  border-radius: 0 0 0 13px;
}

.zh-name {
  position: absolute;
  bottom: 5%;
  right: 0;
  background-color: aliceblue;
  font-size: 1.2em;
  border-radius: 13px 0 0 13px;
  padding-left: 1%;
  box-shadow: -5px 4px 10px black;
  font-size: 1.4em;
  font-weight: bold;
}

.hotel-info {
  padding: 10px;
  font-size: 1.4em;
}

.origin-price {
  text-decoration: line-through;
}

.service {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
}

.service_status {
  border: 2px solid;
  border-radius: 10px;
  padding: 2px 5px;
}

/* 針對螢幕寬度介於 1280px 至 850px 之間 */
@media (max-width: 1280px) and (min-width: 850px) {
  .hotels-layout {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 針對螢幕寬度小於或等於 850px */
@media (max-width: 850px) {
  .hotels-layout {
    display: flex;
    flex-direction: column;
    /*display: grid;
    grid-template-columns: repeat(1, 1fr);*/
  }
}
</style>
