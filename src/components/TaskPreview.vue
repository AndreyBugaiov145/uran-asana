<template>
  <div
    class="list-group-item cursor-grabbing border-b-2 p-2"
    @click.prevent="showTaskCard(task, groupName)"
  >
    <div class="flex justify-between">
      <div>{{ task.title }}</div>
      <div>{{ truncateString(task.description) }}</div>
      <div>P{{ task.priority }}</div>
      <Button v-if="canEditTask(groupName)" @click.stop="showTaskCard(task, groupName, true)">
        edit
      </Button>
    </div>
  </div>
</template>

<script setup>
import Button from '@/ui/Button.vue'
const { task, showTaskCard, groupName, canEditTask } = defineProps([
  'task',
  'showTaskCard',
  'groupName',
  'canEditTask'
])
import { truncateString } from '../common/textfunc.ts'
</script>
