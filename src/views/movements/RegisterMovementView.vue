<template>
    <div class="container">
      <div class="form-group">
        <input class="form-control" autoComplete="on" :list="datalistId" />
        <datalist :id="datalistId">
          <option>First option</option>
          <option>Second Option</option>
        </datalist>
      </div>
    </div>
  </template>
  
<script lang="ts">
import { def } from '@vue/shared';
import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {
            datalistId: "suggestions",
        };
    },
})

</script>

<style>
.container {
  margin-top: 20px;
}
</style>
  