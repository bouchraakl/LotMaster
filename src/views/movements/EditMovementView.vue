<template>
  <div class="access-content d-flex flex-column align-items-start justify-content-start">
    <p class="title-pages">Edit : Open Movement</p>
    <div class="form-application d-flex flex-column custom-section">
      <form class="form-app d-flex flex-column align-items-start mt-4 h-100 gap-3" @submit.prevent="submitForm">

        <!-- Associated Condutor Field -->
        <div class="d-flex align-items-center align-self-start gap-3">
          <div class="d-flex flex-column">
            <label for="exampleDataList" class="form-label">Associated Condutor</label>
            <input class="form-control" list="datalistOptionsCondutor" id="exampleDataList"
              placeholder="Search By CPF ..." style="width: 300px" v-model="moveCPF" />

            <!-- Datalist for Associated Condutor Options -->
            <datalist id="datalistOptionsCondutor">
              <option v-for="option in datalistOptionsCondutor" :value="option"></option>
            </datalist>
          </div>
        </div>

        <!-- Associated Vehicle Field -->
        <div class="d-flex align-items-center align-self-start gap-3">
          <div class="d-flex flex-column">
            <label for="exampleDataList" class="form-label">Associated Vehicle</label>
            <input class="form-control" list="datalistOptionsVeiculo" id="exampleDataList"
              placeholder="Search By license plate ..." style="width: 300px" v-model="movePlaca" />

            <!-- Datalist for Associated Vehicle Options -->
            <datalist id="datalistOptionsVeiculo">
              <option v-for="option in datalistOptionsVeiculo" :value="option"></option>
            </datalist>
          </div>
        </div>

        <!-- Entry Date Field -->
        <div class="d-flex align-items-center align-self-start gap-3">
          <div class="d-flex flex-column">
            <label for="entry" class="form-label">Entry Date</label>
            <input class="form-control" type="datetime-local" id="entry" style="width: 300px" v-model="moveEntrada" />
          </div>
        </div>

        <!-- Error Message -->
        <div class="mt-3 d-flex align-items-center gap-3">
          <button type="submit">Update Movement</button>
          <button type="button" @click="cancelEdit">Cancel</button>

          <!-- Display Error Message -->
          <p :class="['error-message', errorMessage.status === 'success' ? 'text-success' : 'text-danger']">
            {{ errorMessage.message }}
          </p>
        </div>

      </form>
    </div>
  </div>
</template>
  
<script lang="ts">
// Import necessary modules and components
import { MovimentacaoClient } from "@/client/movimentacao.client";
import { CondutorClient } from "@/client/condutor.client";
import { VeiculoClient } from "@/client/veiculo.client";
import { Condutor } from "@/model/condutor";
import { Movimentacao } from "@/model/movimentacao";
import { defineComponent } from "vue";
import { Veiculo } from "@/model/veiculo";

