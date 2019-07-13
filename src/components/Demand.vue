<template>
  <div>
    <b>Model: </b> {{ demand.model }} <br/>
    <b>Objective: </b>
    <a :href="`https://ipfs.io/ipfs/${demand.objective}`" target="_blank">{{ demand.objective }}</a><br/>
    <b>Token: </b><a :href="`https://etherscan.io/address/${demand.token}`" target="_blank">{{ demand.token }}</a><br/>
    <b>Cost: </b> {{ demand.cost }}<br/>
    <b>Lighthouse: </b>
    <a :href="`https://etherscan.io/address/${demand.lighthouse}`" target="_blank">{{ demand.lighthouse }}</a><br/>
    <b>Validator: </b>
    <a :href="`https://etherscan.io/address/${demand.validator}`" target="_blank">{{ demand.validator }}</a><br/>
    <b>Validator fee: </b> {{ demand.validatorFee }}<br/>
    <b>Deadline: </b>{{ demand.deadline }}<br/>
    <b>Sender: </b>
    <a :href="`https://etherscan.io/address/${demand.sender}`" target="_blank">{{ demand.sender }}</a><br/>
  </div>
</template>

<script>
export default {
  name: 'Demand',
  props: ['demand']
}
</script>

<style lang="css">
.fill-row {
  flex: 0 0 100%;
  margin-top: 20px;
  margin-bottom: 20px;
}
#div-with-loading {
  width: 200px;
  height: 200px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #444;
  border-radius: 5px;
}
</style>
