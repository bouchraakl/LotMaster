<template>
    <div class="access-content d-flex flex-column align-items-start justify-content-start">
        <div class="header d-flex align-content-start justify-content-between">
            <p class="title-pages">Access : Vehicles</p>
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
            <th scope="col">Registration Date</th>
            <th scope="col">License Plate</th>
            <th scope="col">Vehicle Model</th>
            <th scope="col">Vehicle Brand</th>
            <th scope="col">Year</th>
            <th scope="col">Type</th>
            <th scope="col">Color</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="car in carFilter" :key="car.id">
            <td> {{ car.id }} </td>
            <td>{{ car.ativo }}</td>
            <td>{{ formatDate(car.cadastro) }}</td>
            <td>{{ car.placa}}</td>
            <td>{{ car.modelo.nome }}</td>
            <td>{{ car.modelo.marca.nome }}</td>
            <td>{{ car.ano }}</td>
            <td>{{ car.tipo }}</td>
            <td>{{ car.cor }}</td>
            <td>
              <div class="d-flex justify-content-center actions">
                <button class="btn btn-sm btn-primary me-2" @click="editItem(car)" style="width: 100px;height: 30px;">
                  <i class="bi bi-pencil-square"></i> Edit </button>
                <button class="btn btn-sm btn-danger" @click="deleteItem(car)" style="width: 100px;height: 30px;">
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
import { Veiculo } from "@/model/veiculo";
import { VeiculoClient } from "@/client/veiculo.client";

export default defineComponent({
  name: "AccessVehicleModelView",
  data() {
    return {
      cars: [] as Veiculo[],
      searchQuery: '',
    };
  },
  computed: {
    carFilter(): Veiculo[] {
      if (!this.searchQuery) {
        return this.cars;
      } else {
        return this.cars.filter((car: Veiculo) => {
          return car.id.toString().includes(this.searchQuery) ||
           car.ativo.toString().includes(this.searchQuery) ||
            car.cadastro.toString().includes(this.searchQuery) ||
            car.modelo.nome.toString().includes(this.searchQuery) ||
            car.modelo.marca.nome.toString().includes(this.searchQuery) ||
            car.ano.toString().includes(this.searchQuery) ||
            car.tipo.toString().includes(this.searchQuery) ||
            car.cor.toString().includes(this.searchQuery);
        });
      }
    }
  },

  mounted() {
    this.fetchCar();
  },
  methods: {
    async fetchCar() {
      try {
        const veiculoClient = new VeiculoClient();
        this.cars = await veiculoClient.findAll();
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

    async deleteItem(car: Veiculo) {
      const confirmation = confirm("Are you sure you want to delete this vehicle modelo?");
      if (!confirmation) {
        return;
      }

      try {
        const carClient = new VeiculoClient();
        await carClient.delete(car.id);
        this.cars = this.cars.filter((item) => item.id !== car.id);
      } catch (error) {
        console.error(error);
      }
    },

    async editItem(car: Veiculo) {

      const brandId = car.id;
      this.$router.push({ name: "/access-vehicle", params: {brandId} });
      
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