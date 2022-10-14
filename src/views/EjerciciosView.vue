<template>
<div>
  <v-main>
    <SubBar/>
    <ExerciseList class="exerciseMenu"/>
  </v-main>
</div>
</template>

<script>
import ExerciseList from "@/components/ExerciseList";
import SubBar from "@/components/SubBar";
export default {
  name: "EjerciciosView",
  components: {SubBar, ExerciseList}
}
</script>

<style scoped>
  .exerciseMenu {
    margin-left: 50px;
  }
</style>