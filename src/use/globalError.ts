import { onErrorCaptured, ref } from 'vue'

export function useGlobalError() {
  const isError = ref<boolean>(false)
  onErrorCaptured((e): boolean => {
    console.log(e)
    isError.value = true
    return false
  })

  return { isError }
}
