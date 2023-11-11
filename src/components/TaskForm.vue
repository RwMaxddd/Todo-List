<template>
  <el-dialog v-model="formVisible" title="Tasks">
    <el-form :model="form" ref="formRef" :rules="rules">
      <el-form-item label="Title" label-width="80px" prop="title">
        <el-input v-model="form.title" placeholder="Please input" autocomplete="off" clearable style="width: 240px"/>
      </el-form-item>
      <el-form-item label="Detail" label-width="80px" prop="detail">
        <el-input
            v-model="form.detail"
            :autosize="{ minRows: 2, maxRows: 4 }"
            type="textarea"
            placeholder="Please input"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel">Cancel</el-button>
        <el-button type="primary" @click="confirm" :class="{ shake: disabled }">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import {reactive, ref, defineProps, watch, watchEffect} from "vue";
import {useConfirmAnimation} from "@/hooks/useConfirmAnimation";

const emit = defineEmits(['cancelHandle','confirmHandle'])
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  detail: {
    type: String,
    default: ''
  },
  visible:{
    type:Boolean,
    required: true
  }
})
const formVisible = ref(false)
const formRef = ref(null)
const { disabled, warnDisabled } = useConfirmAnimation()
const rules = reactive({
  title:[
    {required: true, message: '标题不能为空', trigger: 'change'}
  ],
  detail:[
    {required: true, message: '内容不能为空', trigger: 'change'}
  ]
})
const form = reactive({
  title: props.title,
  detail: props.detail,
})
watch(() => props.visible,(newValue) => {
  formVisible.value = newValue
  if (newValue === false){
    form.title = props.title
    form.detail = props.detail
  }
})
watchEffect( () => {
  form.title = props.title
  form.detail = props.detail
})
function cancel(){
  emit('cancelHandle')
}
function confirm(){
  formRef.value.validate(valid => {
    if (valid){
      const data = {
        title:form.title,
        detail:form.detail,
      }
      emit('confirmHandle',data)
    }else {
      warnDisabled()
    }
  })
}

</script>

<style scoped>
@import "../style/ConfirmAnimation.css";
</style>