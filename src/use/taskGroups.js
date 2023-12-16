import {useTaskStore} from "@/stores/task.js";
import {ref, watch} from "vue"
import {storeToRefs} from "pinia";

export function useTaskGroup(taskGroupsData) {
    const tasksStore = useTaskStore()
    const {tasks} = storeToRefs(tasksStore)
    const taskGroups = ref(taskGroupsData)

    const addTaskToGroup = () => {
        taskGroups.value = taskGroups.value.map((item) => {
            return {
                ...item,
                'tasks': tasksStore.getTasksByGroupId(item.id),
                'searchStr': ''
            }
        })
    }
    addTaskToGroup()
    watch(tasks, addTaskToGroup)

    return {taskGroups}
}
