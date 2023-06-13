<template>
    <div class="access-content d-flex flex-column align-items-start justify-content-start">
      <p class="title-pages">Register : Open Movement</p>
      <div class="form-application d-flex flex-column custom-section">
        <form class="form-app d-flex flex-column align-items-start mt-4 h-100 gap-3" @submit.prevent="">
          <div class="d-flex align-items-center align-self-start gap-3">
            <div class=" d-flex flex-column">
              <label for="exampleDataList" class="form-label">Associated Condutor</label>
              <input class="form-control" readonly list="datalistOptions" id="exampleDataList" style="width: 300px;">
            </div>
          </div>
          <div class="d-flex align-items-center align-self-start gap-3">
            <div class=" d-flex flex-column">
              <label for="exampleDataList" class="form-label">Associated Vehicle</label>
              <input class="form-control" readonly list="datalistOptions" id="exampleDataList" style="width: 300px;">
            </div>
          </div>
          <div class="d-flex align-items-center align-self-start gap-3">
            <div class=" d-flex flex-column">
              <label for="entry" class="form-label">Entry Date</label>
              <input class="form-control" readonly type="date" id="entry" style="width: 300px;">
            </div>
            <div class=" d-flex flex-column">
              <label for="exit" class="form-label">Exit Date</label>
              <input class="form-control" type="date" id="exit" style="width: 300px;">
            </div>
          </div>
          <button class="mt-3">Close Movement</button>
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
    