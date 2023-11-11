<template>
  <div >
    <TaskForm @confirmHandle="addTask" @cancelHandle="cancel" @closed="cancel" :visible="store.state.dialog.addTaskFormVisible"></TaskForm>
  </div>
</template>

<script setup>
import TaskForm from './TaskForm'
import {useStore} from "vuex";
import {ElMessage} from "element-plus";

const store = useStore()

function addTask(data){
  data.status = store.state.dialog.taskType
  store.commit('dialog/closeDialog','addTask')
  store.dispatch("todo/addTask",data).then(res => {
    ElMessage({
      message: res,
      type: 'success',
    })
  }).catch(function (err){
    ElMessage.error(err.message)
  })
}
function cancel(){
  store.commit('dialog/closeDialog','addTask')
}
</script>

<style scoped>

</style>