<template>
  <v-card v-if="block" :title="`Block ${block.number}`" :subtitle="block.hash">
    <v-divider/>
    <v-row no-gutters>
      <v-col cols="12" md="3">
        <v-list>
          <v-list-item title="Date" :subtitle="`${formatDate(block.timestamp)} ${formatTime(block.timestamp)}`"/>
          <v-list-item title="Size" :subtitle="formatSize(block.size)+'B'"/>
          <v-list-item title="Gas Limit" :subtitle="formatSize(block.gasLimit)+'gas'"/>
          <v-list-item title="Gas Used" :subtitle="formatSize(block.gasUsed)+'gas'"/>
          <v-list-item title="Gas Price" :subtitle="formatSize(block.baseFeePerGas)+'wei'"/>
          <v-list-item title="Miner" :subtitle="truncate(block.miner)"/>
        </v-list>
      </v-col>
      <v-col cols="12" md="9">
        <v-list :height="500" border>
          <v-list-item v-for="tx, i in block.transactions" :key="i" :title="tx" density="compact" />
        </v-list>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'BlockView',
  data: () => ({
    block: null
  }),
  computed: {
    ...mapState(['web3'])
  },
  methods: {
    async fetch(height){
      this.block = await this.web3.eth.getBlock(height)
      console.log(this.block)
    }
  },
  created(){
    this.fetch(this.$route.params.value)
  }
}
</script>