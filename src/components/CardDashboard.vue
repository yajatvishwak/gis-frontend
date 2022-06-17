<template>
  <div
    class="p-4 cursor-pointer border m-2 my-3 rounded-md flex items-center"
    v-if="request.selected === false"
  >
    <img :src="img" class="w-12 rounded-full mx-2" alt="" />

    <div class="mx-1">
      {{ request.title }}
      <div class="font-bold">{{ request.username }} - {{ date }}</div>
      <div>
        <StatusTag :type="request.status.toLowerCase()" />
      </div>
    </div>
  </div>
  <div
    class="
      p-4
      cursor-pointer
      border
      m-2
      my-3
      rounded-md
      flex
      items-center
      bg-gray-200
    "
    v-if="request.selected === true"
  >
    <img :src="img" class="w-12 rounded-full mx-2" alt="" />

    <div class="mx-1">
      {{ request.title }}
      <div class="font-bold">{{ request.username }} - {{ date }}</div>
      <div>
        <StatusTag :type="request.status.toLowerCase()" />
      </div>
    </div>
  </div>
</template>

<script>
import StatusTag from "@/components/StatusTag.vue";
export default {
  methods: {
    getDate: function () {
      let today = new Date(this.request.createdAt);
      let dd = String(today.getDate()).padStart(2, "0");
      let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      let yyyy = today.getFullYear();
      return dd + "/" + mm + "/" + yyyy;
    },
  },
  props: ["request"],
  data() {
    return {
      date: this.getDate(),
      img:
        "https://ui-avatars.com/api/?name=" +
        this.request.username +
        "&background=random",
    };
  },
  components: {
    StatusTag,
  },
};
</script>