<template>
  <div>
    <b>Model: </b> {{ offer.model }} <br/>
    <b>Objective: </b>
    <a :href="`https://ipfs.io/ipfs/${offer.objective}`" target="_blank">{{ offer.objective }}</a><br/>
    <b>Token: </b><a :href="`https://etherscan.io/address/${offer.token}`" target="_blank">{{ offer.token }}</a><br/>
    <b>Cost: </b> {{ offer.cost }}<br/>
    <b>Lighthouse: </b>
    <a :href="`https://etherscan.io/address/${offer.lighthouse}`" target="_blank">{{ offer.lighthouse }}</a><br/>
    <b>Lighthouse fee: </b> {{ offer.lighthouseFee }}<br/>
    <b>Validator: </b>
    <a :href="`https://etherscan.io/address/${offer.validator}`" target="_blank">{{ offer.validator }}</a><br/>
    <b>Deadline: </b>{{ offer.deadline }}<br/>
    <b>Sender: </b>
    <a :href="`https://etherscan.io/address/${offer.sender}`" target="_blank">{{ offer.sender }}</a><br/>
  </div>
</template>

<script>
export default {
  name: 'Offer',
  props: ['offer']
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
