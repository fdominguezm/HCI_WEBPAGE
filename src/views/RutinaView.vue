<template>
    <div>
      <v-main>
        <SubBar/>
        <router-view/>
      </v-main>
    </div>
</template>
    
<script>
// import AgregarEjercicioMenu from "@/components/AgregarEjercicioMenu";
import SubBar from "@/components/SubBar";
export default {
    name: "CrearRutinaView",
    components: {SubBar}
}
</script>

<style scoped>

</style>