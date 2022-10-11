<template>
  <div>
      <v-row justify="center">
        <v-col cols="12" md="2">
          <v-btn class="button" text @click="mostrarMenu()">
            <v-icon>mdi-arrow-right-bold</v-icon>
            Cardio
          </v-btn>
        </v-col>
        <v-col cols="12" md="2">
          <v-btn class="button" text>
            <v-icon>mdi-arrow-right-bold</v-icon>
            Core
          </v-btn>
        </v-col>
        <v-col cols="12" md="2">
          <v-btn class="button" text>
            <v-icon>mdi-arrow-right-bold</v-icon>
            Elongacion
          </v-btn>
        </v-col>
        <v-col cols="12" md="2">
          <v-btn class="button" text>
            <v-icon>mdi-arrow-right-bold</v-icon>
            Tren Superior
          </v-btn>
        </v-col>
        <v-col cols="12" md="2">
          <v-btn class="button" text>
            <v-icon>mdi-arrow-right-bold</v-icon>
            Tren Inferior
          </v-btn>
        </v-col>
        <v-col cols="12" md="2">
          <v-btn class="button" text>
            <v-icon>mdi-arrow-right-bold</v-icon>
            Movilidad
          </v-btn>
        </v-col>
      </v-row>
    <ListaEjerciciosDesplegable v-show="menuEjercicios"/>
    <EjercicioDelDia/>
  </div>
</template>

<script>
import ListaEjerciciosDesplegable from "@/components/ListaEjerciciosDesplegable";
import EjercicioDelDia from "@/components/EjercicioDelDia";
export default {
  components: {EjercicioDelDia, ListaEjerciciosDesplegable},
  data() {
    return {
      menuEjercicios: false,

    }
  },
  methods: {
// functions
    mostrarMenu() {
      if (this.menuEjercicios == true) {
        this.menuEjercicios = false;
      }
      else{
        this.menuEjercicios = true;
      }
    }

  },
};
</script>

<style scoped>
  .button{
    width: 150px;
  }
  .col{

  }
</style>