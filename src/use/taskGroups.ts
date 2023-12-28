import { useTaskStore } from '@/stores/task'
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { type TaskGroupData } from '@/types/task'

export function useTaskGroup(taskGroupsData: TaskGroupData[]) {
  const tasksStore = useTaskStore()
  const { tasks } = storeToRefs(tasksStore)
  const taskGroups = ref(taskGroupsData)

  const addTaskToGroup = (): void => {
    taskGroups.value = taskGroups.value.map((item) => ({
      ...item,
      tasks: tasksStore.getTasksByGroupId(item.id),
      searchStr: ''
    }))
  }

  addTaskToGroup()
  watch(tasks, addTaskToGroup)

  return { taskGroups }
}
