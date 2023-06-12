<template>
  <div class="access-content d-flex flex-column align-items-start justify-content-start">
    <div class="header d-flex align-content-start justify-content-between m-0">
      <p class="title-pages">Access : Open Movements</p>
      <div class="search-container">
        <input type="text" class="search-input" placeholder="Search By license plate or name..." v-model="searchQuery" />
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
          <th scope="col">License Plate</th>
          <th scope="col">Conductor Name</th>
          <th scope="col">Entry Date</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="open in openFilter" :key="open.id">
          <td>{{ open.id }}</td>
          <td>{{ open.ativo }}</td>
          <td>{{ formatDate(open.cadastro) }}</td>
          <td>{{ open.veiculo.placa }}</td>
          <td>{{ open.condutor.nome }}</td>
          <td>{{ formatDate(open.entrada) }}</td>
          <td>
            <div class="d-flex justify-content-center gap-2">
              <button class="btn btn-sm btn-primary" @click="editItem(open)" style="width: 45px;height: 30px;">
                <i class="bi bi-pencil-square"></i></button>
              <button class="btn btn-sm btn-danger" @click="deleteItem(open)" style="width: 45px;height: 30px;">
                <i class="bi bi-trash"></i></button>
              <button class="btn btn-sm btn-success" @click="closeItem(open)" style="width: 45px;height: 30px;">
                <i class="bi bi-check-circle"></i></button>
              <button class="btn btn-sm btn-info " @click="viewItem(open)" style="width: 45px;height: 30px;color: #fff;">
                <i class="bi bi-eye"></i></button>
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
import { Movimentacao } from "@/model/movimentacao";
import { MovimentacaoClient } from "@/client/movimentacao.client";

export default defineComponent({
  name: "AccessVehicleModelView",
  data() {
    return {
      moves: [] as Movimentacao[],
      searchQuery: '',
      selectedYear: null as number | null,
      selectedMonth: null as number | null,
    };
  },
  computed: {
    openFilter(): Movimentacao[] {
      if (!this.searchQuery && !this.selectedYear && !this.selectedMonth) {
        return this.moves;
      } else {
        const lowerCaseQuery = this.searchQuery.toLowerCase();
        return this.moves.filter((move: Movimentacao) => {
          const registerDate = new Date(move.cadastro);
          const registerYear = registerDate.getFullYear();
          const registerMonth = registerDate.getMonth() + 1; // Adding 1 because getMonth() returns zero-based month value

          const matchesQuery = 
            move.veiculo.placa.toLowerCase().includes(lowerCaseQuery) ||
            move.condutor.nome.toLowerCase().includes(lowerCaseQuery);

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
    this.fetchMoves();
  },
  methods: {
    async fetchMoves() {
      try {
        const moveClient = new MovimentacaoClient();
        this.moves = await moveClient.findAllByOpen();
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

    async deleteItem(move: Movimentacao) {
      const confirmation = confirm("Are you sure you want to delete this driver?");
      if (!confirmation) {
        return;
      }

      try {
        const moveClient = new MovimentacaoClient();
        await moveClient.delete(move.id);
        this.moves = this.moves.filter((item) => item.id !== move.id);
      } catch (error) {
        console.error(error);
      }
    },

    async editItem(move: Movimentacao) {

      const brandId = move.id;
      this.$router.push({ name: "/edit-movement", params: { brandId } });

    },

    async closeItem(move: Movimentacao) {
    },

    async viewItem(move: Movimentacao) {
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