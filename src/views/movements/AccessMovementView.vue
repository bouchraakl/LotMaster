<template>
  <div class="access-content d-flex flex-column align-items-start justify-content-start">
    <!-- Header -->
    <div class="header d-flex align-content-start justify-content-between m-0">
      <p class="title-pages">Access: Open Movements</p>
      <div class="search-container">
        <input type="text" class="search-input" placeholder="Search By license plate or name..." v-model="searchQuery" />
        <i class="bi bi-search search-icon"></i>
      </div>
    </div>

    <!-- Filter -->
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

      <router-link to="/register-movement" class="router">
        <i class="bi bi-plus-square"></i>
      </router-link>
    </div>

    <!-- Table -->
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
                <i class="bi bi-pencil-square"></i>
              </button>
              <button class="btn btn-sm btn-danger" @click="deleteItem(open)" style="width: 45px;height: 30px;">
                <i class="bi bi-trash"></i>
              </button>
              <button class="btn btn-sm btn-success" @click="closeItem(open)" style="width: 45px;height: 30px;">
                <i class="bi bi-check-circle"></i>
              </button>
              <button type="button" class="btn btn-sm btn-info" data-bs-toggle="modal" data-bs-target="#details"
                style="width: 45px;height: 30px;color: #fff;font-weight: bold;" @click="viewItem(open)">
                <i class="bi bi-eye"></i>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal -->
    <div class="modal fade" id="details" tabindex="-1" aria-labelledby="details" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Movement Details</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body d-flex justify-content-between align-items-center">
            <div class="modal-col d-flex flex-column" style="text-align: start;">
              <p>Movement ID :</p>
              <p>Active :</p>
              <p>Registration Date :</p>
              <hr>
              <p>Driver Name :</p>
              <p>Driver CPF :</p>
              <p>Driver Phone :</p>
              <p>Driver Total Payed Hours :</p>
              <p>Driver Discount Hours :</p>
              <hr>
              <p>Vehicle License Plate :</p>
              <p>Vehicle Brand Name :</p>
              <p>Vehicle Modal Name :</p>
              <p>Vehicle Type :</p>
              <p>Vehicle Year :</p>
              <p>Vehicle Color :</p>
              <hr>
              <p>Entry Date :</p>
            </div>
            <div class="modal-col d-flex flex-column">
              <p>{{ selectedMove?.id }}</p>
              <p>{{ selectedMove?.ativo }}</p>
              <p>{{ selectedMove?.cadastro }}</p>
              <hr>
              <p>{{ selectedMove?.condutor.nome }}</p>
              <p>{{ selectedMove?.condutor.cpf }}</p>
              <p>{{ selectedMove?.condutor.telefone }}</p>
              <p>{{ selectedMove?.condutor.tempoPagoHoras }}</p>
              <p>{{ selectedMove?.tempoDesconto }}</p>
              <hr>
              <p>{{ selectedMove?.veiculo.placa }}</p>
              <p>{{ selectedMove?.veiculo.modelo.marca.nome }}</p>
              <p>{{ selectedMove?.veiculo.modelo.nome }}</p>
              <p>{{ selectedMove?.veiculo.tipo }}</p>
              <p>{{ selectedMove?.veiculo.ano }}</p>
              <p>{{ selectedMove?.veiculo.cor }}</p>
              <hr>
              <p>{{ selectedMove?.entrada }}</p>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-sm btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="pagination-container align-self-end">
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: currentPage === 0 }">
          <a class="page-link" href="#" aria-label="Previous" @click="previousPage"
            style="color: #3C3C43;background-color: #B5C2C9;">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item" :disabled="openFilter.length < pageSize">
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
// Import statements
import { computed, defineComponent } from "vue";
import { Movimentacao } from "@/model/movimentacao";
import { MovimentacaoClient } from "@/client/movimentacao.client";
import { VeiculoClient } from "@/client/veiculo.client";
import { PageRequest } from "@/model/pagesModel/page-request";
import { PageResponse } from "@/model/pagesModel/page-response";
import { Veiculo } from "@/model/veiculo";

export default defineComponent({
  name: "AccessVehicleModelView",
  data() {
    return {
      // Data properties for the component
      moves: [] as Movimentacao[],
      searchQuery: "",
      selectedYear: null as number | null,
      selectedMonth: null as number | null,
      selectedMove: null as Movimentacao | null,
      currentPage: 0,
      pageSize: 8,
    };
  },
  created() {
    // Lifecycle hook: created
    if (this.$route.query.licensePlate) {
      this.searchQuery = this.$route.query.licensePlate.toLocaleString();
    }
  },
  computed: {
    // Computed properties
    openFilter(): Movimentacao[] {
      // Computes filtered moves based on search query, year, and month
      if (!this.searchQuery && !this.selectedYear && !this.selectedMonth) {
        return this.moves;
      } else {
        const lowerCaseQuery = this.searchQuery.toLowerCase();
        return this.moves.filter((move: Movimentacao) => {
          const registerDate = new Date(move.entrada);
          const registerYear = registerDate.getFullYear();
          const registerMonth = registerDate.getMonth() + 1; // Adding 1 because getMonth() returns zero-based month value

          const matchesQuery =
            move.veiculo.placa.toLowerCase().includes(lowerCaseQuery) ||
            move.condutor.nome.toLowerCase().includes(lowerCaseQuery);

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
        });
      }
    },
    selectableYears(): number[] {
      // Computes selectable years based on the current year
      const currentYear = new Date().getFullYear();
      const years = [];
      for (let year = 2019; year <= currentYear; year++) {
        years.push(year);
      }
      return years;
    },
  },
  mounted() {
    // Lifecycle hook: mounted
    this.fetchMoves();
  },
  methods: {
    // Component methods
    async fetchMoves() {
      // Fetches moves from the server
      try {
        const pageRequest = new PageRequest();
        pageRequest.currentPage = this.currentPage;
        pageRequest.pageSize = this.pageSize;

        const moveClient = new MovimentacaoClient();
        const pageResponse: PageResponse<Movimentacao> = await moveClient.findByFiltrosPaginado(
          pageRequest
        );

        this.moves = pageResponse.content.filter((move: Movimentacao) => {
          return move.saida === null;
        });
      } catch (error) {
        console.error(error);
      }
    },
    previousPage() {
      // Goes to the previous page of moves
      if (this.currentPage > 0) {
        this.currentPage--;
        this.fetchMoves();
      }
    },
    nextPage() {
      // Goes to the next page of moves
      if (this.openFilter.length === this.pageSize) {
        this.currentPage++;
        this.fetchMoves();
      }
    },
    formatDate(dateString: string | number | Date) {
      // Formats a date string to a localized date and time string
      const dateTime = new Date(dateString);
      const formattedDate = dateTime.toLocaleDateString();
      const formattedTime = dateTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      return `${formattedDate} ${formattedTime}`;
    },
    async deleteItem(move: Movimentacao) {
      // Deletes a move
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
      // Edits a move
      try {
        const moveClient = new MovimentacaoClient();
        const editMoveIds = move.id;
        await this.$router.push({ name: "edit-movement", params: { editMovemId: editMoveIds } });
      } catch (error) {
        console.error(error);
      }
    },
    async closeItem(move: Movimentacao) {
      // Closes a move
      try {
        const moveClient = new MovimentacaoClient();
        const moveId = move.id;
        await this.$router.push({ name: "register-closemovement", params: { movemId: moveId } });
      } catch (error) {
        console.error(error);
      }
    },
    async viewItem(move: Movimentacao) {
      // Sets the selected move for the modal
      this.selectedMove = move;
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