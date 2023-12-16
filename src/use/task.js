import {useTaskStore} from "@/stores/task.js";
import {ref} from "vue"
import {storeToRefs} from "pinia";

export function useTask(taskGroups) {
    const taskCard = ref(null)
    const editMode = ref(false)
    const tasksStore = useTaskStore()
    const {tasks} = storeToRefs(tasksStore)

    const showTaskCard = (task, groupName, isEditMode = false) => {
        if (task) {
            taskCard.value = {...task, groupName}
        } else {
            taskCard.value = {groupId: taskGroups.value.find(g => g.titile === groupName), groupName}
        }
        editMode.value = isEditMode
    }

    const closeTaskCard = (task, isNeedSave = false) => {
        taskCard.value = null
        editMode.value = false
        if (isNeedSave) {
            tasksStore.updateOrAddTask(task)
        }
    }

    const canEditTask = (groupName) => groupName !== 'Done'

    const orderList = (groupId) => {
        taskGroups.value = taskGroups.value.map((group) => {
            if (group.id === groupId) {
                group.tasks = group.tasks.sort((one, two) => {
                    return two.priority - one.priority;
                });
            }

            return group
        })
    }

    const filterTaskBySearchStr = (groupId) => {
        taskGroups.value = taskGroups.value.map((group) => {
            if (group.id === groupId) {
                group.tasks = tasks.value.filter(t => t.groupId === groupId)
                if (group.searchStr.length > 0) {
                    group.tasks = group.tasks.filter((task) => {
                        return task.title.includes(group.searchStr);
                    });
                }
            }

            return group
        })
    }

    const setEditMode = () => editMode.value = true

    return {taskCard, editMode, showTaskCard, filterTaskBySearchStr, orderList, canEditTask, closeTaskCard, setEditMode}
}
