<template>
    <div>
        <v-row justify="center">
            <h1>Ciclo {{$route.params.cycleId}} </h1>
            <v-btn class = "btn1"
            elevation="3"
            rounded
            color= #003D75
            x-large
            @click="goTo()">Ver Ejercicios</v-btn>
        </v-row>
        <br>
        <v-col md="auto">
              <v-row justify="center">
            <v-text-field label="Duración" solo = true
                          outlined = true
                          class ="textField"
                          background-color= #6797C5
                          color = "white"
                          v-model="duration" ></v-text-field>
            <v-text-field label="Cantidad de repeticiones" hint="Number"
                          solo
                          outlined
                          class ="textField"
                          background-color= #6797C5
                          color = "white"
                          v-model="repetitions" ></v-text-field>
            <!-- <v-text-field v-model="counter"></v-text-field> -->
            <v-text-field label="Ejercicio"
                            hint="Number"
                          solo = true
                          outlined = true
                          class ="textField"
                          background-color= #6797C5
                          color = "white"
                           v-model="exerciseId"
                          :error-messages="typeError?'El tipo debe ser warmup, exercise o cooldown': null"></v-text-field>
                <v-btn           class = "btn1"
                                 elevation="3"
                                 rounded
                                 color= #003D75
                                 x-large
                                 @click="createExercise()">Agregar Ejercicio</v-btn>
                
              </v-row>
            </v-col>
        <!-- <v-card color="#6797C5" class="card">
              <v-row justify="center">
            <v-card-actions>
            <v-btn color="red" @click="deleteCycle(cycle.id)">
              <v-icon>
                mdi-delete
              </v-icon>
            </v-btn>
          </v-card-actions>
          </v-row>
        </v-card> -->
        <text-area cols="100" rows="10" v-model="result"/>
    </div>
</template>

<script>
import { useRoutineStore } from '@/store/RoutineStore';
import { mapActions } from 'pinia';
import router from "@/router"
import { Duration } from '@/api/routine';
// import {Cycle} from "@/api/routine"

export default {
    name: "EjerciciosCiclo",
    data() {
        return {
            controller: null,
            result: null,
            exercises: [],
            counter: 0,
            duration: null,
            exerciseId: null,
            repetitions: null,
        }
    },
    // components: {
    //     router,
    // },
    methods: {
        ...mapActions(useRoutineStore, {
        $createCycleExercise: 'createCycleExercise',
        $modifyCycleExercise: 'modifyCycleExercise',
        $deleteCycleExercise: 'deleteCycleExercise',
        // $getCycleExercise: 'getCycleExercise',
        $getAllCycleExercises: 'getAllCycleExercises',
        }),
        setResult(e) {
            this.result = JSON.stringify(e);
        },
        goTo() {
            router.push(`/ejercicios`);
        },
        async createCycleExercise () {
            try {
                const cycleExercise = new Duration(new Number(this.counter + 1), new Number(this.duration), new Number(this.repetitions));
                await this.$createCycleExercise(new Number (this.$route.params.cycleId), new Number(this.exerciseId), cycleExercise)
                this.getAllCycles()
            } catch (e) {
                this.setResult(e);
            }
        },
        async getAllCycleExercises() {
            try {
                this.controller = new AbortController();
                const exercises = await this.$getAllCycles(this.$route.params.id, this.controller);
                this.controller = null;
                this.exercises = exercises;
                exercises.forEach(element => {
                    if(element.order > this.counter)
                        this.counter = element.order                    
                }); 
                this.setResult(exercises)
            } catch(e) {
                this.setResult('Exercises')
            }
        },
    },
    async created() {
        this.getAllCycleExercises();
    },
}
</script>