<template>
  <Modal v-model="isEditing">
    <div class="bg-white p-10 rounded-lg">
      <div class="text-right" v-on:click="closem">
        <i class="fa fa-close mx-2 hover:text-red-500"></i>
      </div>
      Returning <span class="font-bold">{{ productName }}</span>
      <div class="mt-5">Quantity to return</div>
      <form @submit.prevent="submitform">
        <input
          min="1"
          :max="quantity"
          v-model="returnCount"
          placeholder="Enter Return Quantity"
          type="number"
          class="border p-3 m-3 rounded-md"
          id="quantity"
        />
        <button class="rounded p-3 text-white bg-red-500">Submit</button>
      </form>
    </div>
  </Modal>
  <div class="p-4 flex flex-col m-3 bg-gray-200 rounded-md">
    <div class="w-full">
      <img
        :src="getImageClient(image)"
        class="object-cover h-48 w-full rounded-2xl mb-5"
        alt=""
      />
    </div>
    <div class="m-3 mt-0 flex-col flex justify-evenly">
      <div class="font-bold">{{ productName }}</div>
      <div>
        <div class="my-2">{{ quantity }} units only</div>
        <div class="flex">
          <div
            class="text-sm text-center border border-red-500 px-2 rounded-full"
          >
            {{ classOfProduct }}
          </div>
          <div
            v-on:click="returnClicked"
            class="
              text-sm text-center
              border border-red-500
              mx-4
              hover:bg-gray-400
              cursor-pointer
              px-2
              rounded-full
            "
          >
            Return Item
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      isEditing: false,
      returnCount: 0,
    };
  },
  methods: {
    submitform: async function () {
      console.log(this.returnCount, this.itemID, this.requestID);
      // send to server
      const res = await axios.post(
        process.env.VUE_APP_BASE_URL + "/admin/return-item",
        {
          token: localStorage.getItem("jwt"),
          requestID: this.requestID,
          itemID: this.itemID,
          quantity: this.returnCount,
        }
      );
      console.log(res.data);
      if (res.data.status === "Successfully Returned") {
        alert("Updated Sucessfully");
      } else {
        alert("Something went wrong");
      }
    },
    returnClicked: function () {
      console.log("clieck");
      this.isEditing = true;
    },

    closem: function () {
      this.isEditing = false;
    },
  },
  props: [
    "classOfProduct",
    "quantity",
    "itemID",
    "productName",
    "image",
    "requestID",
  ],
};
</script>