import Web3 from 'web3'

/*
* 1. 检查 injected web3 (mist/metamask)
* 2. 如果安装了 metamask/mist，就创建一个web3实例
* 3. 检查ETH网络节点 networkId 
* 4. 从metamask获取账户地址
* 5. 从metamask获取账户余额
*/

let getWeb3 = new Promise(function (resolve, reject) {
  // 检查 injected web3 (mist/metamask)是否安装
  var web3js = window.web3
  if (typeof web3js !== 'undefined') {
    var web3 = new Web3(web3js.currentProvider)
    console.log("injectedWeb3:"+web3.isConnected())
    resolve({
      injectedWeb3: web3.isConnected(),
      web3 () {
        return web3
      }
    })
  } else {
    // web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545')) 
    reject(new Error('不能连接到 Metamask'))
  }
})
  .then(result => {
    return new Promise(function (resolve, reject) {
      // 获取ETH network ID
      result.web3().version.getNetwork((err, networkId) => {
        if (err) {
          // 如果找不到network ID抛出错误
          reject(new Error('Unable to retrieve network ID'))
        } else {
          // 把获取到的network ID加到result里，当作参数传到下一个promise
          result = Object.assign({}, result, {networkId})
          resolve(result)
        }
      })
    })
  })
  .then(result => {
    return new Promise(function (resolve, reject) {
      // 获取账户地址
      result.web3().eth.getCoinbase((err, coinbase) => {
        if (err) {
          reject(new Error('Unable to retrieve coinbase'))
        } else {
          result = Object.assign({}, result, { coinbase })
          resolve(result)
        }
      })
    })
  })
  .then(result => {
    return new Promise(function (resolve, reject) {
      // 获取账户余额
      result.web3().eth.getBalance(result.coinbase, (err, balance) => {
        if (err) {
          reject(new Error('Unable to retrieve balance for address: ' + result.coinbase))
        } else {
          result = Object.assign({}, result, { balance })
          resolve(result)
        }
      })
    })
  })

  export default getWeb3