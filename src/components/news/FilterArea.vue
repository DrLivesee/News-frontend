<template>
  <div class="input-area">
    <input
      class="search-input"
      :value="newsStore.searchQuery"
      @input="inputSearchHandler"
      placeholder="Введите заголовок для поиска"
    />
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

const newsStore = useNews();

const { inputSearchHandler, clearInput } = useNewsSearch();
</script>

<style lang="scss" scoped>
.input-area {
  position: relative;

  .search-input {
    color: #22223b;
    width: 100%;
    flex: 1;
    padding: 8px;
    border: 1px solid #22223b;
    border-radius: 4px;
    margin-right: 8px;
    font-size: 16px;
    // line-height: 0px;
    margin-bottom: 16px;

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: #9a8c98;
    }
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
      color: #9a8c98;
      transition: color 0.25s ease-in-out;
    }

    &:hover {
      span {
        color: #22223b;
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
