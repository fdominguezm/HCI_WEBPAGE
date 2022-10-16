<template>
<div>
      <v-main>
        <SubBar/>
        <!-- <router-link :to="{path: `/rutina/${this.id}`, params: {id: this.id}}"><v-btn>hola</v-btn></router-link> -->
        <!-- <router-link ><v-btn>hola</v-btn></router-link> -->
        <RoutineCard/>
      </v-main>
</div>
</template>

<script>
import SubBar from '@/components/SubBar.vue'
import RoutineCard from "../components/RoutineCard.vue";

export default {
  name: "MisRutinasView",
  components:{
    SubBar,
    RoutineCard
  },
}
</script>

<style scoped>
</style>