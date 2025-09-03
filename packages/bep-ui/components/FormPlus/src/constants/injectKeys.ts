import type { ComputedRef, InjectionKey } from 'vue'
import type { IComponentSize } from '@bep-ui/constants/size'

export const ROOT_DATA_INJECTION_KEY: InjectionKey<Record<string, any>> =
  Symbol('rootDataInjection')

export const ROOT_ATTRS_INJECTION_KEY: InjectionKey<
  ComputedRef<{
    customContext: Record<string, any>
    disabled: boolean
    size: IComponentSize
    separator: string
  }>
> = Symbol('rootAttrsInjection')
