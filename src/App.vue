<template>
  <!-- App.vue -->

  <v-app>

    <v-app-bar color="blue" app>
      <div>
        <h3>FITLY</h3>
        <!--      <img src="./assets/logofitly.png"/>-->
      </div>
      <v-spacer/>
      <IniciarSesion/>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>
      <div>Hola</div>
      <div>Parte 2</div>
    </v-main>

    <v-footer app>
    </v-footer>
  </v-app>
</template>

<script>
import IniciarSesion from "@/components/IniciarSesion";

export default {
  name: 'App',

  components: {
    IniciarSesion,
  },

  data: () => ({
    //
  }),
};
</script>