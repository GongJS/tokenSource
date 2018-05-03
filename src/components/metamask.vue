<template>
  <div class="metamask-info">
    <h1 class="metamask-title">Token小站</h1>
    <br/>
    <div class="has-metamask"> 
      <p v-if="isInjected">Metamask插件正常<i aria-hidden="true" class="el-icon-circle-check-outline"></i></p>
      <p v-else >未检测到Metamask插件<i aria-hidden="true" class="el-icon-circle-close-outline"></i></p>
    </div>
    <el-form :label-position="labelPosition"  label-width="100px" :model="formLabelAlign">
      <el-form-item label="以太坊网络" class="metamask-font">
        <el-input v-model="network" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="账户地址" class="address-font">
        <el-input v-model="coinbase" :disabled="true" style="font-size:.2rem;"></el-input>
      </el-form-item>
      <el-form-item label="账户余额(Eth)">
        <el-input v-model="ethBalance" :disabled="true">wei</el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {NETWORKS} from '../util/constants/networks'
import {mapState} from 'vuex'
export default {
  name: 'metamask',
  data () {
    return {
      labelPosition: 'right',
        formLabelAlign: {
    
        }
    }
  },
  computed: mapState({
    isInjected: state => state.web3.isInjected,
    network: state => NETWORKS[state.web3.networkId],
    coinbase: state => state.web3.coinbase,
    balance: state => state.web3.balance,
    ethBalance: state => {
      if (state.web3.web3Instance !== null) return state.web3.web3Instance().fromWei(state.web3.balance, 'ether')
    }
  })
}
</script>

<style lang="stylus" scoped>
  .metamask-info >>> .el-form-item__label
    font-weight: bold
    font-size: .25rem
  .metamask-info >>> .address-font
    font-size: .1rem  
  .metamask-info
    margin-left: .1rem
    margin-right: .1rem
    .metamask-title
      font-size: .8rem
      margin-top: .5rem
    .has-metamask
      color: #67C23A
      margin-bottom: .3rem
    .address-font
      font-size: .1rem    
</style>
