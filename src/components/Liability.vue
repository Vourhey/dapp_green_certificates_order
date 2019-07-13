<template>
  <div>
    <div v-if="liability.address">
      <b>liability: </b>{{ liability.address }}<br/>
      <b>model: </b>{{ liability.model }}<br/>
      <b>objective: </b>{{ liability.objective }}<br/>
      <b>token: </b>{{ liability.token }}<br/>
      <b>cost: </b>{{ liability.cost }}<br/>
      <b>promisee: </b>{{ liability.promisee }}<br/>
      <b>promisor: </b>{{ liability.promisor }}<br/>
    </div>
    <span v-if="liability.result != ''">
      <b>IPFS hash of data: </b>
      <a :href="`https://ipfs.io/ipfs/${liability.result}`" target="_blank">{{ liability.result }}</a>
    </span>
    <span v-if="liability.result == ''">
      <b>IPFS hash of data: </b><v-progress-linear :indeterminate="true"></v-progress-linear>
    </span>
  </div>
</template>

<script>
export default {
  name: 'Liability',
  props: ['liability']
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
