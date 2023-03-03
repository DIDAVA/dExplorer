<template>
  <v-row dense>
    <v-col v-if="lastBlock" cols="3">
      <v-card density="compact" :title="lastBlock" subtitle="Blocks" />
    </v-col>
    <v-col v-if="chainId" cols="3">
      <v-card density="compact" :title="chainId" subtitle="Chain ID" />
    </v-col>
    <v-col v-if="gasPrice" cols="3">
      <v-card density="compact" :title="formatSize(gasPrice) + 'wei'" subtitle="Gas Price" />
    </v-col>
    <v-col cols="12">
      <v-card density="compact" title="Blocks" subtitle="Latest Blocks">
        <v-divider/>
        <v-table density="compact">
          <thead>
            <tr>
              <th>Block</th>
              <th>TXn</th>
              <th>Size</th>
              <th>Gas Limit</th>
              <th>Gas Used</th>
              <th>Gas Price</th>
              <th>Miner</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="block in blocks" :key="block.number">
              <td>{{ block.number }}</td>
              <td>{{ formatNumber(block.transactions.length) }}</td>
              <td>{{ formatSize(block.size) }}B</td>
              <td>{{ formatSize(block.gasLimit) }}</td>
              <td>{{ formatSize(block.gasUsed) }}</td>
              <td>{{ formatSize(block.baseFeePerGas) }}wei</td>
              <td>{{ truncate(block.miner) }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'HomeView',
  components: {},
  computed: {
    ...mapState(['web3','lastBlock', 'blocks','chainId','gasPrice'])
  },
  watch: {
    
  },
  created(){
    console.log(this.blocks)
  }
}
</script>
