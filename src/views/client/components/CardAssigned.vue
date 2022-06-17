<template>
  <div class="p-4 flex m-3 bg-gray-200 rounded-md justify-center">
    <!-- <img :src="getImageClient(image)" class="w-32 rounded-lg" alt="" /> -->
    <div class="m-3 mt-0 flex-col flex justify-evenly">
      <!-- <div class="font-bold">{{ productName }}</div> -->
      <div>
        <div class="my-2 font-black">{{ quantity }} units only</div>
        <div
          class="
            text-sm text-center
            border border-red-500
            px-2
            font-black
            rounded-full
          "
        >
          {{ classOfProduct }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["classOfProduct", "quantity", "productName", "image"],
};
</script>