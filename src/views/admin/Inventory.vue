<template>
  <div v-if="pageLoading" class="h-screen grid place-items-center">
    Loading...
  </div>
  <div v-if="!pageLoading" class="grid grid-cols-5 h-screen">
    <SideBar />
    <section class="col-span-4">
      <div class="m-16">
        <div class="text-3xl font-bold">All Items</div>
        <div class="grid grid-cols-5">
          <CardInventory
            v-for="item in tinventory"
            :nameOfProduct="item.nameOfProduct"
            :classOfProduct="item.classOfProduct"
            :image="item.image"
            :quantity="item.quantity"
            :increment="increment"
            :decrement="decrement"
            :itemID="item.itemID"
            :cancelQuantityChange="cancelQuantityChange"
            :confirmChanges="confirmChanges"
            :deleteItem="deleteItem"
            :key="item.itemID"
            :prodCustomID="item.prodCustomID"
            :updateProdID="updateProdID"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import CardInventory from "@/components/CardInventory.vue";
import axios from "axios";

export default {
  async beforeMount() {
    // backend integration
    //  get inventory value from db here
    const res = await axios.get(
      process.env.VUE_APP_BASE_URL + "/admin/viewinventory",
      {
        headers: { token: localStorage.getItem("jwt") },
      }
    );
    //console.log(res.data.inventory);
    const format = res.data.inventory.map((item) => {
      return {
        itemID: item.id,
        nameOfProduct: item.name,
        quantity: item.quantity,
        classOfProduct: item.class,
        image: item.image,
        prodCustomID: item.prodCustomID,
      };
    });
    console.log(format);
    this.inventory = format;

    this.tinventory = [...this.inventory];
    this.pageLoading = false;
  },
  data() {
    return {
      pageLoading: true,
      tinventory: [],
      inventory: [
        {
          itemID: Math.random(),
          nameOfProduct: "Broski",
          classOfProduct: "Class B",
          quantity: 12,
          prodCustomID: "NHCEprod10",
        },
      ],
    };
  },
  methods: {
    updateProdID: function (itemID, prodCustomID) {
      this.tinventory = this.tinventory.map((item) => {
        if (item.itemID === itemID) {
          return { ...item, prodCustomID: prodCustomID };
        } else {
          return item;
        }
      });
    },
    confirmChanges: function (
      itemID,
      quantity,
      bill = null,
      prodCustomID,
      changes
    ) {
      // console.log(itemID, quantity, bill);
      // backend integration
      if (changes.quantity || bill !== null) {
        if (bill === null) {
          return alert("Please upload a bill for updating quantity change");
        }
        const formData = new FormData();
        formData.append(
          "change",
          JSON.stringify([{ itemID: itemID, newquantity: quantity }])
        );
        formData.append("newbill", bill, bill.name);
        try {
          axios
            .post(process.env.VUE_APP_BASE_URL + "/admin/edititem", formData, {
              headers: { token: localStorage.getItem("jwt") },
            })
            .then((res) => {
              console.log(res.data);
            });
        } catch (err) {
          console.log(err);
          alert("Server Offline");
        }
      }
      if (changes.prodCustomID) {
        try {
          axios
            .post(process.env.VUE_APP_BASE_URL + "/admin/edit-prodCustomID", {
              token: localStorage.getItem("jwt"),
              itemID: itemID,
              prodCustomID: prodCustomID,
            })
            .then((res = {}) => {
              console.log(res.data);
              if ("status" in res.data) {
                alert("Updated");
              }
            });
        } catch (err) {
          console.log(err);
          alert("Unable to process, Please reach the engineers.");
        }
      }
    },

    deleteItem: async function (itemID) {
      console.log(itemID);
      if (confirm("Are you sure you want to delete this item?")) {
        // backend integration
        try {
          const res = await axios.post(
            process.env.VUE_APP_BASE_URL + "/admin/deleteitem",
            {
              token: localStorage.getItem("jwt"),
              requestID: itemID,
            }
          );
          if (res.data.status === "Deleted Item") {
            alert("Item Deleted");
            return window.location.reload();
          } else alert("Could not delete item");
        } catch (error) {
          console.log(error);
          alert("Could not delete item");
        }
      } else {
        alert("Cancelled");
      }
    },
    increment: function (itemID) {
      //add max value
      this.tinventory = this.tinventory.map((item) => {
        if (item.itemID === itemID)
          return { ...item, quantity: item.quantity + 1 };
        return item;
      });
      //console.log(this.inventory[0], this.tinventory[0]);
    },
    cancelQuantityChange: function (itemID) {
      let index = this.inventory.map((item) => item.itemID).indexOf(itemID);
      this.tinventory[index].quantity = this.inventory[index].quantity;
      //console.log(this.tinventory[index]);
    },
    decrement: function (itemID) {
      let index = this.tinventory.map((item) => item.itemID).indexOf(itemID);
      if (this.tinventory[index].quantity <= 1) return;
      this.tinventory[index].quantity--;
    },
  },
  components: {
    SideBar,
    CardInventory,
  },
};
</script>
<style scoped>
::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
}
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>