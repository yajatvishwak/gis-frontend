<template>
  <div class="grid grid-cols-5 h-screen">
    <SideBar />
    <section class="col-span-2">
      <div class="m-16">
        <div class="text-3xl font-bold">Download Report</div>
        <div class="text-gray-500">Choose Timeframe to download report</div>
        <div class="mt-10 flex">
          <form
            @submit.prevent="submitToServer"
            class="flex flex-col max-w-screen-sm"
          >
            <!-- <label class="my-5 text-lg font-bold"
              >Choose start date and end date</label
            > -->
            <div class="p-2">
              <DatePicker v-model="dateSel" is-range />
            </div>
            <button
              type="submit"
              class="
                p-4
                bg-primary
                w-auto
                inline-block
                rounded-lg
                text-white
                mt-10
              "
            >
              <span v-if="loading">Loading...</span>
              <span v-else>Download Report</span>
            </button>
          </form>
        </div>
      </div>
    </section>
    <section class="col-span-2">
      <div
        v-if="pdf === null"
        class="w-full h-full flex justify-center items-center bg-gray-100"
      >
        Choose a time range
      </div>
      <embed
        v-if="pdf !== null"
        :src="pdf"
        type="application/pdf"
        frameBorder="0"
        scrolling="auto"
        height="100%"
        width="100%"
      />
    </section>
  </div>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import { DatePicker } from "v-calendar";
import axios from "axios";

// import router from "@/router";
export default {
  methods: {
    submitToServer: async function () {
      //console.log(this.dateSel);
      try {
        if (this.dateSel === null) return alert("choose a time frame");
        const body = {
          from_date: this.dateSel.start.toISOString().slice(0, 10),
          to_date: this.dateSel.end.toISOString().slice(0, 10),
        };
        //console.log(body);
        this.loading = true;
        const res = await axios.post(
          process.env.VUE_APP_BASE_URL + "/admin/report",
          body,
          {
            headers: { token: localStorage.getItem("jwt") },
          }
        );
        this.loading = false;
        //console.log(res.data);
        this.pdf = this.getReport(res.data.report_filename);
      } catch (err) {
        console.log(err);
        alert("Server Offline. Please try again later");
      }

      //  backend integration
    },
  },
  data() {
    return {
      dateSel: null,
      pdf: null,
      loading: false,
    };
  },
  components: {
    SideBar,
    DatePicker,
  },
};
</script>

