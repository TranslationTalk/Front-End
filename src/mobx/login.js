import { observable } from 'mobx'

const Login = observable({
  // state
  auth: '',
  // action
  setAuth(auth) {
    this.auth = auth
  },
})

export default Login
