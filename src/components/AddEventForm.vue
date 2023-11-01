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
</template>

<script setup>
import {reactive, ref} from "vue";
import {ElMessage} from "element-plus";

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

</script>

<style scoped>

</style>