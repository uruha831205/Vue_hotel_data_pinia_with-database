import { defineStore } from "pinia";
import axios from "axios";
import { ref, shallowRef } from "vue";

export const hotels_fastapi = defineStore("hotels_fastapi", () => {
  const rtn_hotel_data = shallowRef([]);
  const add_hotel_status_code = shallowRef(0);
  const delete_hotel_status_code = shallowRef(0);
  const edit_hotel_status_code = shallowRef(0);
  axios.defaults.baseURL = "https://fastapi.mahorsedomain.online";
  //axios.defaults.baseURL = "http://127.0.0.1:8000";

  //搜尋全部資料
  async function get_hotels_all_info() {
    const result = await axios.get("/hotels_all/");
    //console.log(result.data);
    rtn_hotel_data.value = result.data;
  }

  // 利用 id 搜尋某一筆資料
  async function get_hotel_info_with_id(id) {
    const result = await axios.get("/hotel/" + id);
    rtn_hotel_data.value = result.data;
  }

  // 利用 hotel_cn 搜尋資料
  async function get_hotel_info_with_hotel_cn(hotel_cn) {
    const result = await axios.get("/hotel_chinsesname/" + hotel_cn);
    rtn_hotel_data.value = result.data;
  }

  //新增一筆資料
  async function post_hotel_info(obj) {
    if (obj.hotel_pic == "") {
      obj.hotel_pic =
        "https://t3.ftcdn.net/jpg/04/84/88/76/360_F_484887682_Mx57wpHG4lKrPAG0y7Q8Q7bJ952J3TTO.jpg";
    }
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
  }

  return {
    rtn_hotel_data,
    add_hotel_status_code,
    delete_hotel_status_code,
    edit_hotel_status_code,
    get_hotels_all_info,
    get_hotel_info_with_id,
    get_hotel_info_with_hotel_cn,
    post_hotel_info,
    delete_hotel_info,
    put_hotel_info,
  };
});
