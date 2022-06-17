    <template>
  <div v-if="pageLoading">Loading...</div>
  <div v-if="!pageLoading">
    <TopBar />
    <section class="flex justify-center">
      <div class="mt-16 max-w-screen-lg">
        <div class="grid grid-cols-3 auto-cols-fr w-full gap-8 mt-10">
          <input
            type="text"
            v-model="searchText"
            @keyup="search"
            class="p-3 border w-full rounded col-span-3"
            placeholder="Search for request"
          />
          <div v-if="!searched" class="font-bold col-span-3 text-3xl">
            All Requests
          </div>
          <div v-if="searched" class="font-bold col-span-3 text-3xl">
            Searched Requests
          </div>

          <RequestCard
            v-for="item in transactions"
            :key="item.id"
            :requestID="item.id"
            :title="item.title"
            :quantity="item.quantity || 2"
            :status="item.status.toLowerCase()"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import TopBar from "@/views/client/components/TopBar.vue";
import RequestCard from "@/views/client/components/RequestCard.vue";

import axios from "axios";
export default {
  async beforeMount() {
    try {
      const res = await axios.get(
        process.env.VUE_APP_BASE_URL + "/client/myrequests",
        {
          headers: {
            token: localStorage.getItem("jwt"),
          },
        }
      );
      //console.log(res.data);
      this.transactions = res.data.transaction;
      this.transactions.sort(function (a, b) {
        var dateA = new Date(a.updatedAt),
          dateB = new Date(b.updatedAt);
        return dateB - dateA;
      });
      console.log(this.transactions);
      this.storeTransaction = this.transactions.map((item) => {
        return item;
      });

      this.pageLoading = false;
    } catch (e) {
      console.log(e);
      alert("Server Offline. Please try again later");
    }

    //backend integration - done
  },
  methods: {
    search: function () {
      if (this.searchText === "") {
        console.log("insearchif");
        this.transactions = this.storeTransaction.map((item) => {
          return item;
        });
        this.searched = false;
      } else {
        this.transactions = this.storeTransaction.filter((element) =>
          element.title.toLowerCase().includes(this.searchText.toLowerCase())
        );
        this.searched = true;
      }
    },
  },

  data() {
    return {
      username: localStorage.getItem("username"),
      transactions: [],
      storeTransaction: [],
      pageLoading: true,
      searchText: "",
      searched: false,
    };
  },
  components: {
    TopBar,
    RequestCard,
  },
  name: "clientHome",
};
</script>