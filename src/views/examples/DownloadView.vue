<template>
  <div class="page-container">
    <a :download="fileName" :href="url">下载图片</a>
    <el-button type="primary" @click="handleDownload">下载图片</el-button>
  </div>
</template>
<script lang="ts" setup>
  import { downloadFile, extraFileName } from '@gadgets/utils/download'
  const url =
    'https://test-biw-cos-cdn.hjt360.cn/2023/11/30/11/80167416568030e628a0.jpg?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDjP5ZptjKfv2xgCgz471TikY7e4PWP8eC%26q-sign-time%3D1717558119%3B1717559979%26q-key-time%3D1717558119%3B1717559979%26q-header-list%3Dhost%26q-url-param-list%3D%26q-signature%3Dcb83a539dfc4251b912ec3e064971c9b0adfc16c&'
  const fileName = extraFileName(url)
  console.log('fileName====>', fileName)

  const handleDownload = () => {
    downloadFile(url)
  }
</script>
