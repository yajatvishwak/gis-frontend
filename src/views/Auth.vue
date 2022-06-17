<template>
  <div
    class="
      flex flex-col
      h-screen
      w-screen
      text-white
      justify-center
      items-center
      bg-primary
    "
  >
    <div class="max-w-3xl w-full">
      <div
        class="container flex flex-col justify-center items-center p-2 my-10"
      >
        <img src="@/assets/logo.png" alt="" srcset="" />
        <div class="title text-2xl my-4 font-bold">Gift Inventory System</div>
      </div>
      <div class="container p-2 my-10 w-full">
        <div class="title font-bold text-4xl my-5">Login to your account</div>
        <div class="subtitle my-5">
          Welcome to Gift Inventory System aka. MIS. MIS is an inventorty
          management system that governs the stock of mementos in NHCE. Login to
          continue
        </div>
        <form
          action=""
          class="flex flex-col my-10 text-black"
          @submit.prevent="onSubmit"
        >
          <input
            type="text "
            v-model="username"
            class="p-5 rounded-md my-4"
            placeholder="Email"
          />
          <input
            v-model="password"
            type="password"
            class="p-5 rounded-md my-4"
            placeholder="Password"
          />
          <button
            class="
              button
              p-4
              font-bold
              rounded-md
              my-8
              text-white
              hover:bg-red-500
              bg-notprimary
            "
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router";
import jwtDecode from "jwt-decode";
export default {
  data() {
    return { password: "", username: "" };
  },
  methods: {
    onSubmit: async function () {
      const res = await axios.post(
        process.env.VUE_APP_BASE_URL + "/auth/login",
        {
          email: this.username.trim(),
          password: this.password.trim(),
        }
      );
      try {
        if ("token" in res.data) {
          localStorage.setItem("jwt", res.data.token);
          localStorage.setItem("userID", res.data.user_id);
          localStorage.setItem("username", this.username);
          const decoded = jwtDecode(res.data.token);
          if (decoded.role === "admin")
            return router.push({ path: "/admin/home" });
          else router.push({ path: "/client/home" });
        } else {
          alert("Wrong Credentials");
        }
      } catch (e) {
        console.log(e);
        alert("Please check credentials and connection before trying again");
      }
    },
  },
};
</script>