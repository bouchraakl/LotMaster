<template>
    <div class="access-content d-flex flex-column align-items-start justify-content-start">
        <div class="header d-flex align-content-start justify-content-between">
            <p class="title-pages">Access : Vehicle Brands</p>
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
            <td>{{ brand.nome}}</td>
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
    };
  },
  computed: {
    brandFilter(): Marca[] {
      if (!this.searchQuery) {
        return this.brands;
      } else {
        return this.brands.filter((brand: Marca) => {
          return brand.id.toString().includes(this.searchQuery) ||
            brand.nome.toString().includes(this.searchQuery);
        });
      }
    }
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
      this.$router.push({ name: "edit-vehicleBrand", params: {brandId} });
      
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