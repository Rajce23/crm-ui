<template>
  <div class="dashboard-container">
    <error-popup-modal />
    <login-form v-if="!isUserLogged && isUserLogged != null" />
    <user-info-po-up />
    <main-dashboard v-if="isUserLogged && isUserLogged != null" />
    <do-you-want-to-modal />
  </div>
</template>

<script>
import ErrorPopupModal from "./PopUpsAndModals/ErrorPopupModal.vue";
import LoginForm from "./LoginForm/LoginForm.vue";
import UserInfoPoUp from "./PopUpsAndModals/InfoPopup.vue";
import { mapGetters } from "vuex";
import MainDashboard from "./MainDashboard.vue";
import DoYouWantToModal from "./PopUpsAndModals/DoYouWantToModal.vue";
export default {
  components: {
    ErrorPopupModal,
    LoginForm,
    UserInfoPoUp,
    MainDashboard,
    DoYouWantToModal,
  },

  beforeCreate() {
    this.$store.dispatch("checkUserLogin");
  },

  computed: {
    ...mapGetters({
      isUserLogged: "isUserLogged",
    }),
  },

  watch: {
    isUserLogged() {
      if (this.isUserLogged) {
        const storedRoute = localStorage.getItem("path");
        this.$router.push(storedRoute);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #2c3968;
}
</style>
