<template>
  <div v-if="pageLoading" class="grid place-items-center">Loading...</div>
  <div v-if="!pageLoading" class="grid grid-cols-5 h-screen w-screen">
    <SideBar />
    <section class="col-span-2 max-h-screen overflow-y-auto">
      <div class="m-16">
        <div class="flex items-center justify-between">
          <div class="font-bold text-3xl">New Requests</div>
          <div @click="getData">
            <i
              :class="
                searchTextRequest === ``
                  ? `
                
                fas
                fa-redo
                hover:text-red-500
                transition-all
                cursor-pointer
              `
                  : `
                
                hidden
              `
              "
            ></i>
          </div>
        </div>
        <div class="font-semibold text-1xl flex mb-11 text-gray-400">
          All new Requests
        </div>
        <div class="flex items-center">
          <input
            type="text"
            class="w-full rounded-xl border p-3"
            @keyup="searchRequest"
            v-model="searchTextRequest"
            placeholder="Search for Requests (use ctrl + f for searching via date or accepted)"
          />

          <!-- <select name="cars" class="p-3 mx-4 rounded-xl border" id="cars">
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
          </select> -->
        </div>
        <!-- <input type="text" class="border" @change="search" /> -->
        <div
          v-for="(request, index) in requests"
          :key="request.id"
          @click="toggleSelected(index)"
        >
          <CardDashboard :request="request" />
        </div>
      </div>
    </section>
    <section class="col-span-2" v-if="requests[selectedRequestIndex]">
      <div class="m-16 ml-10">
        <div class="font-bold text-3xl">Request Details</div>
        <div class="font-semibold text-1xl mb-11 text-gray-400">
          Detailed review of the request
        </div>
        <div class="text-2xl font-bold">
          {{ requests[selectedRequestIndex].title }}
        </div>
        <div class="text-lg mt-2">
          <span class="mx-3 ml-0">{{
            requests[selectedRequestIndex].username
          }}</span>
          <StatusTag
            :type="requests[selectedRequestIndex].status.toLowerCase()"
          />
        </div>
        <div class="mt-4">
          <p class="whitespace-pre">
            {{ requests[selectedRequestIndex].description }}
          </p>
        </div>
        <div class="font-semibold text-1xl mt-4 text-gray-400">
          Submitted Document
        </div>
        <div
          v-if="requests[selectedRequestIndex].permission_letter !== undefined"
          @click="downloadFile()"
          class="flex border items-center p-5 rounded-lg mt-3 break-all"
        >
          <i class="fa fa-file px-4"></i>
          {{ requests[selectedRequestIndex].permission_letter }}
        </div>
        <div
          class="font-semibold text-1xl mt-4 text-gray-400 flex items-center"
          v-if="
            requests[selectedRequestIndex].status.toLowerCase() ===
              'Pending'.toLowerCase() ||
            requests[selectedRequestIndex].status.toLowerCase() ===
              'Accepted'.toLowerCase()
          "
        >
          <div>Assigned Mementos</div>
          <i
            @click="showModal"
            v-if="
              requests[selectedRequestIndex].status.toLowerCase() ===
              'Pending'.toLowerCase()
            "
            class="fa fa-plus ml-auto"
          ></i>
        </div>
        <div
          v-if="
            requests[selectedRequestIndex].status.toLowerCase() ===
            'Pending'.toLowerCase()
          "
          class="flex overflow-x-auto"
        >
          <CardAssigned
            v-for="item in assignedItems"
            :nameOfProduct="item.name"
            :key="item.itemID"
            :image="item.image"
            :itemID="item.itemID"
            :quantity="item.quantity"
            :addQuantity="addQuantity"
            :classOfProduct="getClassOfProduct(item.itemID)"
            :availableQuantity="getAvailable(item.itemID)"
          />
        </div>
        <div
          v-if="
            requests[selectedRequestIndex].status.toLowerCase() ===
            'Accepted'.toLowerCase()
          "
          class="flex overflow-x-auto"
        >
          <CardAssignedAccepted
            v-for="item in requests[selectedRequestIndex].assigned_items"
            :productName="item.name"
            :key="item.itemID"
            :itemID="item.id"
            :requestID="requests[selectedRequestIndex].id"
            :image="item.image"
            :quantity="item.quantity"
            :classOfProduct="item.class"
          />
        </div>

        <div
          class="flex mt-10"
          v-if="
            requests[selectedRequestIndex].status.toLowerCase() ===
            `Pending`.toLowerCase()
          "
        >
          <div
            @click="confirmRequest"
            class="p-4 m-2 ml-0 bg-green-400 rounded-lg cursor-pointer"
          >
            <i class="fa fa-check mx-2"></i>
            Confirm and Accept Request
          </div>
          <div
            @click="rejectRequest"
            class="p-4 m-2 ml-0 bg-red-500 rounded-lg cursor-pointer"
          >
            <i class="fa fa-close mx-2"></i>
            Reject Request
          </div>
        </div>
      </div>
      <Modal v-model="isShow" :close="closeModal">
        <div class="bg-white text-black w-screen p-10">
          <h1 class="text-3xl font-bold">Add your items</h1>
          <input
            type="text"
            class="border w-full p-3 rounded-md"
            placeholder="Search for items in inventory"
            v-model="searchElement"
            @keyup="searchItem"
          />

          <div class="grid grid-cols-2">
            <div class="m-2 border rounded p-2">
              <h3 v-if="!drag" class="font-bold text-xl">
                Items available in Inventory
              </h3>
              <div class="mt-3" v-if="drag">Drop Item here to add</div>
              <draggable
                class="drag"
                item-key="item"
                @start="drag = true"
                @end="drag = false"
                :emptyInsertThreshold="500"
                :group="{ name: 'items', pull: 'clone', put: false }"
                v-model="tinventory"
              >
                <template #item="{ element }">
                  <div class="border border-gray-700 rounded m-1">
                    <div class="p-3 m-2">
                      {{ element.name }} - {{ element.class }} -
                      {{ element.quantity }} available
                    </div>
                  </div>
                </template>
              </draggable>
            </div>
            <div class="m-2 border rounded p-2">
              <h3 v-if="!drag" class="font-bold text-xl">
                Items given to request
              </h3>
              <div class="mt-3 bg-red-400 m-auto" v-if="drag">
                Drop Item here to add
              </div>
              <draggable
                @start="drag = true"
                @end="drag = false"
                :emptyInsertThreshold="1000"
                item-key="item"
                group="items"
                v-model="assignedItems"
              >
                <template #item="{ element }">
                  <div class="border border-gray-700 rounded m-1">
                    <div class="p-3 m-2 flex items-center justify-between">
                      {{ element.name }}
                      <i
                        @click="removeItem(element.itemID)"
                        class="fa fa-close"
                      ></i>
                    </div>
                  </div>
                </template>
              </draggable>
            </div>
          </div>
        </div>
      </Modal>
    </section>
  </div>
