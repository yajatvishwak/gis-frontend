<template>
  <div @click="navigateTo" class="cursor-pointer">
    <div
      v-if="status === `pending`"
      class="rounded m-2 w-full bg-gray-100 flex"
    >
      <div class="w-2 bg-yellow-400 rounded-tl-md rounded-bl-md">.</div>
      <div class="w-full pr-24">
        <div class="text-xl my-4 mb-0 font-bold mx-2">{{ title }}</div>
        <!-- <div class="mx-2 w-full my-2 mb-0">
          placed for {{ quantity }} quantity
        </div> -->
        <div class="mx-2 w-full my-2 mb-0">Request ID: {{ requestID }}</div>
        <div class="mx-2 w-full my-2 font-bold">Awaiting Approval</div>
      </div>
    </div>
    <div
      v-if="status === `accepted`"
      class="rounded m-2 w-full bg-gray-100 flex"
    >
      <div class="w-2 bg-green-500 rounded-tl-md rounded-bl-md">.</div>
      <div class="w-full pr-24">
        <div class="text-xl my-4 mb-0 font-bold mx-2">{{ title }}</div>
        <div class="mx-2 w-full my-2 mb-0">Request ID: {{ requestID }}</div>
        <div class="mx-2 w-full my-2 font-bold">Accepted</div>
      </div>
    </div>
    <div
      v-if="status === `rejected`"
      class="rounded m-2 w-full bg-gray-100 flex"
    >
      <div class="w-2 bg-red-500 rounded-tl-md rounded-bl-md">.</div>
      <div class="w-full pr-24">
        <div class="text-xl my-4 mb-0 font-bold mx-2">{{ title }}</div>

        <div class="mx-2 w-full my-2 mb-0">Request ID: {{ requestID }}</div>
        <div class="mx-2 w-full my-2 font-bold">Rejected</div>
      </div>
    </div>
  </div>
</template>
<script>
//title is a oneliner like : lets say theres an event called bargam so the title will be "Bargam 2021"
import router from "@/router";
export default {
  methods: {
    navigateTo: function () {
      router.push({ path: `/client/request/${this.requestID}` });
    },
  },
  props: ["status", "title", "requestID", "quantity"],
};
</script>