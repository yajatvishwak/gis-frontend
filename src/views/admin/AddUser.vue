<template>
  <div v-if="pageLoading" class="grid place-items-center">Loading...</div>
  <div v-if="!pageLoading" class="grid grid-cols-5 h-screen w-screen">
    <SideBar />
    <section class="col-span-4 p-16 pt-2">
      <div class="my-14 mb-2">
        <div class="font-bold text-3xl">Add user</div>
        <div class="text-gray-400">
          Add clients who will be allowed to use this Inventory system
        </div>
      </div>
      <div class="overflow-auto max-h-60">
        <table class="w-full my-4">
          <thead>
            <th class="border p-2">Username</th>
            <th class="border p-2">Email</th>
            <th class="border p-2">Password</th>
          </thead>
          <tbody>
            <tr v-for="(item, index) in userList" :key="index">
              <td class="border p-2">{{ item.username }}</td>
              <td class="border p-2">{{ item.email }}</td>

              <td
                class="border p-2 cursor-pointer"
                @click="resetPassword(item.userID, item.username)"
              >
                reset password
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="text-xl mt-10 font-bold">Add Clients</div>
      <form action="" class="flex flex-col" @submit.prevent="submitForm">
        <label for="name">Username</label>
        <p v-if="errors.username" class="text-red-500">
          📣❗ Username needs to be longer than 6 characters and can not be
          empty
        </p>
        <input
          type="text"
          class="p-3 border rounded-lg my-3"
          id="name"
          v-model="username"
          @blur="validateusername"
          placeholder="Name of the department that will be using this account"
        />
        <label for="email">Email</label>
        <p v-if="errors.email" class="text-red-500">
          📣❗Please enter a valid email
        </p>
        <input
          type="text"
          class="p-3 border rounded-lg my-3"
          id="email"
          v-model="email"
          placeholder="example@example.com"
          @blur="validateemail"
        />

        <label for="password">Password</label>
        <p v-if="errors.password" class="text-red-500">
          📣❗ Password needs to be longer
        </p>

        <input
          v-if="!checked"
          type="password"
          v-model="password"
          class="p-3 border rounded-lg my-3"
          @blur="validatepassword"
          id="password"
          placeholder="Password goes here"
        />
        <input
          v-else
          disabled
          type="text"
          @blur="validatepassword"
          v-model="password"
          class="p-3 border rounded-lg my-3"
          id="password"
          placeholder="Password goes here"
        />
        <div class="flex items-center">
          View Password
          <input
            class="mx-2"
            type="checkbox"
            v-model="checked"
            name="autopass"
            value="true"
          />
          <div class="p-2">Auto Generate</div>
          <i v-on:click="fillPassword" class="fa fa-sync-alt"></i>
        </div>
        <button
          type="submit"
          class="p-3 bg-primary my-10 rounded-xl text-white font-bold m"
        >
          Add Client
        </button>
      </form>
    </section>
  </div>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import axios from "axios";

export default {
  async beforeMount() {
    this.getdata();
    this.pageLoading = false;
  },
  methods: {
    resetPassword: async function (userID, user) {
      if (confirm("Do you want to reset password for " + user)) {
        // send new pass to db
        console.log(userID);
        alert("New Password is: 123456789");
        const res = await axios.post(
          process.env.VUE_APP_BASE_URL + "/admin/resetclientpassword",
          { token: localStorage.getItem("jwt"), userID: userID }
        );
        if (res.data.status === "Success") alert("Changed Successfully");
        else alert("Something went wrong call dinesh sir");
      } else {
        alert("Cancelled");
      }
    },
    makeid: function (length) {
      let result = "";
      let characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*()_+|><:";
      let charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    },
    getdata: async function () {
      const res = await axios.get(
        process.env.VUE_APP_BASE_URL + "/admin/allusers",
        {
          headers: { token: localStorage.getItem("jwt") },
        }
      );
      const format = res.data.map((user) => {
        return {
          userID: user.user_id,
          username: user.dept,
          email: user.email_id,
        };
      });
      this.userList = format;
    },
    randomnumberbetween: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    validateemail: function () {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      this.errors.email = !re.test(String(this.email).toLowerCase());
    },
    validatepassword: function () {
      if (this.password == "" || this.password.length < 6)
        this.errors.password = true;
      else this.errors.password = false;
    },
    validateusername: function () {
     this.errors.username = false;
    },
    fillPassword: function () {
      this.checked = true;
      this.password = this.makeid(this.randomnumberbetween(6, 15));
    },
    submitForm: async function () {
      const token = localStorage.getItem("jwt");
      if (
        this.errors.email === true ||
        this.errors.password === true ||
        this.errors.username === true
      ) {
        return alert("please fill all the items in the form");
      }
      try {
        const res = await axios.post(this.baseurl + "/admin/adduser", {
          email: this.email,
          dept: this.username,
          password: this.password,
          token: token,
        });
        this.password = "";
        this.email = "";
        this.username = "";
        if (res.data.status === "created") {
          this.getdata();
          return alert("created successfully");
        } else alert("Something went wrong");
      } catch (e) {
        console.log(e);
        alert("Something went wrong");
      }
    },
  },
  data() {
    return {
      checked: false,
      password: "",
      username: "",
      pageLoading: true,
      email: "",
      errors: { email: false, username: false, password: false },
      baseurl: process.env.VUE_APP_BASE_URL,
      userList: [
        {
          userID: Math.random(),
          username: "null",
          email: "null@gmail.com",
        },
      ],
    };
  },
  components: {
    SideBar,
  },
};
</script>

