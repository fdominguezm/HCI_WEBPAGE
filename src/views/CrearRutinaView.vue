<template>
<div>
  <v-main>
    <SubBar/>
    <AgregarEjercicioMenu/>
  </v-main>
</div>
</template>

<script>
import AgregarEjercicioMenu from "@/components/AgregarEjercicioMenu";
import SubBar from "@/components/SubBar";
export default {
  name: "CrearRutinaView",
  components: {SubBar, AgregarEjercicioMenu}
}
</script>

<style scoped>

</style>