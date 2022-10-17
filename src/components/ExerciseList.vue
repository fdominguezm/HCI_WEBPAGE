<template>
  <div>
    <div v-if="exerciseCard">
      <AddExerciseCard @show="showCard()"
      :editing="editing"
      :exerciseName="this.exerciseName"
      :exerciseDesc="this.exerciseDesc"
      :exerciseType="this.exerciseType"
      :currentId="this.currentId"/>

    </div>
    <v-row >
      <v-col cols="3">
    <v-card
        max-width="300"
        color= #003D75

    >
      <v-card-title class="white--text darken-4">
        Agregar Ejercicio

        <v-spacer></v-spacer>

        <v-btn
            color="white"
            class="text--primary"
            fab
            small
            @click="isAdding(), showCard(null,'','','')"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-card-title>
      </v-card>
    <v-virtual-scroll max-width="300"
        :bench="benched"
        :items="$items"
        height="600"
        item-height="64"
    >
      <template v-slot:default="{ item }">
        <v-list-item :key="item.id">
          <v-list-item-action>
            <v-btn
                fab
                small
                color="#003D75"
                @click="displayExercise(item.id)"
            >

              <v-icon color="white">
                mdi-dumbbell
              </v-icon>
            </v-btn>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>
              {{item.name}}
            </v-list-item-title>
          </v-list-item-content>

          <v-list-item-action>
            <div>
            <v-btn text x-small @click="isEditing(), showCard(item.id, item.name, item.detail, item.type)">
            <v-icon >
              mdi-pencil
            </v-icon>
              </v-btn>
            <v-btn text x-small @click="deleteExercise(item.id)">
              <v-icon >
                mdi-delete
              </v-icon>
            </v-btn>
            </div>
          </v-list-item-action>
        </v-list-item>
        <v-divider></v-divider>
      </template>
    </v-virtual-scroll>
      </v-col>
      <v-col>
        <router-view/>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {mapState, mapActions} from 'pinia';
import {useSecurityStore} from "@/store/SecurityStore";
import {useExerciseStore} from "@/store/ExerciseStore";
import AddExerciseCard from "@/components/AddExerciseCard";
import router from "@/router";

export default {
  name: "ExerciseList",
  components: { AddExerciseCard},

  data() {
    return {
      exerciseName: "",
      exerciseDesc: "",
      exerciseType: "",
      currentId: null,
      valid : true,
      editing: false,
      notDisplayed: true,
      benched: 0,
      exerciseCard: false,
      exerciseTypes: ["exercise", "rest"],
      controller: null,
    }
  },

  watch: {
    $items(newItem) {
      return newItem
    }
  },
  computed: {
    ...mapState(useSecurityStore, {
      $isLoggedIn: 'isLoggedIn'
    }),
    ...mapState(useExerciseStore, {
      $items: state => state.items
    }),
  },
  methods: {
    ...mapActions(useExerciseStore, {
        $create: 'create',
        $modify: 'modify',
        $delete: 'delete',
        $get: 'get',
        $getAll: 'getAll',
      }),

// functions
    showCard(id,exerciseName, exerciseDesc, exerciseType,) {
      if (this.exerciseCard == true) {
        this.exerciseCard = false;
      } else {
        this.currentId = id;
        this.exerciseName = exerciseName;
        this.exerciseDesc = exerciseDesc;
        this.exerciseType = exerciseType;
        this.exerciseCard = true;

      }
    },

    isDisplayed() {
      this.notDisplayed = false
    },

    isEditing() {
      this.editing = true
    },

    isAdding() {
      this.editing = false
    },

    async deleteExercise(id) {
      await this.$delete(id)
      this.$getAll()
    },

    displayExercise(id) {
      this.isDisplayed()
      router.push({path:`/ejercicios/${id}`,params: {exercise_id: id}})
    },

    validate() {
      return this.$refs.form.validate()
    },
  },
  async created() {
    const exerciseStore = useExerciseStore();
    await exerciseStore.getAll();
  },
}

</script>

<style scoped>

</style>