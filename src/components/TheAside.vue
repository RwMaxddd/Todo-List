<template>
  <el-dialog v-model="dialogFormVisible" title="Event">
    <el-form :model="form" :rules="rules" ref="formRef">
      <el-form-item label="Event Name" :label-width="'150px'" prop="eventName">
        <el-input v-model="form.eventName" placeholder="Please input" autocomplete="off" clearable style="width: 240px"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog('cancel')">Cancel</el-button>
        <el-button type="primary" @click="closeDialog('confirm')">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>

  <div class="aside">
    <div><h1 class="event-bar-title">.kanban</h1></div>
    <AddButton @click="openDialog"></AddButton>
    <div class="event-container">
      <MyEvent v-for="eventObj in store.state.todo.events" :key="eventObj.id" :event="eventObj"></MyEvent>
    </div>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import AddButton from './AddButton'
import MyEvent from './MyEvent'
import { useStore } from 'vuex'
import {onMounted, reactive, ref} from "vue";

const store = useStore()
const dialogFormVisible = ref(false)
const formRef = ref(null)
const rules = reactive({
  eventName:[
    {required: true, message: '事件名不能为空', trigger: 'change'}
  ]
})
const form = reactive({
  eventName: '',
})
function openDialog(){
  dialogFormVisible.value = true
  form.eventName = ''
}
function closeDialog(closeType){
  if (closeType === 'cancel'){
    dialogFormVisible.value = false
  }else{
    formRef.value.validate(valid => {
      if (valid){
        dialogFormVisible.value = false
        store.dispatch('todo/addEvent',form.eventName).then(res => {
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
onMounted(()=>{
  store.dispatch('todo/getEvents').then(res => {
    ElMessage({
      message: res,
      type: 'success',
    })
  }).catch(function (err){
    ElMessage.error(err.message)
  })
})
</script>

<style scoped>
.aside{
  width: 20vw;
  height: 100vh;
  min-width: 177px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 2px solid #ededed;
}
.event-bar-title{
  font-size: 2.5em;
  padding: 25px 0;
  font-weight: 400;
  font-style: italic;
  text-align: center;
}
.event-container{
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  flex-grow: 1;
  overflow: auto;
}
</style>