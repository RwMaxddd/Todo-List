<template>
  <el-dialog v-model="taskDialogFormVisible" title="Tasks">
    <el-form :model="taskForm" :rules="rules" ref="formRef">
      <el-form-item label="Title" label-width="80px" prop="title">
        <el-input v-model="taskForm.title" placeholder="Please input" autocomplete="off" clearable style="width: 240px"/>
      </el-form-item>
      <el-form-item label="Detail" label-width="80px" prop="detail">
        <el-input
            v-model="taskForm.detail"
            :autosize="{ minRows: 2, maxRows: 4 }"
            type="textarea"
            placeholder="Please input"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeTaskDialog('cancel')">Cancel</el-button>
        <el-button type="primary" @click="closeTaskDialog('confirm')">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>

  <div class="main">
    <div class="column">
      <span class="column-header">To do</span>
      <AddTaskButton @click="openTaskDialog('todo')"></AddTaskButton>
      <div class="task-container">
        <MyTask v-for="todoObj in store.state.todo.todoTasks" :key="todoObj.id" :task="todoObj" ></MyTask>
      </div>
    </div>

    <div class="column in-progress">
      <span class="column-header">In progress</span>
      <AddTaskButton @click="openTaskDialog('inProgress')"></AddTaskButton>
      <div class="task-container">
        <MyTask v-for="inProgressObj in store.state.todo.inProgressTasks" :key="inProgressObj.id" :task="inProgressObj"></MyTask>
      </div>
    </div>

    <div class="column">
      <span class="column-header">Completed</span>
      <AddTaskButton @click="openTaskDialog('completed')"></AddTaskButton>
      <div class="task-container">
        <MyTask v-for="completedObj in store.state.todo.completedTasks" :key="completedObj.id" :task="completedObj"></MyTask>
      </div>
    </div>
  </div>
</template>

<script setup>
import MyTask from './MyTask'
import AddTaskButton from './AddTaskButton'
import {reactive, ref} from "vue";
import {useStore} from "vuex";
import {ElMessage} from "element-plus";

const store = useStore()
const taskDialogFormVisible = ref(false)
const addTaskType = ref("")
const formRef = ref(null)
const taskForm = reactive({
  title:"",
  detail:""
})
const rules = reactive({
  title:[
    {required: true, message: '标题不能为空', trigger: 'change'}
  ],
  detail:[
    {required: true, message: '内容不能为空', trigger: 'change'}
  ]
})
function closeTaskDialog(selectType){
  if (selectType === 'cancel'){
    taskDialogFormVisible.value = false
  }else{
    formRef.value.validate(valid => {
      if (valid){
        taskDialogFormVisible.value = false
        const taskObj = {
          status:addTaskType.value,
          title:taskForm.title,
          detail:taskForm.detail
        }
        store.dispatch("todo/addTask",taskObj).then(res => {
          ElMessage({
            message: res,
            type: 'success',
          })
        }).catch(function (err){
          ElMessage.error(err.message)
        })
      }
    })
  }

}
function openTaskDialog(taskType){
  if (store.state.todo.nowEvent !== ""){
    taskForm.title = ""
    taskForm.detail = ""
    taskDialogFormVisible.value = true
    addTaskType.value = taskType
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
  overflow: auto;
}
.in-progress{
  margin-right: 10px;
  margin-left: 10px;
}

</style>