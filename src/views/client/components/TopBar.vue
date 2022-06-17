<template>
  <section class="col-span-4 p-5 bg-primary flex items-center justify-between">
    <img class="w-80" src="@/assets/logo.png" alt="" srcset="" />
    <div
      @click="isOpen = !isOpen"
      class="
        flex
        items-center
        p-2
        hover:bg-white
        text-white
        hover:text-black
        py-1
        cursor-pointer
        rounded
      "
    >
      <div class="font-bold text-lg mx-4">{{ username }}</div>
      <img :src="img" class="rounded-full" alt="" />
      <div
        class="p-2 absolute top-16 w-60 rounded-md bg-gray-200 text-black"
        v-show="isOpen"
      >
        <div
          v-on:click="onRaiseRequestClicked"
          class="p-2 m-1 hover:bg-gray-100 rounded-lg"
        >
          Raise a Request
        </div>
        <div
          v-on:click="onResetClicked"
          class="p-2 m-1 hover:bg-gray-100 rounded-lg"
        >
          Reset Password
        </div>
        <div
          v-on:click="onLogoutClicked"
          class="p-2 m-1 hover:bg-gray-100 rounded-lg"
        >
          <i class="fa fa-sign-out-alt"></i>
          Logout
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import router from "@/router";
export default {
  methods: {
    onRaiseRequestClicked: function () {
      router.push({ path: "/client/raiserequest" });
    },
    onLogoutClicked: function () {
      localStorage.clear("jwt");
      router.push({ path: "/auth" });
    },
    onResetClicked: function () {
      router.push({ path: "/client/changepassword" });
    },
  },
  data() {
    return {
      isOpen: false,
      username: localStorage.getItem("username") || "username@gmail.com",
      img:
        "https://ui-avatars.com/api/?name=" +
        localStorage.getItem("username") +
        "&background=random&size=30",
    };
  },
};
</script>