import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Switch from 'react-toggle-switch'

import { computed, action, observable } from 'mobx'
import { observer } from 'mobx-react'

import 'react-toggle-switch/dist/css/switch.min.css'

// Custom module component using an external React component

@observer
class SwitchComponent extends Component {
  static propTypes = {
    updateCustomData: PropTypes.func,
    status: PropTypes.oneOf(['on', 'off'])
  }

  static defaultProps = {
    updateCustomData: () => {},
    status: 'off'
  }

  @observable
  data = {
    status: this.props.status
  }

  @computed
  get isOn() {
    return this.data.status === 'on'
  }

  @action
  toggleSwitch = () => {
    this.data.status = this.isOn ? 'off' : 'on'
    this.props.updateCustomData(this.data)
  }

  render() {
    return <Switch onClick={this.toggleSwitch} on={this.isOn} />
  }
}

export default SwitchComponent
