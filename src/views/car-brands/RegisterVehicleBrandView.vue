<template>
  <div class="access-content d-flex flex-column align-items-start justify-content-start">
    <p class="title-pages">Register : Vehicle Brand</p>
    <div class="form-application d-flex flex-column custom-section">
      <form class="form-app d-flex flex-column align-items-start mt-4 h-100 gap-3" @submit.prevent="submitForm">
        <div class="d-flex align-items-center align-self-start gap-3">
          <div class=" d-flex flex-column">
            <label for="brand" class="form-label">Vehicle Brand Name</label>
            <input class="form-control" id="brand" style="width: 300px;" v-model="brand.nome">
          </div>
        </div>
        <button class="mt-3" type="submit">Register Brand Name</button>
      </form>
    </div>
  </div>
</template>
    
<script lang="ts">
    import { MarcaClient } from '@/client/marca.client';
    import { Marca } from '@/model/marca';
    import { defineComponent } from 'vue';
    
    export default defineComponent({
      data() {
        return {
          brand: new Marca(),
        };
      },
      computed: {
        brandClient() {
          return new MarcaClient();
        },
      },
      methods: {
        async submitForm() {
          try {
            const response = await this.brandClient.save(this.brand);
            const data = response;
            console.log(data);
          } catch (error) {
            console.log('Erro ao salvar marca', this.brand);
          }
        },
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
    