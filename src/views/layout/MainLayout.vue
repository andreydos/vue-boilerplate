<template>
  <div class="page">
    <AppHeader class="page__header"/>
    <main class="page__content">
      <transition name="component-fade" mode="out-in">
        <router-view :key="$route.params.id"/>
      </transition>
    </main>
  </div>
</template>

<script>
import AppHeader from '@/views/layout/AppHeader.vue';

export default {
  components: { AppHeader },
};
</script>
<style lang="scss" scoped>
  @import "~@/assets/styles/mixins";

  .component-fade-enter-active, .component-fade-leave-active {
    transition: opacity 0.15s ease;
  }
  .component-fade-enter, .component-fade-leave-to {
    opacity: 0;
  }
  .page {
    $header-height: 45px;
    height: calc(100% - #{$header-height});
    margin-top: $header-height;

    &__content {
      height: 100%;
    }

    &__header {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: $header-height;
      z-index: 5;
    }
  }
</style>
