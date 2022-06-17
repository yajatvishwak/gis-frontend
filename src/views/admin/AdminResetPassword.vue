<template>
  <div class="grid grid-cols-5 h-screen w-screen">
    <SideBar />
    <section class="col-span-4">
      <div class="m-16">
        <div class="font-bold text-3xl mb-11">Change Admin Password</div>
        <form action="" class="flex flex-col">
          <p v-if="errors.newpasswordDontMatch" class="text-red-500">
            📣❗ New password does not match
          </p>
          <p v-if="errors.passwordIncorrect" class="text-red-500">
            📣❗ Old Password incorrect
          </p>
          <label for="old_pass">Current password</label>
          <input
            v-model="old_pass"
            type="password"
            id="old_pass"
            class="p-3 m-2 outline border rounded-md"
          />
          <label for="old_pass">New password</label>
          <input
            v-model="new_pass"
            @blur="checkDisabled"
            type="text"
            id="new_pass"
            class="p-3 m-2 outline border rounded-md"
          />
          <label for="old_pass">Confirm new password</label>
          <input
            v-model="con_pass"
            @blur="checkDisabled"
            type="text"
            id="con_pass"
            class="p-3 m-2 outline border rounded-md"
          />
          <button
            type="submit"
            v-on:click="onSubmit"
            :disabled="errors.newpasswordDontMatch"
            class="
              p-4
              mt-10
              rounded
              bg-primary
              text-white
              font-bold
              disabled:opacity-30
            "
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  </div>
</template>



<script>
import SideBar from "@/components/SideBar.vue";
import axios from "axios";
import router from "@/router";
export default {
  data() {
    return {
      old_pass: "",
      new_pass: "",
      con_pass: "",
      baseurl: process.env.VUE_APP_BASE_URL,
      errors: {
        newpasswordDontMatch: false,
        passwordIncorrect: false,
      },
    };
  },
  methods: {
    onSubmit: async function () {
      const token = localStorage.getItem("jwt");
      const res = await axios.patch(this.baseurl + "/utils/resetpwd/", {
        old_password: this.old_pass,
        new_password: this.new_pass,
        token: token,
      });
      //console.log(res.data);
      try {
        if ("status" in res.data) {
          if (res.data.status === "Success") {
            alert("Changed Password successfully");
            return router.push({ path: "/admin/home" });
          }
          if (res.data.status === "error")
            return (this.errors.passwordIncorrect = true);
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
    checkDisabled: function () {
      this.errors.newpasswordDontMatch = !(this.new_pass === this.con_pass);
      //return this.errors.newpasswordDontMatch;
    },
  },
  components: {
    SideBar,
  },
};
</script>