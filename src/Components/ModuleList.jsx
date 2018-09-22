import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

import ModuleList from '../data/ModuleList'

import ModuleView from './Module'

@observer
class ModuleListView extends React.Component {
  static propTypes = {
    moduleList: PropTypes.instanceOf(ModuleList).isRequired
  }

  render() {
    const { moduleList } = this.props
    return (
      <React.Fragment>
        <div className="modules-list-header">
          <div className="notification is-info">
            <div className="columns">
              <div className="column">
                Number of enabled modules: {moduleList.enabledModulesCount}
              </div>
              <div className="column">
                <a
                  className="button is-small"
                  onClick={e => {
                    e.preventDefault()
                    moduleList.allOff()
                  }}
                >
                  Toggle all off
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="modules-list-content">
          {moduleList.modules.map(module => (
            <ModuleView key={module.id} module={module} />
          ))}
        </div>
      </React.Fragment>
    )
  }
}

export default ModuleListView
