<template>
  <div class="event" :class="{active:isActive}" @click="clickEvent(props.event)">{{ props.event.eventName}}</div>
</template>

<script setup>
import {computed} from "vue";
import {useStore} from "vuex";

const store = useStore()
const props = defineProps(['event'])
const isActive = computed(()=>{
  return props.event.id === store.state.todo.nowEventId
})
function clickEvent(eventObj){
  store.dispatch("todo/getTasks",eventObj)
}
</script>

<style scoped>
.event{
  text-align: center;
  font-size: 24px;
  line-height: 48px;
  width: 70%;
  height: 48px;
  font-weight: 400;
  border-radius: 10px;
  margin-bottom: 10px;
  transition: 0.5s;
  cursor: pointer;
  color: var(--my-event-color);
  background-color: var(--my-event-bc-color);
}
.event:hover{
  color: var(--my-event-color-hover);
  background-color: var(--my-event-bc-color-hover);
}
.active{
  background-color: var(--my-event-bc-color-active);
  color: var(--my-event-color-hover);
}
</style>