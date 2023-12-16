<template>
  <div class="modal fade show d-block z-2 bg-dark bg-opacity-50 d-flex align-items-center" @click.prevent="closeTaskCard(task)">
    <div class="container  z-3">
      <div class="container" @click.stop v-if="!editMode">
        <div class="card">
          <h5 class="card-header">Task</h5>
          <div class="card-body">
            <h5 class="card-title">{{ task.title }}</h5>
            <p class="card-text">{{ task.description }}</p>
            <button v-if="canEditTask(task.groupName)" @click.stop="setEditMode" class="btn btn-primary ml-3">edit</button>
            <button @click.stop="closeTaskCard(task)" class="btn btn-primary m-1">close</button>
          </div>
        </div>
      </div>

      <div class="container" @click.stop v-else>
        <form class="card  p-5">
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Title</label>
            <input v-model="title" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">

          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Priority</label>
            <input v-model="priority" type="number" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Description</label>
            <textarea v-model="description" type="password" class="form-control" id="exampleInputPassword1"/>
          </div>
          <button type="submit" class="btn btn-primary" @click.stop="saveTask">Save</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";

const {task, editMode, closeTaskCard, setEditMode, canEditTask} = defineProps(['task', 'editMode', 'closeTaskCard', 'setEditMode', 'canEditTask'])
const title = ref(task.title || '')
const description = ref(task.description || '')
const priority = ref(task.priority || '')

const saveTask = () => {
  closeTaskCard({...task, title: title.value, description: description.value, priority: priority.value || 0}, true)
}

</script>