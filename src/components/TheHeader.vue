<template>
  <div class="header">
    <h1>All Tasks</h1>
    <el-button round type="danger" @click="deleteEvent" :disabled="isDisabled">Remove this Event</el-button>
  </div>
</template>

<script setup>
import {useStore} from "vuex";
import {computed} from "vue";
import {ElMessage} from "element-plus";

const store = useStore()
let isDisabled = computed(()=>{
  return store.state.todo.nowEvent === "" ? true : false
})
function deleteEvent(){
  store.dispatch("todo/deleteEvent").then(res => {
    ElMessage({
      message: res,
      type: 'success',
    })
  }).catch(function (err){
    ElMessage.error(err.message)
  })
}
</script>

<style scoped>
.header{
  display: flex;
  align-items: center;
  height: 15%;
  min-height: 65px;
  padding: 0 50px;
}
.header .el-button{
  width: auto;
  font-size: 1.1em;
  font-style: italic;
  margin-bottom: 0px;
  margin-left: 35px;
  padding: 20px 10px;
}
.header h1{
  font-size: 2.5em;
  padding: 25px 0;
  font-weight: 500;
  flex-shrink: 0;
}
</style>