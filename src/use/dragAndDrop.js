import {useTaskStore} from "@/stores/task.js";
import {computed, nextTick, ref, watch} from "vue"
import {storeToRefs} from "pinia";

export function useDragAndDrop(taskGroups) {
    const tasksStore = useTaskStore()
    const {tasks} = storeToRefs(tasksStore)
    const isDragging = ref(false)
    const delayedDragging = ref(false)

    const onMove = (context) => {
        const relatedElement = context.relatedContext.element;
        const draggedElement = context.draggedContext.element;

        return (
            (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
        );
    }
    const onDragEnd = () => {
        isDragging.value = false
        tasks.value = taskGroups.value.map((group) => {
            return group.tasks.map((t) => {
                t.groupId = group.id
                return t
            })
        }).reduce((array, tasks) => [...array, ...tasks], []);
        tasksStore.saveTasks()
    }
    const dragOptions = computed(() => {
        return {
            animation: 0,
            group: "description",
            disabled: false,
            ghostClass: "ghost"
        };
    })

    watch(isDragging, (val) => {
            if (val) {
                delayedDragging.value = true;
                return;
            }
            nextTick(() => {
                delayedDragging.value = false;
            });
        }
    )

    return {
        onMove, dragOptions, onDragEnd
    }
}
