<template>
  <div class="main-content">
    <!-- Header section -->
    <div class="header d-flex align-items-center justify-content-between">
      <div class="sub-header d-flex flex-column">
        <p class="title m-0">Settings</p>
        <p class="sub-title">Complete System Configuration</p>
      </div>
      <i class="bi bi-pencil-square" @click="editItem()"></i> <!-- Edit button -->
    </div>

    <!-- Configuration form -->
    <form action="" class="form-app d-flex flex-column align-items-start mt-4 gap-3">
      <!-- Opening and closing time fields -->
      <div class="d-flex align-items-center gap-4">
        <div class="d-flex flex-column align-items-start gap-1">
          <label for="openTime" class="form-label">Opening time:</label>
          <input type="text" class="form-control" id="openTime" disabled v-model="openTimeValue" style="width: 300px;">
        </div>
        <div class="d-flex flex-column align-items-start gap-1">
          <label for="closeTime" class="form-label">Closing time:</label>
          <input type="text" class="form-control" id="closeTime" disabled v-model="closeTimeValue" style="width: 300px;">
        </div>
      </div>

      <!-- Hourly rate and minute fine fields -->
      <div class="d-flex align-items-center gap-5">
        <div class="d-flex flex-column align-items-start justify-content-between gap-1">
          <label for="hourRate" class="form-label" style="width: 130px;">Hourly Rate:</label>
          <div class="input-group" style="width: 200px;">
            <input type="text" class="form-control" disabled v-model="hourRateValue"
              aria-label="Dollar amount (with dot and two decimal places)">
            <span class="input-group-text">$</span>
            <span class="input-group-text">0.00</span>
          </div>
        </div>
        <div class="d-flex flex-column align-items-start justify-content-between gap-1">
          <label for="fineMinute" class="form-label" style="width: 160px;">Minute fine value:</label>
          <div class="input-group" style="width: 200px;">
            <input type="text" class="form-control" disabled v-model="fineMinuteValue"
              aria-label="Dollar amount (with dot and two decimal places)">
            <span class="input-group-text">$</span>
            <span class="input-group-text">0.00</span>
          </div>
        </div>
      </div>

      <!-- Discount threshold, duration, and generate discount fields -->
      <div class="d-flex align-items-center gap-5">
        <div class="d-flex flex-column align-items-start justify-content-between gap-1">
          <label for="discountthreshold" class="form-label" style="width: 190px;">Discount time threshold:</label>
          <input type="text" class="form-control" id="discountthreshold" disabled v-model="discountThresholdValue"
            style="width: 300px;">
        </div>
        <div class="d-flex flex-column align-items-start justify-content-between gap-1">
          <label for="discountDuration" class="form-label" style="width: 160px;">Discount duration:</label>
          <input type="text" class="form-control" id="discountDuration" disabled v-model="discountDurationValue"
            style="width: 300px;">
        </div>
        <div class="form-check align-self-end">
          <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" disabled
            v-model="generateDiscountValue">
          <label class="form-check-label" for="flexCheckChecked">
            Generate discount
          </label>
        </div>
      </div>

      <!-- Car, motorcycle, and van parking spots fields -->
      <div class="d-flex align-items-center gap-5">
        <div class="d-flex flex-column align-items-start justify-content-between gap-1">
          <label for="carSpots" class="form-label">Car parking spots:</label>
          <input type="number" class="form-control" id="carSpots" disabled v-model="carSpotsValue" style="width: 300px;">
        </div>
        <div class="d-flex flex-column align-items-start justify-content-between gap-1">
          <label for="motoSpots" class="form-label">Motorcycle parking spots:</label>
          <input type="number" class="form-control" id="motoSpots" disabled v-model="motoSpotsValue"
            style="width: 300px;">
        </div>
        <div class="d-flex flex-column align-items-start justify-content-between gap-1">
          <label for="vanSpots" class="form-label">Van parking spots:</label>
          <input type="number" class="form-control" id="vanSpots" disabled v-model="vanSpotsValue" style="width: 300px;">
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { ConfiguracaoClient } from '@/client/configuracao.client';
import { Configuracao } from '@/model/configuracao';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ControleView',
  data() {
    return {
      openTimeValue: new Date(),
      closeTimeValue: new Date(),
      hourRateValue: Number(),
      fineMinuteValue: Number(),
      discountThresholdValue: Number(),
      discountDurationValue: Number(),
      generateDiscountValue: false,
      carSpotsValue: Number(),
      motoSpotsValue: Number(),
      vanSpotsValue: Number(),
    };
  },
  mounted() {
    this.fetchConfig();
  },
  methods: {
    async fetchConfig() {
      try {
        const configClient = new ConfiguracaoClient();
        const response = await configClient.findByLast();
        console.log(response);
        this.openTimeValue = response.inicioExpediente;
        this.closeTimeValue = response.fimExpediente;
        this.hourRateValue = response.valorHora;
        this.fineMinuteValue = response.valorMinutoMulta;
        this.discountThresholdValue = response.tempoParaDesconto;
        this.discountDurationValue = response.tempoDeDesconto;
        this.generateDiscountValue = response.gerarDesconto;
        this.carSpotsValue = response.vagasCarro;
        this.motoSpotsValue = response.vagasMoto;
        this.vanSpotsValue = response.vagasVan;
      } catch (error) {
        console.error(error);
      }
    },
    async editItem() {
      try {
        const configClient = new ConfiguracaoClient();
        const response = await configClient.findByLast();
        if (response) {
          const editConfigIds = response.id;
          await this.$router.push({ name: "edit-config", params: { editConfigId: editConfigIds } });
        } else {
          await this.$router.push({ name: "edit-config", params: { editConfigId: 0 } });
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
});
</script>

<style scoped>
form {
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