// Define the component
export default defineComponent({
  data() {
    // Define the component's data properties
    return {
      move: new Movimentacao(), // Object for storing the movement data
      datalistOptionsCondutor: [] as string[], // Options for the conductor selection
      datalistOptionsVeiculo: [] as string[], // Options for the vehicle selection
      moves: [] as Movimentacao[], // Array for storing all movements
      errorMessage: {
        status: "", // Possible values: "success", "error"
        message: "",
      }, // Object for storing error messages
      moveCPF: "", // Variable for storing the selected conductor's CPF
      movePlaca: "", // Variable for storing the selected vehicle's plate number
      moveEntrada: new Date(), // Variable for storing the movement entry date
    };
  },
  computed: {
    moveClient() {
      return new MovimentacaoClient(); // Initialize the MovimentacaoClient
    },
  },
  async mounted() {
    // Lifecycle hook: Executes when the component is mounted

    try {
      await this.fetchItems(); // Fetch the movement data

      // Initialize the VeiculoClient and CondutorClient
      const veiculoClient = new VeiculoClient();
      const condutorClient = new CondutorClient();

      // Fetch all vehicle data and conductor data
      const modelData = await veiculoClient.findAll();
      const modelData2 = await condutorClient.findAll();

      // Extract the vehicle plates and conductor CPFs from the data
      this.datalistOptionsVeiculo = modelData.map((car) => car.placa);
      this.datalistOptionsCondutor = modelData2.map((condutor) => condutor.cpf);
    } catch (error) {
      console.error("Failed to fetch veiculo data:", this.datalistOptionsVeiculo);
      console.error("Failed to fetch condutor data:", this.datalistOptionsCondutor);
    }
  },
  methods: {
    // Method for submitting the form
    async submitForm() {
      if (!this.moveCPF) {
        // Validate if conductor CPF is provided
        this.errorMessage.status = "error";
        this.errorMessage.message = "CPF cannot be null.";
        return;
      }

      if (!this.movePlaca) {
        // Validate if vehicle plate is provided
        this.errorMessage.status = "error";
        this.errorMessage.message = "Placa cannot be null.";
        return;
      }

      if (!this.moveEntrada) {
        // Validate if entry date is provided
        this.errorMessage.status = "error";
        this.errorMessage.message = "Entry Date cannot be null.";
        return;
      }

      // Set the conductor CPF, vehicle plate, and entry date to the movement object
      this.move.condutor.cpf = this.moveCPF;
      this.move.veiculo.placa = this.movePlaca;
      this.move.entrada = this.moveEntrada;

      try {
        console.log(this.move);

        // Get the movement ID from the route parameters
        this.move.id = Number(this.$route.params.editMovemId);

        // Fetch the conductor ID and vehicle ID
        const conductorIdFetched = await this.fetchCondutorId();
        const vehicleIdFetched = await this.fetchVeiculoId();

        if (conductorIdFetched && vehicleIdFetched) {
          // If both conductor ID and vehicle ID are fetched successfully, update the movement
          await this.moveClient.update(this.move);

          // Set success message
          this.errorMessage.status = "success";
          this.errorMessage.message = "Movement edited successfully";
        } else {
          // If either conductor ID or vehicle ID is not found, set error message accordingly
          if (!conductorIdFetched) {
            this.errorMessage.status = "error";
            this.errorMessage.message = "Conductor CPF not found.";
          } else if (!vehicleIdFetched) {
            this.errorMessage.status = "error";
            this.errorMessage.message = "Vehicle plate not found.";
          } else {
            this.errorMessage.status = "error";
            this.errorMessage.message = "Vehicle plate and Conductor CPF are not found.";
          }
        }
      } catch (error: any) {
        // If an error occurs during updating, set error message
        this.errorMessage.status = "error";
        if (error.response && error.response.data) {
          console.error(error.response.data);
          const errorMessages = Object.values(error.response.data);
          this.errorMessage.message = errorMessages.join(", ");
        } else {
          this.errorMessage.message = "An error occurred during updating.";
        }
      }
    },

    // Method for fetching conductor ID
    async fetchCondutorId() {
      try {
        const condutorClient = new CondutorClient();
        const moveData = await condutorClient.getByCPF(this.move.condutor.cpf);
        if (moveData && moveData.id) {
          this.move.condutor.id = moveData.id;
          return true;
        } else {
          console.error("Condutor not found");
          return false;
        }
      } catch (error) {
        console.error("Failed to fetch condutor ID:", error);
        return false;
      }
    },

    // Method for fetching vehicle ID
    async fetchVeiculoId() {
      try {
        const veiculoClient = new VeiculoClient();
        const moveData = await veiculoClient.findByPlaca(this.move.veiculo.placa);
        if (moveData && moveData.id) {
          this.move.veiculo.id = moveData.id;
          return true;
        } else {
          console.error("Veiculo not found");
          return false;
        }
      } catch (error) {
        console.error("Failed to fetch veiculo ID:", error);
        return false;
      }
    },

    // Method for fetching movement data
    async fetchItems() {
      const editMoveId = Number(this.$route.params.editMovemId);

      if (!isNaN(editMoveId)) {
        try {
          // Fetch the movement data by ID
          const response = await this.moveClient.findById(editMoveId);
          this.moveCPF = response.condutor.cpf;
          this.movePlaca = response.veiculo.placa;
          this.moveEntrada = response.entrada;
          this.move = response;
          console.log(response);
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("Invalid editMovemId parameter");
      }
    },

    // Method for canceling the edit and redirecting to another page
    cancelEdit() {
      this.$router.push("/access-movement");
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
  