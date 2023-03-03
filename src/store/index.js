import { createStore } from 'vuex'
const Web3 = require('web3')

export default createStore({
  state: {
    web3: new Web3(Web3.givenProvider),
    chainId: null,
    gasPrice: null,
    lastBlock: null,
    blocks: []
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    async init({state}){
      state.chainId = await state.web3.eth.getChainId()
      state.gasPrice = await state.web3.eth.getGasPrice()
      state.lastBlock = await state.web3.eth.getBlockNumber()
      for (let height = state.lastBlock - 9; height <= state.lastBlock; height++) {
        const block = await state.web3.eth.getBlock(height)
        state.blocks.unshift(block)
      }
      state.web3.eth.subscribe('newBlockHeaders', async (err, info) => {
        state.lastBlock = info.number
        const found = state.blocks.find(i => i.number == info.number)
        if (!found) {
          const block = await state.web3.eth.getBlock(info.number)
          state.blocks.unshift(block)
          if (state.blocks.length > 10) state.blocks.pop()
          state.gasPrice = block.baseFeePerGas
        }
      })
    },
    setProvider({state}, provider){
      state.web3.setProvider(provider)
    }
  },
  modules: {
  }
})
