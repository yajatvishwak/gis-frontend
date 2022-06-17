<template>
  <div v-if="pageLoading" class="h-screen grid place-items-center">
    Loading...
  </div>
  <div v-if="!pageLoading">
    <TopBar />
    <section class="flex justify-center">
      <div class="m-16 max-w-screen-lg w-full">
        <div class="font-bold flex items-center text-3xl">
          <i
            class="fa fa-arrow-left mx-5 ml-0 text-base"
            @click="navigateBack"
          ></i>
          Request Details
        </div>

        <div class="text-3xl font-bold flex justify-between mt-10">
          <div class="p-2 pl-0">
            <div class="font-bold text-sm text-gray-400">
              Request ID : {{ $route.params.requestID }}
            </div>
            {{ title }}
          </div>
          <div class="text-base">Ordered on : {{ orderedOn }}</div>
        </div>

        <div class="text-lg mt-10 whitespace-pre">{{ description }}</div>
        <div
          v-if="status === `pending`"
          class="
            text-3xl
            font-bold
            mt-10
            p-10
            text-center
            bg-yellow-400
            rounded-lg
          "
        >
          Action Pending
        </div>
        <div
          v-if="status === `accepted`"
          class="
            text-3xl
            font-bold
            mt-10
            p-10
            text-center
            bg-green-400
            rounded-lg
          "
        >
          Accepted
        </div>
        <div
          v-if="status === `rejected`"
          class="
            text-3xl
            font-bold
            mt-10
            p-10
            text-center
            bg-red-400
            rounded-lg
          "
        >
          Rejected
        </div>
        <div>
          <p class="my-5 mb-0 font-bold">Permission Letter</p>
          <div
            class="border p-4 flex items-center mt-4 rounded-lg"
            @click="downloadFile"
          >
            <i class="fa fa-file mx-4"></i>
            <div>{{ permissionLetter }}</div>
          </div>
        </div>
        <div
          v-if="assignedItems !== null"
          class="font-semibold text-1xl mt-4 text-gray-400 flex items-center"
        >
          <div>Assigned Mementos</div>
        </div>
        <div class="grid grid-cols-3">
          <CardAssigned
            v-for="(item, index) in assignedItems"
            :key="index"
            :productName="item.name"
            :quantity="item.quantity"
            :classOfProduct="item.class"
            :image="item.image"
          />
        </div>
        <button
          v-if="status === `pending`"
          @click="isEditing = !isEditing"
          class="p-4 m-2 ml-0 bg-red-500 text-white rounded-lg mt-5"
        >
          Edit Request
        </button>
        <button
          v-if="status === `pending`"
          @click="deleteRequest($route.params.requestID)"
          class="p-4 bg-red-500 text-white rounded-lg mt-5"
        >
          Delete request
        </button>
      </div>
    </section>
    <Modal v-model="isEditing">
      <div class="bg-white p-4 m-4 rounded-lg w-2/5">
        <form @submit.prevent="editRequest" action="" class="flex flex-col">
          <div class="flex items-center justify-between">
            <label for="" class="text-sm">Title</label>
            <i
              class="cursor-pointer fa fa-close"
              @click="isEditing = !isEditing"
            ></i>
          </div>
          <input
            v-model="newtitle"
            type="text"
            class="border p-2 rounded-md my-2"
            placeholder="Type updated Title here"
          />
          <label class="mt-4 text-sm" for="">Description</label>
          <textarea
            v-model="newdescription"
            type="text"
            class="border p-2 rounded-md my-2"
            placeholder="Type updated description here"
          />
          <button class="m-2 p-2 rounded-md bg-primary text-white">
            Submit
          </button>
        </form>
      </div>
    </Modal>
  </div>
</template>
<script>
import TopBar from "@/views/client/components/TopBar.vue";
import router from "@/router";
import CardAssigned from "@/views/client/components/CardAssigned.vue";

import axios from "axios";
export default {
  async beforeMount() {
    // backend integration - done
    try {
      const res = await axios.get(
        process.env.VUE_APP_BASE_URL +
          "/client/viewtransaction/" +
          `${this.$route.params.requestID}`,
        { headers: { token: localStorage.getItem("jwt") } }
      );
      console.log(res.data);
      this.title = res.data.transaction.title;
      this.orderedOn = new Date(res.data.transaction.updatedAt).toDateString();
      this.description = res.data.transaction.description;
      this.status = res.data.transaction.status.toLowerCase();
      this.permissionLetter = res.data.transaction.permission_letter;
      this.assignedItems = res.data.transaction.assigned_items;
      this.pageLoading = false;
      this.newtitle = this.title;
      this.newdescription = this.description;
    } catch (err) {
      console.log(err);
      alert("Server Offline");
    }

    //console.log(this.assignedItems);
  },
  methods: {
    editRequest: function () {
      console.log(this.newtitle, this.newdescription);
      // send to server
      try {
        axios
          .post(process.env.VUE_APP_BASE_URL + "/client/editreq", {
            newtitle: this.newtitle,
            newdesc: this.newdescription,
            requestID: this.$route.params.requestID,
            token: localStorage.getItem("jwt"),
          })
          .then((res) => {
            console.log(res.data);
            if (res.data.status === "Transaction Edited") {
              alert("Edited");
              window.location.reload();
            } else {
              alert("Something went wrong");
            }
          })
          .catch((err) => {
            console.log(err);
            alert("Something went wrong");
          });
      } catch (error) {
        console.log(error);
        alert("Something Went Wrong");
      }
    },
    navigateBack: function () {
      router.push({ path: "/client/home" });
    },
    downloadFile: function () {
      window.open(this.getPermClient(this.permissionLetter));
    },
    deleteRequest: async function (requestID) {
      // backend integration - done ig
      console.log(requestID);
      const res = await axios.post(
        process.env.VUE_APP_BASE_URL + "/client/deletereq",
        {
          requestID: parseInt(requestID),
          token: localStorage.getItem("jwt"),
        }
      );
      console.log(res.data);
      if (res.data.status === "Deleted Transaction") {
        alert("Deleted");
        router.push({ path: "/client/home" });
      }
    },
  },
  data() {
    return {
      pageLoading: true,
      title: "Bro this is title",
      orderedOn: "12/2/23",
      status: "pending",
      permissionLetter: "",
      isEditing: false,
      newtitle: "title",
      newdescription: "new",
      assignedItems: [
        // {
        //   name: "Item name",
        //   quantity: 12,
        //   class: "Class A",
        // },
        // {
        //   name: "Item name",
        //   quantity: 12,
        //   class: "Class A",
        // },
      ],
      description: "",
      // "exercitationem tempora. Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio voluptas debitis possimus quo provident. Obcaecati sed nihil exercitationem dolore laborum reiciendis perspiciatis cumque nulla, officia iure, expedita autem! Sit molestias quaerat, laborum accusamus nobis adipisci id voluptatem maxime neque, in vel corporis tempora molestiae sapiente necessitatibus praesentium unde facere reiciendis, consequuntur doloribus quis! Doloribus asperiores facere veritatis nulla autem consectetur mollitia aliquid et ab temporibus, sapiente obcaecati dolor blanditiis enim nemo inventore tempore harum explicabo? Sequi ad similique, laboriosam quas ducimus praesentium id blanditiis saepe? Cupiditate sequi iste ad esse perspiciatis soluta in voluptatibus! Ullam consequatur facilis quibusdam impedit? In!",
    };
  },
  components: {
    TopBar,
    CardAssigned,
  },
};
</script>