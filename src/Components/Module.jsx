import React from 'react'
import PropTypes from 'prop-types'

import { action } from 'mobx'
import { observer } from 'mobx-react'

import Module from 'data/Module'

import Loadable from 'react-loadable'
import Loading from './Loading.jsx'
import LoadingOverlay from './LoadingOverlay.jsx'

import '../styles.css'

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

const ModuleView = observer(({ module }) => {
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

  const ActionBar = ({ className, childClassName }) => (
    <nav className={'navbar ' + className}>
      <a
        className={'navbar-item button is-white ' + childClassName}
        aria-label="reply"
        onClick={action(e => {
          e.preventDefault(e)
          module.toggle()
        })}
      >
        <span className="icon is-white is-small">
          <i className={`fas fa-2x fa-toggle-${(disabled && 'off') || 'on'}`} />
        </span>
      </a>
      <a
        className={'navbar-item button is-white ' + childClassName}
        aria-label="rename"
        onClick={e => {
          e.preventDefault(e)
          const newName = prompt('Enter new name', module.name)
          // Cancelling the prompt set the returned value to null…
          if (newName !== null && newName !== '') {
            module.rename(newName)
          }
        }}
      >
        <i className="fas fa-2x fa-edit" aria-hidden="true" />
      </a>
      <a
        className={'navbar-item button is-white ' + childClassName}
        aria-label="info"
      >
        <span className="icon is-small">
          <i className="fas fa-2x fa-info" aria-hidden="true" />
        </span>
      </a>
    </nav>
  )

  //   <button
  //     className="button is-white"
  //     onClick={e => {
  //       e.preventDefault(e)
  //       const newName = prompt('Enter new name', module.name)
  //       // Cancelling the prompt set the returned value to null…
  //       if (newName !== null && newName !== '') {
  //         module.rename(newName)
  //       }
  //     }}
  //   >
  //     <i className="fa fa-edit" aria-hidden="true" />
  //   </button>
  // </p>
  // )

  ActionBar.propTypes = {
    className: PropTypes.string,
    childClassName: PropTypes.string
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

  /* <div className="card module">
      {beingEdited && <LoadingOverlay />}
      <header className="card-header">
        <span className="card-header-title">
          {name} ({id}) {!beingEdited && <ActionBar />}
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
    </div> */

  return (
    <div className="box level module">
      {beingEdited && <LoadingOverlay />}
      {/* <div className="media-left">
          <figure className="image is-128x128">
            <span className="is-128x128">
              <i className="fas fa-lightbulb fa-w-11 fa-3x" />
            </span>
            <img
              src="https://bulma.io/images/placeholders/128x128.png"
              alt="Image"
            />
          </figure>
        </div> */}
      <div className="level-left">
        <figure className="image is-48x48">
          <span>
            <i className="fas fa-lightbulb fa-3x" />
          </span>
        </figure>
        <p className="level-item">
          <strong>{name}</strong> <small>({id})</small>{' '}
        </p>
        <p className="level-item">
          {beingEdited && (
            <span>
              <i className="fas fa-spinner fa-spin" />
              Update in progress…
            </span>
          )}
        </p>
      </div>
      <div className="level-right">
        {!beingEdited && (
          <ActionBar className="level-item" childClassName="level-item" />
        )}
        {/* <p class="level-item">
          <strong>All</strong>
        </p>
        <p class="level-item">
          <a>Published</a>
        </p>
        <p class="level-item">
          <a>Drafts</a>
        </p>
        <p class="level-item">
          <a>Deleted</a>
        </p>
        <p class="level-item">
          <a class="button is-success">New</a>
        </p> */}
      </div>
    </div>
  )
})

ModuleView.propTypes = {
  module: PropTypes.instanceOf(Module).isRequired
}

export default ModuleView
