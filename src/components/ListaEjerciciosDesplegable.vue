<template>
<div>
  <v-sheet class="sheet"
      color="white"
      elevation="5"
      height="60"
      width="1000"
      rounded
  >
    <v-row justify="center">
      <v-col cols="12" md="2">
        <v-btn class="button" text @click.once="$event">
          Cardio
        </v-btn>
      </v-col>
      <v-col cols="12" md="2">
        <v-btn class="button" text>
          Core
        </v-btn>
      </v-col>
      <v-col cols="12" md="2">
        <v-btn class="button" text>
          Elongacion
        </v-btn>
      </v-col>
      <v-col cols="12" md="2">
        <v-btn class="button" text>
          Tren Superior
        </v-btn>
      </v-col>
      <v-col cols="12" md="2">
        <v-btn class="button" text>
          Tren Inferior
        </v-btn>
      </v-col>
      <v-col cols="12" md="2">
        <v-btn class="button" text>
          Movilidad
        </v-btn>
      </v-col>
    </v-row>
  </v-sheet>
</div>
</template>

<script>
export default {
  name: "ListaEjerciciosDesplegable"

}
</script>

<style scoped>
.sheet{
  margin-left: 200px;
}
</style>