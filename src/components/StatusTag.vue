<template>
  <div
    v-if="type === `pending`"
    class="
      text-sm
      bg-opacity-50 bg-yellow-400
      p-1
      mt-1
      rounded
      w-auto
      inline-block
      text-center
      font-bold
    "
  >
    Action Pending
  </div>
  <div
    v-if="type === `accepted`"
    class="
      text-sm
      bg-opacity-50 bg-green-400
      p-1
      mt-1
      rounded
      w-auto
      inline-block
      text-center
      font-bold
    "
  >
    Accepted
  </div>
  <div
    v-if="type === `rejected`"
    class="
      text-sm
      bg-opacity-50 bg-red-400
      p-1
      mt-1
      rounded
      w-auto
      inline-block
      text-center
      font-bold
    "
  >
    Rejected
  </div>
</template>
<script>
export default {
  props: ["type"],
};
</script>