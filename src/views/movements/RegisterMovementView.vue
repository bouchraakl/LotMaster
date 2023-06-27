<template>
  <div class="access-content d-flex flex-column align-items-start justify-content-start">
    <p class="title-pages">Register : Open Movement</p>
    <div class="form-application d-flex flex-column custom-section">
      <form class="form-app d-flex flex-column align-items-start mt-4 h-100 gap-3" @submit.prevent="submitForm">

        <!-- Associated Conductor -->
        <div class="d-flex align-items-center align-self-start gap-3">
          <div class="d-flex flex-column">
            <label for="exampleDataList" class="form-label">Associated Conductor</label>
            <input class="form-control" list="datalistOptionsCondutor" id="exampleDataList"
              placeholder="Search By CPF ..." style="width: 300px" v-model="move.condutor.cpf" />
            <datalist id="datalistOptionsCondutor">
              <option v-for="option in datalistOptionsCondutor" :value="option"></option>
            </datalist>
          </div>
          <router-link to="/register-conductor" class="align-self-end">
            <button class="moveBtn m-0">Or Register New Conductor</button>
          </router-link>
        </div>

        <!-- Associated Vehicle -->
        <div class="d-flex align-items-center align-self-start gap-3">
          <div class="d-flex flex-column">
            <label for="exampleDataList" class="form-label">Associated Vehicle</label>
            <input class="form-control" list="datalistOptionsVeiculo" id="exampleDataList"
              placeholder="Search By license plate ..." style="width: 300px" v-model="move.veiculo.placa" />
            <datalist id="datalistOptionsVeiculo">
              <option v-for="option in datalistOptionsVeiculo" :value="option"></option>
            </datalist>
          </div>
          <router-link to="/register-vehicle" class="align-self-end">
            <button class="moveBtn m-0">Or Register New Vehicle</button>
          </router-link>
        </div>

        <!-- Entry Date -->
        <div class="d-flex align-items-center align-self-start gap-3">
          <div class="d-flex flex-column">
            <label for="entry" class="form-label">Entry Date</label>
            <input class="form-control" type="datetime-local" id="entry" style="width: 300px" v-model="move.entrada" />
          </div>
        </div>

        <!-- Error Message -->
        <div class="mt-3 d-flex align-items-center gap-3">
          <button type="submit">Open Movement</button>
          <router-link to="/access-movement" class="m-0 edits">
            <button style="width: 250px;">Access Open Movements</button>
          </router-link>
          <p :class="[
            'error-message',
            errorMessage.status === 'success' ? 'text-success' : 'text-danger',
          ]">
            {{ errorMessage.message }}
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { MovimentacaoClient } from "@/client/movimentacao.client";
import { CondutorClient } from "@/client/condutor.client";
import { VeiculoClient } from "@/client/veiculo.client";
import { Condutor } from "@/model/condutor";
import { Movimentacao } from "@/model/movimentacao";
import { defineComponent } from "vue";
import { Veiculo } from "@/model/veiculo";

export default defineComponent({
  data() {
    return {
      move: new Movimentacao(), // Object to hold the data of the movement
      datalistOptionsCondutor: [] as string[], // Array to store the options for the condutor (driver)
      datalistOptionsVeiculo: [] as string[], // Array to store the options for the veiculo (vehicle)
      moves: [] as Movimentacao[], // Array to store all the movements
      errorMessage: {
        status: "", // Possible values: "success", "error" - Status of the error message
        message: "", // The error message
      },
    };
  },
  computed: {
    moveClient() {
      return new MovimentacaoClient(); // Client for handling movements
    },
  },
  async mounted() {
    try {
      const veiculoClient = new VeiculoClient(); // Client for handling veiculos (vehicles)
      const condutorClient = new CondutorClient(); // Client for handling condutors (drivers)
      const modelData = await veiculoClient.findAll(); // Fetch all the veiculos (vehicles)
      const modelData2 = await condutorClient.findAll(); // Fetch all the condutors (drivers)
      this.datalistOptionsVeiculo = modelData.map((car) => car.placa); // Extract the placa (license plate) from each veiculo (vehicle)
      this.datalistOptionsCondutor = modelData2.map((condutor) => condutor.cpf); // Extract the cpf (identification number) from each condutor (driver)
      console.log(this.datalistOptionsCondutor);
      console.log(this.datalistOptionsVeiculo);
    } catch (error) {
      console.error(
        "Failed to fetch veiculo data:",
        this.datalistOptionsVeiculo
      ); // Log an error message if failed to fetch veiculo (vehicle) data
      console.error(
        "Failed to fetch condutor data:",
        this.datalistOptionsCondutor
      ); // Log an error message if failed to fetch condutor (driver) data
    }
  },
  methods: {
    async submitForm() {
      try {
        await this.fetchCondutorId(); // Fetch the condutor (driver) ID
        await this.fetchVeiculoId(); // Fetch the veiculo (vehicle) ID

        // Check if there is an open Movimentacao with the specified vehicle plate
        const movimentacoesAbertas = await this.moveClient.findAllByOpen(this.move.veiculo.placa); // Find all open Movimentacao with the specified vehicle plate
        if (movimentacoesAbertas.length > 0) {
          // An open Movimentacao already exists with the same vehicle plate
          this.errorMessage.status = "error"; // Set the status of the error message to "error"
          this.errorMessage.message = "There is already an open movement for this vehicle plate."; // Set the error message
          return; // Stop further execution
        }

        // No open Movimentacao found, proceed with saving
        const response = await this.moveClient.save(this.move); // Save the movement
        const data = response; // Response data
        // Set success message
        this.errorMessage.status = "success"; // Set the status of the error message to "success"
        this.errorMessage.message = "Movement Opened successfully"; // Set the success message
      } catch (error: any) {
        this.errorMessage.status = "error"; // Set the status of the error message to "error"
        if (error.response && error.response.data) {
          const errorMessages = Object.values(error.response.data); // Get all the error messages from the response data
          this.errorMessage.message = errorMessages.join(""); // Join the error messages into a single string
        } else {
          this.errorMessage.message = "An error occurred during registration."; // Set a generic error message
        }
      }
    },

    async fetchCondutorId() {
      try {
        const condutorClient = new CondutorClient(); // Client for handling condutors (drivers)
        const moveData = await condutorClient.getByCPF(this.move.condutor.cpf); // Fetch the condutor (driver) data by CPF
        if (moveData && moveData.id) {
          this.move.condutor.id = moveData.id; // Set the condutor (driver) ID
        } else {
          console.error("Condutor not found"); // Log an error message if condutor (driver) not found
        }
      } catch (error) {
        console.error("Failed to fetch condutor ID:", error); // Log an error message if failed to fetch condutor (driver) ID
      }
    },

    async fetchVeiculoId() {
      try {
        const veiculoClient = new VeiculoClient(); // Client for handling veiculos (vehicles)
        const moveData = await veiculoClient.findByPlaca(
          this.move.veiculo.placa
        ); // Fetch the veiculo (vehicle) data by placa (license plate)
        if (moveData && moveData.id) {
          this.move.veiculo.id = moveData.id; // Set the veiculo (vehicle) ID
        } else {
          console.error("Veiculo not found"); // Log an error message if veiculo (vehicle) not found
        }
      } catch (error) {
        console.error("Failed to fetch veiculo ID:", error); // Log an error message if failed to fetch veiculo (vehicle) ID
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
