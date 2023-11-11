<template>
  <AddTaskForm></AddTaskForm>
  <UpdateTaskForm></UpdateTaskForm>

  <div class="main">
    <div class="column">
      <span class="column-header">To do</span>
      <AddTaskButton @click="openTaskDialog('todo')"></AddTaskButton>
      <div class="task-container">
        <TransitionGroup name="list">
          <MyTask v-for="todoObj in store.state.todo.todoTasks" :key="todoObj.id" :task="todoObj" ></MyTask>
        </TransitionGroup>
      </div>
    </div>

    <div class="column in-progress">
      <span class="column-header">In progress</span>
      <AddTaskButton @click="openTaskDialog('inProgress')"></AddTaskButton>
      <div class="task-container">
        <TransitionGroup name="list">
          <MyTask v-for="inProgressObj in store.state.todo.inProgressTasks" :key="inProgressObj.id" :task="inProgressObj"></MyTask>
        </TransitionGroup>
      </div>
    </div>

    <div class="column">
      <span class="column-header">Completed</span>
      <AddTaskButton @click="openTaskDialog('completed')"></AddTaskButton>
      <div class="task-container">
        <TransitionGroup name="list">
          <MyTask v-for="completedObj in store.state.todo.completedTasks" :key="completedObj.id" :task="completedObj"></MyTask>
        </TransitionGroup>
      </div>
    </div>
  </div>
</template>

<script setup>
import AddTaskForm from './AddTaskForm'
import UpdateTaskForm from './UpdateTaskForm'
import MyTask from './MyTask'
import AddTaskButton from './AddTaskButton'
import {useStore} from "vuex";

const store = useStore()
function openTaskDialog(taskType){
  if (store.state.todo.nowEvent !== ""){
    store.commit('dialog/openAddTaskDialog',taskType)
  }
}
</script>

<style scoped>
.main{
  padding: 0 50px 50px;
  display: flex;
  align-items: start;
  justify-content: space-between;
}
.column{
  min-width: 230px;
  width: 300px;
  max-height: 700px;
  background-color: #f6f9fa;
  border-radius: 15px;
  padding: 17px 25px;
  font-size: 1.4em;
  font-weight: 400;
  transition: 1s;
}
.column .column-header{
  font-style: italic;
}
.task-container {
  width: 100%;
  min-height: 30px;
  max-height: 480px;
  overflow-y: auto;
  overflow-x: hidden;
}
.in-progress{
  margin-right: 10px;
  margin-left: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>