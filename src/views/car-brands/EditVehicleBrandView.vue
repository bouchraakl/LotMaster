<template>
    <div class="access-content d-flex flex-column align-items-start justify-content-start">
      <p class="title-pages">Edit: {{ brandName }}</p>
      <div class="form-application d-flex flex-column custom-section">
        <form class="form-app d-flex flex-column align-items-start mt-4 h-100 gap-3" @submit.prevent="submitForm">
          <div class="d-flex align-items-center align-self-start gap-3">
            <div class="d-flex flex-column">
              <label for="brand" class="form-label">Vehicle Brand Name</label>
              <input class="form-control" id="brand" style="width: 300px" v-model="brandName" />
            </div>
          </div>
          <!-- Error Message -->
          <div class="mt-3 d-flex align-items-center gap-3">
            <button type="submit">Update Vehicle Brand</button>
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
  import { Marca } from "@/model/marca";
  import { defineComponent } from "vue";
  
  export default defineComponent({
    data() {
      return {
        editedBrand: new Marca(),
        brandName: "",
        errorMessage: {
          status: "", // Possible values: "success", "error"
          message: "",
        },
      };
    },
    computed: {
      brandClient() {
        return new MarcaClient();
      },
    },
    mounted() {
      this.fetchBrand();
    },
    methods: {
      async submitForm() {
        if (!this.brandName) {
          this.errorMessage.status = "error";
          this.errorMessage.message = "Brand name cannot be null.";
          return;
        }
  
        this.editedBrand.nome = this.brandName;
  
        try {
          this.editedBrand.id = Number(this.$route.params.editBrandId);
          await this.brandClient.update(this.editedBrand);
  
          // Set success message
          this.errorMessage.status = "success";
          this.errorMessage.message = "Brand edited successfully";
        } catch (error: any) {
          this.errorMessage.status = "error";
          if (error.response && error.response.data) {
            const errorMessages = Object.values(error.response.data);
            this.errorMessage.message = errorMessages.join(", ");
          } else {
            this.errorMessage.message = "An error occurred during updating.";
          }
        }
      },
  
      async fetchBrand() {
        const editBrandId = Number(this.$route.params.editBrandId);
  
        if (!isNaN(editBrandId)) {
          try {
            const response = await this.brandClient.findById(editBrandId);
            this.brandName = response.nome;
            this.editedBrand = response; // Populate the editedBrand object
            console.log(response);
          } catch (error) {
            console.log(error);
          }
        } else {
          console.log("Invalid editBrandIds parameter");
        }
      },
  
      cancelEdit() {
        this.$router.push("/access-vehicleBrand");
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
  