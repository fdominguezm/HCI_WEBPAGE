<template>
  <div>
    <v-container >
    <v-row
        justify="center"
    >
      <v-col md="auto">
        <router-link class="links" to="/ejercicios">
          <v-btn class="button"
            color="blue "
            x-large="true"
        >
          Ejercicios
        </v-btn>
        </router-link>
      </v-col>
      <v-col md="auto">
        <router-link class="links" to="/crear_rutina">
        <v-btn class="button"
            color="blue"
            x-large="true"
        >
          Crear rutina
        </v-btn>
        </router-link>
      </v-col>

      <v-col md="auto">
        <router-link class="links" to="mis_rutinas">
          <v-btn class="button"
                 x-large="true"
                 color="blue"
            >
            Mis rutinas
          </v-btn>
        </router-link>
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

.links{
  text-decoration: none;
}
</style>