<template>
  <div
    class="
      card
      p-5
      m-4
      flex flex-col
      bg-gray-100
      rounded-2xl
      shadow-xl
      hover:shadow-md
      transition-all
    "
  >
    <div class="">
      <img
        :src="getImage(image)"
        class="object-cover h-48 w-full rounded-2xl mb-5"
        alt=""
      />
    </div>

    <div
      class="
        mt-auto
        font-bold
        text-2xl
        hover:text-notprimary
        cursor-pointer
        break-all
      "
      @click="navigate"
    >
      {{ nameOfProduct }}
    </div>

    <div class="break-all">
      {{ prodCustomID || "No ID" }} - {{ classOfProduct }}
    </div>
    <div class="flex">
      <div>
        <span class="font-bold text-indigo-700"> {{ quantity }} </span> units
      </div>
      <div class="ml-auto" v-show="!isEditing" @click="toggleEditing">
        <i class="fa fa-edit"></i>
      </div>
    </div>
  </div>
  <Modal v-model="isEditing" :closeModal="cancelEdit">
    <form @submit.prevent="submitChanges" class="bg-white rounded-lg p-5">
      <div class="text-xl font-bold mb-3">{{ nameOfProduct }}</div>
      <span>Quantity:</span>
      <div
        v-show="isEditing"
        class="
          font-bold
          flex
          items-center
          justify-around
          my-2
          bg-white
          p-2
          rounded-lg
        "
      >
        <i
          @click="decrementL(itemID)"
          class="fa fa-minus hover:text-red-600"
        ></i>
        <span v-if="changes.quantity" class="text-yellow-500">{{
          quantity
        }}</span>
        <span v-else>{{ quantity }}</span>
        <i
          @click="incrementL(itemID)"
          class="fa fa-plus hover:text-green-600"
        ></i>
      </div>
      <div class="flex flex-col">
        <label for="">Upload new bill</label>
        <input
          @change="handleBill($event)"
          class="p-2 rounded-lg border"
          type="file"
          accept=".pdf,.jpg,.png,.jpeg"
        />
      </div>
      <div class="flex flex-col">
        <label for="customid">Product ID</label>
        <input
          type="text"
          class="border p-2 rounded-lg"
          id="customid"
          v-model="tprodID"
        />
      </div>
      <button
        @click="deletebro"
        class="bg-red-500 p-4 mt-2 rounded-lg text-white w-full"
      >
        Delete Item
      </button>

      <div class="flex mt-5">
        <button type="submit" class="mx-4 ml-0">
          <i class="fa fa-check bg-green-400 p-3 rounded-full text-white"></i>
        </button>
        <div @click="stopEditing">
          <i class="fa fa-close bg-red-400 rounded-full p-3 text-white"></i>
        </div>
      </div>
    </form>
  </Modal>
</template>
<script>
export default {
  methods: {
    toggleEditing: function () {
      this.isEditing = !this.isEditing;
      this.adding = 0;
      this.subtracting = 0;
      this.tprodID = this.prodCustomID;
    },
    decrementL: function (itemID) {
      this.decrement(itemID);
      this.subtracting++;
      if (this.subtracting - this.adding === 0) {
        this.changes.quantity = false;
      } else {
        this.changes.quantity = true;
      }
      console.log(this.changes);
    },
    incrementL: function (itemID) {
      this.increment(itemID);
      this.adding++;
      if (this.subtracting - this.adding === 0) {
        this.changes.quantity = false;
      } else {
        this.changes.quantity = true;
      }
      console.log(this.changes);
    },
    handleBill: function (event) {
      this.bill = event.target.files[0];
    },
    deletebro: function () {
      this.deleteItem(this.itemID);
      this.isEditing = false;
    },
    submitChanges: function () {
      console.log(this.tprodID);
      if (this.tprodID === this.prodCustomID) {
        this.changes.prodCustomID = false;
      } else {
        this.changes.prodCustomID = true;
        this.updateProdID(this.itemID, this.tprodID);
      }
      //console.log(this.changes);
      this.confirmChanges(
        this.itemID,
        this.quantity,
        this.bill,
        this.tprodID,
        this.changes
      );
      this.isEditing = !this.isEditing;
    },
    stopEditing: function () {
      this.isEditing = !this.isEditing;
      this.cancelQuantityChange(this.itemID);
    },
    cancelEdit: function () {
      this.isEditing = !this.isEditing;
    },
    navigate: function () {
      window.location.href = "#/admin/item/" + this.itemID;
    },
  },
  data() {
    return {
      isEditing: false,
      bill: null,
      adding: 0,
      subtracting: 0,
      tprodID: this.prodCustomID + "",
      changes: {
        quantity: false,
        prodCustomID: false,
      },
    };
  },
  props: [
    "nameOfProduct",
    "classOfProduct",
    "quantity",
    "image",
    "itemID",
    "increment",
    "cancelQuantityChange",
    "decrement",
    "confirmChanges",
    "deleteItem",
    "prodCustomID",
    "updateProdID",
  ],
};
</script>