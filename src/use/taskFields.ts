import { ref } from 'vue'

export function useTaskFields(task = null) {
  const title = ref<string>(task.title || '')
  const description = ref<string>(task.description || '')
  const priority = ref<string | number>(task.priority || '')

  return { title, description, priority }
}
