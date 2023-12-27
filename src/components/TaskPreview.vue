<template>
  <li class="list-group-item"  @click.prevent="showTaskCard(task,groupName)">
    <div class="d-flex justify-content-between">
      <div>{{task.title}}</div>
      <div>{{truncateString(task.description)}}</div>
      <div>P{{task.priority}}</div>
      <button v-if="canEditTask(groupName)" @click.stop="showTaskCard(task,groupName,true)" class="btn btn-primary">edit</button>
    </div>
  </li>
</template>

<script setup>
const {task,showTaskCard,groupName,canEditTask} = defineProps(['task','showTaskCard','groupName','canEditTask'])
import {truncateString} from '../common/textfunc.js'
</script>