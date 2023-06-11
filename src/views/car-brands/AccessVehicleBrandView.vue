<template>
  <div class="access-content d-flex flex-column align-items-start justify-content-start">
    <div class="header d-flex align-content-start justify-content-between m-0">
      <p class="title-pages">Access : Vehicle Brands</p>
      <div class="search-container">
        <input type="text" class="search-input" placeholder="Search By Id or Name ..." v-model="searchQuery" />
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
          <td> {{ brand.id }} </td>
          <td>{{ brand.ativo }}</td>
          <td>{{ formatDate(brand.cadastro) }}</td>
          <td>{{ brand.nome }}</td>
          <td>
            <div class="d-flex justify-content-center actions">
              <button class="btn btn-sm btn-primary me-2" @click="editItem(brand)" style="width: 100px;height: 30px;">
                <i class="bi bi-pencil-square"></i> Edit </button>
              <button class="btn btn-sm btn-danger" @click="deleteItem(brand)" style="width: 100px;height: 30px;">
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
import { Marca } from "@/model/marca";
import { MarcaClient } from "@/client/marca.client";
import axios from "axios";

export default defineComponent({
  name: "VehicleBrandView",
  data() {
    return {
      brands: [] as Marca[],
      searchQuery: '',
      selectedYear: null as number | null,
      selectedMonth: null as number | null,
    };
  },
  computed: {
    brandFilter(): Marca[] {
      if (!this.searchQuery && !this.selectedYear && !this.selectedMonth) {
        return this.brands;
      } else {
        const lowerCaseQuery = this.searchQuery.toLowerCase();
        return this.brands.filter((brand: Marca) => {
          const registerDate = new Date(brand.cadastro);
          const registerYear = registerDate.getFullYear();
          const registerMonth = registerDate.getMonth() + 1; // Adding 1 because getMonth() returns zero-based month value

          const matchesQuery = brand.id.toString().toLowerCase().includes(lowerCaseQuery) ||
            brand.nome.toString().toLowerCase().includes(lowerCaseQuery);

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
        const brandClient = new MarcaClient();
        this.brands = await brandClient.findAll();
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

      const brandId = brand.id;
      this.$router.push({ name: "edit-vehicleBrand", params: { brandId } });

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