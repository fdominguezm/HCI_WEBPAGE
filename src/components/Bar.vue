<template>
    <v-app-bar color="blue" app>
      <div>
        <router-link class="links" to="/">
        <v-btn text>FITLY</v-btn>
          </router-link>
          <!--      <img src="./assets/logofitly.png"/>-->
      </div>
      <v-spacer/>
      <router-link class="links" to="/iniciar_sesion">
      <v-btn text>Iniciar Sesion</v-btn>
        </router-link>
    </v-app-bar>
</template>

<script>
export default {
  name: "IniciarSesion"
}
</script>

<style scoped>
.links{
  text-decoration: none;
}

</style>