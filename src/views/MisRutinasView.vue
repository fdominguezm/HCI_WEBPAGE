<template>
<div>
      <v-main>
        <SubBar/>
        <!-- <router-link :to="{path: `/rutina/${this.id}`, params: {id: this.id}}"><v-btn>hola</v-btn></router-link> -->
        <!-- <router-link ><v-btn>hola</v-btn></router-link> -->
        <v-btn class = "btn1"
               elevation="3"
               rounded
               color= #003D75
               x-large
               @click="openCard()"
        > AGREGAR RUTINA
        <v-icon >
          mdi-plus-thick
        </v-icon>
        </v-btn>
        <RoutineCard/>
      </v-main>

      <v-overlay v-if="open">
        <v-card class="cycleCard" height="27rem" width="35rem" >
          <v-row justify="center">
          <v-col md="auto">
          <h3>Nombre</h3>
          <v-text-field
              solo = true
              outlined = true
              label="Ingrese el nombre de su rutina"
              class ="textField"
              background-color= #6797C5
              color = "white"
              v-model="routineName"
          />
            <h3>Detalle</h3>
            <v-text-field
                solo = true
                outlined = true
                label="Ingrese el nombre de su rutina"
                class ="textField"
                background-color= #6797C5
                color = "white"
                v-model="routineDetails"
            />
            <h3>Dificultad</h3>
            <v-select solo = true
            outlined = true
            label="Ingrese el nombre de su rutina"
            background-color= #6797C5
            color = "white"
                      class="textField"
                      :items="diffTypes"
                      v-model="routineDifficulty">

            </v-select>
          <v-row >

          <v-btn
              class = "btn1"
              elevation="3"
              rounded
              color= #003D75
              x-large
              @click="createRoutine()"
            >
            CREAR RUTINA
          </v-btn>
            <v-btn @click="closeCard"
                   class = "btn1"
                   elevation="3"
                   rounded
                   color= #003D75
                   x-large>
              CANCELAR
            </v-btn>
          </v-row>
          </v-col>
          </v-row>
        </v-card>
      </v-overlay>
</div>
</template>

<script>
import SubBar from '@/components/SubBar.vue'
import RoutineCard from "../components/RoutineCard.vue";
import {useRoutineStore} from "@/store/RoutineStore";
import {Routine} from "@/api/routine";
import {mapActions} from "pinia";

export default {
  name: "MisRutinasView",
  components:{
    SubBar,
    RoutineCard
  },

  data(){
    return{
      open: false,
      routineName: "",
      routineDifficulty: "",
      routineDetails: "",
      diffTypes: ["rookie", "beginner","intermediate","advanced","expert"],
    }
  },

  methods:{
    ...mapActions(useRoutineStore,{
          $createRoutine: 'createRoutine'
    }),

    openCard() {
      this.open = true
    },
    closeCard(){
      this.open = false
    },

    async createRoutine(){
      const routine = new Routine(null, this.routineName, this.routineDetails, this.routineDifficulty)
      await this.$createRoutine(routine);
      
      this.closeCard()
    }
  }
}
</script>

<style scoped>
.btn1{
  color: white;
  width: 15rem;
  text-align: right;
}

.cycleCard{
  align-self: center;
  margin-top: 0;
}

.textField {
  width: 400px;
  margin: auto;
  color: white;
}

</style>