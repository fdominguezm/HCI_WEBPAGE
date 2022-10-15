<template>
    <v-app-bar color=#003D75 app>
      <div>
        <router-link class="links" to="/">
          <v-btn text color="white">FITLY</v-btn>
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
          > USERNAME
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
                    to="/about_view"
                   color="white">
              Sobre Fitly
            </v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn plain
                    color="white"
                    @click="this.logout()">
            Cerrar Sesion
          </v-btn>
          </v-list-item>
        </v-list>
      </v-menu>




    </v-app-bar>
</template>

<script>
import {mapState} from "pinia";
import {useSecurityStore} from "@/store/SecurityStore";

export default {
  name: "IniciarSesion",

  computed: {
    ...mapState(useSecurityStore, {
      $user: state => state.user,
    }),
    ...mapState(useSecurityStore, {
      $isLoggedIn: 'isLoggedIn'
    }),
    getUsername(){
      return this.$user.username
    }
  },
  methods:{
    async logout(){
      await this.user.logout();
      this.$isLoggedIn = false;
    }
  }
}


</script>

<style scoped>
.links{
  text-decoration: none;
}

</style>