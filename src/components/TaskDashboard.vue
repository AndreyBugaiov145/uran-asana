<template>
  <div>
    <div v-for="group in taskGroups" :key="'group-' + group.id" class="card mb-4">
      <div class="flex items-center justify-between border-b-4">
        <div class="flex items-center">
          <h3
            class="mb-4 mr-3 p-2 text-2xl font-extrabold leading-none tracking-tight text-gray-600 md:text-2xl lg:text-2xl dark:text-white"
          >
            {{ group.title }}
          </h3>
          <div>
            <Button
              v-if="group.title === BacklogGroup"
              @click="showTaskCard({ id: Date.now(), groupId: group.id }, group.title, true)"
            >
              add Task
            </Button>
          </div>
        </div>
        <div class="mr-3 flex items-center p-2">
          <div class="group relative z-0 mb-5 w-full">
            <Input
              type="search"
              v-model.trim="group.searchStr"
              id="form1"
              class="form-control"
              placeholder="Search"
            />
            <Button @click="filterTaskBySearchStr(group.id)"> &#128269; </Button>
          </div>
        </div>
        <div class="mr-3 flex items-center p-2">
          <Button @click="orderList(group.id)"> sort by priority </Button>
        </div>
      </div>

      <VueDraggableNext
        tag="div"
        v-bind="dragOptions"
        v-model="group.tasks"
        :move="onMove"
        @start="isDragging = true"
        @end="onDragEnd"
      >
        <transition-group type="transition" :name="'flip-list'">
          <TaskPreview
            :showTaskCard="showTaskCard"
            :canEditTask="canEditTask"
            :groupName="group.title"
            role="Button"
            v-for="task in group.tasks"
            :key="'task-' + task.id"
            :task="task"
          />
        </transition-group>
      </VueDraggableNext>
    </div>
    <TaskCard
      v-if="taskCard"
      :canEditTask="canEditTask"
      :task="taskCard"
      :setEditMode="setEditMode"
      :editMode="editMode"
      :closeTaskCard="closeTaskCard"
    />
  </div>
</template>

<script setup>
import { BacklogGroup } from '../const/group.ts'
import { taskGroupsData } from '@/data/initData.ts'
import { VueDraggableNext } from 'vue-draggable-next'
import TaskPreview from '@/components/TaskPreview.vue'
import Button from '@/ui/Button.vue'
import Input from '@/ui/Input.vue'
import TaskCard from '@/components/TaskCard.vue'
import { useDragAndDrop } from '@/use/dragAndDrop.ts'
import { useTaskGroup } from '@/use/taskGroups.ts'
import { useTask } from '@/use/task.ts'

const { taskGroups } = useTaskGroup(taskGroupsData)
const { onMove, dragOptions, onDragEnd } = useDragAndDrop(taskGroups)
const {
  taskCard,
  editMode,
  showTaskCard,
  setEditMode,
  filterTaskBySearchStr,
  orderList,
  canEditTask,
  closeTaskCard
} = useTask(taskGroups)
</script>
