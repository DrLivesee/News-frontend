<template>
  <div class="loading-container">
    <div class="loading" :style="{ width: size, height: size, marginTop: marginTop, alignSelf:alignSelf }"></div>
  </div>
</template>

<script setup lang="ts">

import {LoadingIconProps} from '@/interfaces'

withDefaults(defineProps<LoadingIconProps>(), {
  size: '40px',
  marginTop: '0',
  alignSelf: 'baseline'
})

// defineProps<LoadingIconProps>({
//   size: {
//     type: String,
//     default: '40px'
//   },
//   marginTop: {
//     type: String,
//     default: '0'
//   },
//   alignSelf: {
//     type: String,
//     default: 'baseline'
//   }
// });
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
