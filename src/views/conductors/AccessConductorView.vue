<template>
    <div class="access-content d-flex flex-column align-items-start justify-content-start">
        <div class="header d-flex align-content-start justify-content-between">
            <p class="title-pages">Access : Drivers</p>
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
              <div class="d-flex justify-content-center actions">
                <button class="btn btn-sm btn-primary me-2" @click="editItem(driver)" style="width: 100px;height: 30px;">
                  <i class="bi bi-pencil-square"></i> Edit </button>
                <button class="btn btn-sm btn-danger" @click="deleteItem(driver)" style="width: 100px;height: 30px;">
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
import { Condutor } from "@/model/condutor";
import { CondutorClient } from "@/client/condutor.client";

export default defineComponent({
  name: "AccessVehicleModelView",
  data() {
    return {
      drivers: [] as Condutor[],
      searchQuery: '',
    };
  },
  computed: {
    driverFilter(): Condutor[] {
      if (!this.searchQuery) {
        return this.drivers;
      } else {
        return this.drivers.filter((driver: Condutor) => {
          return driver.id.toString().includes(this.searchQuery) ||
           driver.ativo.toString().includes(this.searchQuery) ||
            driver.cadastro.toString().includes(this.searchQuery) ||
            driver.nome.toString().includes(this.searchQuery) ||
            driver.cpf.toString().includes(this.searchQuery) ||
            driver.telefone.toString().includes(this.searchQuery);
        });
      }
    }
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
      this.$router.push({ name: "/edit-conductor", params: {brandId} });
      
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