import {ref} from 'vue'
import {defineStore} from 'pinia'

export const useTaskStore = defineStore('task', () => {
    const tasks = ref(JSON.parse(localStorage.getItem("uran-asana-tasks") || '[]'))

    const getTasksByGroupId = (group_id) => {
        return tasks.value.filter((task) => {
            return task.groupId == group_id
        })
    }

    const saveTasks = () => {
        localStorage.setItem("uran-asana-tasks", JSON.stringify(tasks.value))
    }

    const updateOrAddTask = (task) => {
        const editedTask = tasks.value.find(t => t.id === task.id)
        if (editedTask) {
            tasks.value = tasks.value.map((t) => {
                if (t.id === task.id) {
                    return task
                }
                return t
            })
        } else {
            tasks.value = [...tasks.value, task]
        }

        saveTasks()
    }

    return {tasks, getTasksByGroupId, saveTasks, updateOrAddTask}
})
