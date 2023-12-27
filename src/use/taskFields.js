import {ref} from "vue"

export function useTaskFields(task = null) {
    const title = ref(task.title || '')
    const description = ref(task.description || '')
    const priority = ref(task.priority || '')

    return {title, description, priority}
}
