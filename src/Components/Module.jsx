import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

import Module from 'data/Module'

import Loadable from 'react-loadable'

import Loading from './Loading.jsx'
import InlineEdit from './InlineEdit.jsx'
import LoadingOverlay from './LoadingOverlay.jsx'

const CSS_COMPONENT_CLASS = 'module'

// Enforce structure and behaviour of custom component
function makeCustomComponent(WrappedComponent, module) {
  const { uiClassName, customData, updateCustomData } = module
  const _CustomComponent = class extends React.Component {
    static displayName = `${uiClassName}_CustomComponent`

    render() {
      return (
        <React.Fragment>
          {/* <h5 className="has-background-grey has-text-white">
            Custom component data
          </h5>
          <pre>{JSON.stringify(customData, null, 2)}</pre>
          <h5 className="has-background-grey has-text-white">
            Custom component &apos;
            {uiClassName}
            &apos;
          </h5> */}
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

  let CustomComponent = null
  if (uiClassName) {
    CustomComponent = makeCustomComponent(
      Loadable({
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
    <div className={`container ${CSS_COMPONENT_CLASS}`}>
      <div className="box">
        <div className="columns is-vcentered is-mobile is-multiline">
          {beingEdited && <LoadingOverlay />}
          <div className="column is-one-fifth-mobile is-1-tablet is-1-desktop">
            {!beingEdited && (
              <figure className="image is-48x48">
                <span>
                  <i className="fas fa-lightbulb fa-3x" />
                </span>
              </figure>
            )}
            {beingEdited && (
              <span>
                <i className="fas fa-spinner fa-spin" />
                <small className="is-hidden-mobile">Updating…</small>
              </span>
            )}
          </div>
          <div className="column is-four-fifths-mobile is-6-tablet is-6-desktop">
            <strong>
              <InlineEdit
                onChange={newName => {
                  if (newName !== null && newName !== '') {
                    module.rename(newName)
                  }
                }}
                value={name}
              />
            </strong>
            &nbsp;(
            {id})
          </div>
          <div className="column is-four-fifths-mobile is-5-tablet is-5-desktop">
            {uiClassName && <CustomComponent />}
          </div>
        </div>
      </div>
    </div>
  )
})

ModuleView.propTypes = {
  module: PropTypes.instanceOf(Module).isRequired
}

export default ModuleView
