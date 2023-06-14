<template>
    <div class="access-content d-flex flex-column align-items-start justify-content-start">
      <p class="title-pages">Register : Vehicle</p>
      <div class="form-application d-flex flex-column custom-section">
        <form class="form-app d-flex flex-column align-items-start mt-4 h-100 gap-3" @submit.prevent="">
          <div class="d-flex align-items-center align-self-start gap-3">
            <div class=" d-flex flex-column">
              <label for="plate" class="form-label">Vehicle License Plate</label>
              <input class="form-control" id="plate" style="width: 300px;">
            </div>
          </div>
          <div class="d-flex align-items-center align-self-start gap-3">
            <div class=" d-flex flex-column">
              <label for="model" class="form-label">Associated Model</label>
              <input class="form-control" list="datalistOptions" id="model" placeholder="Search By Model Name ..." style="width: 300px;">
              <datalist id="datalistOptions">
                <option value="San Francisco"></option>
              </datalist>
            </div>
            <router-link to="/register-model" class="align-self-end">
              <button class="moveBtn m-0">Or Register New Model</button>
            </router-link>
          </div>
          <div class="d-flex align-items-center align-self-start gap-3">
            <div class=" d-flex flex-column">
              <label for="year" class="form-label">Vehicle Year</label>
              <input class="form-control" type="number" id="year" style="width: 100px;">
            </div>
            <div class=" d-flex flex-column">
              <label for="color" class="form-label">Vehicle Color</label>
              <select class="form-select" id="color" style="width: 200px;">
            </select></div>
            <div class=" d-flex flex-column">
              <label for="type" class="form-label">Vehicle Type</label>
              <select class="form-select" id="type" style="width: 200px;"></select></div>
          </div>
          <button class="mt-4">Register Vehicle</button>
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
    