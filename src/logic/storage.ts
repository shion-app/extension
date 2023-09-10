import { useStorageLocal } from '~/composables/useStorageLocal'

export const port = useStorageLocal('port', 4040)
