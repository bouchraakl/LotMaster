<template>
  <div class="access-content d-flex flex-column align-items-start justify-content-start">
    <!-- Edit Title -->
    <p class="title-pages">Edit: {{ modelName }}</p>
    <div class="form-application d-flex flex-column custom-section">
      <form class="form-app d-flex flex-column align-items-start mt-4 h-100 gap-3" @submit.prevent="submitForm">
        <!-- Associated Brand -->
        <div class="d-flex align-items-center align-self-start gap-3">
          <div class="d-flex flex-column">
            <label for="brands" class="form-label">Associated Brand</label>
            <input class="form-control" list="datalistOptions" id="brands" style="width: 300px"
              v-model="associatedBrand" />
            <datalist id="datalistOptions">
              <option v-for="option in datalistOptions" :value="option"></option>
            </datalist>
          </div>
        </div>
        <!-- Model Name -->
        <div class="d-flex align-items-center align-self-start gap-3">
          <div class="d-flex flex-column">
            <label for="modelname" class="form-label">Model Name</label>
            <input class="form-control" id="modelname" style="width: 300px" v-model="modelName" />
          </div>
        </div>
        <!-- Error Message -->
        <div class="mt-3 d-flex align-items-center gap-3">
          <button type="submit">Update Vehicle Model</button>
          <button type="button" @click="cancelEdit">Cancel</button>
          <p :class="['error-message', errorMessage.status === 'success' ? 'text-success' : 'text-danger']">
            {{ errorMessage.message }}
          </p>
        </div>
      </form>
    </div>
  </div>
</template>
  
<script lang="ts">
import { MarcaClient } from "@/client/marca.client";
import { ModeloClient } from "@/client/modelo.client";
import { Modelo } from "@/model/modelo";
import { PageRequest } from "@/model/pagesModel/page-request";
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      editedmodel: new Modelo(),
      models: [] as Modelo[],
      datalistOptions: [] as string[],
      errorMessage: {
        status: "", // Possible values: "success", "error"
        message: "",
      },
      associatedBrand: "",
      modelName: "",
    };
  },

  async mounted() {
    try {
      const marcaClient = new MarcaClient();
      const modelData = await marcaClient.findAll();
      this.datalistOptions = modelData.map((marca) => marca.nome);
      await this.fetchItems();
    } catch (error) {
      console.error("Failed to fetch model data:", error);
    }
  },

  computed: {
    modelClient() {
      return new ModeloClient();
    },
  },

  methods: {
    async submitForm() {
      if (!this.modelName) {
        this.errorMessage.status = "error";
        this.errorMessage.message = "Model name cannot be null.";
        return;
      }

      if (!this.associatedBrand) {
        this.errorMessage.status = "error";
        this.errorMessage.message = "Brand cannot be null.";
        return;
      }

      this.editedmodel.nome = this.modelName;
      this.editedmodel.marca.nome = this.associatedBrand;

      try {
        this.editedmodel.id = Number(this.$route.params.editModelId);
        const brandIdFetched = await this.fetchBrandId(); // Fetch brand ID before updating

        if (brandIdFetched) {
          await this.modelClient.update(this.editedmodel);
          // Set success message
          this.errorMessage.status = "success";
          this.errorMessage.message = "Model edited successfully";
        } else {
          // Brand ID not fetched
          this.errorMessage.status = "error";
          this.errorMessage.message = "Brand not found.";
        }
      } catch (error: any) {
        this.errorMessage.status = "error";
        if (error.response && error.response.data) {
          const errorMessages = Object.values(error.response.data);
          this.errorMessage.message = errorMessages.join("");
        } else {
          this.errorMessage.message = "An error occurred during updating.";
        }
      }
    },

    async fetchBrandId() {
      try {
        const marcaClient = new MarcaClient();
        const brandData = await marcaClient.findByNome(this.editedmodel.marca.nome);

        if (brandData && brandData.id) {
          this.editedmodel.marca.id = brandData.id;
          return true; // Brand ID fetched successfully
        } else {
          console.error("Brand not found");
          return false; // Brand ID not found
        }
      } catch (error: any) {
        console.error("Failed to fetch brand ID:", error);
        return false; // Error occurred during fetching
      }
    },

    async fetchItems() {
      const editModelId = Number(this.$route.params.editModelId);

      if (!isNaN(editModelId)) {
        try {
          const response = await this.modelClient.findById(editModelId);
          this.modelName = response.nome;
          this.associatedBrand = response.marca.nome;
          this.editedmodel = response;
        } catch (error: any) {
          this.errorMessage.status = "error";
          if (error.response && error.response.data) {
            const errorMessages = Object.values(error.response.data);
            this.errorMessage.message = errorMessages.join("");
          } else {
            this.errorMessage.message = "An error occurred during updating.";
          }
        }
      } else {
        console.log("Invalid editModelId parameter");
      }
    },

    cancelEdit() {
      this.$router.push("/access-vehicleModel");
    },
  },
});
</script>
  
<style scoped>
.moveBtn {
  width: 258px;
  height: 37px;
  border-radius: 5px;
  border: none;
  font-family: "Raleway";
  font-weight: 500;
  font-size: 15px;
  background: #b5c2c9;
  color: #f3f3f3;
  margin: 0;
}

label {
  font-family: Raleway;
  font-size: 15px;
  font-weight: 400;
  line-height: 20px;
  text-align: left;
}
</style>
  