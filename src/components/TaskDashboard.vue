<template>
  <div>
    <div v-for="group in taskGroups" :key="'group-'+group.id" class="card mb-4">
      <div class="d-flex flex-row d-flex justify-content-between bd-highlight">
        <div class="d-flex flex-row d-flex">
          <h3 class="p-2 bd-highlight mr-3 align-middle">{{ group.title }}</h3>
         <div class=" d-flex align-items-center">
           <button v-if="group.title === 'Backlog'" @click="showTaskCard({groupId:group.id},group.title,true)" type="button" class="btn btn-secondary">add Task</button></div>
        </div>
        <div class="p-2 bd-highlight mr-3 d-flex align-items-center">
          <div class="input-group">
            <div class="form-outline">
              <input type="search" v-model.trim="group.searchStr" id="form1" class="form-control" placeholder="Search"/>
            </div>
            <button @click="filterTaskBySearchStr(group.id)" type="button" class="btn btn-primary" data-mdb-ripple-init>
              &#128269;
            </button>
          </div>
        </div>
        <div class="p-2 bd-highlight mr-3 d-flex align-items-center">
          <button @click="orderList(group.id)" type="button" class="btn btn-secondary">sort by priority</button>
        </div>
      </div>


      <VueDraggableNext class="list-group" tag="div" v-bind="dragOptions" v-model="group.tasks" :move="onMove" @start="isDragging=true" @end="onDragEnd">
        <transition-group type="transition" :name="'flip-list'">
          <TaskPreview :showTaskCard="showTaskCard" :canEditTask="canEditTask" :groupName="group.title" role="button" v-for="task in group.tasks" :key="'task-'+task.id" :task="task"
          />
        </transition-group>
      </VueDraggableNext>
    </div>
    <TaskCard v-if="taskCard" :canEditTask="canEditTask" :task="taskCard" :setEditMode="()=>editMode=true" :editMode="editMode" :closeTaskCard="closeTaskCard"/>
  </div>
</template>

<script setup>
import {taskGroupsData} from '@/data/initData.js'
import {VueDraggableNext} from 'vue-draggable-next'
import TaskPreview from "@/components/TaskPreview.vue";
import TaskCard from "@/components/TaskCard.vue";
import {useTaskStore} from "@/stores/task.js";
import {computed, nextTick, ref, watch} from "vue"
import {storeToRefs} from "pinia";


const tasksStore = useTaskStore()
const {tasks} = storeToRefs(tasksStore)

const taskCard = ref(null)
const editMode = ref(false)
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

  // tasks.value = taskGroups.value.map((group) => group.tasks)
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

watch(tasks, addTaskToGroup)

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

</script>