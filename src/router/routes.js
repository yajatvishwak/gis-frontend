//Client
import ClientHome from "@/views/client/ClientHome.vue";
import ClientResetPassword from "@/views/client/ClientResetPassword.vue";
import ClientRequestDetail from "@/views/client/ClientRequestDetail.vue";
import ClientRaiseRequest from "@/views/client/ClientRaiseRequest.vue";

//Admin
import AdminHome from "@/views/admin/AdminHome.vue";
import AddUser from "@/views/admin/AddUser.vue";
import AdminResetPassword from "@/views/admin/AdminResetPassword.vue";
import AddItems from "@/views/admin/AddItems.vue";
import Inventory from "@/views/admin/Inventory.vue";
import AdminItem from "@/views/admin/AdminItem.vue";
import AdminReport from "@/views/admin/AdminReport.vue";

//general
import Auth from "@/views/Auth.vue";
import LowPermission from "@/views/LowPermission.vue";
import NotFound from "@/views/NotFound.vue";

export default [
  {
    path: "/auth",
    name: "Auth",
    component: Auth,
  },
  {
    path: "/client/home",
    name: "ClientHome",
    component: ClientHome,
  },
  {
    path: "/client/changepassword",
    name: "ClientChangePassword",
    component: ClientResetPassword,
  },
  {
    path: "/client/request/:requestID",
    name: "ClientRequestID",
    component: ClientRequestDetail,
  },
  {
    path: "/client/raiserequest/",
    name: "ClientRaiseRequest",
    component: ClientRaiseRequest,
  },
  {
    path: "/admin/home",
    name: "AdminHome",
    component: AdminHome,
  },
  {
    path: "/admin/adduser",
    name: "AdminAddUser",
    component: AddUser,
  },
  {
    path: "/admin/changepassword",
    name: "AdminResetPassword",
    component: AdminResetPassword,
  },
  {
    path: "/admin/additems",
    name: "AdminAddItems",
    component: AddItems,
  },
  {
    path: "/admin/report",
    name: "AdminReport",
    component: AdminReport,
  },
  {
    path: "/admin/item/:itemID",
    name: "AdminItem",
    component: AdminItem,
  },
  {
    path: "/admin/inventory",
    name: "AdminInventory",
    component: Inventory,
  },
  {
    path: "/lowperm",
    name: "LowPermission",
    component: LowPermission,
  },

  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];
