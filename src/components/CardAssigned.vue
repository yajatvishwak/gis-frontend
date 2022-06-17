<template>
  <div
    class="
      card
      flex-shrink-0 flex flex-col
      bg-gray-200
      rounded-xl
      m-4
      p-2
      ml-0
      maxWidth
    "
  >
    <img
      :src="getImage(image)"
      class="m-2 max-w-xs object-cover h-48 w-full rounded-2xl mb-5"
      alt=""
    />

    <div class="font-bold m-3 mb-1 text break-words">
      {{ nameOfProduct }}
    </div>
    <div class="m-3 mt-0">{{ classOfProduct }}</div>
    <div class="m-3">Available: {{ availableQuantity - quantity }}</div>
    <div class="font-bold flex items-center justify-around my-2">
      <i @click="decrement" class="fa fa-minus hover:text-red-600"></i>
      <span>{{ quantity }}</span>
      <i @click="increment" class="fa fa-plus hover:text-green-600"></i>
    </div>
  </div>
</template>
<script>
export default {
  props: [
    "nameOfProduct",
    "itemID",
    "addQuantity",
    "image",
    "quantity",
    "availableQuantity",
    "classOfProduct",
  ],

  methods: {
    increment: function () {
      //add max value
      if (this.quantity >= this.availableQuantity) {
        alert("Max quantity reached");
        return;
      }
      this.addQuantity(this.itemID, this.quantity + 1);
    },
    decrement: function () {
      if (this.quantity <= 0) return;
      this.addQuantity(this.itemID, this.quantity - 1);
    },
  },
};
</script>
<style scoped>
.maxWidth {
  max-width: 15em;
}
</style>