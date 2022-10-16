import { defineStore } from "pinia";
import { RoutineCycleApi } from "@/api/routine";

export const useCycleStore = defineStore("cycle", {
    actions: {
        async createCycle(routineId, routineCycle) {
            return await RoutineCycleApi.add(routineId, routineCycle);
        },
        async modifyCycle(routineId, routineCycle) {
            return await RoutineCycleApi.modify(routineId, routineCycle);
        },
        async deleteCycle(routineId, id) {
            await RoutineCycleApi.delete(routineId, id);
        },
        async getCycle(routineId, id) {
            return await RoutineCycleApi.get(routineId, id);
        },
        async getAllCycles(routineId, controller) {
            const result = await RoutineCycleApi.getAll(routineId, controller);
            this.cycles = result.content;
            return this.cycles;
        },
    }
})