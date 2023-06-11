<template>
    <div class="access-content d-flex flex-column align-items-start justify-content-start">
        <div class="header d-flex align-content-start justify-content-between">
            <p class="title-pages">Access : Vehicle Models</p>
            <div class="search-container">
                <input type="text" class="search-input" placeholder="Search..." v-model="searchQuery" />
                <i class="bi bi-search search-icon "></i>
            </div>
        </div>
            <table class="table table-sm table-bordered w-100">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Active</th>
            <th scope="col">Register Date</th>
            <th scope="col">Vehicle Model Name</th>
            <th scope="col">Vehicle Brand Name</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="model in modelFilter" :key="model.id">
            <td> {{ model.id }} </td>
            <td>{{ model.ativo }}</td>
            <td>{{ formatDate(model.cadastro) }}</td>
            <td>{{ model.nome}}</td>
            <td>{{ model.marca.nome }}</td>
            <td>
              <div class="d-flex justify-content-center actions">
                <button class="btn btn-sm btn-primary me-2" @click="editItem(model)" style="width: 100px;height: 30px;">
                  <i class="bi bi-pencil-square"></i> Edit </button>
                <button class="btn btn-sm btn-danger" @click="deleteItem(model)" style="width: 100px;height: 30px;">
                  <i class="bi bi-trash"></i> Delete </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import axios from "axios";
import { Modelo } from "@/model/modelo";
import { MarcaClient } from "@/client/marca.client";
import { ModeloClient } from "@/client/modelo.client";
import { Marca } from "@/model/marca";

export default defineComponent({
  name: "AccessVehicleModelView",
  data() {
    return {
      models: [] as Modelo[],
      searchQuery: '',
    };
  },
  computed: {
    modelFilter(): Modelo[] {
      if (!this.searchQuery) {
        return this.models;
      } else {
        return this.models.filter((model: Modelo) => {
          return model.id.toString().includes(this.searchQuery) ||
           model.ativo.toString().includes(this.searchQuery) ||
            model.marca.nome.toString().includes(this.searchQuery) ||
            model.nome.toString().includes(this.searchQuery);
        });
      }
    }
  },

  mounted() {
    this.fetchModels();
  },
  methods: {
    async fetchModels() {
      try {
        const modeloClient = new ModeloClient();
        this.models = await modeloClient.findAll();
      } catch (error) {
        console.error(error);
      }
    },

    formatDate(dateString: string | number | Date) {
      const dateTime = new Date(dateString);
      const formattedDate = dateTime.toLocaleDateString();
      const formattedTime = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      return `${formattedDate} ${formattedTime}`;
    },

    async deleteItem(model: Modelo) {
      const confirmation = confirm("Are you sure you want to delete this vehicle modelo?");
      if (!confirmation) {
        return;
      }

      try {
        const modeloClient = new ModeloClient();
        await modeloClient.delete(model.id);
        this.models = this.models.filter((item) => item.id !== model.id);
      } catch (error) {
        console.error(error);
      }
    },

    async editItem(model: Modelo) {

      const brandId = model.id;
      this.$router.push({ name: "edit-vehicleModel", params: {brandId} });
      
    }
  },
});
</script>

<style scoped>
.header {
    margin-left: 30px;
    width: 100%;
}
</style>