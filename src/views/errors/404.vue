<template>
  <div class="not-found-page">
    <img :src="be_logo" />
    <h1>404</h1>
  </div>
</template>
<script setup lang="ts">
  import be_logo from '@/assets/be_logo.svg'
</script>
<style lang="scss">
  .not-found-page {
    text-align: center;
    padding: 50px 30px 30px;

    img {
      width: 80px;
    }
  }
</style>
