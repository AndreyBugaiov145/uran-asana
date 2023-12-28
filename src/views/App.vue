<template>
  <div class="container mx-auto">
    <div v-if="isError" class="mb-4 rounded bg-red-500 p-4 text-white underline">
      An unexpected error occurred, contact the developers
    </div>
    <TaskDashboard></TaskDashboard>
  </div>
</template>
<script setup>
import TaskDashboard from '@/components/TaskDashboard.vue'
import { useGlobalError } from '@/use/globalError.ts'

const { isError } = useGlobalError()
</script>
