import type { InjectionKey } from 'vue'

export const ROOT_DATA_INJECTION_KEY: InjectionKey<Record<string, any>> =
  Symbol('formDataInjection')
