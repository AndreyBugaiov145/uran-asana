<template>
  <div>
    <div v-for="group in taskGroups" :key="'group-'+group.id" class="card mb-4">
      <div class="d-flex flex-row d-flex justify-content-between bd-highlight">
        <div class="d-flex flex-row d-flex">
          <h3 class="p-2 bd-highlight mr-3 align-middle">{{ group.title }}</h3>
          <div class=" d-flex align-items-center">
            <button v-if="group.title === 'Backlog'" @click="showTaskCard({id:Date.now(),groupId:group.id},group.title,true)" type="button" class="btn btn-secondary">add Task</button>
          </div>
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
    <TaskCard v-if="taskCard" :canEditTask="canEditTask" :task="taskCard" :setEditMode="setEditMode" :editMode="editMode" :closeTaskCard="closeTaskCard"/>
  </div>
</template>

<script setup>
import {taskGroupsData} from '@/data/initData.js'
import {VueDraggableNext} from 'vue-draggable-next'
import TaskPreview from "@/components/TaskPreview.vue";
import TaskCard from "@/components/TaskCard.vue";
import {useDragAndDrop} from "@/use/dragAndDrop.js";
import {useTaskGroup} from "@/use/taskGroups.js";
import {useTask} from "@/use/task.js";

const {taskGroups} = useTaskGroup(taskGroupsData)
const {onMove, dragOptions, onDragEnd} = useDragAndDrop(taskGroups)
const {taskCard, editMode, showTaskCard, setEditMode, filterTaskBySearchStr, orderList, canEditTask, closeTaskCard} = useTask(taskGroups)
</script>