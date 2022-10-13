<template>
    <v-app-bar color=#003D75 app>
      <div>
        <router-link class="links" to="/">
          <v-btn text color="white">FITLY</v-btn>
        </router-link>
          <!--      <img src="./assets/logofitly.png"/>-->
      </div>
      <v-spacer/>
      <router-link class="links" to="/iniciar_sesion">
      <v-btn text color="white">Iniciar Sesion
        <v-icon x-large>
          mdi-account-circle
        </v-icon>
      </v-btn>
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