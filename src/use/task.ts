import { useTaskStore } from '@/stores/task'
import { ref, type Ref } from 'vue'
import { storeToRefs } from 'pinia'
import { DoneGroup } from '@/const/group'
import { type Task, type TaskGroupDataWithTasks } from '@/types/task'

export function useTask(taskGroups: Ref<TaskGroupDataWithTasks[]>) {
  const taskCard = ref<null | { groupId?: number; groupName: string }>(null)
  const editMode = ref<boolean>(false)
  const tasksStore = useTaskStore()
  const { tasks } = storeToRefs(tasksStore)

  const showTaskCard = (task: Task | null, groupName: string, isEditMode = false): void => {
    if (task) {
      taskCard.value = { ...task, groupName }
    } else {
      const groupId = taskGroups.value.find((g) => g.title === groupName)?.id
      taskCard.value = { groupId, groupName }
    }
    editMode.value = isEditMode
  }

  const closeTaskCard = (task: Task, isNeedSave = false): void => {
    taskCard.value = null
    editMode.value = false
    if (isNeedSave) {
      tasksStore.updateOrAddTask(task)
    }
  }

  const canEditTask = (groupName: string): boolean => groupName !== DoneGroup

  const orderList = (groupId: number): void => {
    taskGroups.value = taskGroups.value.map((group) => {
      if (group.id === groupId) {
        group.tasks.sort((one, two) => two.priority - one.priority)
      }

      return group
    })
  }

  const filterTaskBySearchStr = (groupId: number): void => {
    taskGroups.value = taskGroups.value.map((group) => ({
      ...group,
      tasks:
        group.id === groupId
          ? tasks.value
              .filter((task) => task.groupId === groupId)
              .filter((task) =>
                group.searchStr?.length > 0 ? task.title.includes(group.searchStr || '') : true
              )
          : group.tasks
    }))
  }

  const setEditMode = (): void => {
    editMode.value = true
  }

  return {
    taskCard,
    editMode,
    showTaskCard,
    filterTaskBySearchStr,
    orderList,
    canEditTask,
    closeTaskCard,
    setEditMode
  }
}
