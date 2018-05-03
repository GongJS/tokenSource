<template>
  <div class="border">
   <metamask/>
   <issue-coin/>
  </div>
</template>
<script>

import Metamask from '@/components/metamask'
import IssueCoin from '@/components/issue-Coin'

export default {
  name: 'token-dapp',
  beforeCreate () {
    console.log('registerWeb3 Action dispatched from casino-dapp.vue')
    this.$store.dispatch('registerWeb3')
  },
  components: {
    Metamask,
    IssueCoin
  }
}
</script>
<style lang="stylus" scoped>
  .border
    margin-top: .2rem
    border: 1px solid #ebebeb
    box-shadow: 0 0 8px 0 rgba(232,237,250,.6), 0 2px 4px 0 rgba(232,237,250,.5);
</style>