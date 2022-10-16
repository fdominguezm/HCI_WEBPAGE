<template>
    <div>
        <div class="rout">
            <v-card  v-for="routine in result" :key="routine.id" class="card" @click="goTo(routine.id)" color= #6797C5>
                <v-col md="auto">
                <v-row justify="center">
                  <v-icon x-large>
                    mdi-weight-lifter
                  </v-icon>
                </v-row>
                <v-row justify="center">
                <v-card-title >ID: {{routine.id}}</v-card-title>
                </v-row>

                <h3 class="cardText">Nombre:</h3>

                <v-row justify="center">
                <v-card-title>{{routine.name}}</v-card-title>
                </v-row>

                <v-row justify="center">
                <v-card-text>Detalle:{{routine.detail}}</v-card-text>
                                </v-row>

                </v-col>
            </v-card>
        </div>
    </div>
</template>

<script>
import {mapActions} from 'pinia';
import {useRoutineStore} from "@/store/RoutineStore";
import router from '@/router';

export default {
    name: "RoutineCard",
    components: {
      // router
    },
    data() {
    return{
      result: null,
    }
  },
  methods: {
    ...mapActions(useRoutineStore, {
      $createRoutine: 'createRoutine',
      $modifyRoutine: 'modifyRoutine',
      $deleteRoutine: 'deleteRoutine',
      $getRoutine: 'getRoutine',
      $getMyRoutines: 'getMyRoutines',
      $getAllRoutines: 'getAllRoutines',
    }),
    goTo(id) {
      router.push( { path: `/rutina/${id}`, params: {id: id} })
    },
    setResult(result){
      this.result = JSON.stringify(result, null, 2)
    },
    async getAllRoutines() {
      try {
        this.controller = new AbortController()
        const routine = await this.$getMyRoutines(this.controller);
        this.controller = null
        this.result = routine
        // this.setResult(routine)
      } catch(e) {
        this.setResult(e)
      }
    },
  },
  async created() {
    const routineStore = useRoutineStore();
    this.result = await routineStore.getMyRoutines();
  },
}
</script>

<style>
.rout {
    margin: 1% 5%;
    display: flex;
    flex-wrap: wrap;
    align-content: space-evenly;
}

.card{
    margin: 1rem;
    width: 15rem;
    height: 15rem;
}

.cardText{
  text-align: center;
}
</style>