</template>
<style scoped>
.drag {
  height: 100%;
}
</style>
<script>
import SideBar from "@/components/SideBar.vue";
import CardDashboard from "@/components/CardDashboard.vue";
import StatusTag from "@/components/StatusTag.vue";
import CardAssigned from "@/components/CardAssigned";
import CardAssignedAccepted from "@/components/CardAssignedAccepted";
import draggable from "vuedraggable";
import axios from "axios";
export default {
  beforeMount: async function () {
    //backend integration
    // get inventory
    // get all request
    //console.log(res.data.inventory);
    //console.log(this.requests);
    //console.log("this is internal", this.inventory);
    await this.getData();
    this.pageLoading = false;
  },
  methods: {
    getData: async function () {
      try {
        this.selectedRequestIndex = 0;
        const res = await axios.get(
          process.env.VUE_APP_BASE_URL + "/admin/viewinventory",
          {
            headers: { token: localStorage.getItem("jwt") },
          }
        );
        const res2 = await axios.get(
          process.env.VUE_APP_BASE_URL + "/admin/alltransactions",
          {
            headers: { token: localStorage.getItem("jwt") },
          }
        );
        //console.log(res.data, res2.data);

        this.inventory = res.data.inventory.map((item) => {
          return { ...item, itemID: item.id, imgURL: item.image };
        });
        this.requests = res2.data.transactions.map((item, index) => {
          if (index === 0)
            return {
              ...item,
              username: item.user.dept,
              selected: true,
              status: item.status.toLowerCase(),
            };
          return {
            ...item,
            username: item.user.dept,
            selected: false,
            assignedItems: item.assigned_items,
          };
        });
        console.log(res2.data, res.data);
        this.storeInventory = this.inventory.map((item) => {
          return item;
        });
        this.storeRequests = this.requests.map((item) => {
          return item;
        });
      } catch (e) {
        console.log(e);
        alert("Server offline. Please try again in a while");
      }
    },
    rejectRequest: async function () {
      // backend integration
      try {
        const res = await axios.post(
          process.env.VUE_APP_BASE_URL + "/admin/edit-transaction-status",
          {
            requestID: this.requests[this.selectedRequestIndex].id,
            action: "Rejected",
            items: [],
          }
        );
        //console.log(res.data);
        if (res.data.status === "Successfully Rejected Transaction") {
          this.getData();
          return alert("Rejected request");
        } else {
          alert("We ran into some problem");
        }
      } catch (err) {
        console.log(err);
        alert("We ran into some problem");
      }
    },
    confirmRequest: async function () {
      // backend integration
      if (this.assignedItems.length > 0) {
        const req = this.assignedItems.map((item) => {
          return {
            id: item.id,
            quantity: item.quantity,
            name: item.name,
            class: item.class,
            image: item.image,
          };
        });
        //console.log(req);

        const res = await axios.post(
          process.env.VUE_APP_BASE_URL + "/admin/edit-transaction-status",
          {
            requestID: this.requests[this.selectedRequestIndex].id,
            action: "Accepted",
            items: req,
          }
        );
        if (res.data.status === "Successfully Accepted Transaction") {
          this.getData();
          return alert("Accepted request");
        } else {
          alert("We ran into some problem");
        }
      } else {
        alert("Items not assigned");
      }
    },
    getClassOfProduct: function (itemID) {
      for (let index = 0; index < this.inventory.length; index++) {
        const element = this.inventory[index];
        if (element.itemID === itemID) return element.class;
      }
      alert("Something went wrong call dineshsir");
      return "ClassA";
    },
    getAvailable: function (itemID) {
      for (let index = 0; index < this.inventory.length; index++) {
        const element = this.inventory[index];
        if (element.itemID === itemID) return element.quantity;
      }
      alert("Something went wrong call dineshsir");
      return 0;
    },
    addQuantity: function (itemID, quantity) {
      console.log(quantity, itemID);
      this.assignedItems = this.assignedItems.map((item) => {
        if (item.itemID === itemID) return { ...item, quantity: quantity };
        return item;
      });
      console.log(this.assignedItems);
    },

    searchRequest: function () {
      //future
      if (this.searchTextRequest === "") {
        //console.log("phew");
        this.requests = this.storeRequests.map((item) => item);
      } else {
        //console.log(this.storeRequests);
        //console.log(this.searchTextRequest);
        let searchedReq = this.storeRequests.filter((element) =>
          element.title
            .toLowerCase()
            .includes(this.searchTextRequest.toLowerCase())
        );
        this.requests = searchedReq;
        //console.log("this is searchedreq", searchedReq);
      }
      //this.pageLoading = false;
    },
    searchItem: function () {
      //console.log("search called", this.searchEle ment);

      if (this.searchElement === "" || this.searchElement === null)
        return (this.tinventory = this.inventory);
      let object = this.inventory.filter((element) =>
        element.name.toLowerCase().includes(this.searchElement.toLowerCase())
      );
      // search on name  only
      // add rest here when god gives me the power to
      this.tinventory = object;
    },
    removeItem: function (id) {
      console.log(id);
      let removeIndex = this.assignedItems
        .map((item) => item.itemID)
        .indexOf(id);
      ~removeIndex && this.assignedItems.splice(removeIndex, 1);
    },
    showModal: function () {
      this.isShow = true;
      this.tinventory = this.inventory;
    },
    closeModal: function () {
      this.isShow = false;
    },
    sort: function (value) {
      console.log(value.target.value);
    },
    downloadFile: function () {
      console.log(this.requests[this.selectedRequestIndex].permission_letter);
      if (
        this.requests[this.selectedRequestIndex].permission_letter === null ||
        this.requests[this.selectedRequestIndex].permission_letter === undefined
      )
        return;
      window.open(
        this.getPerm(
          this.requests[this.selectedRequestIndex].permission_letter,
          "_blank"
        )
      );
    },
    toggleSelected: function (index) {
      //console.log(this.requests[index]);
      this.assignedItems = [];
      this.requests[index].selected = true;
      this.requests.map((item) => {
        if (item.id === this.requests[index].id) return;
        item.selected = false;
      });
      this.selectedRequestIndex = index;
      //console.log(this.selectedRequestIndex);
    },
  },
  watch: {
    isShow: function () {
      //console.log(this.assignedItems);
      this.assignedItems = this.assignedItems.map((item) => {
        return { ...item, quantity: 1 };
      });
    },
  },
  data() {
    return {
      pageLoading: true,
      searchElement: "",
      drag: false,
      assignedItems: [],
      tinventory: [],
      storeInventory: [],
      storeRequests: [],
      searchTextRequest: "",
      inventory: [
        // {
        //   name: "",
        //   class: "Class A",
        //   quantity: 2,
        //   itemID: Math.random(),
        //   imgURL: "https://via.placeholder.com/60",
        // },
      ],
      selectedRequestIndex: 0,
      isShow: false,
      requests: [
        // {
        //   id: Math.random(),
        //   username: "CSE",
        //   noOfProductsRequested: 2,
        //   status: "",
        //   fileDownload: "",
        //   selected: false,
        //   title: "",
        //   description: "",
        // },
      ],
    };
  },
  components: {
    draggable,
    SideBar,
    CardDashboard,
    StatusTag,
    CardAssigned,
    CardAssignedAccepted,
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
