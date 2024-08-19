import type { IObjectAny } from '@bep-ui/global'
import { default as SearchForm } from './index.vue'

export interface ISearchFormRef {
  search: (data?: IObjectAny) => void
  getFormData: () => IObjectAny
}

export type ISearchFormProps = InstanceType<typeof SearchForm>['$props']
