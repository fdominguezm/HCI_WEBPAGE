<template>
  <div>
    <div v-show="exerciseCard">
    <v-overlay>
    <v-card>
      <v-card-title>Cree su ejercicio!</v-card-title>
      <v-card-subtitle>
        Complete todos los campos requeridos para agregar su nuevo ejercicio.
      </v-card-subtitle>
      <v-form ref="form"
      v-model="valid"
      lazy-validation>
      <v-card-actions>
        <v-row>
          <v-col>
            <v-text-field label="Nombre"
                          :rules="nameRule"
                          v-model="exerciseName"
            >
            </v-text-field>
          </v-col>
          <v-col>
            <v-text-field
                label="Descripción"
                :rules="descriptionRule"
                v-model="exerciseDesc">
            </v-text-field>
          </v-col>
        </v-row>
        </v-card-actions>

        <v-card-actions>
        <v-row>
          <v-col>
            <v-select label="Tipo de ejercicio"
                :items="exerciseTypes"
                :rules="typeRule"
                      v-model="exerciseType">
            </v-select>
          </v-col>
        </v-row>
          </v-card-actions>
      <v-card-actions>
        <v-row>
          <v-col>
            <v-text-field
                label="Link de foto"
            >
            </v-text-field>
          </v-col>
          <v-col>
            <v-text-field
                label="Link de video">
            </v-text-field>
          </v-col>
        </v-row>
      </v-card-actions>
          <v-card-actions>
        <v-btn @click="showCard()">
          Close
        </v-btn>
            <v-btn :disabled="editing"
                @click="addExercise()">
              Add
            </v-btn>
            <v-btn :disabled="!editing"
                @click="editExercise()">
              Edit
            </v-btn>
      </v-card-actions>
        </v-form>
    </v-card>
    </v-overlay>
    </div>
    <v-card
        class=""
        max-width="300"
    >
      <v-card-title class="white--text orange darken-4">
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
  </div>
</template>

<script>
import {mapState, mapActions} from 'pinia';
import {useSecurityStore} from "@/store/SecurityStore";
import {useExerciseStore} from "@/store/ExerciseStore";
import {Exercise} from "@/api/exercise";


export default {
  name: "ExerciseList",
  data() {
    return {
      exerciseName: "",
      exerciseDesc: "",
      exerciseType: "",
      currentId: null,
      valid : true,
      editing: false,
      benched: 0,
      exerciseCard: false,
      exerciseTypes: ["exercise", "rest"],
      controller: null,
      nameRule: [n => !!n || 'Name is required'],
      descriptionRule: [d => !!d || 'Description is required'],
      typeRule: [t => !!t || 'Type is required']
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
      async getAllExercises() {
            try {
                this.controller = new AbortController()
                const exercise = await this.$getAllExercises(this.controller);
                this.controller = null
                this.setResult(exercise)
            } catch(e) {
                this.setResult(e)
            }
        },
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
    async addExercise() {
      if(this.validate()) {
        try {
          this.showCard()
          const exercise = new Exercise(null, this.exerciseName, this.exerciseDesc, this.exerciseType)
          await this.$create(exercise)
          this.$getAll();

        } catch (e) {
          console.log(e)
        }
      }
      return;

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

    async editExercise() {
      const exercise = new Exercise(this.currentId, this.exerciseName, this.exerciseDesc, this.exerciseType);
      await this.$modify(exercise);
      this.$getAll()
      this.showCard()
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