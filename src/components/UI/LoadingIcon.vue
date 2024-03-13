<template>
  <div class="loading-container">
    <div class="loading" :style="loadingCustom"></div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps(["loadingCustom"]);

// const props = defineProps<{
//   dense?: boolean, 
// }>()

// const iconStyles = computed(() => {
//   if (props.dense) {
//     return {
//       height: '50px',
//       width: '50px',
//     }
//   }
// })
</script>

<style lang="scss" scoped>
.loading-container {
  display: flex;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  flex-direction: column;
  
  .loading {
    
    border: 5px solid #c9ada7;
    border-top: 5px solid #22223b;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
