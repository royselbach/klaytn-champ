import { axiosHTTP } from 'boot/axios'
import { CAVER } from 'boot/caver'
const Contract = require('src/assets/contracts/KlaytnChamp.json')

const contract = new CAVER.klay.Contract(Contract.abi, '0x9B5B08601D002ba5627429bf41D86334BcABfa7F')

// Fix for old web3 flaw: https://github.com/ethereum/web3.js/issues/1986
process.versions = { node: '11.2.0' }

export async function httpRegisterUser (context, address) {
  axiosHTTP({
    method: 'post',
    url: '/registerUser',
    data: {
      address: address
    }
  })
}

export async function httpCheckAmount (context, { address, randomAmount }) {
  axiosHTTP({
    method: 'post',
    url: '/checkAmount',
    data: {
      address: address,
      randomAmount: randomAmount
    }
  })
}

export async function klaytnGetUser (context, address) {
  const result = await contract.methods.getUser(address).call()
  const level = Number.parseInt(result.level) + 1

  if (context.rootState.user.level !== level) context.commit('user/level', level, { root: true })
}
