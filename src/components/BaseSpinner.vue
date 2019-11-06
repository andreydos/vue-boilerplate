<template>
  <div class="spinner" :class="{ active: active }">
    <flower-spinner :animation-duration="2500" :size="50" color="#ffd700" />
  </div>
</template>
<script>
import { FlowerSpinner } from "epic-spinners";

export default {
  name: "BaseSpinner",
  components: {
    FlowerSpinner
  },
  data() {
    return {
      active: false
    };
  },
  mounted() {
    const self = this;
    setTimeout(() => {
      self.active = true;
    }, 10);
  }
};
</script>
<style lang="scss" scoped>
.spinner {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &.active {
    background-color: #00000099;
    transition: background-color 0.5s ease-in;
  }
}
</style>
