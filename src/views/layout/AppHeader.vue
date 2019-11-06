<template>
  <header class="header">
    Header
    <button v-if="userInfo" @click="logout">Logout</button>
  </header>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "AppHeader",
  computed: {
    ...mapGetters({
      userInfo: "user/userInfo"
    })
  },
  methods: {
    logout() {
      this.$store.dispatch("auth/logout").then(() => {
        this.$router.push("/");
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.header {
  text-align: center;
}
</style>
