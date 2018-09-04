import React from 'react'
import PropTypes from 'prop-types'

import { action } from 'mobx'
import { observer } from 'mobx-react'

import Module from '../data/Module'

import Loadable from 'react-loadable'
import Loading from './Loading.jsx'

import '../styles.css'

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
    customData
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
      <button
        className="button is-white"
        onClick={action(e => {
          e.preventDefault(e)
          const newName = prompt('Enter new name', module.name)
          module.rename(newName)
        })}
      >
        <i className="fa fa-edit" aria-hidden="true" />
      </button>
    </p>
  )
  if (useArticle) {
    return (
      <article className="media">
        <figure className="media-left">
          <p className="image is-64x64">
            <img src="https://bulma.io/images/placeholders/128x128.png" />
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

  // Enforce structure and behaviour of custom component
  function makeCustom(WrappedComponent) {
    const _CustomComponent = class extends React.Component {
      static propTypes = {
        customData: PropTypes.object
      }
      render() {
        return (
          <React.Fragment>
            <h5 className="has-background-grey has-text-white">
              Custom component data
            </h5>
            <pre>{JSON.stringify(customData, null, 2)}</pre>
            <h5 className="has-background-grey has-text-white">
              Custom component '{uiClassName}'
            </h5>
            {/* Use React Context to pass the data and allow the Custom component to modify it? */}
            <WrappedComponent {...this.props} />
          </React.Fragment>
        )
      }
    }
    // Check if observer is needed when trying React Context
    return observer(_CustomComponent)
  }

  let CustomComponent = null
  if (uiClassName) {
    CustomComponent = makeCustom(
      Loadable({
        // Replace loader below to simulate long loading time
        /*
        loader: () => new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(import(`./${uiClassName}`))
          }, 2000)
        }),
      */
        loader: () => import(`./${uiClassName}`),
        loading: Loading,
        timeout: 5000
      })
    )
  }

  return (
    <div className="card module">
      <header className="card-header">
        <span className="card-header-title">
          {name} ({id})
          <p className="buttons">
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
            <button
              className="button is-white"
              onClick={action(e => {
                e.preventDefault(e)
                const newName = prompt('Enter new name', module.name)
                module.rename(newName)
              })}
            >
              <i className="fa fa-edit" aria-hidden="true" />
            </button>
          </p>
        </span>
      </header>
      <div className="card-content">
        <div className="content">
          <p>Type: {type}</p>
          <p>MAC: {MAC}</p>
          <p>IP: {ip}</p>
          <p>SSID: {ssid}</p>
          {uiClassName && <CustomComponent customData={customData} />}
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
