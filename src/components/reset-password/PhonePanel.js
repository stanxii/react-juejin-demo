import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import { observer, inject} from 'mobx-react'
import CaptchaBtn from './CaptchaBtn'

import Button from 'react-bootstrap/Button'
import style from './style.scss'


@inject("store")
@observer
class PhonePanel extends Component {
  static propTypes = {
    onsubmit: PropTypes.func,
    store: PropTypes.shape({
      alert: PropTypes.shape({
        show: PropTypes.bool,
        initAlert: PropTypes.func
      }),
      validate: PropTypes.shape({
        password: PropTypes.func,
        code: PropTypes.func
      }),
    })
  }
  constructor() {
    super()
    this.state = {
      phone: '',
      code: '',
      password: '',
      show: true,
      captchaResult: ''
    }
  }
  handleInputPhone(event) {
    this.setState({
      phone: event.target.value
    })
  }
  handleInputCode(event) {
    this.setState({
      code: event.target.value
    })
  }
  handleInputPassword(event) {
    this.setState({
      password: event.target.value
    })
  }
  getCaptchaResult(result) {
    this.setState({
      captchaResult: result
    })
  }
  _validatePassword(){
    const { password } = this.state
    const { alert, validate} = this.props.store
    const result = validate.password({value: password})
    if(result.pass){
      return true
    }else{
      alert.initAlert(result)
      return false
    }
  }
  _validateCode(){
    const { code } = this.state
    const { alert, validate} = this.props.store
    const result = validate.code({value: code})
    if(result.pass){
      return true
    }else{
      alert.initAlert(result)
      return false
    }
  }
  onsubmit(event) {
    const flag = this._validateCode()&&this._validatePassword()
    const { alert } = this.props.store
    const { captchaResult } = this.state
    if(!captchaResult){
      alert.initAlert({variant: 'danger', tips: '请先完成验证'})
    }
    event.preventDefault();
  }
  render() {
    return (
      <div >
        <div >
          <div className={style["input-group"]}>
            <input type="tel" placeholder="请输入手机号" autoComplete="off" maxLength="11" className={`${style.input} ${style['full-width']}`}
              value={this.state.phone}
              onChange={this.handleInputPhone.bind(this)}/>
          </div>
          <div className={`${style['input-group']} ${style['vcode-input-group']}`}>
            <input type="text" placeholder="请输入验证码" autoComplete="off"  className={`${style.input} ${style['vcode-input']}`}
                value={this.state.code}
                onChange={this.handleInputCode.bind(this)}/>
                <CaptchaBtn phone={this.state.phone} parent='phonePanel' getCaptchaResult={this.getCaptchaResult.bind(this)}/>
          </div>
          <div className={style["input-group"]}>
            <input type="password" placeholder="请输入新密码" autoComplete="off"  className={`${style.input} ${style['full-width']}`}
                value={this.state.password}
                onChange={this.handleInputPassword.bind(this)}/>
          </div>
          <Button variant="primary" size="lg" className={`${style['submit-btn']}`} onClick={this.onsubmit.bind(this)}>确定</Button>
        </div>
      </div>
    )
  }
}
export default PhonePanel