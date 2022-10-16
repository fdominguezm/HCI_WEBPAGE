<template>
    <v-app-bar color=#003D75 app>
      <div>
        <router-link class="links" to="/">
          <v-btn text class="fitlyTitle">FITLY
          <v-icon color="black"
                  large>
            mdi-dumbbell
          </v-icon>
          </v-btn>
        </router-link>
          <!--      <img src="./assets/logofitly.png"/>-->
      </div>
      <v-spacer/>
      <router-link v-if="!$isLoggedIn" class="links" to="/iniciar_sesion">
      <v-btn text color="white">Iniciar Sesion
        <v-icon x-large>
          mdi-account-circle
        </v-icon>
      </v-btn></router-link>
      <v-menu v-else offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              text
              dark
              v-bind="attrs"
              v-on="on"
          >
            BIENVENIDO
            <v-icon x-large>
              mdi-account-circle
            </v-icon>
          </v-btn>
        </template>
        <v-list color=#003D75 >
          <v-list-item color="white" >
            <v-btn
                    to="/perfil"
            color="white"
                   plain
            >
              Mi cuenta
            </v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn plain
                    color="white"
                   to="/"
                    @click="logout()">
            Cerrar Sesion
          </v-btn>
          </v-list-item>
        </v-list>
      </v-menu>




    </v-app-bar>
</template>

<script>
import {mapActions, mapState} from "pinia";
import {useSecurityStore} from "@/store/SecurityStore";

export default {
  name: "IniciarSesion",

  computed: {
    ...mapState(useSecurityStore, {
      $user: state => state.user,
    }),
    ...mapState(useSecurityStore, {
      $isLoggedIn: 'isLoggedIn',
    }),
  },

  methods: {
    ...mapActions(useSecurityStore, {
      $getCurrentUser: 'getCurrentUser',
      $login: 'login',
      $logout: 'logout',
    }),
    async logout() {
      await this.$logout()
    },
    async getCurrentUser() {
      await this.$getCurrentUser()
    }
  }

}


</script>

<style scoped>
.fitlyTitle{
  color: white;
  font-size: x-large;
}

.links{
  text-decoration: none;
}

</style>