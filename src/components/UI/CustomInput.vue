<template>
  <input
    :type="type"
    class="input"
    :placeholder="placeholder"
    v-model="model"
    :maxlength="maxlength"
    
  />
</template>

<script setup lang="ts">

import { CustomInputProps } from "@/interfaces";

withDefaults(defineProps<CustomInputProps>(), {
  placeholder: "Введите данные",
  type: "text",
  maxlength: 10000,
  
});

const model = defineModel()


</script>

<style lang="scss" scoped>
.input {
  @include baseInput;
}
</style>
