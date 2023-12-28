<template>
  <div class="overflow-hidden bg-white p-5 antialiased dark:bg-gray-900">
    <div
      class="fixed left-0 right-0 top-0 z-50 flex h-[calc(100%-1rem)] max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden md:inset-0"
      @click.prevent="closeTaskCard(task)"
    >
      <div class="relative max-h-full w-full max-w-2xl p-4">
        <div class="relative rounded-lg bg-white shadow dark:bg-gray-700">
          <div class="container m-2" @click.stop v-if="!editMode">
            <div>
              <h5 class="card-header m-3 text-3xl font-bold dark:text-white">Task</h5>
              <div>
                <h5 class="m-2">{{ task.title }}</h5>
                <p class="card-text m-2">{{ task.description }}</p>
                <Button v-if="canEditTask(task.groupName)" @click.stop="setEditMode"> edit </Button>
                <Button @click.stop="closeTaskCard(task)" class="btn btn-primary m-1">close</Button>
              </div>
            </div>
          </div>

          <div class="container" @click.stop v-else>
            <form class="card p-5">
              <div class="m-2 mb-3">
                <label class="card-header text-1xl m-3 font-bold dark:text-white">Title</label>
                <Input v-model="title" type="text" aria-describedby="emailHelp" />
              </div>
              <div class="mb-3">
                <label class="text-1xl m-3 font-bold dark:text-white">Priority</label>
                <Input v-model="priority" type="number" aria-describedby="emailHelp" />
              </div>
              <div class="mb-2">
                <label class="card-header text-1xl m-3 font-bold dark:text-white"
                  >Description</label
                >
                <textarea
                  v-model="description"
                  class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  id="exampleInputPassword1"
                ></textarea>
              </div>
              <Button @click.stop="saveTask">Save</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="fixed inset-0 z-40 bg-gray-900/50 dark:bg-gray-900/80"></div>
  </div>
</template>

<script setup>
import { useTaskFields } from '@/use/taskFields.ts'
import Button from '@/ui/Button.vue'
import Input from '@/ui/Input.vue'

const { task, editMode, closeTaskCard, setEditMode, canEditTask } = defineProps([
  'task',
  'editMode',
  'closeTaskCard',
  'setEditMode',
  'canEditTask'
])
const { title, description, priority } = useTaskFields(task)

const saveTask = () => {
  closeTaskCard(
    { ...task, title: title.value, description: description.value, priority: priority.value || 0 },
    true
  )
}
</script>
