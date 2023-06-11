<template>
  <div class="access-content d-flex flex-column align-items-start justify-content-start">
      <div class="header d-flex align-content-start justify-content-between">
          <p class="title-pages">Access : Closed Movements</p>
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
          <th scope="col">Vehicle Id</th>
          <th scope="col">Conductor Id</th>
          <th scope="col">Entry Date</th>
          <th scope="col">Exit Date</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="close in closeFilter" :key="close.id">
          <td>{{ close.id }}</td>
          <td>{{ close.ativo }}</td>
          <td>{{ formatDate(close.cadastro) }}</td>
          <td>{{ close.veiculo.id }}</td>
          <td>{{ close.condutor.id }}</td>
          <td>{{ formatDate(close.entrada) }}</td>
          <td>{{ formatDate(close.saida) }}</td>
          <td>
            <div class="d-flex justify-content-center actions">
              <button class="btn btn-sm btn-primary me-2" @click="editItem(close)" style="width: 100px;height: 30px;">
                <i class="bi bi-pencil-square"></i> Edit </button>
              <button class="btn btn-sm btn-danger" @click="deleteItem(close)" style="width: 100px;height: 30px;">
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
import { Movimentacao } from "@/model/movimentacao";
import { MovimentacaoClient } from "@/client/movimentacao.client";

export default defineComponent({
name: "AccessVehicleModelView",
data() {
  return {
    moves: [] as Movimentacao[],
    searchQuery: '',
  };
},
computed: {
  closeFilter(): Movimentacao[] {
    if (!this.searchQuery) {
      return this.moves;
    } else {
      return this.moves.filter((move: Movimentacao) => {
        return move.id.toString().includes(this.searchQuery) ||
         move.ativo.toString().includes(this.searchQuery) ||
          move.cadastro.toString().includes(this.searchQuery) ||
          move.veiculo.id.toString().includes(this.searchQuery) ||
          move.condutor.id.toString().includes(this.searchQuery) ||
          move.entrada.toString().includes(this.searchQuery) ||
          move.saida.toString().includes(this.searchQuery);
      });
    }
  }
},

mounted() {
  this.fetchMoves();
},
methods: {
  async fetchMoves() {
    try {
      const moveClient = new MovimentacaoClient();
      this.moves = await moveClient.findAllByClose();
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
    const confirmation = confirm("Are you sure you want to delete this movement?");
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
    this.$router.push({ name: "edit-closemovement", params: {brandId} });
    
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