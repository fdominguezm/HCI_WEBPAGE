<template>
  <v-app>
    <div>
      <v-sheet class="perfilSheet" color=#426F99>
        <h1 class="mainTitle">MI CUENTA</h1>
      </v-sheet>

      <div class="datos">
        <v-card outlined
                width=30rem
                raised
                rounded
                height=35rem
                class="dataCard"
                >
        <v-row justify="center">
          <v-col md = "auto">
            <h2 >Mis datos</h2>
            <h4>Nombre</h4>
            <v-text-field
                solo = true
                outlined = true
                label="name"
                class = "textField"
                background-color= #6797C5
                color="white"
            />
            <h4>Apellido</h4>
            <v-text-field
                solo = true
                outlined = true
                label="apellido"
                class ="textField"
                background-color= #6797C5
                color = "white"
            />
            <h4>Nombre de usuario</h4>
            <v-text-field
                solo = true
                outlined = true
                label="nombredeusuario"
                class = "textField"
                background-color= #6797C5
                color="white"
            />

            <h4>E-mail</h4>
            <v-text-field
                solo = true
                outlined = true
                label="e-mail"
                class ="textField"
                background-color= #6797C5
                color = "white"
            />
            <v-btn class = "btn1"
                             elevation="3"
                             rounded
                             color = #003D75
                             x-large>GUARDAR CAMBIOS</v-btn>
          </v-col>
        </v-row>
        </v-card>
      </div>

    </div>
  </v-app>
</template>



<script>
export default {
  name: "PerfilView",
  data(){
    return{
      username: "",
      firstName: "",
      lastName: "",
      email: "",
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

.btn1{
  color: white;
  width: 15rem;
}
</style>