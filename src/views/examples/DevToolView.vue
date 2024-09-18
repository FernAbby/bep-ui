<template>
  <div>打开控制台查看调试</div>
  <ul>
    <li>deepClone</li>
  </ul>
</template>
<script lang="ts" setup>
  import { deepClone } from '@gadgets/utils/clone'
  const obj = {
    name: '我真的很困',
    like: {
      type: 'coding',
      a: undefined,
      b: null,
      c: function () {
        console.log('hello')
      },
      e: Symbol('hello'),
      f: new Date(),
      g: { 0: NaN, 1: -Infinity, 2: Infinity } // NaN, -Infinity, Infinity  都会被转化成 null
    }
  }
  const cloneObj = deepClone(obj)
  console.log('cloneObj ====>', cloneObj)
  console.log('函数拷贝 ====>', cloneObj.like.c === obj.like.c)
  console.log('symbol拷贝 ====>', cloneObj.like.e === obj.like.e)
  console.log('日期拷贝 ====>', cloneObj.like.f === obj.like.f)
</script>