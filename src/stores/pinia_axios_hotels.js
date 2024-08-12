import { defineStore } from "pinia";
import axios from "axios";
import { ref, shallowRef } from "vue";

export const hotels_fastapi = defineStore("hotels_fastapi", () => {
  const rtn_hotel_data = shallowRef([]);
  const add_hotel_status_code = ref(0);
  const delete_hotel_status_code = ref(0);
  const edit_hotel_status_code = ref(0);
  axios.defaults.baseURL = "http://127.0.0.1:8000";

  //搜尋全部資料
  async function get_hotels_all_info() {
    const result = await axios.get("/hotels_all/");
    rtn_hotel_data.value = result.data;
  }

  //搜尋某一筆資料
  async function get_hotel_info(id) {
    const result = await axios.get("/hotel/" + id);
    rtn_hotel_data.value = result.data;
  }

  //新增一筆資料
  async function post_hotel_info(obj) {
    const status = await axios.post("/hotel/", {
      hotel_cn: obj.hotel_cn,
      hotel_eng: obj.hotel_eng,
      hotel_price: obj.hotel_price,
      mount: obj.mount,
      hotel_pic: obj.hotel_pic,
      equipments_wifi: obj.equipments_wifi,
      equipments_bathtub: obj.equipments_bathtub,
      equipments_breakfast: obj.equipments_breakfast,
    });
    add_hotel_status_code.value = status.status;
    get_hotels_all_info();
  }

  //刪除資料
  async function delete_hotel_info(id) {
    const status = await axios.delete("/hotel/" + id);
    delete_hotel_status_code.value = status.status;
    get_hotels_all_info();
  }

  //修改一筆資料
  async function put_hotel_info(obj) {
    const status = await axios.put("/hotel?hotel_id=" + obj.id, {
      hotel_cn: obj.hotel_cn,
      hotel_eng: obj.hotel_eng,
      hotel_price: obj.hotel_price,
      mount: obj.mount,
      hotel_pic: obj.hotel_pic,
      equipments_wifi: obj.equipments_wifi,
      equipments_bathtub: obj.equipments_bathtub,
      equipments_breakfast: obj.equipments_breakfast,
    });
    edit_hotel_status_code.value = status.status;
    if (edit_hotel_status_code.value == "200") {
      console.log("更新成功!!");
      get_hotels_all_info();
    } else {
      console.log("更新失敗!!");
    }

    // get_hotel_info(obj.value.id);
  }

  return {
    rtn_hotel_data,
    add_hotel_status_code,
    delete_hotel_status_code,
    edit_hotel_status_code,
    get_hotels_all_info,
    get_hotel_info,
    post_hotel_info,
    delete_hotel_info,
    put_hotel_info,
  };
});
