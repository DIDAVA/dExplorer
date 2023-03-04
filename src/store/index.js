import { createStore } from 'vuex'
const Web3 = require('web3')

export default createStore({
  state: {
    web3: null,
    chainId: null,
    gasPrice: null,
    lastBlockHeight: null,
    lastBlockHeader: null,
    blocks: []
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    async init({state, dispatch}, provider = undefined){
      if (state.blocks.length) state.blocks = []
      if (state.web3) state.web3.eth.clearSubscriptions()
      state.web3 = new Web3(provider || Web3.givenProvider)
      state.chainId = await state.web3.eth.getChainId()
      state.lastBlockHeight = await state.web3.eth.getBlockNumber()
      const blocks = []
      for (let i = 0; i < 10; i++) blocks.push(await state.web3.eth.getBlock(state.lastBlockHeight-i))
      dispatch('sort', blocks)
      state.web3.eth.subscribe('newBlockHeaders', async (err, info) => {
        if (info) {
          const blocks = [...state.blocks]
          state.lastBlockHeader = info
          state.lastBlockHeight = info.number
          const block = await state.web3.eth.getBlock(info.number)
          blocks.unshift(block)
          if (blocks.length > 10) blocks.pop()
          dispatch('sort', blocks)
        }
        else console.error(err)
      })
    },
    sort({state}, blocks){
      state.blocks = blocks.sort((a,b) => {
        const av = a.number
        const bv = b.number
        return av > bv ? -1 : av < bv ? 1 : 0
      })
    }
  },
  modules: {
  }
})
