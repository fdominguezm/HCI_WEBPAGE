<template>
  <div>
    <h1 class="ejDelDia">EJERCICIO DEL DÍA</h1>
    <div class="ejDelDiaBody">
      <p class="ejName">
        EJERCICIO: SALTAR LA SOGA
      </p>
      <pre class="recomendaciones">


Recomendaciones

- Manten la cuerda no muy floja
- Manten la cuerda no muy firma
- Empieza lento y ve incrementando la velocidad
- La clave es consistencia, no velocidad
      </pre>
    </div>
  </div>
</template>

<script>
export default {
  name: "EjercicioDelDia"
}
</script>

<style scoped>
  .ejDelDia {
    text-align: center;
    margin-top: 50px;
  }
  .recomendaciones {
    font-weight: bold;
  }
  .ejDelDiaBody {
    margin-left: 200px;
    margin-top: 75px;
  }
  .ejName {
    font-size: 25px;
  }
</style>