import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { action, observable } from 'mobx'

// Simple component
// @observer
class SimpleComponent extends React.Component {
  static displayName = 'SimpleComponent'
  static propTypes = {
    updateCustomData: PropTypes.func,
    speed: PropTypes.number,
    osc: PropTypes.bool
  }
  // static defaultProps = {
  //   updateCustomData: () => {},
  //   speed: 2,
  //   osc: true
  // }

  // @observable
  data = {
    speed: this.props.speed,
    osc: this.props.osc
  }

  @action
  onChange = (type, value) => {
    this.data[type] = value
  }

  onSave = () => this.props.updateCustomData(this.data)

  render() {
    return (
      <React.Fragment>
        <input
          type="number"
          className="input"
          defaultValue={this.data.speed}
          onChange={e => this.onChange('speed', parseInt(e.target.value, 10))}
        />
        <input
          type="checkbox"
          className="checkbox"
          defaultChecked={this.data.osc}
          onChange={e => this.onChange('osc', e.target.checked)}
        />
        <button className="button" onClick={this.onSave}>
          Save
        </button>
      </React.Fragment>
    )
  }
}

// const SimpleComponent = ({ speed, osc }) => (
//   // <p>Some text acting as Custom component</p>
// )
// SimpleComponent.displayName = 'SimpleComponent'
// SimpleComponent.propTypes = {
//   speed: PropTypes.number,
//   osc: PropTypes.oneOf(['on', 'off'])
// }

// SimpleComponent.defaultProps = {
//   speed: 2,
//   osc: 'on'
// }

export default SimpleComponent
