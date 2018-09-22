import React from 'react'
import PropTypes from 'prop-types'

import { action } from 'mobx'
import { observer } from 'mobx-react'

import Module from 'data/Module'

import Loadable from 'react-loadable'

import Loading from './Loading.jsx'
import InlineEdit from './InlineEdit.jsx'
import LoadingOverlay from './LoadingOverlay.jsx'

// Enforce structure and behaviour of custom component
function makeCustomComponent(WrappedComponent, module) {
  const { uiClassName, customData, updateCustomData } = module
  const _CustomComponent = class extends React.Component {
    static displayName = `${uiClassName}_CustomComponent`

    render() {
      return (
        <React.Fragment>
          <h5 className="has-background-grey has-text-white">
            Custom component data
          </h5>
          <pre>{JSON.stringify(customData, null, 2)}</pre>
          <h5 className="has-background-grey has-text-white">
            Custom component &apos;
            {uiClassName}
            &apos;
          </h5>
          {/* Forward custom data as props to the custom component */}
          <WrappedComponent
            updateCustomData={updateCustomData}
            {...customData}
          />
        </React.Fragment>
      )
    }
  }
  // Check if observer is needed when trying React Context
  return observer(_CustomComponent)
}

const ModuleView = observer(({ module, useArticle }) => {
  const {
    name,
    id,
    MAC,
    ssid,
    ip,
    type,
    disabled,
    uiClassName,
    uiClassPath,
    beingEdited
  } = module

  const ActionBar = ({ className }) => (
    <p className={`buttons ${className}`}>
      <button
        className={`button is-white`}
        onClick={action(e => {
          e.preventDefault(e)
          module.toggle()
        })}
      >
        <span className="icon">
          <i className={`fa fa-toggle-${(disabled && 'off') || 'on'}`} />
        </span>
      </button>
    </p>
  )

  ActionBar.propTypes = {
    className: PropTypes.string
  }

  if (useArticle) {
    return (
      <article className="media">
        <figure className="media-left">
          <p className="image is-64x64">
            <img
              src="https://bulma.io/images/placeholders/128x128.png"
              alt=""
            />
          </p>
        </figure>
        <div className="media-content">
          <div className="content">
            <h3>
              <strong>{name}</strong> <small>({id})</small>
            </h3>

            <div>
              <p>Type: {type}</p>
              <p>MAC: {MAC}</p>
              <p>IP: {ip}</p>
              <p>SSID: {ssid}</p>
            </div>
          </div>
          <nav className="level is-mobile">
            <div className="level-left">
              <ActionBar className="level-item" />
            </div>
          </nav>
        </div>
        <div className="media-right">
          <span className="icon">
            <i className={`fa fa-${(disabled && 'times') || 'check'}-circle`} />
            {disabled ? 'DISABLED' : 'ENABLED'}
          </span>
        </div>
      </article>
    )
  }

  let CustomComponent = null
  if (uiClassName) {
    CustomComponent = makeCustomComponent(
      Loadable({
        // Replace loader below to simulate long loading time
        /*
        loader: () => new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(import(`./${uiClassName}`))
          }, 2000)
        }),
        */
        // Use 'webpackChunkName: "[request]"' to name the bundle with the name of the module
        loader: () =>
          import(/* webpackChunkName: "[request]" */ `${uiClassPath}`),
        loading: Loading,
        timeout: 5000
      }),
      module
    )
  }

  return (
    <div className="card module">
      {beingEdited && <LoadingOverlay />}
      <header className="card-header">
        <span className="card-header-title">
          <InlineEdit
            onChange={newName => {
              // Cancelling the prompt set the returned value to null…
              if (newName !== null && newName !== '') {
                module.rename(newName)
              }
            }}
            value={name}
          />
          &nbsp;(
          {id}) {!beingEdited && <ActionBar />}
          {beingEdited && (
            <span>
              <i className="fas fa-spinner fa-spin" />
              Update in progress…
            </span>
          )}
        </span>
      </header>
      <div className="card-content">
        <div className="content">
          <p>Type: {type}</p>
          <p>MAC: {MAC}</p>
          <p>IP: {ip}</p>
          <p>SSID: {ssid}</p>
          {uiClassName && <CustomComponent />}
        </div>
      </div>
      <div
        className={`card-footer ${(disabled && 'has-background-white-ter') ||
          ''}`}
      >
        <span className="card-footer-item">
          <span className="icon">
            <i className={`fa fa-${(disabled && 'times') || 'check'}-circle`} />
            {disabled ? 'DISABLED' : 'ENABLED'}
          </span>
        </span>
      </div>
    </div>
  )
})

ModuleView.propTypes = {
  module: PropTypes.instanceOf(Module).isRequired,
  useArticle: PropTypes.bool
}

export default ModuleView
