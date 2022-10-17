import { defineStore } from "pinia";
import { ExerciseApi } from "@/api/exercise";


export const useExerciseStore = defineStore("exercise", {
    state: () => ({items:[]}),
    actions: {
        async create(exercise) {
            const result = await ExerciseApi.add(exercise);
            return result;
        },
        async modify(exercise) {
            const result = await ExerciseApi.modify(exercise);
            return result;
        },
        async delete(id) {
            await ExerciseApi.delete(id);
        },
        async get(id) {
            const result = await ExerciseApi.get(id);
            return result;
        },
        async getAll (controller) {
            const result = await ExerciseApi.getAll(controller);
            this.items = result.content;
            return this.items;
        }
    }
})