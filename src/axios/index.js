import axios from 'axios'
import store from '@/store'

function showError (that, msg) {
  const page = that.$route.name
  if (page.indexOf('pc') !== -1) {
    that.$alert(msg).catch(() => {})
  } else if (page.indexOf('mobile') !== -1) {
    that.toast.push(that.$toast({
      message: msg,
      duration: 1500
    }))
  }
}

export default function (that, params) {
  return new Promise(resolve => {
    const page = that.$route.name
    if (store.state.token === '' && page.indexOf('Login') === -1) {
      if (page.indexOf('pc') !== -1) {
        that.$router.push('/pc')
        return false
      } else if (page.indexOf('mobile') !== -1) {
        that.$router.push('/mobile')
        return false
      }
    }
    Object.assign(params, {token: store.state.token})
    const config = {
      method: 'post',
      url: store.state.api,
      data: JSON.stringify(params)
    }
    axios.request(config).then(res => {
      if (res.data.res === 0) {
        resolve(res.data)
      } else {
        showError(that, res.data.msg)
      }
    }).catch(err => {
      if (err.response) {
        showError(that, err.response.data.message)
      } else {
        showError(that, err.message)
      }
    })
  })
}
