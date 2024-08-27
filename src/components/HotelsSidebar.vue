<script setup>
import { hotels_fastapi } from "../stores/pinia_axios_hotels.js";
import { storeToRefs } from "pinia";
import { ref, reactive, computed, onMounted, toRaw } from "vue";
import axios from "axios";

//csrf 相關
const csrfToken = ref("");

const hotelsData = hotels_fastapi();
const { rtn_hotel_data, add_hotel_status_code, edit_hotel_status_code } =
  storeToRefs(hotelsData);

const selected = ref("");
const edit_obj = computed(() => {
  return reactive(JSON.parse(JSON.stringify(selected.value)));
});

//新增房間的資料
const hotel_obj = {
  hotel_cn: "",
  hotel_eng: "",
  hotel_price: "",
  mount: "",
  hotel_pic: "",
  equipments_wifi: false,
  equipments_bathtub: false,
  equipments_breakfast: false,
};

const new_hotel_obj = ref(hotel_obj);

//一開始載入先取得 CSRF token
onMounted(async () => {
  try {
    const response = await axios.get("http://localhost:8000/csrf-token");
    csrfToken.value = response.data.csrf_token;
    console.log("已獲取 CSRF token:", csrfToken.value);
  } catch (error) {
    console.error("無法獲取 CSRF token:", error);
  }
});

//提交表單時發送 CSRF token
const submitForm = async () => {
  try {
    await axios.get("http://localhost:8000/hotels_all111/", {
      headers: {
        "X-CSRF-Token": csrfToken.value,
      },
    });
    alert("表單已成功提交");
  } catch (error) {
    console.error("表單提交失敗:", error);
  }
};

//共用函式 : 檢測 內容值是否包含 單引號 或 雙引號
const hasBothQuotes = (str) => {
  if (str === "") {
    return null;
  }

  const hasSingleQuote = /'/g.test(str);
  const hasDoubleQuote = /"/g.test(str);

  // console.log(hasSingleQuote);
  // console.log(hasDoubleQuote);

  return !(hasSingleQuote || hasDoubleQuote);
};

//共用函式 : 檢測 內容值是否小於0
const lessThanZero = (number) => {
  if (number == "") {
    return null;
  }
  return number * -1 <= 0;
};

//檢測 新增中文房名
const check_add_hotel_cn = computed(() =>
  hasBothQuotes(new_hotel_obj.value.hotel_cn)
);

//檢測 新增英文房名
const check_add_hotel_eng = computed(() =>
  hasBothQuotes(new_hotel_obj.value.hotel_eng)
);

//檢測 新增房間價格
const check_add_hotel_price = computed(() =>
  lessThanZero(new_hotel_obj.value.hotel_price)
);

//檢測 新增房間折扣 new_hotel_obj.value.mount
const check_add_mount = computed(() => lessThanZero(new_hotel_obj.value.mount));

//新增房間資料
const add_hotel_obj = async (obj) => {
  if (
    check_add_hotel_cn.value == true &&
    check_add_hotel_eng.value == true &&
    check_add_hotel_price.value &&
    check_add_mount.value
  ) {
    await hotelsData.post_hotel_info(obj);

    //執行成功與失敗的反饋
    console.log(add_hotel_status_code.value);

    if (add_hotel_status_code.value == "201") {
      alert("新增成功!!");
      await hotelsData.get_hotels_all_info();
    } else {
      alert("新增失敗!!");
    }

    new_hotel_obj.value = {
      hotel_cn: "",
      hotel_eng: "",
      hotel_price: "",
      mount: "",
      hotel_pic: "",
      equipments_wifi: false,
      equipments_bathtub: false,
      equipments_breakfast: false,
    };
  }
};

//檢測 編輯中文房名
const check_edit_hotel_cn = computed(() =>
  hasBothQuotes(edit_obj.value.hotel_cn)
);

//檢測 編輯英文房名
const check_edit_hotel_eng = computed(() =>
  hasBothQuotes(edit_obj.value.hotel_eng)
);

//檢測 編輯房間價格
const check_edit_hotel_price = computed(() =>
  lessThanZero(edit_obj.value.hotel_price)
);

//檢測 編輯房間折扣 new_hotel_obj.value.mount
const check_edit_mount = computed(() => lessThanZero(edit_obj.value.mount));

//編輯房間資料
const edit_hotel_data = async (obj) => {
  if (
    check_edit_hotel_cn.value == true &&
    check_edit_hotel_eng.value == true &&
    check_edit_hotel_price.value &&
    check_edit_mount.value
  ) {
    await hotelsData.put_hotel_info(obj);
    if (edit_hotel_status_code.value == "200") {
      alert("更新成功!!");
      await hotelsData.get_hotels_all_info();
    } else {
      alert("更新失敗!!");
    }
    selected.value = "";
  }
};
</script>

<!-- selected="selected" -->

