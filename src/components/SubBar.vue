<template>
  <div >
    <v-container >
    <v-row
        justify="center"
    >
      <v-col md="auto">
        <v-btn class="button"
            color="blue "
            x-large="true"
        >
          Ejercicios
        </v-btn>
      </v-col>
      <v-col md="auto">
        <v-btn class="button"
            color="blue"
            x-large="true"
        >
          Crear rutina
        </v-btn>
      </v-col>

      <v-col md="auto">
          <v-btn class="button"
                 x-large="true"
                 color="blue"
            >
            Mis rutinas
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "SubBar"
}
</script>

<style scoped>
.button{
  width: 300px;
  font-size: 25px;
  font-weight: bold;
  color: white;
}
</style>