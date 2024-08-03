<template>
  <form-plus
    v-bind="searchProps"
    ref="formRef"
    root-class="search-form-plus"
    :schema="searchSchema"
    :model="formData"
    layout="grid"
  >
    <template #append>
      <div class="search-form-plus__actions">
        <el-button size="default" :icon="RefreshLeft" @click="handleReset">重置</el-button>
        <el-button size="default" :icon="Search" type="primary" @click="handleSearch">
          查询
        </el-button>
        <el-button
          v-if="showExpandCollapse"
          link
          type="primary"
          class="search-form-plus__expand-collapse"
          @click="handleToggle"
        >
          <template v-if="isCollapse">
            展开
            <el-icon class="el-icon--right"><ArrowDown /></el-icon>
          </template>
          <template v-else>
            收起
            <el-icon class="el-icon--right"><ArrowUp /></el-icon>
          </template>
        </el-button>
      </div>
    </template>
  </form-plus>
</template>
<script lang="ts" setup>
  import { computed, ref } from 'vue'
  import { ElButton, ElIcon } from 'element-plus'
  import { pick } from 'biz-gadgets'
  import { ArrowDown, ArrowUp, RefreshLeft, Search } from '@element-plus/icons-vue'
  import type { IFormPlusProps, IFormPlusRef, IFormSchema } from '@bep-ui/components'
  import FormPlus from '../FormPlus/index.vue'

  const emits = defineEmits(['search', 'reset'])
  const props = defineProps({
    schema: {
      type: Object as () => IFormSchema['properties'],
      default: () => ({})
    },
    formData: {
      type: Object as () => Record<string, any>,
      default: () => ({})
    },
    searchProps: {
      type: Object as () => IFormPlusProps,
      default: () => ({})
    },
    beforeSearch: {
      type: Function,
      default: undefined
    }
  })
  const formRef = ref<IFormPlusRef>()
  const isCollapse = ref(false)
  const searchSchema = computed(() => {
    return {
      renderType: 'Object',
      properties: isCollapse.value
        ? pick(props.schema, Object.keys(props.schema).slice(0, 2))
        : props.schema
    } as IFormSchema
  })
  const showExpandCollapse = computed(() => Object.keys(props.schema).length > 2)
  const handleToggle = () => {
    isCollapse.value = !isCollapse.value
  }
  // 重置
  const handleReset = () => {
    formRef.value?.reset()
    emits('reset', formRef.value?.getFormData() || {})
  }
  // 重置
  const handleSearch = () => {
    const formData = formRef.value?.getFormData() || {}
    if (!props.beforeSearch || (props.beforeSearch && !props.beforeSearch(formData))) {
      emits('search', formData)
    }
  }
  // 数据变化
  // const handleChange = (e: DebuggerEvent) => {
  //   emits('change', e)
  // }
</script>
<style lang="scss">
  .search-form-plus {
    .el-form-item__content > * {
      width: 100%;
    }

    .el-form-item__content {
      .el-input-number .el-input__inner {
        text-align: left;
      }

      .el-date-editor {
        width: 100% !important;
      }
    }

    .search-form-plus__actions {
      display: flex;
      justify-content: flex-end;
    }
  }
</style>
