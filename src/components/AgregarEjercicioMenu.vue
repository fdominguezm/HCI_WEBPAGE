<template>
  <div class="box">
    <div>
      <v-card width="300">
        <v-card-title class="white--text orange darken-4">
          Agregar Ejercicio
        </v-card-title>
      </v-card>
      <v-virtual-scroll width="300"
        benched="0"
        :items="$items"
        height="400"
        item-height="64"
        >
        <template v-slot:default="{item}">
          <v-list-item :key="item.id">
            <v-list-item-action>
              <v-btn
              fab
              small
              color="primary"
              >
              {{ item.id }}
            </v-btn>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              <!-- Ejercicio <strong>N {{ item.id }}</strong> -->
              {{item.name}}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
      </template>
    </v-virtual-scroll>
    </div>
    <div>
      <CiclosRutina routine-id="2"></CiclosRutina>
      <!-- <v-container>
        <v-row>
          <v-column>
            <v-btn @click="getRoutine(2)">1</v-btn>
            <v-btn @click="getCycle(2,2)">2</v-btn>
            <v-btn @click="getAllCycles(2)">3</v-btn>
            <v-btn @click="getAllCycleExercises(1)">3</v-btn>
          </v-column>
        </v-row>
        <v-row>
            <textarea rows="10" cols="50" v-model="result"></textarea>
        </v-row>
      </v-container> -->
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'pinia';
import {useSecurityStore} from "@/store/SecurityStore";
import {useExerciseStore} from "@/store/ExerciseStore";
import {useRoutineStore} from "@/store/RoutineStore";
import CiclosRutina from "./CiclosRutina.vue"

export default {
  name: "AgregarEjercicioMenu",
  components: {
    CiclosRutina,
  },
  data() {
    return {
      routineId: 2,
      currentCycle: 1,
      cycles: null,
      result: null,
      controller: null,
    }
  },
  // props: {
  //   routineId: {
  //     default: 2,
  //   }
  // },
  computed: {
    ...mapState(useSecurityStore, {
      $isLoggedIn: 'isLoggedIn'
    }),
    ...mapState(useExerciseStore, {
      $items: state => state.items
    }),
    // ...mapState(useRoutineStore, {
      // $cycles: state => state.cycles
    // }),
  },
  watch: {
    $items(newItem) {
      return newItem
    }
  },
  methods: {
    ...mapActions(useExerciseStore, {
        $create: 'create',
        $modify: 'modify',
        $delete: 'delete',
        $get: 'get',
        $getAll: 'getAll',
      }),
    ...mapActions(useRoutineStore, {
        $createRoutine: 'createRoutine',
        $modifyRoutine: 'modifyRoutine',
        $deleteRoutine: 'deleteRoutine',
        $getRoutine: 'getRoutine',
        $getAllRoutines: 'getAllRoutines',
        $createCycle: 'createCycle',
        $modifyCycle: 'modifyCycle',
        $deleteCycle: 'deleteCycle',
        $getCycle: 'getCycle',
        $getAllCycles: 'getAllCycles',
        $createCycleExercise: 'createCycleExercise',
        $modifyCycleExercise: 'modifyCycleExercise',
        $deleteCycleExercise: 'deleteCycleExercise',
        $getCycleExercise: 'getCycleExercise',
        $getAllCycleExercises: 'getAllCycleExercises',
      }),
  setResult(e) {
    this.result = null;
    this.result = JSON.stringify(e);
  },
  async getRoutine(routineId) {
    try {
        const routine = await this.$getRoutine(routineId);
        this.setResult(routine)
    } catch(e) {
        this.setResult(e)
    }
  },
  async getCycle(routineId, id) {
    try {
        this.controller = new AbortController();
        const cycles = await this.$getCycle(routineId, id, this.controller);
        this.controller = null;
        this.setResult(cycles)
    } catch(e) {
        this.setResult(e)
    }
  },
  async getAllCycles(routineId) {
    try {
      this.controller = new AbortController();
        const cycles = await this.$getAllCycles(routineId, this.controller);
        this.controller = null;
        this.setResult(cycles)
    } catch(e) {
        this.setResult(e)
    }
  },
  async getAllCycleExercises(cycleId) {
    try {
      this.controller = new AbortController();
      const cycles = await this.$getAllCycleExercises(cycleId, this.controller);
      this.controller = null;
      this.setResult(cycles)
    } catch(e) {
      this.setResult(e)
    }
  },
  async getAllExercises() {
    try {
        this.controller = new AbortController()
        const exercise = await this.$getAllExercises(this.controller);
        this.controller = null
        this.setResult(exercise)
    } catch(e) {
        this.setResult(e)
    }
  }
  },
  async created() {
    const exerciseStore = useExerciseStore();
    await exerciseStore.getAll();
  },
}
</script>

<style scoped>
.box {
  margin: 2% 5%;
  display: flex;
}
</style>