<template>
  <div class="casino container">
    <div class="row">
      <h1>欢迎来到token制造中心</h1>
      <br/>
      <h3>填写token相关信息</h3>
      <br/> 
      <form class="form-horizontal" role="form">

        <div class="col-sm-4 height margin"></div>
        <div class="form-group col-sm-4 height margin">
          <label for="firstname"  class="col-sm-4 control-label">代币数量</label>
          <div class="col-sm-8">
            <input type="text" class="form-control" v-model="initialAmount" placeholder="例如: 21000000" required="required">
          </div>
        </div>
        <div class="col-sm-4 height margin"></div>

        <div class="col-sm-4 height margin"></div>
        <div class="form-group col-sm-4 height">
          <label for="firstname" class="col-sm-4 control-label">代币名称</label>
          <div class="col-sm-8">
            <input type="text" class="form-control"  v-model="name" placeholder='例如: "SiaCoin"' required="required">
          </div>
        </div>
        <div class="col-sm-4 height margin"></div>

        <div class="col-sm-4 height margin"></div>
        <div class="form-group col-sm-4 height">
          <label for="firstname"  class="col-sm-4 control-label">代币符号</label>
          <div class="col-sm-8">
            <input type="text" class="form-control" v-model="tokenSymbo" placeholder='例如: "SC"' required="required">
          </div>
        </div>
        <div class="col-sm-4 height margin">
          <button type="button" class="btn btn-success" @click="clickToken">生成代币</button>
        </div>

        <img v-if="pending" id="loader" src="https://loading.io/spinners/double-ring/lg.double-ring-spinner.gif">
        <div class="col-sm-12 height margin">
         <h4>{{msg}}</h4>
       </div>
      </form>

      <form class="form-horizontal" role="form" v-if="sucess">
        <div class="col-sm-4 height margin"></div>
        <div class="form-group col-sm-4 height margin">
          <label for="firstname"  class="col-sm-4 control-label">代币数量</label>
          <div class="col-sm-8">
            <input type="text" class="form-control" v-model="amount" disabled="disabled">
          </div>
        </div>
        <div class="col-sm-4 height margin"></div>

        <div class="col-sm-4 height margin"></div>
        <div class="form-group col-sm-4 height margin">
          <label for="firstname"  class="col-sm-4 control-label">钱包地址</label>
          <div class="col-sm-8">
            <input type="text" class="form-control" v-model="owneraddress" placeholder="例如: 0x14acXXXXXX">
          </div>
        </div>
        <div class="col-sm-4 height margin">
          <button type="button" class="btn btn-success" @click="transfer">发送代币</button>
        </div>
      </form>
    </div> 
  </div>
</template>

<script>
export default {
  name: 'casino',
  data () {
    return {
      initialAmount: 0,
      name: '',
      tokenSymbo:'',
      amount: 0,
      owneraddress: '',
      pending: false,
      sucess: false,
      msg: ''
    }
  },
  methods: {
    clickToken () {
      if(this.initialAmount == 0 || this.name == '' || this.tokenSymbo == '' ) {
        this.msg = "请完整填写代币相关信息"
        return
      }
      this.pending = true
      this.msg = ''
      this.$store.state.contractInstance().makeCoin(this.initialAmount,this.name,0,this.tokenSymbo, {from: this.$store.state.web3.coinbase},(err, result) => {
        if (err) {
          this.pending = false
          this.msg = "交易失败"
        } else {
          this.amount = this.initialAmount
          this.pending = false
          this.sucess = true
        }
      } 
     )
    },
    transfer () {
       if( this.owneraddress == '') {
        this.msg = "请填写钱包地址"
        return
      }
      this.$store.state.contractInstance().transfer(this.owneraddress,this.amount,{from: this.$store.state.web3.coinbase},(err, result) => {
        if (err) {
       
        } else {
  
        }
      } 
     )
    },
    balanceOf () {
      this.$store.state.contractInstance().balanceOf(this.owneraddress,{from: this.$store.state.web3.coinbase},(err, result) => {
        if (err) {
          console.log(err)
        } else {
          console.log(result)
        }
      } 
      )
    }
  },
  mounted () {
    console.log('dispatching getContractInstance')
    this.$store.dispatch('getContractInstance')
  }
}
</script>

<style scoped>

.casino {
     margin-top: 50px;
     text-align:center;
}
.height {
  height: 35px;
}
.margin {
  margin-bottom: 15px;
}
#loader {
  width:150px;
}
ul {
    margin: 25px;
    list-style-type: none;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-column-gap:25px;
    grid-row-gap:25px;
}
li{
    padding: 20px;
    margin-right: 5px;
    border-radius: 50%;
    cursor: pointer;
    background-color:#fff;
    border: -2px solid #bf0d9b;
    color: #bf0d9b;
    box-shadow:3px 5px #bf0d9b;
}
li:hover{
    background-color:#bf0d9b;
    color:white;
    box-shadow:0px 0px #bf0d9b;
}
li:active{
    opacity: 0.7;
}
*{
   color: #444444;
}
#has-won {
  color: green;
}
#has-lost {
  color:red;
}
</style>