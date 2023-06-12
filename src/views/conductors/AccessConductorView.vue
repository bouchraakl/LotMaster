<template>
  <div class="access-content d-flex flex-column align-items-start justify-content-start">
    <div class="header d-flex align-content-start justify-content-between m-0">
      <p class="title-pages">Access : Drivers</p>
      <div class="search-container">
        <input type="text" class="search-input" placeholder="Search By CPF or name ..." v-model="searchQuery" />
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
              <button class="btn btn-sm btn-primary" @click="editItem(driver)" style="width: 45px;height: 30px;">
                <i class="bi bi-pencil-square"></i></button>
              <button class="btn btn-sm btn-danger" @click="deleteItem(driver)" style="width: 45px;height: 30px;">
                <i class="bi bi-trash"></i></button>
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
import { Condutor } from "@/model/condutor";
import { CondutorClient } from "@/client/condutor.client";

export default defineComponent({
  name: "AccessVehicleModelView",
  data() {
    return {
      drivers: [] as Condutor[],
      searchQuery: '',
      selectedYear: null as number | null,
      selectedMonth: null as number | null,
    };
  },
  computed: {
    driverFilter(): Condutor[] {
      if (!this.searchQuery && !this.selectedYear && !this.selectedMonth) {
        return this.drivers;
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
    this.fetchDriver();
  },
  methods: {
    async fetchDriver() {
      try {
        const driverClient = new CondutorClient();
        this.drivers = await driverClient.findAll();
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

    async deleteItem(driver: Condutor) {
      const confirmation = confirm("Are you sure you want to delete this driver?");
      if (!confirmation) {
        return;
      }

      try {
        const driverClient = new CondutorClient();
        await driverClient.delete(driver.id);
        this.drivers = this.drivers.filter((item) => item.id !== driver.id);
      } catch (error) {
        console.error(error);
      }
    },

    async editItem(driver: Condutor) {

      const brandId = driver.id;
      this.$router.push({ name: "/edit-conductor", params: { brandId } });

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