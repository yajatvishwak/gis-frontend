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
          Make a Request
        </div>
        <div class="font-bold text-gray-400">
          Fill out the form below carefully
        </div>
        <form @submit.prevent="submitToServer" class="flex flex-col mt-10">
          <label for="">Title</label>
          <input
            v-model="title"
            type="text"
            required
            class="border rounded-lg p-4 w-full my-3"
            placeholder="One line reason why this request is being made"
          />
          <label for="">Description</label>
          <label class="text-sm text-gray-500" for=""
            >Briefly explain the event for which this item is been requested
            <b>
              <ol class="list-decimal">
                <li>Time</li>
                <li>Date</li>
                <li>Venue</li>
                <li>What is the Event (Brief)</li>
                <li>
                  Who (person name and USN or ID) is raising this request?
                </li>
                <li>
                  Name of the Club/Department responsible (If club, write both,
                  Clubname and Department)
                </li>
              </ol>
            </b>
            Mention the class of product required with corressponding
            quantity(eg. Class A - 3 units only, Class B - 2 units only). <br />
            <span class="font-bold text-red-500"
              >If the format is not followed, this request may get
              rejected</span
            >
          </label>
          <textarea
            v-model="description"
            name=""
            required
            id=""
            placeholder="Fill out the above mention questions here"
            class="border rounded-lg p-4 w-full my-3"
            cols="30"
            rows="5"
          ></textarea>
          <label for=""
            >Upload Permission Letter (if multiple, please merge into one
            pdf)</label
          >
          <input
            @change="handlePermission($event)"
            required
            type="file"
            accept=".pdf,.jpg,.png,.jpeg"
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
      description: "",
      title: "",
      permissionfile: null,
    };
  },
  methods: {
    submitToServer: function () {
      //backend integration - done
      //console.log(this.title, this.description, this.permissionfile);
      try {
        let formData = new FormData();
        formData.append(
          "reqs",
          JSON.stringify([
            {
              description: this.description,
              title: this.title,
            },
          ])
        );
        formData.append(
          "permission_letter",
          this.permissionfile,
          this.permissionfile.name
        );
        axios
          .post(
            process.env.VUE_APP_BASE_URL + "/client/raiserequest",
            formData,
            {
              headers: {
                token: localStorage.getItem("jwt"),
              },
            }
          )
          .then((res) => {
            console.log(res.data.status);
            if (res.data.status === "success") {
              alert("Created. Please wait till admin reviews your request");
              router.push({ path: "/client/home" });
            }
          })
          .catch((err) => {
            console.log(err);
            alert("Something Went Wrong");
          });
      } catch (error) {
        console.log(error);
        alert("Something Went Wrong");
      }
    },
    handlePermission: function (event) {
      this.permissionfile = event.target.files[0];
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