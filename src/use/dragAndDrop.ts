import { useTaskStore } from '@/stores/task'
import { computed, nextTick, type Ref, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { type TaskGroupDataWithTasks } from '@/types/task'
import { type DragContext } from '@/types/dragContext'

export function useDragAndDrop(taskGroups: Ref<TaskGroupDataWithTasks[]>) {
  const tasksStore = useTaskStore()
  const { tasks } = storeToRefs(tasksStore)
  const isDragging = ref<boolean>(false)
  const delayedDragging = ref<boolean>(false)

  const onMove = (context: DragContext) => {
    const relatedElement = context.relatedContext.element
    const draggedElement = context.draggedContext.element

    return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
  }

  const onDragEnd = () => {
    isDragging.value = false
    tasks.value = taskGroups.value.flatMap((group) =>
      group.tasks.map((t) => ({ ...t, groupId: group.id }))
    )

    tasksStore.saveTasks()
  }

  const dragOptions = computed(() => {
    return {
      animation: 0,
      group: 'description',
      disabled: false,
      ghostClass: 'ghost'
    }
  })

  watch(isDragging, (val) => {
    if (val) {
      delayedDragging.value = true
      return
    }
    nextTick(() => {
      delayedDragging.value = false
    })
  })

  return {
    onMove,
    dragOptions,
    onDragEnd
  }
}
