<template>
  <div class="container">
    <div v-if="isError" class="alert alert-danger" role="alert">
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
