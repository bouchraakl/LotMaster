<template>
  <div class="access-content d-flex flex-column align-items-start justify-content-start">
    <div class="header d-flex align-content-start justify-content-between m-0">
      <p class="title-pages">Access : Vehicles</p>
      <div class="search-container">
        <input type="text" class="search-input" placeholder="Search By License Plate or names ..."
          v-model="searchQuery" />
        <i class="bi bi-search search-icon "></i>
      </div>
    </div>
    <div class="filter d-flex align-items-center my-4 gap-5">
      <div class="filter-container d-flex align-items-center gap-2">
        <label for="year-filter">Year:</label>
        <select id="year-filter" v-model="selectedYear" class="form-select" style="padding: 0.3rem 2rem 0.3rem 0.75rem;">
          <option value="">All</option>
          <option v-for="year in selectableYears" :value="year">{{ year }}</option>
        </select>
      </div>

      <div class="filter-container d-flex align-items-center gap-2">
        <label for="month-filter">Month:</label>
        <select id="month-filter" v-model="selectedMonth" class="form-select">
          <option value="">All</option>
          <option v-for="month in 12" :value="month">{{ month }}</option>
        </select>
      </div>

      <div class="filter-container d-flex align-items-center gap-2">
        <label for="tipo-filter">Type:</label>
        <select id="tipo-filter" v-model="selectedTipo" class="form-select">
          <option value="">All</option>
          <option v-for="tipo in selectableTipos" :value="tipo">{{ tipo }}</option>
        </select>
      </div>

      <div class="filter-container d-flex align-items-center gap-2">
        <label for="carro-filter">Color:</label>
        <select id="carro-filter" v-model="selectedCores" class="form-select">
          <option value="">All</option>
          <option v-for="cores in availableCores" :value="cores">{{ cores }}</option>
        </select>
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
          <td>{{ car.placa }}</td>
          <td>{{ car.modelo.nome }}</td>
          <td>{{ car.modelo.marca.nome }}</td>
          <td>{{ car.ano }}</td>
          <td>{{ car.tipo }}</td>
          <td>{{ car.cor }}</td>
          <td>
            <div class="d-flex justify-content-center gap-2">
              <button class="btn btn-sm btn-primary" @click="editItem(car)" style="width: 45px;height: 30px;">
                <i class="bi bi-pencil-square"></i></button>
              <button class="btn btn-sm btn-danger" @click="deleteItem(car)" style="width: 45px;height: 30px;">
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
import { Tipo } from "@/model/tipo";
import { Cor } from "@/model/cor";

export default defineComponent({
  name: "AccessVehicleModelView",
  data() {
    return {
      cars: [] as Veiculo[],
      searchQuery: '',
      selectedYear: null as number | null,
      selectedMonth: null as number | null,
      selectedTipo: null as Tipo | null,
      selectedCores: null as Cor | null,
    };
  },
  computed: {
    carFilter(): Veiculo[] {
      if (!this.searchQuery && !this.selectedYear && !this.selectedMonth && !this.selectedTipo && !this.selectedCores) {
        return this.cars;
      } else {
        const lowerCaseQuery = this.searchQuery.toLowerCase();
        return this.cars.filter((car: Veiculo) => {
          const registerDate = new Date(car.cadastro);
          const registerYear = registerDate.getFullYear();
          const registerMonth = registerDate.getMonth() + 1; // Adding 1 because getMonth() returns zero-based month value

          const matchesQuery =
            car.id.toString().trim().toLowerCase().includes(lowerCaseQuery) ||
            car.placa.toLowerCase().includes(lowerCaseQuery) ||
            car.modelo.nome.toLowerCase().includes(lowerCaseQuery) ||
            car.modelo.marca.nome.toLowerCase().includes(lowerCaseQuery);

          const matchesTipo = !this.selectedTipo || car.tipo === this.selectedTipo;
          const matchesCarro = !this.selectedCores || car.cor === this.selectedCores;

          if (this.selectedYear && this.selectedMonth) {
            return matchesQuery && registerYear === this.selectedYear && registerMonth === this.selectedMonth && matchesTipo && matchesCarro;
          } else if (this.selectedYear) {
            return matchesQuery && registerYear === this.selectedYear && matchesTipo && matchesCarro;
          } else if (this.selectedMonth) {
            return matchesQuery && registerMonth === this.selectedMonth && matchesTipo && matchesCarro;
          } else {
            return matchesQuery && matchesTipo && matchesCarro;
          }
        });
      }
    },

    selectableYears(): number[] {
      const currentYear = new Date().getFullYear();
      const years = [];
      for (let year = 2019; year <= currentYear; year++) {
        years.push(year);
      }
      return years;
    },

    selectableTipos(): string[]  {
      const tipos = Object.values(Tipo);
      return tipos.map((tipo) => tipo.toUpperCase());
    },


    availableCores(): string[] {
      const cores =  Object.values(Cor);
      return cores.map((core) => core.toUpperCase());
    },

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
      this.$router.push({ name: "/access-vehicle", params: { brandId } });

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