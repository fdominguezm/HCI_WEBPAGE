<template>
  <div>
    <div v-show="exerciseCard">
    <v-overlay>
    <v-card>
      <v-card-title>Cree su ejercicio!</v-card-title>
      <v-card-subtitle>
        Complete todos los campos requeridos para agregar su nuevo ejercicio.
      </v-card-subtitle>
      <v-card-actions>
        <v-row>
          <v-col>
            <v-text-field label="Nombre"
                          v-model="exerciseName"
            >
            </v-text-field>
          </v-col>
          <v-col>
            <v-text-field
                label="Descripción">
            </v-text-field>
          </v-col>
        </v-row>
        </v-card-actions>

        <v-card-actions>
        <v-row>
          <v-col>
            <v-select label="Tipo de ejercicio"
                :items="exerciseTypes">
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
        <v-btn @click="closeButton()">
          Cerrar
        </v-btn>
            <v-btn @click="addExercise()">
              Agregar
            </v-btn>
      </v-card-actions>
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
            @click="openCard()"
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
            <v-icon small>
              mdi-open-in-new
            </v-icon>
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


export default {
  name: "ExerciseList",
  data() {
    return {
      benched: 0,
      exerciseCard: false,
      exerciseTypes: ["Exercise", "Rest"],
      exerciseName: "",
      exerciseDesc: "",
      added: true,
      closed: true,
      controller: null,
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
    openCard() {
      this.exerciseCard = true;
    },
    showCard() {
      if (this.closed == true && this.added == true) {
        this.exerciseCard = false;
      } else {
        this.exerciseCard = true;
      }
    },
    addExercise() {
      if (this.exerciseName.length != 0) {
        this.added = true;
        this.closed = false;
      } else {
        this.added = false;
      }
      this.showCard();
    },

    closeButton() {
      this.added = true;
      this.closed = true;
      this.showCard();
    }
  },
  async created() {
    const exerciseStore = useExerciseStore();
    await exerciseStore.getAll();
  }
}

</script>

<style scoped>

</style>