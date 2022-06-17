<template>
  <div v-if="pageLoading" class="grid place-items-center h-screen">
    Loading...
  </div>
  <div v-if="!pageLoading" class="grid grid-cols-5 h-screen">
    <SideBar />
    <section class="col-span-4">
      <div class="m-16">
        <div class="font-bold flex items-center">
          <i
            class="fa fa-arrow-left mx-5 ml-0 text-base"
            @click="navigateBack"
          ></i>
          Item Details
        </div>
        <div class="flex">
          <div>
            <div class="text-3xl my-10 mb-0 font-bold flex items-center">
              {{ title }}
            </div>
            <div class="my-2 text-gray-400 text-lg font-bold flex items-center">
              # {{ prodCustomID || "No ID provided" }}
            </div>
            <div class="my-2 text-gray-400 text-lg font-bold flex items-center">
              {{ classOfProduct }}
            </div>
            <!-- <div class="my-5 mb-0 text-gray-400 text-lg font-bold">Description</div>
          <div class="my-2 mt-0 text-lg flex items-center">
            {{ description }}
          </div> -->
            <div class="my-5 mb-0 text-gray-400 text-lg font-bold">
              Quantity
            </div>
            <div class="my-2 mt-0 text-lg flex items-center">
              {{ quantity }}
            </div>
          </div>
          <div class="ml-auto">
            <div class="my-5 mb-0 text-gray-400 text-lg font-bold">Image</div>
            <div class="my-2 mt-0 text-lg flex items-center">
              <img :src="getImage(imageURL)" class="rounded-lg w-52" alt="" />
            </div>
          </div>
        </div>
        <div class="my-5 mb-0 text-gray-400 text-lg font-bold">
          Corresponding Bill
        </div>
        <div
          v-for="(bill, index) in bills"
          :key="index"
          class="my-2 mt-0 text-lg"
          @click="navigateToBill(bill[`bill${index + 1}`])"
        >
          <div
            class="
              p-4
              border
              w-full
              rounded-lg
              hover:bg-red-200
              transition
              duration-200
              flex
              items-center
            "
          >
            <i class="fa fa-file mx-4"></i>
            {{ bill[`bill${index + 1}`] }}
          </div>
        </div>
        <!-- <div class="my-5 mb-0 text-gray-400 text-lg font-bold">
          Transaction History
        </div>
        <div
          class="
            my-2
            mt-0
            text-lg
            flex
            items-center
            flex-col
            overflow-auto overflow-x-hidden
            max-h-52
          "
        >
          <div
            class="
              m-1
              p-4
              border
              w-full
              rounded-lg
              hover:bg-red-200
              transition
              duration-200
              items-center
            "
            v-for="transaction in transactionHistory"
            :key="transaction.requestID"
          >
            {{ transaction.from }}
          </div>
        </div> -->
      </div>
    </section>
  </div>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import router from "@/router";
import axios from "axios";
export default {
  async beforeMount() {
    try {
      const res = await axios.get(
        process.env.VUE_APP_BASE_URL + `/admin/viewitem/${this.itemID}`,
        {
          headers: { token: localStorage.getItem("jwt") },
        }
      );
      console.log(res.data);
      this.title = res.data.item.name;
      this.prodCustomID = res.data.item.prodCustomID;
      this.quantity = res.data.item.quantity;
      this.classOfProduct = res.data.item.class;
      this.imageURL = res.data.item.image;
      this.billURL = res.data.item.bill;
      this.bills = this.billURL;
      this.pageLoading = false;
      console.log(this.bills);
    } catch (err) {
      alert("Server offline. Please try again later");
    }
  },
  methods: {
    navigateToBill: function (url) {
      window.open(this.getBill(url), "_blank");
    },
    navigateBack: function () {
      router.push({ path: "/admin/inventory" });
    },
  },
  data() {
    return {
      itemID: this.$route.params.itemID,
      title: "This is the name of the product",
      quantity: "This is the quantity of the product",
      bills: null,
      description:
        " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero voluptates animi quidem. Nihil dolor magni suscipit saepe fugit eligendi eum. Reiciendis quisquam expedita quasi rem nulla repellendus cupiditate eos nihil.",
      classOfProduct: "Class A",
      imageURL: "https://via.placeholder.com/120",
      billURL: "http://www.africau.edu/images/default/sample.pdf",
      pageLoading: true,
      prodCustomID: "",
      // transactionHistory: [
      //   {
      //     requestID: Math.random(),
      //     from: "CSE@gmail.com",
      //     quantity: 40,
      //   },
      //   {
      //     requestID: Math.random(),
      //     from: "CSE@gmail.com",
      //     quantity: 40,
      //   },
      //   {
      //     requestID: Math.random(),
      //     from: "CSE@gmail.com",
      //     quantity: 40,
      //   },
      //   {
      //     requestID: Math.random(),
      //     from: "CSE@gmail.com",
      //     quantity: 40,
      //   },
      //   {
      //     requestID: Math.random(),
      //     from: "CSE@gmail.com",
      //     quantity: 40,
      //   },
      //   {
      //     requestID: Math.random(),
      //     from: "CSE@gmail.com",
      //     quantity: 40,
      //   },
      //   {
      //     requestID: Math.random(),
      //     from: "CSE@gmail.com",
      //     quantity: 40,
      //   },
      //   {
      //     requestID: Math.random(),
      //     from: "CSE@gmail.com",
      //     quantity: 40,
      //   },
      // ],
    };
  },
  components: {
    SideBar,
  },
};
</script>

