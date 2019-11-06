<template>
  <div class="login">
    <input
      type="email"
      name="email"
      v-model="form.email"
      placeholder="Email Address"
    />
    <vue-tel-input
      v-model="form.phone"
      placeholder="Phone Number"
    ></vue-tel-input>
    <input type="text" name="code" v-model="form.code" placeholder="Code" />
    <button class="base-button login__btn--login">LOGIN</button>
    <button class="base-button login__btn--registration">SIGN UP</button>
  </div>
</template>

<script>
import { VueTelInput } from "vue-tel-input";
export default {
  name: "login",
  components: {
    VueTelInput
  },
  metaInfo() {
    return {
      title: this.$t("pages.login")
    };
  },
  data: () => {
    return {
      form: {
        email: "",
        phone: "",
        code: ""
      }
    };
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/styles/variables";
.login {
  &__btn--login {
    background-color: $base-green;
    color: $base-color;
    &:hover {
      background-color: $base-green-hover;
    }
  }
}
</style>
