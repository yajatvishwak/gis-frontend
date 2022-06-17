<template>
  <div>
    <TopBar />
    <section class="flex justify-center">
      <div class="m-16 max-w-screen-lg w-full">
        <div class="font-bold flex items-center text-3xl">
          <i
            class="fa fa-arrow-left mx-5 ml-0 text-base"
            @click="navigateBack"
          ></i>
          Change Password
        </div>
        <div class="font-bold text-gray-400">Change your account Password</div>

        <form class="flex flex-col mt-10" @submit.prevent="submitToServer">
          <div v-if="errors.diff === true" class="text-red-500">
            Password Doesnt match
          </div>
          <div v-if="errors.oldPass === true" class="text-red-500">
            Current Password incorrect
          </div>
          <label for="">Current Password</label>

          <input
            v-model="oldPass"
            type="password"
            class="border rounded-lg p-4 w-full my-3"
          />
          <label for="">New Password</label>
          <input
            v-model="newPass"
            type="text"
            class="border rounded-lg p-4 w-full my-3"
          />
          <label for="">New Password Again</label>
          <input
            @blur="checkpass"
            v-model="renewPass"
            type="password"
            class="border rounded-lg p-4 w-full my-3"
          />
          <button
            type="submit"
            class="p-4 mt-10 rounded-xl bg-primary text-white"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import TopBar from "@/views/client/components/TopBar.vue";
import router from "@/router";
import axios from "axios";

export default {
  data() {
    return {
      errors: {
        diff: false,
        oldPass: false,
      },
      oldPass: "",
      newPass: "",
      renewPass: "",
    };
  },
  methods: {
    submitToServer: async function () {
      // backend integration - done
      if (
        this.newPass === "" ||
        this.old_password === "" ||
        this.renewPass === "" ||
        this.errors.diff === true ||
        this.errors.oldPass === true
      ) {
        return alert("Please make sure there are no errors in the form");
      }
      const token = localStorage.getItem("jwt");
      const res = await axios.patch(
        process.env.VUE_APP_BASE_URL + "/utils/resetpwd/",
        {
          old_password: this.oldPass,
          new_password: this.newPass,
          token: token,
        }
      );
      //console.log(res.data);
      try {
        if ("status" in res.data) {
          if (res.data.status === "Success") {
            alert("Changed Password successfully");
            return router.push({ path: "/client/home" });
          }
          if (res.data.status === "error") return (this.errors.oldPass = true);
          throw new Error("Whoops!", res.data);
        } else {
          alert("Something went wrong. Please try again. ");
        }
      } catch (e) {
        // no internet
        console.log(e);
        alert(
          "Something went wrong. Please check internet connection and try again. "
        );
      }
    },
    checkpass: function () {
      console.log(this.errors);
      this.errors.diff = this.newPass !== this.renewPass ? true : false;
      return this.errors.diff;
    },
    navigateBack: function () {
      router.push({ path: "/client/home" });
    },
  },
  components: {
    TopBar,
  },
};
</script>