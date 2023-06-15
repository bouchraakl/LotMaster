<template>
  <div class="access-content d-flex flex-column align-items-start justify-content-start">
    <p class="title-pages">Register : Vehicle Model</p>
    <div class="form-application d-flex flex-column custom-section">
      <form class="form-app d-flex flex-column align-items-start mt-4 h-100 gap-3" @submit.prevent="submitForm">
        <div class="d-flex align-items-center align-self-start gap-3">
          <div class="d-flex flex-column">
            <label for="brands" class="form-label">Associated Brand</label>
            <input class="form-control" list="datalistOptions" id="brands" style="width: 300px;"
  v-model="model.marca.nome" >

            <datalist id="datalistOptions">
              <option v-for="option in datalistOptions" :value="option"></option>
            </datalist>
          </div>
        </div>
        <div class="d-flex align-items-center align-self-start gap-3">
          <div class="d-flex flex-column">
            <label for="modelname" class="form-label">Model Name</label>
            <input class="form-control" id="modelname" style="width: 300px;" v-model="model.nome">
          </div>
        </div>
        <button class="mt-3" type="submit">Register Vehicle Model</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { MarcaClient } from '@/client/marca.client';
import { ModeloClient } from '@/client/modelo.client';
import { Modelo } from '@/model/modelo';
import { PageRequest } from '@/model/pagesModel/page-request';
import { defineComponent } from 'vue';
import  Vue from 'vue';

export default defineComponent({
  data() {
  return {
    model: new Modelo(),
    models: [] as Modelo[],
    datalistOptions: [] as string[],
  };
},

async mounted() {
  try {
    const marcaClient = new MarcaClient();
    const modelData = await marcaClient.findAll();
    this.datalistOptions = modelData.map((marca) => marca.nome);
    console.log(this.datalistOptions);
  } catch (error) {
    console.error('Failed to fetch model data:', this.datalistOptions);
  }
},
  computed: {
    modelClient() {
      return new ModeloClient();
    },
  },
  methods: {
    async submitForm() {
      try {
        await this.fetchBrandId();
        const response = await this.modelClient.save(this.model);
        const data = response;
        console.log(data);
      } catch (error) {
        console.log('Erro ao salvar modelo', this.model);
        console.log(error);
      }
    },
    async fetchBrandId() {
      try {
      const marcaClient = new MarcaClient();
      const brandData = await marcaClient.findByNome(this.model.marca.nome);
      if (brandData && brandData.id) {
        this.model.marca.id = brandData.id;
      } else {
        console.error('Brand not found');
      }
    } catch (error) {
      console.error('Failed to fetch brand ID:', error);
    }
    },
  },
});
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
