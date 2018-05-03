<template>
  <div class="issuecoin">
    <el-form :model="ruleForm" ref="ruleForm" status-icon label-width="100px" class="demo-ruleForm">
      <el-form-item prop="tokenAmount" label="代币数量" :rules="[{ required: true, message: '代币数量不能为空'}, { type: 'number', message: '代币数量必须为数字值'}]">
        <el-input  type="tokenAmount" v-model.number="ruleForm.tokenAmount" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item prop="tokenName" label="代币名称" :rules="[{ required: true, message: '代币名称不能为空'}]">
        <el-input  type="tokenName" v-model="ruleForm.tokenName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item prop="tokenSymbo" label="代币符号" :rules="[{ required: true, message: '代币符号不能为空'}]">
        <el-input  type="tokenSymbo" v-model="ruleForm.tokenSymbo" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item prop="tokenAddress" label="钱包地址" :rules="[{ required: true, message: '钱包地址不能为空'}]">
        <el-input  type="tokenAddress"  v-model="ruleForm.tokenAddress" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="">
        <i v-if="pending" class="el-icon-loading" style="font-size:22px;"></i>
        <el-button style="float:right;" type="primary" @click="depolyContract('ruleForm')" :disabled="!isInjected">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Web3 from 'web3'
import {ABI} from './../util/constants/tokenContract'
import {mapState} from 'vuex'
export default {
  name: 'casino',
  data () {
    return {
      ruleForm: {
        tokenAmount: '',
        tokenName: '',
        tokenSymbo: '',
        tokenAddress: ''
      },
      pending: false,
      submitSucess: false,
      contractInstance: null,
    }
  },
  computed: {
    ...mapState({
      payChange: state => state.web3.payChange,
      isInjected: state => state.web3.isInjected
    })
  },
  watch: {
    payChange: function(){
      this.pending = false
      this.$message.success('代币转移成功，请到指定的钱包查收')
    }
  },
  methods: {
    depolyContract (formName) {
      const self = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          self.$message.success('信息提交成功，请支付')
          self.submitSucess = true
        } else {
          console.log('error submit!!');
          self.$message.error('信息提交失败')
          self.submitSucess = false
          }
        }
      )
      if (this.submitSucess == false) {
        return
      }
      this.submitSucess = false
      const web3 = new Web3(window.web3.currentProvider)
      const coinContract = web3.eth.contract(ABI)
      this.pending = false
      coinContract.new(this.ruleForm.tokenAmount,this.ruleForm.tokenName,0,this.ruleForm.tokenSymbo,{
        from: web3.eth.accounts[0],
        data:"0x608060405234801561001057600080fd5b50604051610e30380380610e308339810180604052810190808051906020019092919080518201929190602001805190602001909291908051820192919050505083600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508360008190555082600390805190602001906100b29291906100ee565b5081600460006101000a81548160ff021916908360ff16021790555080600590805190602001906100e49291906100ee565b5050505050610193565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061012f57805160ff191683800117855561015d565b8280016001018555821561015d579182015b8281111561015c578251825591602001919060010190610141565b5b50905061016a919061016e565b5090565b61019091905b8082111561018c576000816000905550600101610174565b5090565b90565b610c8e806101a26000396000f3006080604052600436106100af576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde03146100b4578063095ea7b31461014457806318160ddd146101a957806323b872dd146101d457806327e235e314610259578063313ce567146102b05780635c658165146102e157806370a082311461035857806395d89b41146103af578063a9059cbb1461043f578063dd62ed3e146104a4575b600080fd5b3480156100c057600080fd5b506100c961051b565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156101095780820151818401526020810190506100ee565b50505050905090810190601f1680156101365780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561015057600080fd5b5061018f600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506105b9565b604051808215151515815260200191505060405180910390f35b3480156101b557600080fd5b506101be6106ab565b6040518082815260200191505060405180910390f35b3480156101e057600080fd5b5061023f600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506106b1565b604051808215151515815260200191505060405180910390f35b34801561026557600080fd5b5061029a600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061094b565b6040518082815260200191505060405180910390f35b3480156102bc57600080fd5b506102c5610963565b604051808260ff1660ff16815260200191505060405180910390f35b3480156102ed57600080fd5b50610342600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610976565b6040518082815260200191505060405180910390f35b34801561036457600080fd5b50610399600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061099b565b6040518082815260200191505060405180910390f35b3480156103bb57600080fd5b506103c46109e4565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156104045780820151818401526020810190506103e9565b50505050905090810190601f1680156104315780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561044b57600080fd5b5061048a600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610a82565b604051808215151515815260200191505060405180910390f35b3480156104b057600080fd5b50610505600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610bdb565b6040518082815260200191505060405180910390f35b60038054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156105b15780601f10610586576101008083540402835291602001916105b1565b820191906000526020600020905b81548152906001019060200180831161059457829003601f168201915b505050505081565b600081600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a36001905092915050565b60005481565b600080600260008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905082600160008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054101580156107825750828110155b151561078d57600080fd5b82600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254019250508190555082600160008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8110156108da5782600260008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055505b8373ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef856040518082815260200191505060405180910390a360019150509392505050565b60016020528060005260406000206000915090505481565b600460009054906101000a900460ff1681565b6002602052816000526040600020602052806000526040600020600091509150505481565b6000600160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b60058054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610a7a5780601f10610a4f57610100808354040283529160200191610a7a565b820191906000526020600020905b815481529060010190602001808311610a5d57829003601f168201915b505050505081565b600081600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410151515610ad257600080fd5b81600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a36001905092915050565b6000600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050929150505600a165627a7a7230582025471d3ff6ce910a1fa077287d54290d556b018197ad65bf8b0fd1bd5ec446e00029",
        gas: "3000000",
        gasPrice: 0
      },function(err,contract){
           if (!err) {
            self.$message.success('支付成功，开始部署合约')
            self.pending = true
            if (contract.address !== undefined) {
               self.$message.success('合约部署成功，继续支付转移代币')
               console.log('合约部署地址: ' + contract.address + ' 交易哈希: ' + contract.transactionHash)
               self.contractInstance = () => coinContract.at(contract.address)
               self.transfer()
              }else{
              console.log('合约部署第一次回调： ' + contract.transactionHash)
            }
          }else{console.log("发生错误："+err)}
        }
      )  
    },  
    transfer () {
         this.pending = false
         this.contractInstance().transfer(this.ruleForm.tokenAddress,this.ruleForm.tokenAmount,{from: this.$store.state.web3.coinbase},(err, result) => {
         if (err) {
           this.$message.error('支付失败')
          } else {
          this.pending = true
          this.$message.success('支付成功，开始转移代币')
          this.$store.commit('isReadyMakeCoin')
         }
       })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .issuecoin >>> .el-form-item__label
    font-weight: bold
    font-size: .25rem 
  .issuecoin
    margin-left: .1rem
    margin-right: .1rem
    .coin-gif
      width: 3rem
      height: 3rem
</style>