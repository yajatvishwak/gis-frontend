import { createApp } from "vue";
import App from "./App.vue";
import "./assets/tailwind.css";
import "vue-universal-modal/dist/index.css";
import router from "./router";
import VueUniversalModal from "vue-universal-modal";

//mixins
const myMixin = {
  // created() {
  //   this.hello();
  // },
  methods: {
    getImage(imgfile) {
      //console.log(process.env.VUE_APP_IMG_LOCATION + "/" + imgfile);
      return process.env.VUE_APP_IMG_LOCATION + "/" + imgfile;
    },
    getImageClient(imgfile) {
      //console.log(process.env.VUE_APP_IMG_LOCATION + "/" + imgfile);
      return process.env.VUE_APP_IMG_LOCATION_CLIENT + "/" + imgfile;
    },
    getBill(pdfFile) {
      //console.log(process.env.VUE_APP_IMG_LOCATION + "/" + pdfFile);
      //alert(pdfFile);
      return process.env.VUE_APP_BILL_LOCATION + "/" + pdfFile;
    },
    getPerm(pdfFile) {
      //console.log(process.env.VUE_APP_IMG_LOCATION + "/" + pdfFile);
      return process.env.VUE_APP_PERM_LOCATION + "/" + pdfFile;
    },
    getPermClient(pdfFile) {
      //console.log(process.env.VUE_APP_IMG_LOCATION + "/" + pdfFile);
      return process.env.VUE_APP_PERM_LOCATION_CLIENT + "/" + pdfFile;
    },
    getReport(pdfFile) {
      //console.log(process.env.VUE_APP_IMG_LOCATION + "/" + pdfFile);
      return process.env.VUE_APP_REPORT + "/" + pdfFile;
    },
  },
};

createApp(App)
  .mixin(myMixin)
  .use(router)
  .use(VueUniversalModal, { teleportTarget: "#modals" })
  .mount("#app");
