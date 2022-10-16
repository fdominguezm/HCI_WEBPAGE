<template>
  <v-app>
  <div class = "register">
    <div class = "img">
      <v-img class = "img1"
             :src = "require(`@/assets/register_logo.jpg`)"
      />
    </div>
        <h1 class = "mainTitle">REGISTRARSE</h1>
        <v-divider
        />

    <v-row justify="center">
      <v-col md = "auto">
        <h4>Nombre</h4>
        <v-text-field
            solo = true
            outlined = true
            label="Ingrese su nombre aqui"
            class = "textField"
            background-color= #6797C5
            color="white"
            v-model="firstName"
        />
        <h4>Nombre de usuario</h4>
        <v-text-field
            solo = true
            outlined = true
            label="Ingrese su nombre de usuario aqui"
            class = "textField"
            background-color= #6797C5
            color="white"
            v-model="username"
            :error-messages= "usernameError?'El nombre de usuario ya existe': null "
        />

        <h4>Numero de telefono</h4>
        <v-text-field
            solo = true
            outlined = true
            label="Ingrese su numero de telefono aqui"
            class ="textField"
            background-color= #6797C5
            color = "white"
            v-model="phone"
        />

        <h4>Contraseña</h4>
        <v-text-field
            solo = true
            outlined = true
            label="Ingrese su contraseña aqui"
            class = "textField"
            background-color= #6797C5
            color="white"
            v-model="password"
            :type = "showPassword?'text':'password'"
            :append-icon = "showPassword?'mdi-eye':'mdi-eye-off'"
            @click:append = "showPassword = !showPassword"
        />
      </v-col>
      <v-col md = "auto">
        <h4>Apellido</h4>
        <v-text-field
            solo = true
            outlined = true
            label="Ingrese su apellido aqui"
            class ="textField"
            background-color= #6797C5
            color = "white"
            v-model="lastName"
        />
        <h4>E-mail</h4>
        <v-text-field
            solo = true
            outlined = true
            label="Ingrese su e-mail aqui"
            class ="textField"
            background-color= #6797C5
            color = "white"
            v-model="email"
        />

        <h4>Genero</h4>
        <v-text-field
            solo = true
            outlined = true
            label="Ingrese su apodo aqui"
            class ="textField"
            background-color= #6797C5
            color = "white"
            v-model="gender"
            hint="El genero puede ser male, female o other"
        />

        <h4>Repita su contraseña</h4>

        <v-text-field
            solo = true
            outlined = true
            label="Repita su contraseña aqui"
            class ="textField"
            background-color= #6797C5
            color = "white"
            v-model="confirmedPassword"
            :type = "showPassword?'text':'password'"
            :append-icon = "showPassword?'mdi-eye':'mdi-eye-off'"
            @click:append = "showPassword = !showPassword"
            :error-messages= "passwordError?'Las contraseñas no coinciden': null "
        />
      </v-col>
    </v-row>
    <div class = "alignBtn">
      <v-btn
          class = "btn1"
          elevation="3"
          rounded
          color = #003D75
          x-large
          @click="register()"
          >REGISTRESE
      </v-btn>
    </div>
    <div class="alignBtn">
      <router-link class="links" to="/iniciar_sesion">
        <v-btn
            plain>
          ¿Ya estas registrado? Inicie sesion
        </v-btn>
      </router-link>
    </div>

  </div>
    <v-overlay v-if="emailSent"
    light>
      <v-card  class="verify" height="15rem" width="35rem">
        <h1 class = "mainTitle">Verifique la cuenta ingresando el codigo que recibio por mail</h1>
        <v-otp-input
            length="6"
            v-model="code"
        />
        <v-row justify="center">
        <v-btn class = "btn1"
               elevation="3"
               rounded
               color = #003D75
               x-large
        @click="verifyMail()">
          LISTO
        </v-btn>
        <v-btn class = "btn1"
               elevation="3"
               rounded
               color = #003D75
               x-large
        @click="resendEmail()">
          REENVIAR CODIGO
        </v-btn>
        </v-row>
      </v-card>
    </v-overlay>

  </v-app>
</template>

<script>

import {useSecurityStore} from "@/store/SecurityStore";
import {mapActions} from "pinia";
import {UserApi} from "@/api/user";
import router from "@/router";

export default {
  name: "RegistrarseView",

  data(){
    return{
      username: "",
      password: "",
      confirmedPassword: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      gender: "",
      emailSent: false,
      code: "",
      showPassword: false,
      passwordError: false,
      usernameError: false,
    }
  },

  methods: {
    ...mapActions(useSecurityStore,{
      $register: 'register',
    }),

    async register () {
      try {
        if (this.password == this.confirmedPassword) {
          await UserApi.register(this.username, this.password, this.firstName, this.lastName, this.email, this.phone, this.gender);
          this.emailSent = true;
        }else {
          this.passwordError = true;
        }

      } catch (e) {
        this.result = JSON.stringify(e);
        if(e.code == 2){
          if(e.details == "UNIQUE constraint failed: User.username"){
              this.usernameError = true;
          }
        }
      }
    },
    async verifyMail () {
      try {
        await UserApi.verifyEmail(this.email, this.code);
        router.push("/iniciar_sesion")
      } catch (e) {
        this.result = JSON.stringify(e);
      }
    },

    async resendEmail(){
      try{
        await UserApi.resendEmail(this.email);
      }catch (e) {
        this.result = JSON.stringify(e);
      }
    }
  }

}
</script>

<style scoped>
.register{
  margin-top: 10rem;
}

.verify{
  align-self: center;
  margin-top: 0;
}

.img1{
  height: 170px;
  width: 150px;
  margin: auto;
}


.mainTitle{
  text-align: center;
}

.textField {
  width: 400px;
  margin: auto;
  color: white;
}

.btn1{
  color: white;
  width: 15rem;
  margin: auto;
}


.alignBtn{
  text-align: center;
}
</style>