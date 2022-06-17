
<template>
  <div class="grid grid-cols-5 h-screen w-screen">
    <SideBar />
    <section class="col-span-2">
      <div class="m-16">
        <div class="font-bold text-3xl mb-11">Add Items</div>
        <form action="" @submit.prevent="sendtoServer">
          <form @submit.prevent="addItem" class="flex flex-col">
            <label for="product_id">Product ID</label>
            <input
              v-model="prodCustomID"
              type="text"
              class="border p-3 m-3 rounded-md"
              id="product_id"
            />
            <label for="product_name">Product Name</label>
            <input
              v-model="prodName"
              type="text"
              class="border p-3 m-3 rounded-md"
              id="product_name"
            />
            <label for="product_name">Quantity</label>
            <input
              v-model.number="prodQuantity"
              min="1"
              type="number"
              class="border p-3 m-3 rounded-md"
              id="quantity"
            />
            <label for="class">Class of product</label>
            <select
              v-model="prodClass"
              class="p-3 m-3 rounded-lg bg-gray-200"
              id="class"
            >
              <option value="Class A">Class A</option>
              <option value="Class B">Class B</option>
              <option value="Class C">Class C</option>
              <option value="Class D">Class D</option>
            </select>

            <label
              v-if="pic === null"
              class="
                p-4
                border
                rounded-xl
                hover:bg-red-200
                transition
                duration-200
                cursor-pointer
              "
            >
              <i class="fa fa-upload mx-4"></i>
              <span class="mt-2 text-base leading-normal">
                Upload Picture of this item</span
              >
              <input
                type="file"
                accept=".jpg,.png,.jpeg"
                class="hidden"
                @change="handlePic($event)"
              />
            </label>
            <label
              v-if="pic !== null"
              class="
                p-4
                border
                rounded-xl
                hover:bg-red-200
                transition
                duration-200
                cursor-pointer
                flex
                items-center
              "
            >
              <i class="fa fa-file mx-4"></i>
              <span class="truncate"> {{ pic.name }}</span>
              <input
                type="file"
                accept=".jpg,.png,.jpeg"
                class="hidden"
                @change="handlePic($event)"
              />
            </label>
            <label for="image" class="mt-3"></label>
            <input
              type="file"
              accept=".jpg,.png,.jpeg"
              class="hidden"
              @change="handlePic($event)"
            />
            <div class="flex">
              <button
                type="submit"
                class="
                  p-4
                  flex-1
                  m-2
                  border
                  rounded-xl
                  hover:bg-opacity-25 hover:bg-blue-300
                  hover:text-blue-500
                  transition
                  duration-200
                  font-bold
                "
              >
                Add item
              </button>
              <div
                v-on:click="clear"
                class="
                  p-4
                  flex-1
                  text-center
                  cursor-pointer
                  m-2
                  border
                  rounded-xl
                  hover:bg-opacity-25 hover:bg-red-300
                  hover:text-red-500
                  transition
                  duration-200
                  font-bold
                "
              >
                Clear
              </div>
            </div>
          </form>
          <hr class="my-10" />
          <div class="flex flex-col">
            <label
              v-if="bill === null"
              class="
                p-4
                border
                rounded-xl
                hover:bg-red-200
                transition
                duration-200
                cursor-pointer
              "
            >
              <i class="fa fa-upload mx-4"></i>
              <span class="mt-2 text-base leading-normal">
                Upload Bill for all these items</span
              >
              <input
                type="file"
                accept=".pdf,.jpg,.png,.jpeg"
                class="hidden"
                @change="handleBill($event)"
              />
            </label>
            <label
              v-if="bill !== null"
              class="
                p-4
                border
                rounded-xl
                hover:bg-red-200
                transition
                duration-200
                cursor-pointer
                flex
                items-center
              "
            >
              <i class="fa fa-file mx-4"></i>
              <span class="truncate"> {{ bill.name }}</span>
              <input
                type="file"
                accept=".pdf,.jpg,.png,.jpeg"
                class="hidden"
                @change="handleBill($event)"
              />
            </label>
            <button
              class="
                mt-6
                p-4
                rounded-xl
                hover:bg-opacity-50
                font-bold
                hover:text-blue-900
                transition
                bg-primary
                text-white
              "
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
    <section class="col-span-2">
      <div class="mt-16">
        <div class="font-bold text-3xl mb-11">Added items</div>
        <div class="overflow-y-auto">
          <table cellpadding="20" class="border">
            <thead>
              <th class="font-bold border">ID</th>
              <th class="font-bold border">Name</th>
              <th class="font-bold border">Class</th>
              <th class="font-bold border">Quantity</th>
              <th class="font-bold border">Actions</th>
            </thead>
            <tbody>
              <tr v-for="item in items" :key="item.prodName">
                <td class="text-center border">{{ item.prodCustomID }}</td>
                <td class="max-w-sm flex items-center border">
                  <img class="w-14 rounded-lg mx-5" :src="item.picurl" alt="" />
                  <div>{{ item.name }}</div>
                </td>
                <td class="text-center border">{{ item.class }}</td>
                <td class="text-center border">{{ item.quantity }}</td>
                <td class="border">
                  <button v-on:click="removeItem(item.name)">
                    <i class="px-3 fa fa-times fill-current text-red-700"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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
      items: [],
      prodName: "",
      prodClass: "",
      prodQuantity: "",
      bill: null,
      pic: null,
      prodCustomID: "",
    };
  },
  methods: {
    clear: function () {
      this.prodName = "";
      this.prodClass = "";
      this.prodQuantity = "";
      this.prodCustomID = "";
      this.pic = null;
    },
    handleBill(event) {
      console.log(event.target.files[0]);
      this.bill = event.target.files[0];
    },
    handlePic(event) {
      console.log(event.target.files[0]);
      this.pic = event.target.files[0];
    },
    removeItem: function (itemname) {
      let removeIndex = this.items.map((item) => item.name).indexOf(itemname);
      ~removeIndex && this.items.splice(removeIndex, 1);
    },
    addItem: function () {
      if (
        this.prodName === "" ||
        this.prodClass === "" ||
        this.prodQuantity === "" ||
        this.prodCustomID === ""
      ) {
        return alert("Please fill in all the values");
      }
      this.items.push({
        name: this.prodName,
        prodCustomID: this.prodCustomID,
        class: this.prodClass,
        quantity: this.prodQuantity,
        pic: this.pic,
        picurl: URL.createObjectURL(this.pic),
      });
      //console.log(this.items);
      this.prodName = "";
      this.prodClass = "";
      this.prodQuantity = "";
      this.pic = null;
      this.prodCustomID = "";
    },
    sendtoServer: function () {
      const token = localStorage.getItem("jwt");
      const formData = new FormData();
      formData.append("items", JSON.stringify(this.items));
      for (let index = 0; index < this.items.length; index++) {
        const element = this.items[index];
        formData.append(`${index}`, element.pic, element.pic.name);
        console.log(element);
      }
      formData.append("bill", this.bill, this.bill.name);
      // console.log(this.items);
      // console.log(formData);
      axios
        .post(process.env.VUE_APP_BASE_URL + "/admin/additem", formData, {
          headers: {
            token: token,
          },
        })
        .then((res) => {
          console.log(res);
          if (res.data.status === "success") {
            alert("Added Successfully");
            router.push("/admin/inventory");
          }
          if (res.data.status === "Failed to Add Item") {
            alert("Something went wrong");
          }
        })
        .catch((err) => {
          console.log(err);
          alert("Something went wrong. Could not add item to inventory");
        });
    },
  },
  components: { SideBar },
};
// "prodCustomID" is the id entered by the user in the input.
// the same will be sent to the server in the items array for each item (see line 285)
</script>
