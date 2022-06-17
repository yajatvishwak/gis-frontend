<template>
  <div>
    <div
      v-if="status === `pending`"
      class="rounded m-2 w-full bg-gray-100 flex"
    >
      <div class="w-2 bg-yellow-400 rounded-tl-md rounded-bl-md">.</div>
      <div class="w-full pr-24">
        <div class="text-xl my-4 mb-0 font-bold mx-2"></div>
        <!-- <div class="mx-2 w-full my-2 mb-0">
          placed for {{ quantity }} quantity
        </div> -->
      </div>
    </div>
    <div
      v-if="status === `accepted`"
      class="rounded m-2 w-full bg-gray-100 flex"
    >
      <div class="w-2 bg-green-500 rounded-tl-md rounded-bl-md">.</div>
      <div class="w-full pr-24"></div>
    </div>
    <div
      v-if="status === `rejected`"
      class="rounded m-2 w-full bg-gray-100 flex"
    >
      <div class="w-2 bg-red-500 rounded-tl-md rounded-bl-md">.</div>
      <div class="w-full pr-24"></div>
    </div>
  </div>
</template>
<script>
//title is a oneliner like : lets say theres an event called bargam so the title will be "Bargam 2021"

export default {};
</script>