<template>
  <div class="area-picker">
    <span></span>
    <el-input />
  </div>
</template>
<script lang="ts" setup>
  const props = defineProps({
    level: {
      type: Number,
      default: 3
    },
    data: {
      type: Array,
      default: () => []
    }
  })
</script>
