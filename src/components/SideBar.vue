<template>
  <section class="col-span-1 bg-gray-200 grid">
    <div class="container my-10 p-4">
      <!-- <div>{{ $route.name }}</div> -->
      <img src="@/assets/logo_dark.png" alt="" srcset="" />
      <nav class="my-10" v-for="navi in navigation" :key="navi.name">
        <a
          :href="navi.href"
          class="
            flex
            p-5
            items-center
            bg-blue-200
            text-blue-600
            rounded-lg
            my-5
          "
          v-if="$route.name === navi.pathname"
        >
          <i :class="`px-2 fa fa-` + navi.img"></i>

          {{ navi.name }}</a
        >
        <a
          :href="navi.href"
          class="flex p-5 bg-gray-50 items-center text-black rounded-lg my-5"
          v-else
        >
          <i :class="`px-2 fa fa-` + navi.img"></i>
          {{ navi.name }}</a
        >
      </nav>
    </div>

    <div class="self-end p-4">
      <div
        v-if="showmenu"
        class="
          p-2
          bg-white
          rounded-xl
          hover:bg-gray-50
          cursor-pointer
          m-2
          animate-fade-in-up
        "
      >
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
        <!-- <hr />
        <div class="p-2 m-1 rounded-lg">item</div>
        <hr />
        <div class="p-2 m-1 rounded-lg">item</div> -->
      </div>
      <div
        v-on:click="toggleMenu"
        class="
          flex
          items-center
          hover:bg-gray-300
          rounded-xl
          cursor-pointer
          break-all
        "
      >
        <img :src="img" class="rounded-full p-2" alt="" />
        <div class="font-bold p-2">
          {{ username }}
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import router from "@/router";
export default {
  beforeMount() {
    this.username = localStorage.getItem("username");
  },
  methods: {
    toggleMenu: function () {
      this.showmenu = !this.showmenu;
    },
    onResetClicked: function () {
      console.log("heh");
      router.push({ path: "/admin/changepassword" });
    },
    onLogoutClicked: function () {
      localStorage.clear("jwt");
      router.push({ path: "/auth" });
    },
  },
  data: function () {
    return {
      showmenu: false,
      username: "",
      img:
        "https://ui-avatars.com/api/?name=" +
        localStorage.getItem("username").trim() +
        "&background=random&size=50",
      navigation: [
        {
          name: "Dashboard",
          pathname: "AdminHome",
          href: "#/admin/home",
          img: "home",
        },
        {
          name: "Add User",
          pathname: "AdminAddUser",
          href: "#/admin/adduser",
          img: "user-plus",
        },
        {
          name: "Add Items",
          pathname: "AdminAddItems",
          href: "#/admin/additems",
          img: "dolly-flatbed",
        },
        {
          name: "Inventory",
          pathname: "AdminInventory",
          href: "#/admin/inventory",
          img: "boxes",
        },
        {
          name: "Report",
          pathname: "AdminReport",
          href: "#/admin/report",
          img: "chart-pie",
        },
      ],
    };
  },
};
</script>