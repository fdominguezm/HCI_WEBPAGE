<template>
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
                            v-model="auxName"
              >
              </v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                  label="Descripción"
                  :rules="descriptionRule"
                  v-model="auxDesc">
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
                        v-model="auxType">
              </v-select>
            </v-col>
          </v-row>
        </v-card-actions>
        <v-card-actions>
          <v-btn @click="$emit('show')">
            Cerrar
          </v-btn>
          <v-btn :disabled="editing"
                 @click="addExercise()">
            Agregar
          </v-btn>
          <v-btn :disabled="!editing"
                 @click="editExercise()">
            Editar
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-overlay>
</template>

<script>

import {mapState, mapActions} from 'pinia';
import {useSecurityStore} from "@/store/SecurityStore";
import {useExerciseStore} from "@/store/ExerciseStore";
import {Exercise} from "@/api/exercise";

export default {
  name: "AddExerciseCard",
  emits: [
    'show',
      'update:exerciseName',
      'update:exerciseDesc',
      'update:exerciseType',
  ],
      data() {
        return {
          auxName: "",
          auxDesc: "",
          auxType: "",
          auxId: null,
           valid : true,
           benched: 0,
           exerciseCard: false,
           exerciseTypes: ["exercise", "rest"],
           controller: null,
          nameRule: [n => !!n || 'Name is required'],
          descriptionRule: [d => !!d || 'Description is required'],
          typeRule: [t => !!t || 'Type is required']
        }
      },
  props: {
    editing: Boolean,
    exerciseName: String,
    exerciseDesc: String,
    exerciseType: String,
    currentId: Number,

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

    setNullExercise() {
      this.auxName = ""
      this.auxDesc = ""
      this.auxType = ""
      this.auxId = null
    },

        async addExercise() {
          if(this.validate()) {
            try {
              this.$emit('show')
              const exercise = new Exercise(null, this.auxName, this.auxDesc, this.auxType)
              await this.$create(exercise)
              this.$getAll();
              this.setNullExercise();
            } catch (e) {
              console.log(e)
            }
          }
          return;
        },

    async editExercise() {
      const exercise = new Exercise(this.currentId, this.auxName, this.auxDesc, this.auxType);
      console.log(this.exerciseName)
      await this.$modify(exercise);
      this.$getAll()
      this.$emit('show')
    },

        validate() {
          return this.$refs.form.validate()
        },
      },
  async created() {
    this.auxName = this.exerciseName
    this.auxDesc = this.exerciseDesc
    this.auxType = this.exerciseType
  },
}

</script>

<style scoped>

</style>