<template>
  <button
    :disabled="disabled"
    type="button"
    class="btn"
    :class="[
      btnColorClass ? btnColorClass : 'btn-blue',
      btnSideClass ? btnSideClass : '',
      btnFullWidth ? btnFullWidth : '',
      btnBig ? btnBig : '',
      { 'btn-disabled': disabled },
    ]"
  >
    {{ text ? text : "push" }}
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { CustomButtonProps } from "@/interfaces";

const props = withDefaults(defineProps<CustomButtonProps>(), {
  text: "push",
  disabled: false,
});

const btnColorClass = computed(() => {
  if (props.red) return "btn-red";

  if (props.blue) return "btn-blue";

  if (props.green) return "btn-green";
});

const btnSideClass = computed(() => {
  if (props.right) return "btn-right-side";
});

const btnFullWidth = computed(() => {
  if (props.fullWidth) return "btn-100";
});

const btnBig = computed(() => {
  if (props.big) return "btn-big";
});
</script>

<style lang="scss" scoped>
.btn {
  padding: 5px 10px;
  outline: none;
  color: $white-1;
  font-size: 14px;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
}
.btn-red {
  @include btnRedAnimation;
}

.btn-blue {
  @include btnBlueAnimation;
}

.btn-green {
  @include btnGreenAnimation;
}

.btn-disabled {
  cursor: not-allowed;
  color: rgb(185, 185, 185);
}

.btn-right-side {
  @include btnRightSide;
}

.btn-100 {
  width: 100%;
}

.btn-big {
  padding: 8px 12px;
  font-size: 16px;
}
</style>
