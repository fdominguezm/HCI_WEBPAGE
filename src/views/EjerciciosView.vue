<template>
  <v-main>
    <SubBar/>
    <ExerciseList class="exerciseList"/>
  </v-main>
</template>

<script>
import ExerciseList from "@/components/ExerciseList";
import SubBar from "@/components/SubBar";

export default {
  name: "EjerciciosView",
  components: { SubBar, ExerciseList},
  data() {
    return {

    }
  },

}
</script>

<style scoped>
.exerciseList{
  margin-top: 50px;
  margin-left: 25px;
}
</style>