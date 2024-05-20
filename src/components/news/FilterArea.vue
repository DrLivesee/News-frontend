<template>
  <div class="input-area">
    <input
      class="search-input"
      :value="newsStore.searchQuery"
      @input="inputSearchHandler"
      placeholder="Поиск по новостям"
    />

    <!-- <CustomInput v-model="newsStore.searchQuery" @input="inputSearchHandler" placeholder="Поиск по новостям"/> -->
    <button
      v-if="newsStore.searchQuery"
      @click="clearInput"
      type="button"
      class="clear-button"
    >
      <span>+</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useNewsSearch } from "@/helpers/news-search";
import { useNews } from "@/store/news";
// import CustomInput from "../UI/CustomInput.vue";

const newsStore = useNews();

const { inputSearchHandler, clearInput } = useNewsSearch();
</script>

<style lang="scss" scoped>
.input-area {
  position: relative;

  .search-input {
    margin-bottom: 24px;
    @include baseInput
    
  }

  .clear-button {
    position: absolute;
    top: 0px;
    right: 0px;
    padding: 3px;
    padding-right: 8px;
    padding-left: 8px;
    font-size: 24px;
    font-weight: bold;
    outline: none;
    cursor: pointer;
    border-radius: 4px;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    border: 1px solid transparent;
    border-left: none;
    background-color: transparent;

    span {
      display: block;
      transform: rotate(45deg);
      color: $brown-4;
      transition: color 0.25s ease-in-out;
    }

    &:hover {
      span {
        color: $brown-6;
      }
    }
  }

  .calendar {
    label {
      margin-bottom: 5px;
      font-weight: bold;
    }

    input {
      margin-bottom: 10px;
      padding: 8px;
      font-size: 14px;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
    }
  }
}
</style>
