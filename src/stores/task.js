import {ref} from 'vue'
import {defineStore} from 'pinia'

export const useTaskStore = defineStore('task', () => {
    let taskData;
    try {
        taskData = JSON.parse(localStorage.getItem("uran-asana-tasks")) || [];
    } catch (error) {
        taskData = [];
    }
    const tasks = ref(taskData)

    const getTasksByGroupId = (group_id) => {
        return tasks.value.filter((task) => {
            return task.groupId == group_id
        })
    }

    const saveTasks = () => {
        try {
            const stringifyTask =  JSON.stringify(tasks.value)
            localStorage.setItem("uran-asana-tasks",stringifyTask )
        }catch (e) {
            localStorage.setItem("uran-asana-tasks",'' )
            console.error(e)
        }

    }

    const updateOrAddTask = (task) => {
        const editedTask = tasks.value.find(t => t.id === task.id)
        if (editedTask) {
            tasks.value = tasks.value.map((t) => t.id === task.id ? task : t)
        } else {
            tasks.value = [...tasks.value, task]
        }

        saveTasks()
    }

    return {tasks, getTasksByGroupId, saveTasks, updateOrAddTask}
})