<template>
  <div class="center all-hotels-edit" id="all-hotels-edit">
    <div class="titie" style="margin-top: 10px">
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
        <input
          :class="[
            'input-data',
            { 'input-valid': check_edit_hotel_cn == true },
            { 'input-invalid': check_edit_hotel_cn == false },
          ]"
          type="text"
          v-model="edit_obj.hotel_cn"
        />
        <div v-if="check_edit_hotel_cn == false" class="alert_word">
          請勿輸入 單引號 和 雙引號
        </div>
        <div>英文房名</div>
        <input
          :class="[
            'input-data',
            { 'input-valid': check_edit_hotel_eng == true },
            { 'input-invalid': check_edit_hotel_eng == false },
          ]"
          type="text"
          v-model="edit_obj.hotel_eng"
        />
        <div v-if="check_edit_hotel_eng == false" class="alert_word">
          請勿輸入 單引號 和 雙引號
        </div>
        <div>房間原價</div>
        <input
          :class="[
            'input-data',
            { 'input-valid': check_edit_hotel_price == true },
            { 'input-invalid': check_edit_hotel_price == false },
          ]"
          type="text"
          v-model="edit_obj.hotel_price"
        />
        <div v-if="check_edit_hotel_price == false" class="alert_word">
          請勿輸入負值
        </div>
        <div>房間折扣</div>
        <input
          :class="[
            'input-data',
            { 'input-valid': check_edit_mount == true },
            { 'input-invalid': check_edit_mount == false },
          ]"
          type="text"
          step="0.01"
          v-model="edit_obj.mount"
        />
        <div v-if="check_edit_mount == false" class="alert_word">
          請勿輸入負值
        </div>
        <div>房間圖片</div>
        <input class="input-data" type="text" v-model="edit_obj.hotel_pic" />
        <img
          :src="edit_obj.hotel_pic"
          style="width: 100%; height: 150px; margin-top: 5px"
        />
        <div class="equipments">
          <div style="display: flex">
            <input
              type="checkbox"
              v-model="edit_obj.equipments_wifi"
              id="edit-wifi"
            />
            <label for="edit-wifi">wifi</label>
          </div>
          <div style="display: flex">
            <input
              type="checkbox"
              v-model="edit_obj.equipments_bathtub"
              id="edit-bathtub"
            />
            <label for="edit-bathtub">浴缸</label>
          </div>
          <div style="display: flex">
            <input
              type="checkbox"
              v-model="edit_obj.equipments_breakfast"
              id="edit-breakfast"
            />
            <label for="edit-breakfast">早餐</label>
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
          :class="[
            'input-data',
            { 'input-valid': check_add_hotel_cn == true },
            { 'input-invalid': check_add_hotel_cn == false },
          ]"
          type="text"
          v-model="new_hotel_obj.hotel_cn"
          placeholder="房名"
        />
        <div v-if="check_add_hotel_cn == false" class="alert_word">
          請勿輸入 單引號 和 雙引號
        </div>
        <div>英文房名</div>
        <input
          :class="[
            'input-data',
            { 'input-valid': check_add_hotel_eng == true },
            { 'input-invalid': check_add_hotel_eng == false },
          ]"
          type="text"
          v-model="new_hotel_obj.hotel_eng"
          placeholder="Room name"
        />
        <div v-if="check_add_hotel_eng == false" class="alert_word">
          請勿輸入 單引號 和 雙引號
        </div>
        <div>房間原價</div>
        <input
          :class="[
            'input-data',
            { 'input-valid': check_add_hotel_price == true },
            { 'input-invalid': check_add_hotel_price == false },
          ]"
          type="number"
          v-model="new_hotel_obj.hotel_price"
          placeholder="0"
        />
        <div v-if="check_add_hotel_price == false" class="alert_word">
          請勿輸入負值
        </div>
        <div>房間折扣</div>
        <input
          :class="[
            'input-data',
            { 'input-valid': check_add_mount == true },
            { 'input-invalid': check_add_mount == false },
          ]"
          type="number"
          step="0.01"
          v-model="new_hotel_obj.mount"
          placeholder="0.01"
        />
        <div v-if="check_add_mount == false" class="alert_word">
          請勿輸入負值
        </div>
        <div>房間圖片</div>
        <input
          class="input-data"
          type="text"
          v-model="new_hotel_obj.hotel_pic"
          placeholder="https://..."
        />
        <div class="equipments">
          <div style="display: flex">
            <input
              type="checkbox"
              id="add-wifi"
              v-model="new_hotel_obj.equipments_wifi"
            />
            <label for="add-wifi">wifi</label>
          </div>
          <div style="display: flex">
            <input
              type="checkbox"
              id="add-bathtub"
              v-model="new_hotel_obj.equipments_bathtub"
            />
            <label for="add-bathtub">浴缸</label>
          </div>
          <div style="display: flex">
            <input
              type="checkbox"
              id="add-breakfast"
              v-model="new_hotel_obj.equipments_breakfast"
            />
            <label for="add-breakfast">早餐</label>
          </div>
        </div>
        <button
          class="btn"
          @click.prevent="add_hotel_obj(toRaw(new_hotel_obj))"
        >
          送出
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/*自訂 外卷軸樣式*/
#all-hotels-edit::-webkit-scrollbar {
  width: 5px;
}

/*自訂 內卷軸樣式
#all-hotels-edit::-webkit-scrollbar-thumb {
}*/

:where(.select-list, .add-list) .input-data {
  width: 100%;
}

.input-valid {
  border: 2px solid green; /* 设置焦点时的边框 */
  outline: none; /* 移除默认的轮廓 */
}

.input-invalid {
  border: 2px solid red; /* 设置焦点时的边框 */
  outline: none; /* 移除默认的轮廓 */
}

.alert_word {
  width: 100%;
  font-size: 0.8em;
  font-weight: bold;
  text-align: right;
  color: red;
}

.all-hotels-edit {
  background-color: rgb(250, 235, 215);
  margin: auto;
  width: 80%;
  height: 100vh;
  position: sticky;
  top: 0;
  overflow-y: scroll;
}

.hotel-edit {
  background-color: antiquewhite;
  width: 80%;
}

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

.equipments {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 10px;
}

hr {
  width: 90%;
  margin: 5px;
}

.btn {
  margin: 10px 0;
  width: 100%;
  border: none;
  border-radius: 10px;
  background-color: slateblue;
  font-size: 1.1em;
  font-weight: bold;
}

input {
  font-size: 1.2em;
}
</style>
