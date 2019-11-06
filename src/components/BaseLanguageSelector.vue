<template>
  <div>
    <div class="selector" :class="{ active : optionsVisible }">

      <div class="option current-language"
           @click="optionsVisible = !optionsVisible;">
        <div v-show="!optionsVisible">
          <img v-if="$locale === 'ru'"
               src="../assets/images/rus.png">
          <img v-else
               src="../assets/images/eng.png">
        </div>
        <i class="dropdown-icon"></i>
      </div>
      <div v-show="optionsVisible"
           class="option another-language">
        <img src="../assets/images/eng.png"
             @click="change($event, 'en')"
             @touchend="change($event, 'en')">
        <img src="../assets/images/rus.png"
             style="width: 30px;"
             @click="change($event, 'ru')"
             @touchend="change($event, 'ru')">
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import axios from 'axios';
import config from '../../config';

export default {
  name: 'baseLanguageSelector',
  data() {
    return {
      languages: Vue.prototype.$config.supportedLanguages,
      selectedLang: this.$cookie.get('q12.lang') || Vue.config.lang,
      optionsVisible: false,
    };
  },
  methods: {
    closeSelector() {
      if (this.optionsVisible) {
        this.optionsVisible = false;
      }
    },
    change(e, lang) {
      this.selectedLang = lang;
      this.optionsVisible = false;
    },
  },
  watch: {
    $locale(val) {
      // this help is locale changes somewhere outside this component
      this.selectedLang = val;
    },
    selectedLang(value) {
      this.$cookie.set(`${this.$config.APP_NAME}.lang`, value);
      axios.defaults.headers.common['Accept-language'] = value;
      this.$locale = value;
    },
    optionsVisible(val) {
      if (val) {
        document.addEventListener('click', this.closeSelector);
        document.addEventListener('touchend', this.closeSelector);
      } else {
        document.removeEventListener('click', this.closeSelector);
        document.removeEventListener('touchend', this.closeSelector);
      }
    },
  },
  mounted() {
    const currentLang = this.$cookie.get('q12.lang');
    if (currentLang) {
      this.selectedLang = currentLang;
      this.$locale = currentLang;
    } else {
      this.$cookie.set('q12.lang', config.defaultLanguage);
      this.$locale = config.defaultLanguage;
    }
  },
};
</script>
<style lang="scss" scoped>
  @import "~@/assets/styles/mixins";
  .selector {
    position: relative;
    width: 50px;
    margin-left: -12px;

    &::after {
      content: '';
      display: block;
      position: absolute;
      width: 135%;
      border: 1px solid #46a0c5;
      border-radius: 20px;
      height: 120%;
      top: -5px;
      left: -9px;
      z-index: -1;
    }

    .option {
      height: 30px;
      padding: 4px 8px;
      border-radius: 6px;
      color: #27BBC0;
      cursor: pointer;
      img:hover {
        cursor: pointer;
        opacity: 0.9;
      }
    }
    &.active {
      &:before {
        transform: rotate(0deg);
      }

      .dropdown-icon {
        transform: rotate(180deg);
      }
    }
    .dropdown-icon {
      display: inline-block;
      width: 9px;
      height: 6px;
      position: absolute;
      right: 0;
      top: 11px;
      transform: rotate(0deg);
      background: url("~@/assets/images/arrow-dropdown.png");
    }

    .another-language {
      position: absolute;
      background-color: #fbf9f9;
      top: -10px;
      left: -10px;
      width: 75px;
      height: 60px;

      &::after {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 50%;
        border-bottom: 1px solid #80808040;
      }

      img:first-child {
        position: absolute;
        top: 5px;
        left: 22px;
        z-index: 1;
      }

      img:last-child {
        width: 30px;
        position: absolute;
        top: 32px;
        left: 22px;
      }
    }
  }
</style>
