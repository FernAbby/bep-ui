import type { IObjectAny } from '../../global'

export interface ISearchFormRef {
  search: (data?: IObjectAny) => void
  getFormData: () => IObjectAny
}
