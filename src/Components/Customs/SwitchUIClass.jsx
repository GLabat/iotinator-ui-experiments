import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Switch from 'react-toggle-switch'

import { computed, action } from 'mobx'

import 'react-toggle-switch/dist/css/switch.min.css'

// Custom module component using a external React component

class SwitchComponent extends Component {
  static propTypes = {
    customData: PropTypes.object
  }

  data = this.props.customData

  @computed
  get switched() {
    return this.data.status === 'on'
  }

  @action
  toggleSwitch = () => {
    this.data.status = this.switched ? 'off' : 'on'
  }

  render() {
    return <Switch onClick={this.toggleSwitch} on={this.switched} />
  }
}

export default SwitchComponent
