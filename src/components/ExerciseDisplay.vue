<template>
<div class="exerciseDisplay">
  <h1>
    {{exercise.name}}
  </h1>
  <p class="descDisplay">
    {{ exercise.detail }}
  </p>
</div>
</template>

<script>
import {mapActions, mapState} from "pinia/dist/pinia";
import {useSecurityStore} from "@/store/SecurityStore";
import {useExerciseStore} from "@/store/ExerciseStore";

export default {
  name: "ExerciseDisplay",
  computed: {
    ...mapState(useSecurityStore, {
      $isLoggedIn: 'isLoggedIn'
    }),
    ...mapState(useExerciseStore, {
      $items: state => state.items
    }),
  },
  data() {
    return {
      exercise: null,
      result: null
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
    async getExercise() {
      try {
        this.exercise = await this.$get(this.$route.params.exercise_id)
        // this.result = JSON.stringify(this.exercise)
      } catch (e) {
        // this.result = JSON.stringify(e)
      }
    },

  },
  async created() {
    this.getExercise()
  }
}
</script>

<style scoped>

.exerciseDisplay {
  margin-left: 150px;
}

.descDisplay{
  margin-top: 30px;
}
</style>