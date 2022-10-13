<template>
  <v-app>
<div class = "logIn">
  <div class = "img">
    <v-img class = "img1"
           :src = "require(`@/assets/user_logo.png`)"
           transition = "false"
    />
  </div>
  <v-divider
    />
  <h1 class = "mainTitle">INICIAR SESION</h1>
  <v-text-field
      solo = true
      outlined = true
      label="Ingrese su nombre de usuario aqui"
      class = "textField"
      background-color= #6797C5
      color="white"
      prepend-inner-icon="mdi-account-box"
      v-model="username"
  />
  <v-text-field
      solo = true
      outlined = true
      label="Ingrese su contraseña aqui"
      class ="textField"
      background-color= #6797C5
      color = "white"
      prepend-inner-icon="mdi-lock"
      v-model="password"
      :type = "showPassword?'text':'password'"
      :append-icon = "showPassword?'mdi-eye':'mdi-eye-off'"
      @click:append = "showPassword = !showPassword"
  />

  <div class = "alignBtn">
    <v-row justify="center">
    <v-col md="auto">
      <v-btn
          class = "btn1"
          elevation="3"
          rounded
          color= #003D75
          x-large
          @click="login()"
      >INICIE SESION
      </v-btn>
    </v-col>

      <v-col md="auto">
        <v-checkbox label = "¿Recordar la sesion?"
                    v-model="rememberMe"/>
      </v-col>
    </v-row>
  </div>
  <div class = "alignBtn">

  <router-link class="links" to="/registrarse">
      <v-btn
      plain>
        ¿No estas registrado? Registrate aqui
      </v-btn>
    </router-link>
  </div>
  </div>
  </v-app>
</template>

<script>
import {mapState, mapActions} from 'pinia';
import {useSecurityStore} from "@/store/SecurityStore";
import {Credentials} from "@/api/user";
import router from "@/router";


export default {
  name: "IniciarSesionView",

  data(){
    return {
      username: "",
      password: "",
      result: null,
      rememberMe: false,
      showPassword: false,
      correctUser: true,
      correctPassword: true,
    }
  },

  computed: {
    ...mapState(useSecurityStore, {
      $user: state => state.user,
    }),
    ...mapState(useSecurityStore, {
      $isLoggedIn: 'isLoggedIn'
    })
  },

    methods: {
      ...mapActions(useSecurityStore, {
        $login: 'login',
      }),
      setResult(result){
        this.result = JSON.stringify(result, null, 2)
      },
      clearResult() {
        this.result = null
      },

      async login() {
        try {
          const credentials = new Credentials(this.username, this.password)
          await this.$login(credentials, this.rememberMe)
          this.clearResult()
          if(this.$isLoggedIn) {
            router.push('/');
          }
        } catch (e) {
          if (e.code == 4){
              if (e.details == "Username does not exist"){
                this.correctUser = false
              }else{
                this.correctPassword = false
              }
          }
          this.setResult(e)
        }
      }
    }

}


</script>

<style scoped>
  .logIn{
    margin-top: 10rem;
  }

  .mainTitle{
    text-align: center;
  }

  .textField {
    width: 400px;
    margin: auto;
  }

  .btn1{
    color: white;
    width: 15rem;
  }

  .alignBtn{
    text-align: center;
  }

  .img1{
    height: 170px;
    width: 150px;
    margin: auto;
  }
</style>