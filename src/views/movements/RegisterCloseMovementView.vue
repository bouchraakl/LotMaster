<template>
  <div
    class="access-content d-flex flex-column align-items-start justify-content-start"
  >
    <p class="title-pages">Register : Close Movement</p>
    <div class="form-application d-flex flex-column custom-section">
      <form
        class="form-app d-flex flex-column align-items-start mt-4 h-100 gap-3"
        @submit.prevent="submitForm"
      >
        <div class="d-flex align-items-center align-self-start gap-3">
          <div class="d-flex flex-column">
            <label for="exampleDataList" class="form-label"
              >Associated Condutor</label
            >
            <input
              class="form-control"
              readonly
              list="datalistOptions"
              id="exampleDataList"
              style="width: 300px; color: #909394"
              v-model="condutorAs"
            />
          </div>
        </div>
        <div class="d-flex align-items-center align-self-start gap-3">
          <div class="d-flex flex-column">
            <label for="exampleDataList" class="form-label"
              >Associated Vehicle</label
            >
            <input
              class="form-control"
              readonly
              list="datalistOptions"
              id="exampleDataList"
              style="width: 300px; color: #909394"
              v-model="veiculoAs"
            />
          </div>
        </div>
        <div class="d-flex align-items-center align-self-start gap-3">
          <div class="d-flex flex-column">
            <label for="entry" class="form-label">Entry Date</label>
            <input
              class="form-control"
              readonly
              type="datetime-local"
              id="entry"
              style="width: 300px; color: #909394"
              v-model="entryAs"
            />
          </div>
          <div class="d-flex flex-column">
            <label for="exit" class="form-label">Exit Date</label>
            <input
              class="form-control"
              type="datetime-local"
              id="exit"
              style="width: 300px"
              v-model="move.saida"
            />
          </div>
        </div>
        <!-- Error Message -->
        <div class="mt-3 d-flex align-items-center gap-3">
          <button type="submit">Close Movement</button>
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
import { CondutorClient } from "@/client/condutor.client";
import { MovimentacaoClient } from "@/client/movimentacao.client";
import { VeiculoClient } from "@/client/veiculo.client";
import { Movimentacao } from "@/model/movimentacao";
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      condutorAs: "",
      veiculoAs: "",
      entryAs: new Date(),
      move: new Movimentacao(),
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
  mounted() {
    this.fetchOpenMovement();
  },
  methods: {
    async submitForm() {
      try {
        // Fetch the veiculo and condutor data
        await this.fetchItems();

        // Perform any additional form validation or data manipulation here

        // Submit the form data
        await this.moveClient.save(this.move);

        // Set success message
        this.errorMessage.status = "success";
        this.errorMessage.message = "Movement closed successfully";
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

    async fetchOpenMovement() {
      try {
        const response = await this.moveClient.findById(
          Number(this.$route.params.movemId)
        );
        this.condutorAs = response.condutor.cpf;
        this.veiculoAs = response.veiculo.placa;
        this.entryAs = response.entrada;
        console.log(this.entryAs);
      } catch (error) {
        console.log(error);
      }
    },
    async fetchItems() {
      try {
        const veiculoClient = new VeiculoClient();
        const condutorClient = new CondutorClient();
        const veiculoData = await veiculoClient.findByPlaca(this.veiculoAs);
        const condutorData = await condutorClient.getByCPF(this.condutorAs);
        if (veiculoData && veiculoData.id) {
          this.move.veiculo.id = veiculoData.id;
        }
        if (condutorData && condutorData.id) {
          this.move.condutor.id = condutorData.id;
        }
        this.move.entrada = this.entryAs;
        console.log(this.move);
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
