<template>
  <div class="access-content d-flex flex-column align-items-start justify-content-start">
    <div class="header d-flex align-content-start justify-content-between m-0">
      <!-- Displaying the title of the page -->
      <p class="title-pages">Access: Vehicle Models</p>
      <div class="search-container">
        <!-- Input field for searching by ID or name -->
        <input type="text" class="search-input" placeholder="Search By Id or name ..." v-model="searchQuery" />
        <i class="bi bi-search search-icon "></i>
      </div>
    </div>
    <div class="filter d-flex align-items-center my-4 gap-4 w-100">
      <div class="filter-container d-flex align-items-center gap-2">
        <label for="year-filter">Year:</label>
        <!-- Dropdown for selecting the year filter -->
        <select id="year-filter" v-model="selectedYear" class="form-select" style="padding: 0.3rem 2rem 0.3rem 0.75rem;">
          <option value="">All</option>
          <option v-for="year in selectableYears" :value="year">{{ year }}</option>
        </select>
      </div>

      <div class="filter-container d-flex align-items-center gap-2">
        <label for="month-filter">Month:</label>
        <!-- Dropdown for selecting the month filter -->
        <select id="month-filter" v-model="selectedMonth" class="form-select">
          <option value="">All</option>
          <option v-for="month in 12" :value="month">{{ month }}</option>
        </select>
      </div>
      <!-- Button to navigate to the register vehicle model page -->
      <router-link to="/register-vehicleModel" class="router"><i class="bi bi-plus-square"></i></router-link>
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
          <!-- Displaying the model details -->
          <td>{{ model.id }}</td>
          <td>{{ model.ativo }}</td>
          <td>{{ formatDate(model.cadastro) }}</td>
          <td>{{ model.nome }}</td>
          <td>{{ model.marca.nome }}</td>
          <td>
            <div class="d-flex justify-content-center gap-2">
              <!-- Buttons for editing and deleting the model -->
              <button class="btn btn-sm btn-primary" @click="editItem(model)" style="width: 45px;height: 30px;">
                <i class="bi bi-pencil-square"></i>
              </button>
              <button class="btn btn-sm btn-danger" @click="deleteItem(model)" style="width: 45px;height: 30px;">
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Add pagination controls -->
    <div class="pagination-container align-self-end">
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: currentPage === 0 }">
          <!-- Button for navigating to the previous page -->
          <a class="page-link" href="#" aria-label="Previous" @click="previousPage"
            style="color: #3C3C43;background-color: #B5C2C9;">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item" :disabled="modelFilter.length < pageSize">
          <!-- Button for navigating to the next page -->
          <a class="page-link" href="#" aria-label="Next" @click="nextPage"
            style="color: #3C3C43;background-color: #B5C2C9;">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>


<script lang="ts">
import { computed, defineComponent } from "vue";
import axios from "axios";
import { Modelo } from "@/model/modelo";
import { MarcaClient } from "@/client/marca.client";
import { ModeloClient } from "@/client/modelo.client";
import { Marca } from "@/model/marca";
import { PageRequest } from "@/model/pagesModel/page-request";
import { PageResponse } from "@/model/pagesModel/page-response";

export default defineComponent({
  name: "AccessVehicleModelView",
  data() {
    return {
      models: [] as Modelo[], // Array to store the fetched models
      searchQuery: '',
      selectedYear: null as number | null,
      selectedMonth: null as number | null,
      currentPage: 0, // Current page of models
      pageSize: 9, // Number of models per page
    };
  },
  computed: {
    // Computed property to filter models based on search and filter criteria
    modelFilter(): Modelo[] {
      if (!this.searchQuery && !this.selectedYear && !this.selectedMonth) {
        return this.models;
      } else {
        const lowerCaseQuery = this.searchQuery.toLowerCase();
        return this.models.filter((model: Modelo) => {
          const registerDate = new Date(model.cadastro);
          const registerYear = registerDate.getFullYear();
          const registerMonth = registerDate.getMonth() + 1; // Adding 1 because getMonth() returns zero-based month value

          const matchesQuery = model.id.toString().toLowerCase().includes(lowerCaseQuery) ||
            model.nome.toString().toLowerCase().includes(lowerCaseQuery) ||
            model.marca.nome.toString().toLowerCase().includes(lowerCaseQuery);

          if (this.selectedYear && this.selectedMonth) {
            return matchesQuery && registerYear === this.selectedYear && registerMonth === this.selectedMonth;
          } else if (this.selectedYear) {
            return matchesQuery && registerYear === this.selectedYear;
          } else if (this.selectedMonth) {
            return matchesQuery && registerMonth === this.selectedMonth;
          } else {
            return matchesQuery;
          }
        });
      }
    },
    // Computed property to generate the selectable years for the year filter dropdown
    selectableYears(): number[] {
      const currentYear = new Date().getFullYear();
      const years = [];
      for (let year = 2019; year <= currentYear; year++) {
        years.push(year);
      }
      return years;
    },
  },

  // Fetch the models when the component is mounted
  mounted() {
    this.fetchModels();
  },
  methods: {
    async fetchModels() {
      try {
        // Using a model client to make the API request and retrieve the models
        const pageRequest = new PageRequest();
        pageRequest.currentPage = this.currentPage;
        pageRequest.pageSize = this.pageSize;

        const modelClient = new ModeloClient();
        const pageResponse: PageResponse<Modelo> = await modelClient.findByFiltrosPaginado(pageRequest);
        this.models = pageResponse.content;
      } catch (error) {
        console.error(error);
      }
    },

    // Method to format the date string
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
        // Using a model client to delete the model
        const modeloClient = new ModeloClient();
        await modeloClient.delete(model.id);
        this.models = this.models.filter((item) => item.id !== model.id);
      } catch (error) {
        console.error(error);
      }
    },

    // Method to edit a model
    async editItem(model: Modelo) {
      try {
        const modelClient = new ModeloClient();
        const editModelIds = model.id;
        await this.$router.push({ name: "edit-vehicleModel", params: { editModelId: editModelIds } });
      } catch (error) {
        console.error(error);
      }

    },

    // Method to navigate to the previous page
    previousPage() {
      if (this.currentPage > 0) {
        this.currentPage--;
        this.fetchModels(); // Fetch models for the previous page
      }
    },

    // Method to navigate to the next page
    nextPage() {
      if (this.modelFilter.length === this.pageSize) {
        this.currentPage++;
        this.fetchModels();// Fetch models for the next page
      }
    },
  },
});
</script>

<style scoped>
.header {
  margin-left: 30px;
  width: 100%;
}
</style>