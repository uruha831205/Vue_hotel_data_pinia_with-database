<script setup>
import { hotels_fastapi } from "../stores/pinia_axios_hotels.js";
import { storeToRefs } from "pinia";
import { ref, reactive, computed } from "vue";

const hotelsData = hotels_fastapi();
const { rtn_hotel_data, add_hotel_status_code, edit_hotel_status_code } =
  storeToRefs(hotelsData);

const selected = ref("");
const edit_obj = computed(() => {
  return JSON.parse(JSON.stringify(selected.value));
});

const new_hotel_obj = {
  hotel_cn: "",
  hotel_eng: "",
  hotel_price: null,
  mount: null,
  hotel_pic: "",
  equipments_wifi: "",
  equipments_bathtub: "",
  equipments_breakfast: "",
};

const add_hotel_obj = (obj) => {
  hotelsData.post_hotel_info(obj);
};

const edit_hotel_data = (obj) => {
  hotelsData.put_hotel_info(obj);
};
</script>

<!-- selected="selected" -->

<template>
  <div class="center all-hotels-edit">
    <div class="titie">
      <v-icon icon="mdi-home" style="margin-right: 5px" />
      <h2>飯店資料</h2>
    </div>
    <hr />

    <!--修改資料-->
    <div class="center hotel-edit">
      <h2 style="width: 100%">修改資料</h2>
      <select v-model="selected" style="font-size: 1.2em; width: 100%">
        <option value="" disabled>請選擇...</option>
        <option
          v-for="hotel in rtn_hotel_data"
          :key="hotel.id"
          :value="hotel"
          style="font-size: 1.2em"
        >
          {{ hotel.hotel_cn }}
        </option>
      </select>

      <div v-if="edit_obj != ''" class="select-list" style="width: 100%">
        <div>中文房名</div>
        <input class="input-data" type="text" v-model="edit_obj.hotel_cn" />
        <div>英文房名</div>
        <input class="input-data" type="text" v-model="edit_obj.hotel_eng" />
        <div>房間原價</div>
        <input class="input-data" type="text" v-model="edit_obj.hotel_price" />
        <div>房間折扣</div>
        <input class="input-data" type="text" v-model="edit_obj.mount" />
        <div>房間圖片</div>
        <input class="input-data" type="text" v-model="edit_obj.hotel_pic" />
        <div class="equipments">
          <div style="display: flex">
            <input
              type="checkbox"
              v-model="edit_obj.equipments_wifi"
              id="wifi"
            />
            <label for="wifi">wifi</label>
          </div>
          <div style="display: flex">
            <input
              type="checkbox"
              v-model="edit_obj.equipments_bathtub"
              id="bathtub"
            />
            <label for="bathtub">浴缸</label>
          </div>
          <div style="display: flex">
            <input
              type="checkbox"
              v-model="edit_obj.equipments_breakfast"
              id="breakfast"
            />
            <label for="breakfast">早餐</label>
          </div>
        </div>
        <button class="btn" @click.prevent="edit_hotel_data(edit_obj)">
          送出
        </button>
      </div>
      <hr />

      <!-- 新增資料 -->
      <div class="add-list" style="width: 100%">
        <h2 style="width: 100%">新增資料</h2>
        <div>中文房名</div>
        <input
          class="input-data"
          type="text"
          v-model="new_hotel_obj.hotel_cn"
          placeholder="房名"
        />
        <div>英文房名</div>
        <input
          class="input-data"
          type="text"
          v-model="new_hotel_obj.hotel_eng"
          placeholder="Room name"
        />
        <div>房間原價</div>
        <input
          class="input-data"
          type="text"
          v-model="new_hotel_obj.hotel_price"
          placeholder="0"
        />
        <div>房間折扣</div>
        <input
          class="input-data"
          type="text"
          v-model="new_hotel_obj.mount"
          placeholder="0.01"
        />
        <div>房間圖片</div>
        <input
          class="input-data"
          type="text"
          v-model="new_hotel_obj.hotel_pic"
          placeholder="http://..."
        />
        <div class="equipments">
          <div style="display: flex">
            <input
              type="checkbox"
              id="wifi"
              v-model="new_hotel_obj.equipments_wifi"
            />
            <label for="wifi">wifi</label>
          </div>
          <div style="display: flex">
            <input
              type="checkbox"
              id="bathtub"
              v-model="new_hotel_obj.equipments_bathtub"
            />
            <label for="bathtub">浴缸</label>
          </div>
          <div style="display: flex">
            <input
              type="checkbox"
              id="breakfast"
              v-model="new_hotel_obj.equipments_breakfast"
            />
            <label for="breakfast">早餐</label>
          </div>
        </div>
        <button class="btn" @click="add_hotel_obj(new_hotel_obj)">送出</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.titie {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.center {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.all-hotels-edit {
  background-color: antiquewhite;
  margin: auto;
  width: 80%;
  height: 100vh;
  position: sticky;
  top: 0;
}

.select-list .input-data,
.add-list .input-data {
  width: 100%;
}

.hotel-edit {
  background-color: antiquewhite;
  width: 80%;
}

.equipments {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 10px;
}

hr {
  width: 90%;
  margin: 10px;
}

.btn {
  margin-top: 10px;
  width: 100%;
  border: none;
  border-radius: 10px;
  background-color: slateblue;
  font-size: 1.1em;
  font-weight: bold;
}
</style>
