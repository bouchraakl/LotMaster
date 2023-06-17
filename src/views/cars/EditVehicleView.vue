<template>
    <div
      class="access-content d-flex flex-column align-items-start justify-content-start"
    >
      <p class="title-pages">Edit: Vehicle</p>
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
                v-model="vehiclePlaca"
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
                v-model="associatedModel"
              />
              <datalist id="datalistOptions">
                <option
                  v-for="option in datalistOptions"
                  :value="option"
                ></option>
              </datalist>
            </div>
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
                v-model="vehicleYear"
              />
            </div>
            <div class="d-flex flex-column">
              <label for="color" class="form-label">Vehicle Color</label>
              <select
                class="form-select"
                id="color"
                style="width: 200px"
                v-model="vehicleColor"
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
                v-model="vehicleType"
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
        editedvehicle: new Veiculo(),
        vehicles: [] as Veiculo[],
        datalistOptions: [] as string[],
        types: Object.values(Tipo),
        colors: Object.values(Cor),
        errorMessage: {
          status: "", // Possible values: "success", "error"
          message: "",
        },
        vehiclePlaca: "",
        associatedModel: "",
        vehicleYear: 0,
        vehicleColor: Object.values(Cor)[0],
        vehicleType: Object.values(Tipo)[0],
      };
    },
    async mounted() {
      try {
        this.fetchItems();
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
            if (!this.vehiclePlaca) {
                this.errorMessage.status = "error";
                this.errorMessage.message = "Vehicle Plate cannot be null.";
                return;
            }

            if (!this.associatedModel) {
                this.errorMessage.status = "error";
                this.errorMessage.message = "Model cannot be null.";
                return;
            }

            if (!this.vehicleYear) {
                this.errorMessage.status = "error";
                this.errorMessage.message = "Vehicle Year cannot be null.";
                return;
            }

            if (!this.vehicleColor) {
                this.errorMessage.status = "error";
                this.errorMessage.message = "Vehicle Color cannot be null.";
                return;
            }

            if (!this.vehicleType) {
                this.errorMessage.status = "error";
                this.errorMessage.message = "Vehicle Type cannot be null.";
                return;
            }

            this.editedvehicle.placa = this.vehiclePlaca;
            this.editedvehicle.modelo.nome = this.associatedModel;
            this.editedvehicle.ano = this.vehicleYear;
            this.editedvehicle.cor = this.vehicleColor;
            this.editedvehicle.tipo = this.vehicleType;


            try {
                this.editedvehicle.id = Number(this.$route.params.editVehicleId);
                await this.fetchModelsId(); // Fetch model ID before updating
                await this.vehicleClient.update(this.editedvehicle);

                // Set success message
                this.errorMessage.status = "success";
                this.errorMessage.message = "Vehicle edited successfully";
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

  
      async fetchModelsId() {
        try {
          const modelClient = new ModeloClient();
          const modelData = await modelClient.findByNome(
            this.editedvehicle.modelo.nome
          );
          if (modelData && modelData.id) {
            this.editedvehicle.modelo.id = modelData.id;
          } else {
            console.error("Model not found");
          }
        } catch (error) {
          console.error("Failed to fetch model ID:", error);
        }
      },

      async fetchItems() {
            const editVehicleId = Number(this.$route.params.editVehicleId);

            if (!isNaN(editVehicleId)) {
                try {
                    const response = await this.vehicleClient.findById(editVehicleId);
                    this.vehiclePlaca = response.placa;
                    this.associatedModel = response.modelo.nome;
                    this.vehicleYear = response.ano;
                    this.vehicleColor = response.cor;
                    this.vehicleType = response.tipo;
                    this.editedvehicle = response;
                    console.log(response);
                } catch (error) {
                    console.log(error);
                }
            } else {
                console.log("Invalid editVehicleId parameter");
            }
        },
    },
  });
  </script>
  
  <style>
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
  