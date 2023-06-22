<template>
  <div class="access-content d-flex flex-column align-items-start justify-content-start">
    <p class="title-pages">Register : Open Movement</p>
    <div class="form-application d-flex flex-column custom-section">
      <form class="form-app d-flex flex-column align-items-start mt-4 h-100 gap-3" @submit.prevent="submitForm">
        <div class="d-flex align-items-center align-self-start gap-3">
          <div class="d-flex flex-column">
            <label for="exampleDataList" class="form-label">Associated Condutor</label>
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
        <div class="d-flex align-items-center align-self-start gap-3">
          <div class="d-flex flex-column">
            <label for="exampleDataList" class="form-label">Associated Vehicle</label>
            <input class="form-control" list="datalistOptionsVeiculo" id="exampleDataList"
              placeholder="Search By lisence plate ..." style="width: 300px" v-model="move.veiculo.placa" />
            <datalist id="datalistOptionsVeiculo">
              <option v-for="option in datalistOptionsVeiculo" :value="option"></option>
            </datalist>
          </div>
          <router-link to="/register-vehicle" class="align-self-end">
            <button class="moveBtn m-0">Or Register New Veichle</button>
          </router-link>
        </div>
        <div class="d-flex align-items-center align-self-start gap-3">
          <div class="d-flex flex-column">
            <label for="entry" class="form-label">Entry Date</label>
            <input class="form-control" type="datetime-local" id="entry" style="width: 300px" v-model="move.entrada" />
          </div>
        </div>
        <!-- Error Message -->
        <div class="mt-3 d-flex align-items-center gap-3">
          <button type="submit">Open Movimentation</button>
          <router-link to="/access-movement" class="m-0 edits"><button style="width: 250px;">Access Open
              Movements</button></router-link>
          <p :class="[
            'error-message',
            errorMessage.status === 'success'
              ? 'text-success'
              : 'text-danger',
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
      move: new Movimentacao(),
      datalistOptionsCondutor: [] as string[],
      datalistOptionsVeiculo: [] as string[],
      moves: [] as Movimentacao[],
      errorMessage: {
        status: "", // Possible values: "success", "error"
        message: "",
      },
    };
  },
  computed: {
    moveClient() {
      return new MovimentacaoClient();
    },
  },
  async mounted() {
    try {
      const veiculoClient = new VeiculoClient();
      const condutorClient = new CondutorClient();
      const modelData = await veiculoClient.findAll();
      const modelData2 = await condutorClient.findAll();
      this.datalistOptionsVeiculo = modelData.map((car) => car.placa);
      this.datalistOptionsCondutor = modelData2.map((condutor) => condutor.cpf);
      console.log(this.datalistOptionsCondutor);
      console.log(this.datalistOptionsVeiculo);
    } catch (error) {
      console.error(
        "Failed to fetch veiculo data:",
        this.datalistOptionsVeiculo
      );
      console.error(
        "Failed to fetch condutor data:",
        this.datalistOptionsCondutor
      );
    }
  },
  methods: {
    async submitForm() {
      try {
        await this.fetchCondutorId();
        await this.fetchVeiculoId();
        const response = await this.moveClient.save(this.move);
        const data = response;
        // Set success message
        this.errorMessage.status = "success";
        this.errorMessage.message = "Movement Opened successfully";
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

    async fetchCondutorId() {
      try {
        const condutorClient = new CondutorClient();
        const moveData = await condutorClient.getByCPF(this.move.condutor.cpf);
        if (moveData && moveData.id) {
          this.move.condutor.id = moveData.id;
        } else {
          console.error("Condutor not found");
        }
      } catch (error) {
        console.error("Failed to fetch condutor ID:", error);
      }
    },

    async fetchVeiculoId() {
      try {
        const veiculoClient = new VeiculoClient();
        const moveData = await veiculoClient.findByPlaca(
          this.move.veiculo.placa
        );
        if (moveData && moveData.id) {
          this.move.veiculo.id = moveData.id;
        } else {
          console.error("Veiculo not found");
        }
      } catch (error) {
        console.error("Failed to fetch veiculo ID:", error);
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
