<template>
  <div>
    <router-link class="home-link" to="/">
      <i class="material-icons">arrow_back</i><span class="home-link-text">На главную</span>
    </router-link>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.home-link {
    text-decoration: none;
    display: flex;
    align-items: center;

    .home-link-text {
      font-size: 16px;
      line-height: 16px;
      padding-bottom: 2px;
    }
}
</style>
