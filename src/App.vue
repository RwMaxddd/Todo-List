<template>
  <TheAside></TheAside>
  <TheMain></TheMain>
</template>

<script setup>
import TheAside from './components/TheAside'
import TheMain from './components/TheMain'
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
:root{
  --add-button-bc:rgb(234,241,240);
  --add-button-bc-hover:rgb(223,226,226);
  --my-event-color:black;
  --my-event-color-hover:white;
  --my-event-bc-color:white;
  --my-event-bc-color-hover:rgb(237,141,106);
  --my-event-bc-color-active:rgb(232,106,61);
}
#app {
  display: flex;
}
</style>
