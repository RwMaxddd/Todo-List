<template>
  <div>
    <TaskForm @confirmHandle="updateTask" @cancelHandle="cancel" @closed="cancel"
              :visible="store.state.dialog.updateTaskFormVisible"
              :title="store.state.dialog.title"
              :detail="store.state.dialog.detail">
    </TaskForm>
  </div>
</template>

<script setup>
import TaskForm from './TaskForm'
import {useStore} from "vuex";
import {ElMessage} from "element-plus";

const store = useStore()

function updateTask(data){
  data.id = store.state.dialog.taskId
  store.commit('dialog/closeDialog','updateTask')
  store.dispatch("todo/updateTaskInformation",data).then(res => {
    ElMessage({
      message: res,
      type: 'success',
    })
  }).catch(function (err){
    ElMessage.error(err.message)
  })
}
function cancel(){
  store.commit('dialog/closeDialog','updateTask')
}
</script>

<style scoped>

</style>