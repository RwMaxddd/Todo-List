<template>
  <div class="task" ref="taskDom">
    <h2 class="task-name">{{props.task.title}}</h2>
    <p class="task-details">{{props.task.detail}}</p>
    <div class="end">
      <div class="update-status">
        <ArrowLeft class="left" v-show="isShowLeft" @click="updateStatus(-1)"/>
        <ArrowRight class="right" v-show="isShowRight" @click="updateStatus(1)"/>
      </div>
      <div class="redact">
        <Edit class="edit" @click="openDialog"/>
        <Delete class="delete" @click="deleteTask"/>
      </div>
    </div>
  </div>

</template>

<script setup>
import { Edit } from '@element-plus/icons-vue'
import { Delete } from '@element-plus/icons-vue'
import { ArrowLeft } from '@element-plus/icons-vue'
import { ArrowRight } from '@element-plus/icons-vue'
import {computed, defineProps} from "vue";
import {useStore} from "vuex";
import {ElMessage} from "element-plus";

const store = useStore()
const props = defineProps(['task'])
let isShowLeft = computed(()=>{
  return props.task.status === 'todo' ? false:true
})
let isShowRight = computed(()=>{
  return props.task.status === 'completed' ? false:true
})
function openDialog(){
  const data = {
    title:props.task.title,
    detail:props.task.detail,
    taskId:props.task.id
  }
  store.commit('dialog/openUpdateTaskDialog',data)
}

function deleteTask(){
  store.dispatch("todo/deleteTask",props.task.id).then(res => {
    ElMessage({
      message: res,
      type: 'success',
    })
  }).catch(function (err){
    ElMessage.error(err.message)
  })
}
function updateStatus(directionNum){
  const obj = {
    directionNum,
    taskId:props.task.id,
    taskStatus:props.task.status
  }
  store.dispatch("todo/updateProgress",obj).catch(function (err){
    ElMessage.error(err.message)
  })
}
</script>

<style scoped>
@import "../style/ConfirmAnimation.css";
.task{
  background-color: #fff;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 18px;
  transition: 0.2s;
  user-select: none;
  border: 1px solid #ccc;
  outline: none;
}
.task:hover {
  background-color: rgba(0, 119, 256, 0.014);
  transition: 0.2s;
}
.task-name{
  font-style: normal;
  font-size: 0.9em;
  font-weight: 300;
  line-height: 1.1em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.task-name::before {
  content: '●';
  font-style: normal;
  color: #f19737;
  margin-right: 10px;
}
.task-details {
  font-style: normal;
  font-weight: 300;
  font-size: 0.8em;
  color: #9c9c9c;
  word-wrap: break-word;
  margin-top: 10px;
  line-height: 1.1em;
}
.end{
  display: flex;
  justify-content: space-between;
  margin-top: 14px;
}
.left,
.right,
.edit,
.delete{
  width: 1em;
  height: 1em;
  margin-right: 8px;
  transition: color .2s;
  cursor: pointer;
}
.left:hover,
.right:hover,
.edit:hover,
.delete:hover{
  color: skyblue;
}
</style>