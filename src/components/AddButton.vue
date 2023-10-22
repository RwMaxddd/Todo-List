<template>
  <div class="add-button">+</div>
</template>

<script setup>
</script>

<style scoped>
.add-button{
  width: 80%;
  height: 45px;
  font-size: 1.3em;
  line-height: 45px;
  background-color: var(--add-button-bc);
  border-radius: 10px;
  margin-bottom: 20px;
  cursor: pointer;
  transition: 0.5s;
  outline: none;
  text-align: center;
}
.add-button:hover{
  background-color: var(--add-button-bc-hover);
}
</style>