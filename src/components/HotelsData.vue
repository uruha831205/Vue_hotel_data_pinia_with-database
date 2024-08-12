<script setup>
import { hotels_fastapi } from "../stores/pinia_axios_hotels.js";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

const hotelsData = hotels_fastapi();
const { rtn_hotel_data } = storeToRefs(hotelsData);

onMounted(() => {
  hotelsData.get_hotels_all_info();
});
</script>

<template>
  <div class="title">
    <v-icon icon="mdi-bed" style="margin-right: 5px" />
    <h2>房間資料</h2>
  </div>

  <hr />

  <div class="hotels-layout">
    <div v-for="hotel in rtn_hotel_data" :key="hotel.id" class="hotel">
      <div class="hotel-banner">
        <div class="hotel-pic">
          <v-img :src="hotel.hotel_pic" cover />
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
              >NT.${{ hotel.hotel_price * hotel.mount }}</span
            >
          </div>

          <h4>提供服務</h4>
          <div style="display: flex; gap: 5px">
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

<style>
.service_status {
  border: 2px solid;
  border-radius: 10px;
  padding: 2px 5px;
}

.title {
  display: flex;
  align-items: center;
}

hr {
  width: 95%;
  margin: 10px;
}

.hotels-layout {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.hotel {
  height: 70vh;
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
  height: 40%;
  position: relative;
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
</style>
