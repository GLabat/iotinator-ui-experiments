import React from 'react'
import PropTypes from 'prop-types'
import { action, observable } from 'mobx'
import { observer } from 'mobx-react'

// Basic inline editable component which switches between a span (readonly)
// and an input (editable) component.
// TODO: check on mobile, handle ontouch event

@observer
class InlineEdit extends React.Component {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func
  }

  static defaultProps = {
    value: '',
    onChange: () => {}
  }

  // Ref to the input so that we can manipulate it directly
  inputRef = React.createRef()

  @observable
  editMode = false

  componentDidUpdate() {
    const inputElem = this.inputRef.current
    if (inputElem && inputElem.nodeName === 'INPUT') {
      // Auto-select the input content
      inputElem.select()
    }
  }

  /**
   * Switch between read and edit mode
   */
  @action
  toggleEdit = () => {
    this.editMode = !this.editMode
  }

  /**
   * Propagate the input value to the outside
   */
  validate = e => {
    this.props.onChange(e.target.value)
    this.toggleEdit()
  }

  /**
   * Handle key pressed while editing
   */
  handleKey = e => {
    if (e.key === 'Enter') {
      this.validate(e)
    } else if (e.key === 'Escape') {
      // Discard change
      this.toggleEdit()
    }
  }

  render() {
    if (this.editMode) {
      return (
        <input
          ref={this.inputRef}
          autoFocus
          className="input"
          type="text"
          defaultValue={this.props.value}
          onBlur={this.validate}
          onKeyDown={this.handleKey}
        />
      )
    }
    return (
      <span
        title="Click to edit"
        className="inlineInput"
        onClick={this.toggleEdit}
      >
        {this.props.value}
      </span>
    )
  }
}

export default InlineEdit
