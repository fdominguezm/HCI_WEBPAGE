<template>
    <div class="box">
      <v-row justify="center">
        <v-col md="auto">
        <h1>Rutina {{this.id}}</h1>
        </v-col>
        <v-col md="auto">
        <v-btn color="green" @click="open = true"> EDITAR RUTINA
          <v-icon>
            mdi-pencil
          </v-icon></v-btn>
        </v-col>

        <v-col md="auto">
        <v-btn color="red" @click="deleteRoutine()"> ELIMINAR RUTINA
        <v-icon>
          mdi-delete
        </v-icon></v-btn>
        </v-col>
      </v-row>
            <v-col md="auto">
              <v-row justify="center">
            <v-text-field       solo = true
                                outlined = true
                                label="Nombre"
                                class ="textField"
                                background-color= #6797C5
                                color = "white" v-model="name" ></v-text-field>
            <v-text-field label="Detalle" solo = true
                          outlined = true
                          class ="textField"
                          background-color= #6797C5
                          color = "white"
                          v-model="detail" ></v-text-field>
            <v-text-field label="Tipo"
                          solo = true
                          outlined = true
                          class ="textField"
                          background-color= #6797C5
                          color = "white"
                          hint="El tipo es warmup, exercise o cooldown" v-model="type"
                          :error-messages="typeError?'El tipo debe ser warmup, exercise o cooldown': null"></v-text-field>
            <v-text-field label="Cantidad de repeticiones" hint="Number"
                          solo
                          outlined
                          class ="textField"
                          background-color= #6797C5
                          color = "white"
                          v-model="repetitions" ></v-text-field>
                <v-btn           class = "btn1"
                                 elevation="3"
                                 rounded
                                 color= #003D75
                                 x-large
                                 @click="createCycle()">Agregar Ciclo</v-btn>
              </v-row>

            </v-col>

            <!-- <v-text-field label="counter" v-model="counter" outlined></v-text-field> -->
        <v-col>
          <div class="cycles">
            <v-card v-for="cycle in cycles" :key="cycle.id" color="#6797C5" class="card">
              <v-row justify="center">
                <v-card-title >{{cycle.name}}</v-card-title>
              </v-row>
              <v-row justify="center">
                <v-card-actions>
<!--            <router-link :to="{path: `/rutina/${$route.params.id}/ciclo/${cycle.id}`, params: {cycleId: cycle.id}}">-->
              <v-btn color="green">
                <v-icon @click="$router.push({path: `/rutina/${$route.params.id}/ciclo/${cycle.id}`, params: {cycleId: cycle.id}})">
                  mdi-pencil
                </v-icon>
              </v-btn>
<!--            </router-link>-->
            <v-btn color="red" @click="deleteCycle(cycle.id)">
              <v-icon>
                mdi-delete
              </v-icon>
            </v-btn>
          </v-card-actions>
          </v-row>
        </v-card>
        <!-- <textarea cols="100" rows="10" v-model="result"></textarea> -->
      </div>
    </v-col>
    <v-col>
      <router-view>
      </router-view>
    </v-col>

      <v-overlay v-if="open">
        <v-card class="cycleCard" height="27rem" width="35rem" >
          <v-row justify="center">
            <v-col md="auto">
              <h3>Nombre</h3>
              <v-text-field
                  solo
                  outlined
                  label="Ingrese el nombre de su rutina"
                  class ="textField"
                  background-color= #6797C5
                  color = "white"
                  v-model="newName"
              />
              <h3>Detalle</h3>
              <v-text-field
                  solo
                  outlined
                  label="Ingrese el nombre de su rutina"
                  class ="textField"
                  background-color= #6797C5
                  color = "white"
                  v-model="newDetails"
              />
              <h3>Dificultad</h3>
              <v-select solo = true
                        outlined = true
                        label="Ingrese el nombre de su rutina"
                        background-color= #6797C5
                        color = "white"
                        class="textField"
                        :items="diffTypes"
                        v-model="newDifficulty">

              </v-select>
              <v-row >

                <v-btn
                    class = "btn1"
                    elevation="3"
                    rounded
                    color= #003D75
                    x-large
                    @click="modifyRoutine()"
                >
                  EDITAR RUTINA
                </v-btn>
                <v-btn @click="open=false"
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
import { useCycleStore } from '@/store/CycleStore';
import { mapActions } from 'pinia';
import {Cycle, Routine} from "@/api/routine"
import router from "@/router";
import {useRoutineStore} from "@/store/RoutineStore";
// import EjerciciosCiclo from "@/components/EjerciciosCiclo.vue"

