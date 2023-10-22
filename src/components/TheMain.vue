<template>
  <div class="container">
    <TheHeader></TheHeader>
    <TheContainer></TheContainer>
  </div>
</template>

<script setup>
import TheHeader from './TheHeader'
import TheContainer from './TheContainer'
</script>

<style scoped>
.container{
  width: 80vw;
  height: 100vh;
  overflow: auto;
}

</style>