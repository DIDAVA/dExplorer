<template>
  <v-row>
    <v-col cols="3">
      <v-card density="compact" :title="chainId || '--'" subtitle="Chain ID" />
    </v-col>
    <v-col cols="3">
      <v-card density="compact" :title="lastBlockHeight || '--'" subtitle="Blocks" />
    </v-col>
    <v-col cols="12">
      <v-card density="compact" title="Blocks" subtitle="Latest Blocks">
        <v-divider/>
        <v-table v-if="blocks.length" density="compact">
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
              <td><router-link :to="`/block/${block.number}`">{{ block.number }}</router-link></td>
              <td>{{ formatNumber(block.transactions.length) }}</td>
              <td>{{ formatSize(block.size) }}B</td>
              <td>{{ formatSize(block.gasLimit) }}</td>
              <td>{{ formatSize(block.gasUsed) }}</td>
              <td>{{ formatSize(block.baseFeePerGas || gasPrice) }}wei</td>
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
  data: () => ({
    ready: false
  }),
  computed: {
    ...mapState(['web3','lastBlockHeight','lastBlockHeader','blocks','chainId','gasPrice'])
  }
}
</script>
