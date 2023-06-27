<template>
  <div class="access-content d-flex flex-column align-items-start justify-content-start">
    <!-- Header section -->
    <div class="header d-flex align-content-start justify-content-between m-0">
      <p class="title-pages">Access : Drivers</p>
      <!-- Search bar -->
      <div class="search-container">
        <input type="text" class="search-input" placeholder="Search By CPF or name ..." v-model="searchQuery" />
        <i class="bi bi-search search-icon "></i>
      </div>
    </div>
    <!-- Filter section -->
    <div class="filter d-flex align-items-center my-4 gap-4 w-100">
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
      <!-- Add driver button -->
      <router-link to="/register-conductor" class="router"><i class="bi bi-plus-square"></i></router-link>
    </div>
    <!-- Driver table -->
    <table class="table table-sm table-bordered w-100">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Active</th>
          <th scope="col">Registration Date</th>
          <th scope="col">Name</th>
          <th scope="col">CPF</th>
          <th scope="col">Phone</th>
          <th scope="col">Hours Payed</th>
          <th scope="col">Discount Hours</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="driver in driverFilter" :key="driver.id">
          <td>{{ driver.id }}</td>
          <td>{{ driver.ativo }}</td>
          <td>{{ formatDate(driver.cadastro) }}</td>
          <td>{{ driver.nome }}</td>
          <td>{{ driver.cpf }}</td>
          <td>{{ driver.telefone }}</td>
          <td>{{ driver.tempoPagoHoras }}</td>
          <td>{{ driver.tempoDescontoHoras }}</td>
          <td>
            <div class="d-flex justify-content-center gap-2">
              <!-- Edit and delete buttons -->
              <button class="btn btn-sm btn-primary" @click="editItem(driver)" style="width: 45px;height: 30px;">
                <i class="bi bi-pencil-square"></i></button>
              <button class="btn btn-sm btn-danger" @click="deleteItem(driver)" style="width: 45px;height: 30px;">
                <i class="bi bi-trash"></i></button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Pagination controls -->
    <div class="pagination-container align-self-end">
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: currentPage === 0 }">
          <a class="page-link" href="#" aria-label="Previous" @click="previousPage"
            style="color: #3C3C43;background-color: #B5C2C9;">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item" :disabled="driverFilter.length < pageSize">
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
import { Condutor } from "@/model/condutor";
import { CondutorClient } from "@/client/condutor.client";
import { VeiculoClient } from "@/client/veiculo.client";
import { PageRequest } from "@/model/pagesModel/page-request";
import { PageResponse } from "@/model/pagesModel/page-response";
import { Veiculo } from "@/model/veiculo";

export default defineComponent({
  name: "AccessVehicleModelView",

  data() {
    return {
      drivers: [] as Condutor[], // Array to store drivers
      searchQuery: '', // Search query string
      selectedYear: null as number | null, // Selected year
      selectedMonth: null as number | null, // Selected month
      currentPage: 0, // Current page number
      pageSize: 5, // Number of items per page
    };
  },

  computed: {
    // Filtered drivers based on search query, selected year, and selected month
    driverFilter(): Condutor[] {
      if (!this.searchQuery && !this.selectedYear && !this.selectedMonth) {
        return this.drivers; // No filters applied, return all drivers
      } else {
        const lowerCaseQuery = this.searchQuery.toLowerCase();
        return this.drivers.filter((driver: Condutor) => {
          const registerDate = new Date(driver.cadastro);
          const registerYear = registerDate.getFullYear();
          const registerMonth = registerDate.getMonth() + 1; // Adding 1 because getMonth() returns zero-based month value

          const matchesQuery =
            driver.nome.toString().toLowerCase().includes(lowerCaseQuery) ||
            driver.cpf.toString().toLowerCase().includes(lowerCaseQuery);

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

    // Array of selectable years
    selectableYears(): number[] {
      const currentYear = new Date().getFullYear();
      const years = [];
      for (let year = 2019; year <= currentYear; year++) {
        years.push(year);
      }
      return years;
    },
  },

  mounted() {
    this.fetchDriver(); // Fetch drivers when the component is mounted
  },

  methods: {
    // Fetch drivers from the server
    async fetchDriver() {
      try {
        const pageRequest = new PageRequest();
        pageRequest.currentPage = this.currentPage;
        pageRequest.pageSize = this.pageSize;

        const conductorClient = new CondutorClient();
        const pageResponse: PageResponse<Condutor> = await conductorClient.findByFiltrosPaginado(pageRequest);
        this.drivers = pageResponse.content; // Store the fetched drivers in the component data
      } catch (error) {
        console.error(error);
      }
    },

    // Go to the previous page of drivers
    previousPage() {
      if (this.currentPage > 0) {
        this.currentPage--;
        this.fetchDriver(); // Fetch drivers for the previous page
      }
    },

    // Go to the next page of drivers
    nextPage() {
      if (this.driverFilter.length === this.pageSize) {
        this.currentPage++;
        this.fetchDriver(); // Fetch drivers for the next page
      }
    },

    // Format a date string to a formatted date and time string
    formatDate(dateString: string | number | Date) {
      const dateTime = new Date(dateString);
      const formattedDate = dateTime.toLocaleDateString();
      const formattedTime = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      return `${formattedDate} ${formattedTime}`;
    },

    // Delete a driver
    async deleteItem(driver: Condutor) {
      const confirmation = confirm("Are you sure you want to delete this driver?");
      if (!confirmation) {
        return;
      }

      try {
        const driverClient = new CondutorClient();
        await driverClient.delete(driver.id);
        this.drivers = this.drivers.filter((item) => item.id !== driver.id); // Remove the deleted driver from the drivers array
      } catch (error) {
        console.error(error);
      }
    },

    // Edit a driver
    async editItem(driver: Condutor) {
      const conductorClient = new CondutorClient();
      const editCondutorIds = driver.id;
      await this.$router.push({ name: "edit-conductor", params: { editConductorId: editCondutorIds } });
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