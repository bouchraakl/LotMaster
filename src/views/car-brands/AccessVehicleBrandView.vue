<template>
  <div class="access-content d-flex flex-column align-items-start justify-content-start">
    <div class="header d-flex align-content-start justify-content-between m-0">
      <p class="title-pages">Access : Vehicle Brands</p>
      <div class="search-container">
        <input type="text" class="search-input" placeholder="Search By Id or Name ..." v-model="searchQuery" />
        <i class="bi bi-search search-icon"></i>
      </div>
    </div>
    <div class="filter d-flex align-items-center my-4 gap-4">
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
    </div>
    <table class="table table-sm table-bordered w-100">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Active</th>
          <th scope="col">Register Date</th>
          <th scope="col">Vehicle Brand Name</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="brand in brandFilter" :key="brand.id">
          <td>{{ brand.id }}</td>
          <td>{{ brand.ativo }}</td>
          <td>{{ formatDate(brand.cadastro) }}</td>
          <td>{{ brand.nome }}</td>
          <td>
            <div class="d-flex justify-content-center gap-2">
              <button class="btn btn-sm btn-primary" @click="editItem(brand)" style="width: 45px;height: 30px;">
                <i class="bi bi-pencil-square"></i>
              </button>
              <button class="btn btn-sm btn-danger" @click="deleteItem(brand)" style="width: 45px;height: 30px;">
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
          <a class="page-link" href="#" aria-label="Previous" @click="previousPage"
            style="color: #3C3C43;background-color: #B5C2C9;">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item" :disabled="brandFilter.length < pageSize">
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
import { Marca } from "@/model/marca";
import { MarcaClient } from "@/client/marca.client";
import axios from "axios";
import { PageRequest } from "@/model/pagesModel/page-request";
import { PageResponse } from "@/model/pagesModel/page-response";

export default defineComponent({
  name: "VehicleBrandView",
  data() {
    return {
      brands: [] as Marca[],
      searchQuery: "",
      selectedYear: null as number | null,
      selectedMonth: null as number | null,
      currentPage: 0,
      pageSize: 10,
    };
  },
  computed: {

    brandFilter(): Marca[] {
  if (!this.searchQuery && !this.selectedYear && !this.selectedMonth) {
    return this.brands.slice().sort((a: Marca, b: Marca) => a.id - b.id);
  } else {
    const lowerCaseQuery = this.searchQuery.toLowerCase();
    return this.brands.filter((brand: Marca) => {
      const registerDate = new Date(brand.cadastro);
      const registerYear = registerDate.getFullYear();
      const registerMonth = registerDate.getMonth() + 1;

      const matchesQuery =
        brand.id.toString().toLowerCase().includes(lowerCaseQuery) ||
        brand.nome.toString().toLowerCase().includes(lowerCaseQuery);

      if (this.selectedYear && this.selectedMonth) {
        return (
          matchesQuery &&
          registerYear === this.selectedYear &&
          registerMonth === this.selectedMonth
        );
      } else if (this.selectedYear) {
        return matchesQuery && registerYear === this.selectedYear;
      } else if (this.selectedMonth) {
        return matchesQuery && registerMonth === this.selectedMonth;
      } else {
        return matchesQuery;
      }
    }).sort((a: Marca, b: Marca) => a.id - b.id);
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
  },
  mounted() {
    this.fetchBrands();
  },
  methods: {
    async fetchBrands() {
      try {
        const pageRequest = new PageRequest();
        pageRequest.currentPage = this.currentPage;
        pageRequest.pageSize = this.pageSize;

        const brandClient = new MarcaClient();
        const pageResponse: PageResponse<Marca> = await brandClient.findByFiltrosPaginado(pageRequest);
        this.brands = pageResponse.content;
      } catch (error) {
        console.error(error);
      }
    },
    formatDate(dateString: string | number | Date) {
      const dateTime = new Date(dateString);
      const formattedDate = dateTime.toLocaleDateString();
      const formattedTime = dateTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      return `${formattedDate} ${formattedTime}`;
    },
    async deleteItem(brand: Marca) {
      const confirmation = confirm("Are you sure you want to delete this vehicle brand?");
      if (!confirmation) {
        return;
      }

      try {
        const brandClient = new MarcaClient();
        await brandClient.delete(brand.id);
        this.brands = this.brands.filter((item) => item.id !== brand.id);
      } catch (error) {
        console.error(error);
      }
    },
    async editItem(brand: Marca) {
      try {
        const brandClient = new MarcaClient();
        const editBrandIds = brand.id;
        await this.$router.push({ name: "edit-vehicleBrand", params: { editBrandId: editBrandIds } });
      } catch (error) {
        console.error(error);
      }
    },
    previousPage() {
      if (this.currentPage > 0) {
        this.currentPage--;
        this.fetchBrands();
      }
    },
    nextPage() {
      if (this.brandFilter.length === this.pageSize) {
        this.currentPage++;
        this.fetchBrands();
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

.pagination-container {
  margin-right: 3rem;
}
</style>
