<template>
  <div class="page-container">
    <div class="download-list-item" v-for="item in fileList" :key="item">
      <div class="download-list-item__url">{{ item }}</div>
      <div class="actions">
        <el-button type="primary" @click="handlePreview(item)">预览</el-button>
        <el-button type="primary" @click="handleDownload(item)">下载</el-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { downloadByUrl } from '@gadgets/utils/download'
  import { previewFile } from '@gadgets/utils/preview'
  const fileList: string[] = [
    '/src/assets/be_logo.svg',
    'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
    'http://182.44.15.166:9000/www/downloads/测试文档.docx',
    'http://182.44.15.166:9000/www/downloads/测试excel表.xlsx',
    'http://182.44.15.166:9000/www/downloads/测试numbers.numbers',
    'http://182.44.15.166:9000/www/downloads/测试CSV.csv',
    'http://182.44.15.166:9000/www/downloads/测试pdf.pdf',
    'http://182.44.15.166:9000/www/downloads/测试rtf.rtf',
    'http://182.44.15.166:9000/www/downloads/测试txt.txt'
  ]

  const handleDownload = (url: string) => {
    downloadByUrl(url)
  }

  const handlePreview = (url: string) => {
    previewFile(url)
  }
</script>
<style lang="scss" scoped>
  .page-container {
    width: 100%;
    height: 100%;
  }
  .download-list-item {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 15px;
    border-bottom: 1px solid #eee;

    .download-list-item__url {
      white-space: wrap;
      word-break: break-all;
      flex: 1;
      width: 0;
    }

    .actions {
      flex-shrink: 0;
    }
  }
</style>
