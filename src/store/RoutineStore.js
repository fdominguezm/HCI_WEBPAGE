import { defineStore } from "pinia";
import { RoutineApi, CycleExerciseApi } from "@/api/routine";
// import { Api } from "@/api/api";
// import { Routine, Cycle, Duration} from "@/api/routine";

export const useRoutineStore = defineStore("routine", {
    state: () => ({
        routines: [],
        cycles: [],
    }),
    actions: {
        async createRoutine(routine) {
            return await RoutineApi.add(routine);
        },
        async modifyRoutine(routine) {
            return await RoutineApi.modify(routine);
        },
        async deleteRoutine(id) {
            await RoutineApi.delete(id);
        },
        async getRoutine(id) {
            return await RoutineApi.get(id);
        },
        async getAllRoutines(controller) {
            const result = await RoutineApi.getAll(controller);
            this.routines = result.content;
            return this.routines;
        },
        async getMyRoutines(controller) {
            const result = await RoutineApi.getMyRoutines(controller);
            this.routines = result.content;
            return this.routines;
        },
        async createCycleExercise(cycleId, exerciseId, duration) {
            return await CycleExerciseApi.add(cycleId, exerciseId, duration);
        },
        async modifyCycleExercise(cycleId, exerciseId, duration) {
            return await CycleExerciseApi.modify(cycleId, exerciseId, duration);
        },
        async deleteCycleExercise(cycleId, exerciseId) {
            await CycleExerciseApi.delete(cycleId, exerciseId);
        },
        async getCycleExercise(cycleId, exerciseId) {
            return await CycleExerciseApi.get(cycleId, exerciseId);
        },
        async getAllCycleExercises(cycleId, controller) {
            const result = await CycleExerciseApi.getAll(cycleId, controller);
            return result.content;
        }
    }
})