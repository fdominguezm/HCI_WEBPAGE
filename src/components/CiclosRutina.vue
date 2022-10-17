<template>
    <div class="box">
        <h1>Rutina {{this.$route.params.id}}</h1>

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

      <router-view>
      </router-view>

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
    </div>
</template>

<script>
import { useCycleStore } from '@/store/CycleStore';
import { mapActions } from 'pinia';
import {Cycle} from "@/api/routine"
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
        }
    },
    // props: {
    //     routineId: {
    //         type: Number,
    //         required: true,
    //     },
    // },
    methods: {
        ...mapActions(useCycleStore, {
        $createCycle: 'createCycle',
        $modifyCycle: 'modifyCycle',
        $deleteCycle: 'deleteCycle',
        $getCycle: 'getCycle',
        $getAllCycles: 'getAllCycles',
        }),
        setResult(e) {
            this.result = JSON.stringify(e);
        },
        // selected(id) {
        //     this.cycle = id;
        // },
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