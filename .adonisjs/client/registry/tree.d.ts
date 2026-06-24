/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  list: typeof routes['list']
  store: typeof routes['store']
  update: typeof routes['update']
  destroy: typeof routes['destroy']
}
