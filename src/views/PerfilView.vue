<template>
  <v-app>
    <div v-if="$isLoggedIn">
      <v-sheet class="perfilSheet" color=#426F99>
        <h1 class="mainTitle">MI CUENTA</h1>
      </v-sheet>

      <div class="datos">

        <v-card outlined
                width=60rem
                raised
                rounded
                height=30rem
                class="dataCard"
        >
        <v-col md="auto">
          <h2 >Mis datos</h2>

          <v-row justify="center">
            <v-col md = "auto">
              <h4>Nombre</h4>
              <v-text-field
                  solo = true
                  outlined = true
                  :label= $user.firstName
                  class = "textField"
                  background-color= #6797C5
                  color="white"
                  v-model="newFirstName"
                  clearable
              />


              <h4>Numero de telefono</h4>
              <v-text-field
                  solo = true
                  outlined = true
                  :label= $user.phone
                  class ="textField"
                  background-color= #6797C5
                  color = "white"
                  v-model="newPhone"
                  clearable
              />

              <h4>Nombre de usuario</h4>
              <v-text-field
                  solo = true
                  outlined = true
                  :label= $user.username
                  class = "textField"
                  background-color= #6797C5
                  color="white"
                  disabled
              />
              <v-btn class = "btn1"
                     elevation="3"
                     rounded
                     color = #003D75
                     x-large
                     @click="modify()"
              >GUARDAR CAMBIOS</v-btn>
              <h5>Ayuda: Su nombre de usuario y su e-mail no se pueden modificar</h5>
            </v-col>
            <v-col md = "auto">

              <h4>Apellido</h4>
              <v-text-field
                  solo = true
                  outlined = true
                  :label= $user.lastName
                  class ="textField"
                  background-color= #6797C5
                  color = "white"
                  v-model="newLastName"
                  clearable
              />

              <h4>Genero</h4>
              <v-text-field
                  solo = true
                  outlined = true
                  :label=$user.gender
                  class ="textField"
                  background-color= #6797C5
                  color = "white"
                  v-model="newGender"
                  clearable
                  hint="El genero puede ser male, female o other"
              />

              <h4>E-mail</h4>
              <v-text-field
                  solo = true
                  outlined = true
                  :label = $user.email
                  class ="textField"
                  background-color= #6797C5
                  color = "white"
                  disabled
              />

<!--              <v-btn class = "btn1"-->
<!--                     elevation="3"-->
<!--                     rounded-->
<!--                     color = "red"-->
<!--                     x-large-->
<!--                     @click="deleteUser()">ELIMINAR CUENTA</v-btn>-->
            </v-col>
          </v-row>
        </v-col>
        </v-card>

      </div>

    </div>
    <div v-else>
      <v-col md="auto">
        <v-row justify="center">
      <h1 class="notLoggedIn">INICIE SESION PARA VER SUS DATOS</h1>
        </v-row>
        <v-row justify="center">
      <v-btn to="/"
             class = "btn1"
             elevation="3"
             rounded
             color= #003D75
             x-large>Volver a home</v-btn>
        </v-row>

      </v-col>

    </div>
  </v-app>
</template>



<script>
import {mapActions, mapState} from "pinia";
import {useSecurityStore} from "@/store/SecurityStore";

export default {
  name: "PerfilView",

  computed: {
    ...mapState(useSecurityStore, {
      $user: state => state.user,
    }),
    ...mapState(useSecurityStore, {
      $isLoggedIn: 'isLoggedIn'
    }),
  },

  data(){
    return{
      newFirstName: this.$user.firstName,
      newLastName: this.$user.lastName,
      newGender: this.$user.gender,
      newPhone: this.$user.phone,
      error: false,
    }
  },

  methods:{
    ...mapActions(useSecurityStore, {
      $modifyUser: 'modifyUser',
    }),
    async modify(){
        if (this.newFirstName != this.$user.firstName || this.newLastName != this.$user.lastName || this.newPhone != this.$user.phone || this.newGender != this.$user.gender) {
          await this.$modifyUser(this.newFirstName, this.newLastName, this.newPhone, this.newGender)
        }
    }
  }


}
</script>



<style scoped>
.perfilSheet{
  margin-top: 7rem;
}

.dataCard{
  margin: auto;
}

.mainTitle{
  color: white;
  margin-left: 2rem;
}

.datos{
  margin-top: 4rem;
}

.textField {
  width: 400px;
  margin: auto;
  color: white;
}

.notLoggedIn{
  margin-top: 20rem;
  text-align: center;
}

.btn1{
  color: white;
  width: 15rem;
  text-align: center;
}
</style>