import { ref } from 'vue'
import { defineStore } from 'pinia'
import { type Task } from '@/types/task'

export const useTaskStore = defineStore('task', () => {
  let taskData: Task[]
  try {
    const storedData = localStorage.getItem('uran-asana-tasks')
    if (storedData) {
      taskData = JSON.parse(storedData)
    }
  } catch (error) {
    taskData = []
  }

  const tasks = ref<Task[]>(taskData)

  const getTasksByGroupId = (groupId: number): Task[] => {
    return tasks.value.filter((task) => task.groupId === groupId)
  }

  const saveTasks = (): void => {
    try {
      const stringifyTask = JSON.stringify(tasks.value)
      localStorage.setItem('uran-asana-tasks', stringifyTask)
    } catch (e) {
      localStorage.setItem('uran-asana-tasks', '')
    }
  }

  const updateOrAddTask = (task: Task): void => {
    const editedTask = tasks.value.find((t) => t.id === task.id)
    if (editedTask) {
      tasks.value = tasks.value.map((t) => (t.id === task.id ? task : t))
    } else {
      tasks.value = [...tasks.value, task]
    }

    saveTasks()
  }

  return { tasks, getTasksByGroupId, saveTasks, updateOrAddTask }
})
