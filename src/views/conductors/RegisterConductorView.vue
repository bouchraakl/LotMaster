<template>
    <div class="access-content d-flex flex-column align-items-start justify-content-start">
      <p class="title-pages">Register : Conductor</p>
      <div class="form-application d-flex flex-column custom-section">
        <form class="form-app d-flex flex-column align-items-start mt-4 h-100 gap-3" @submit.prevent="">
          <div class="d-flex align-items-center align-self-start gap-3">
            <div class=" d-flex flex-column">
              <label for="name" class="form-label">Conductor Name</label>
              <input class="form-control" id="name" style="width: 300px;">
            </div>
            <div class=" d-flex flex-column">
              <label for="cpf" class="form-label">Conductor CPF</label>
              <input class="form-control" id="cpf" style="width: 300px;"></div>
          </div>
          <div class="d-flex align-items-center align-self-start gap-3">
            <div class=" d-flex flex-column">
              <label for="phone" class="form-label">Conductor Phone</label>
              <input class="form-control" id="phone" style="width: 300px;"></div>
          </div>
          <button class="mt-4">Register Conductor</button>
        </form>
      </div>
    </div>
  </template>
    
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    data() {
      return {
        datalistId: "suggestions",
      };
    },
  })
  
  </script>
  
  <style>
  .moveBtn {
    width: 258px;
    height: 37px;
    border-radius: 5px;
    border: none;
    font-family: 'Raleway';
    font-weight: 500;
    font-size: 15px;
    background: #B5C2C9;
    color: #F3F3F3;
    margin: 0;
  }
  
  label {
    font-family: Raleway;
    font-size: 15px;
    font-weight: 400;
    line-height: 20px;
    text-align: left;
  
  }
  </style>
    