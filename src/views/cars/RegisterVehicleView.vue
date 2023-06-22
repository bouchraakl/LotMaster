<template>
  <div
    class="access-content d-flex flex-column align-items-start justify-content-start"
  >
    <p class="title-pages">Register: Vehicle</p>
    <div class="form-application d-flex flex-column custom-section">
      <form
        class="form-app d-flex flex-column align-items-start mt-4 h-100 gap-3"
        @submit.prevent="submitForm"
      >
        <!-- Vehicle License Plate -->
        <div class="d-flex align-items-center align-self-start gap-3">
          <div class="d-flex flex-column">
            <label for="plate" class="form-label">Vehicle License Plate</label>
            <input
              class="form-control"
              id="plate"
              style="width: 300px"
              v-model="vehicle.placa"
            />
          </div>
        </div>
        <!-- Associated Model -->
        <div class="d-flex align-items-center align-self-start gap-3">
          <div class="d-flex flex-column">
            <label for="models" class="form-label">Associated Model</label>
            <input
              class="form-control"
              list="datalistOptions"
              id="models"
              placeholder="Search By Model Name ..."
              style="width: 300px"
              v-model="vehicle.modelo.nome"
            />
            <datalist id="datalistOptions">
              <option
                v-for="option in datalistOptions"
                :value="option"
              ></option>
            </datalist>
          </div>
          <router-link to="/register-vehicleModel" class="align-self-end">
            <button class="moveBtn m-0">Or Register New Model</button>
          </router-link>
        </div>
        <!-- Vehicle Year, Color, and Type -->
        <div class="d-flex align-items-center align-self-start gap-3">
          <div class="d-flex flex-column">
            <label for="year" class="form-label">Vehicle Year</label>
            <input
              class="form-control"
              type="number"
              id="year"
              style="width: 100px"
              v-model="vehicle.ano"
            />
          </div>
          <div class="d-flex flex-column">
            <label for="color" class="form-label">Vehicle Color</label>
            <select
              class="form-select"
              id="color"
              style="width: 200px"
              v-model="vehicle.cor"
            >
              <option v-for="color in colors" :key="color" :value="color">
                {{ color.toUpperCase() }}
              </option>
            </select>
          </div>
          <div class="d-flex flex-column">
            <label for="type" class="form-label">Vehicle Type</label>
            <select
              class="form-select"
              id="type"
              style="width: 200px"
              v-model="vehicle.tipo"
            >
              <option v-for="tipo in types" :key="tipo" :value="tipo">
                {{ tipo.toUpperCase() }}
              </option>
            </select>
          </div>
        </div>
        <!-- Error Message -->
        <div class="mt-4 d-flex align-items-center gap-3">
          <button type="submit">Register Vehicle</button>
          <router-link to="/access-vehicle" class="m-0"
            ><button>Access Vehicles</button></router-link>
          <p
            :class="[
              'error-message',
              errorMessage.status === 'success'
                ? 'text-success'
                : 'text-danger',
            ]"
          >
            {{ errorMessage.message }}
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { ModeloClient } from "@/client/modelo.client";
import { VeiculoClient } from "@/client/veiculo.client";
import { Cor } from "@/model/cor";
import { Tipo } from "@/model/tipo";
import { Veiculo } from "@/model/veiculo";
import { AxiosError } from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      vehicle: new Veiculo(),
      vehicles: [] as Veiculo[],
      datalistOptions: [] as string[],
      types: Object.values(Tipo),
      colors: Object.values(Cor),
      errorMessage: {
        status: "", // Possible values: "success", "error"
        message: "",
      },
    };
  },
  async mounted() {
    try {
      const modelClient = new ModeloClient();
      const vehicleData = await modelClient.findAll();
      this.datalistOptions = vehicleData.map((model) => model.nome);
      console.log(this.datalistOptions);
    } catch (error) {
      console.error("Failed to fetch vehicle data:", this.datalistOptions);
    }
  },
  computed: {
    vehicleClient() {
      return new VeiculoClient();
    },
  },
  methods: {
    async submitForm() {
      try {
        await this.fetchModelsId();
        const response = await this.vehicleClient.save(this.vehicle);
        const data = response;

        // Set success message
        this.errorMessage.status = "success";
        this.errorMessage.message = "Vehicle registered successfully";
      } catch (error: any) {
        this.errorMessage.status = "error";
        if (error.response && error.response.data) {
          const errorMessages = Object.values(error.response.data);
          this.errorMessage.message = errorMessages.join("");
        } else {
          this.errorMessage.message = "An error occurred during registration.";
        }
      }
    },

    async fetchModelsId() {
      try {
        const modelClient = new ModeloClient();
        const modelData = await modelClient.findByNome(
          this.vehicle.modelo.nome
        );
        if (modelData && modelData.id) {
          this.vehicle.modelo.id = modelData.id;
        } else {
          console.error("Model not found");
        }
      } catch (error) {
        console.error("Failed to fetch model ID:", error);
      }
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
