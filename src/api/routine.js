import { Api } from "./api";

export { RoutineApi, RoutineCycleApi, CycleExerciseApi }
export { Routine, Cycle, Duration}

class RoutineApi {
    static getUrl(slug) {
        return `${Api.baseUrl}/routines${ slug ? `/${slug}` : ""}`;
    }
    static async add(routine, controller) {
        return await Api.post(RoutineApi.getUrl(), true, routine, controller);
       }
     
       static async modify(routine, controller) {
        return await Api.put(RoutineApi.getUrl(routine.id), true, routine, controller);
       }
     
       static async delete(id, controller) {
        return await Api.delete(RoutineApi.getUrl(id), true, controller);
       }
     
       static async get(id, controller) {
        return await Api.get(RoutineApi.getUrl(id), true,  controller);
       }
     
       static async getMyRoutines(controller) {
        const result = await Api.get(`${Api.baseUrl}/users/current/routines?page=0&size=1&orderBy=date&direction=asc`, true, controller);
        return await Api.get(`${Api.baseUrl}/users/current/routines?page=0&size=${result.totalCount}&orderBy=date&direction=asc`, true, controller);
       }
       static async getAll(controller) {
        const result = await Api.get(`${Api.baseUrl}/routines?page=0&size=1&orderBy=id&direction=asc`, true, controller);
        return await Api.get(`${Api.baseUrl}/routines?page=0&size=${result.totalCount}&orderBy=id&direction=asc`, true, controller);
       }
}

class RoutineCycleApi {
    static getUrl(id, slug) {
        return `${Api.baseUrl}/routines/${id}/cycles${ slug ? `/${slug}` : ""}`;
    }
    static async add(routineId, routineCycle, controller) {
        return await Api.post(RoutineCycleApi.getUrl(routineId), true, routineCycle, controller);
    }
    
    static async modify(routineId, routineCycle, controller) {
        return await Api.put(RoutineCycleApi.getUrl(routineId, routineCycle.id), true, routineCycle, controller);
    }
    
    static async delete(routineId, id, controller) {
        return await Api.delete(RoutineCycleApi.getUrl(routineId, id), true, controller);
    }
    
    static async get(routineId, id, controller) {
        return await Api.get(RoutineCycleApi.getUrl(routineId, id), true,  controller);
    }
    
    static async getAll(routineId, controller) {
        const result = await Api.get(`${Api.baseUrl}/routines/${routineId}/cycles?page=0&size=1&orderBy=id&direction=asc`, true, controller);
        return await Api.get(`${Api.baseUrl}/routines/${routineId}/cycles?page=0&size=${result.totalCount}&orderBy=order&direction=asc`, true, controller);
    }
}

class CycleExerciseApi {
    static getUrl(id = 1, slug) {
        return `${Api.baseUrl}/cycles/${id}/exercises${ slug ? `/${slug}` : ""}`;
    }
    static async add(cycleId, exerciseId, duration, controller) {
        return await Api.post(CycleExerciseApi.getUrl(cycleId, exerciseId), true, duration, controller);
    }
    
    static async modify(cycleId, exerciseId, duration, controller) {
        return await Api.put(CycleExerciseApi.getUrl(cycleId, exerciseId), true, duration, controller);
    }
    
    static async delete(cycleId, exerciseId, controller) {
        return await Api.delete(CycleExerciseApi.getUrl(cycleId, exerciseId), true, controller);
    }
    
    static async get(cycleId, exerciseId, controller) {
        return await Api.get(CycleExerciseApi.getUrl(cycleId, exerciseId), true,  controller);
    }
    
    static async getAll(cycleId, controller) {
        const result = await Api.get(`${Api.baseUrl}/cycles/${cycleId}/exercises?page=0&size=1&orderBy=order&direction=asc`, true, controller);
        return await Api.get(`${Api.baseUrl}/cycles/${cycleId}/exercises?page=0&size=${result.totalCount}&orderBy=order&direction=asc`, true, controller);
        // return await Api.get(`${Api.baseUrl}/cycles/${cycleId}/exercises`, true, controller);
    }
}

class Routine {
    constructor(id, name, detail, difficulty) {
        if (id) {
          this.id = id;
        }
        this.name = name;
        this.detail = detail;
        this.isPublic = true;
        this.difficulty = difficulty;
      }
}

class Cycle {
    constructor(id, name, detail, type, order, repetitions) {
        if (id) {
          this.id = id;
        }
        this.name = name;
        this.detail = detail;
        this.type = type;
        this.order = order;
        this.repetitions = repetitions;
      }
}

class Duration {
    constructor(order, duration, repetitions) {
        this.order = order;
        this.duration = duration;
        this.repetitions = repetitions;
    }
}