<template>
    <div class="quiz-container">
      <h2>Modo Práctica - Quiz</h2>
  
      <!-- Selección de pregunta -->
      <div class="pregunta-seleccion">
        <label for="preguntaNum">Ir a la pregunta: </label>
        <input type="number" v-model.number="preguntaSeleccionada" min="1" :max="preguntas.length" />
        <button @click="irAPregunta">Seleccionar</button>
      </div>
  
      <!-- Muestra la pregunta actual -->
      <div v-if="preguntaActual">
        <h3>Pregunta {{ indiceActual + 1 }} de {{ preguntas.length }}</h3>
        <p>{{ preguntaActual.pregunta }}</p>
  
        <div class="opciones">
          <button v-for="(opcion, i) in preguntaActual.opciones" 
                  :key="i" 
                  @click="verificarRespuesta(opcion.correcta, i)"
                  :class="{
                    'correcta': respuestaSeleccionada === i && opcion.correcta,
                    'incorrecta': respuestaSeleccionada === i && !opcion.correcta
                  }">
            {{ opcion.texto }}
          </button>
        </div>
  
        <!-- Mensaje de respuesta -->
        <p v-if="respuestaSeleccionada !== null" :class="{ 'incorrecta-texto': !esCorrecta, 'correcta-texto': esCorrecta }">
          {{ mensajeRespuesta }}
        </p>
  
        <!-- Mostrar la respuesta correcta si fue incorrecta -->
        <p v-if="!esCorrecta && respuestaSeleccionada !== null" class="respuesta-correcta">
          Respuesta correcta: <strong>{{ respuestaCorrecta }}</strong>
        </p>
  
        <div class="navegacion">
          <button @click="anteriorPregunta" :disabled="indiceActual === 0">Anterior</button>
          <button @click="siguientePregunta" :disabled="indiceActual === preguntas.length - 1">Siguiente</button>
        </div>
      </div>
  
      <h3>Puntaje: {{ puntaje }} / {{ preguntas.length }}</h3>
    </div>
  </template>
  
  <script>
  import preguntas from '@/../public/preguntas.json';
  
  export default {
    data() {
      return {
        preguntas: preguntas,
        indiceActual: 0,
        respuestaSeleccionada: null,
        esCorrecta: null,
        mensajeRespuesta: "",
        respuestaCorrecta: "",
        puntaje: 0,
        preguntaSeleccionada: 1,
      };
    },
    computed: {
      preguntaActual() {
        return this.preguntas[this.indiceActual];
      }
    },
    methods: {
      verificarRespuesta(correcta, index) {
        if (this.respuestaSeleccionada === null) {
          this.respuestaSeleccionada = index;
          this.esCorrecta = correcta;
  
          if (correcta) {
            this.mensajeRespuesta = "¡Respuesta correcta!";
            this.puntaje++;
          } else {
            this.mensajeRespuesta = "Respuesta incorrecta.";
            this.respuestaCorrecta = this.preguntaActual.opciones.find(op => op.correcta).texto;
          }
        }
      },
      siguientePregunta() {
        if (this.indiceActual < this.preguntas.length - 1) {
          this.indiceActual++;
          this.limpiarEstadoPregunta();
        }
      },
      anteriorPregunta() {
        if (this.indiceActual > 0) {
          this.indiceActual--;
          this.limpiarEstadoPregunta();
        }
      },
      irAPregunta() {
        const num = this.preguntaSeleccionada - 1;
        if (num >= 0 && num < this.preguntas.length) {
          this.indiceActual = num;
          this.limpiarEstadoPregunta();
        }
      },
      limpiarEstadoPregunta() {
        this.respuestaSeleccionada = null;
        this.esCorrecta = null;
        this.mensajeRespuesta = "";
        this.respuestaCorrecta = "";
      }
    }
  };
  </script>
  
  <style>
  .quiz-container {
    width: 80%;
    margin: auto;
    text-align: center;
  }
  
  .pregunta-seleccion {
    margin-bottom: 10px;
  }
  
  input {
    width: 50px;
    text-align: center;
    margin-right: 5px;
  }
  
  .opciones button {
    display: block;
    width: 100%;
    padding: 10px;
    margin: 5px 0;
    border: 1px solid #ccc;
    cursor: pointer;
    background-color: white;
  }
  
  .opciones button.correcta {
    background-color: green;
    color: white;
  }
  
  .opciones button.incorrecta {
    background-color: red;
    color: white;
  }
  
  .navegacion {
    margin-top: 10px;
  }
  
  .navegacion button {
    margin: 5px;
    padding: 8px 15px;
    border: none;
    cursor: pointer;
    background-color: #007bff;
    color: white;
    border-radius: 5px;
  }
  
  .navegacion button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  
  /* Mensajes de respuestas */
  .correcta-texto {
    color: green;
    font-weight: bold;
  }
  
  .incorrecta-texto {
    color: red;
    font-weight: bold;
  }
  
  .respuesta-correcta {
    color: green;
    font-weight: bold;
    margin-top: 5px;
  }
  </style>
  