export default {
    name: "CiclosRutina",
    components: {
        // EjerciciosCiclo,
    },
    data() {
        return {
            controller: null,
            result: null,
            cycles: [],
            counter: 0,
            name: null,
            detail: null,
            type: null,
            repetitions: 1,
          typeError: false,
          edit: false,
          id: this.$route.params.id,
          newName: this.$route.params.name,
          newDetails:this.$route.params.detail,
          newDifficulty: this.$route.params.difficulty,
          open: false,
          diffTypes: ["rookie", "beginner","intermediate","advanced","expert"],
        }
    },
    methods: {
        ...mapActions(useCycleStore, {
        $createCycle: 'createCycle',
        $modifyCycle: 'modifyCycle',
        $deleteCycle: 'deleteCycle',
        $getCycle: 'getCycle',
        $getAllCycles: 'getAllCycles',
        }),

      ...mapActions(useRoutineStore, {
        $modifyRoutine: 'modifyRoutine',
        $deleteRoutine: 'deleteRoutine',
      }),

        setResult(e) {
            this.result = JSON.stringify(e);
        },


        async deleteRoutine(){
          await this.$deleteRoutine(this.id)
          router.push('/mis_rutinas')
        } ,

      async modifyRoutine(){
          try {
            const routine = new Routine(this.id, this.newName, this.newDetails, this.newDifficulty)
            console.log("hola")
            await this.$modifyRoutine(routine)
            this.open = false
          }catch (e) {
            this.setResult(e);
          }
      } ,

        async deleteCycle(id) {
            await this.$deleteCycle(this.$route.params.id, id);
            this.getAllCycles();
        },
        async createCycle () {
            try {
                if (this.type != "warmup" && this.type!= "exercise" && this.type != "cooldown"){
                  this.typeError = true;
                }
                const cycle = new Cycle(null, this.name, this.detail, this.type, this.counter+1, new Number(this.repetitions));
                await this.$createCycle(new Number(this.$route.params.id), cycle)
                this.counter++
                this.getAllCycles()
            } catch (e) {
                this.setResult(e);
            }
        },
        async getCycle() {
            try {
                const ok = await this.$getCycle(2,1);
                this.setResult(ok);
            } catch (e) {
                this.setResult(e);
            }
        },
        async getAllCycles() {
            try {
                this.controller = new AbortController();
                const cycles = await this.$getAllCycles(this.$route.params.id, this.controller);
                this.controller = null;
                this.cycles = cycles;
                cycles.forEach(element => {
                    if(element.order > this.counter)
                        this.counter = element.order                    
                }); 
                this.setResult(cycles)
            } catch(e) {
                this.setResult(e + 'No Cycles Availavable')
            }
        },
    },
    async created() {
        this.getAllCycles();
    },
}
</script>

<style>
.box{
    margin: 1% 5%; 
}
.box h1 {
    text-align: center;
}
.cycles {
  margin: 1% 5%;
  display: flex;
  flex-wrap: wrap;
  align-content: space-evenly;
}

.btn1{
  color: white;
  width: 15rem;
}

.card{
  margin: 1rem;
  width: 10rem;
  height: 7rem;
}

.textField {
  width: auto;
  margin: auto;
}
</style>