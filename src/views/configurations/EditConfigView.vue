<template>
    <div class="main-content">
        <div class="header d-flex align-items-center justify-content-between">
            <div class="sub-header d-flex flex-column">
                <p class="title m-0">Settings</p>
                <p class="sub-title">Complete System Configuration</p>
            </div>
        </div>
        <form action="" class="form-app d-flex flex-column align-items-start mt-4 gap-3" @submit.prevent="submitForm">
            <div class="d-flex align-items-center gap-4">
                <div class="d-flex flex-column align-items-start gap-1">
                    <label for="openTime" class="form-label">Opening time:</label>
                    <input type="time" class="form-control" id="openTime" v-model="config.inicioExpediente"
                        style="width: 300px;">
                </div>
                <div class="d-flex flex-column align-items-start gap-1">
                    <label for="closeTime" class="form-label">Closing time:</label>
                    <input type="time" class="form-control" id="closeTime" v-model="config.fimExpediente"
                        style="width: 300px;">
                </div>
            </div>
            <div class="d-flex align-items-center gap-5">
                <div class="d-flex flex-column align-items-start justify-content-between gap-1">
                    <label for="hourRate" class="form-label" style="width: 130px;">Hourly Rate:</label>
                    <div class="input-group" style="width: 200px;">
                        <input type="text" class="form-control" v-model="config.valorHora"
                            aria-label="Dollar amount (with dot and two decimal places)">
                        <span class="input-group-text">$</span>
                        <span class="input-group-text">0.00</span>
                    </div>
                </div>
                <div class="d-flex flex-column align-items-start justify-content-between gap-1">
                    <label for="fineMinute" class="form-label" style="width: 160px;">Minute fine value:</label>
                    <div class="input-group" style="width: 200px;">
                        <input type="text" class="form-control" v-model="config.valorMinutoMulta"
                            aria-label="Dollar amount (with dot and two decimal places)">
                        <span class="input-group-text">$</span>
                        <span class="input-group-text">0.00</span>
                    </div>
                </div>
            </div>
            <div class="d-flex align-items-center gap-5">
                <div class="d-flex flex-column align-items-start justify-content-between gap-1">
                    <label for="discountthreshold" class="form-label" style="width: 190px;">Discount time threshold:</label>
                    <input type="text" class="form-control" id="discountthreshold" v-model="config.tempoParaDesconto"
                        style="width: 300px;">
                </div>
                <div class="d-flex flex-column align-items-start justify-content-between gap-1">
                    <label for="discountDuration" class="form-label" style="width: 160px;">Discount duration:</label>
                    <input type="text" class="form-control" id="discountDuration" v-model="config.tempoDeDesconto"
                        style="width: 300px;">
                </div>
                <div class="form-check align-self-end">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked"
                        v-model="config.gerarDesconto">
                    <label class="form-check-label" for="flexCheckChecked">
                        Generate discount
                    </label>
                </div>
            </div>
            <div class="d-flex align-items-center gap-5">
                <div class="d-flex flex-column align-items-start justify-content-between gap-1">
                    <label for="carSpots" class="form-label">Car parking spots:</label>
                    <input type="number" class="form-control" id="carSpots" style="width: 300px;"
                        v-model="config.vagasCarro">
                </div>
                <div class="d-flex flex-column align-items-start justify-content-between gap-1">
                    <label for="motoSpots" class="form-label">Motorcycle parking spots:</label>
                    <input type="number" class="form-control" id="motoSpots" style="width: 300px;"
                        v-model="config.vagasMoto">
                </div>
                <div class="d-flex flex-column align-items-start justify-content-between gap-1">
                    <label for="vanSpots" class="form-label">Van parking spots:</label>
                    <input type="number" class="form-control" id="vanSpots" style="width: 300px;" v-model="config.vagasVan">
                </div>
            </div>
            <!-- Error Message -->
            <div class="mt-3 d-flex align-items-center gap-3">
                <button type="submit" style="width: 300px;">Register New Configurations</button>
                <button type="button" @click="cancelEdit">Cancel</button>
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
</template>

<script lang="ts">
import { ConfiguracaoClient } from '@/client/configuracao.client';
import { Configuracao } from '@/model/configuracao';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'EditConfigView',
    data() {
        return {
            config: new Configuracao(),
            errorMessage: {
                status: "", // Possible values: "success", "error"
                message: "",
            },
        };
    },
    computed: {
        configClient() {
            return new ConfiguracaoClient();
        },
    },
    methods: {
        async submitForm() {
            try {
                const response = await this.configClient.save(this.config);
                const data = response;
                // Set success message
                this.errorMessage.status = "success";
                this.errorMessage.message = "Configuration registered successfully";
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
        cancelEdit() {
        this.$router.push("/controle");
      },
    },


});
</script>

<style scoped>
form{
  height: fit-content;
}
.title {
  font-family: Nunito;
  font-size: 25px;
  font-weight: 400;
  text-align: left;
}

.sub-title {
  font-family: Raleway;
  font-size: 16px;
  font-weight: 500;
  text-align: left;
  color: #959595;
}

i {
  font-size: 20px;
  margin-right: 30px;
  cursor: pointer;
}
</style>
