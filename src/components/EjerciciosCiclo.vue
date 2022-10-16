<template>
    <div>
        <!-- <h1>HOLA</h1> -->
        <h1>{{$route.params.cycleId}}</h1>
        <textarea cols="100" rows="10" v-model="result"></textarea>
    </div>
</template>

<script>
import { useRoutineStore } from '@/store/RoutineStore';
import { mapActions } from 'pinia';
// import {Cycle} from "@/api/routine"

export default {
    name: "EjerciciosCiclo",
    data() {
        return {
            controller: null,
            result: null,
            exercises: [],
        }
    },
    watch: {

    },
    methods: {
        ...mapActions(useRoutineStore, {
        $createCycleExercise: 'createCycleExercise',
        $modifyCycleExercise: 'modifyCycleExercise',
        $deleteCycleExercise: 'deleteCycleExercise',
        $getCycleExercise: 'getCycleExercise',
        $getAllCycleExercises: 'getAllCycleExercises',
        }),
        setResult(e) {
            this.result = JSON.stringify(e);
        },
        // async createCycle () {
        //     try {
        //         const cycle = new Cycle(null, "Hola", "1", "exercise", 7 , 1);
        //         await this.$createCycle(this.routineId, cycle)
        //         this.getAllCycles()
        //     } catch (e) {
        //         this.setResult(e);
        //     }
        // },
        async getAllCycleExercises() {
            try {
                this.controller = new AbortController();
                const exercises = await this.$getAllCycleExercises(this.$route.params.cycleId, this.controller);
                this.controller = null;
                this.exercises = exercises;
                this.setResult(exercises)
            } catch(e) {
                this.setResult("No Exercises")
            }
        },
    },
    async created() {
        this.getAllCycleExercises();
    },
}
</script>