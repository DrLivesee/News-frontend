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
  @include baseBtn;

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
  color: $white-2;
}

.btn-right-side {
  @include btnRightSide;
}

.btn-100 {
  width: 100%;
}

.btn-big {
  @include bigBtn;
}
</style>
