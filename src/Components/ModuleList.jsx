import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

import ModuleList from '../data/ModuleList'

import ModuleView from './Module'

import '../styles.css'

@observer
class ModuleListView extends React.Component {
  static propTypes = {
    moduleList: PropTypes.instanceOf(ModuleList).isRequired,
    displayMode: PropTypes.oneOf(['default', 'article'])
  }
  static defaultProps = {
    displayMode: 'default'
  }

  state = {
    displayMode: 'default'
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
                <a
                  className="button is-small"
                  onClick={e => {
                    e.preventDefault()
                    this.setState({
                      displayMode:
                        this.state.displayMode === 'default'
                          ? 'article'
                          : 'default'
                    })
                  }}
                >
                  Change list layout
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="modules-list-content">
          {moduleList.modules.map(module => (
            <ModuleView
              key={module.id}
              useArticle={this.state.displayMode === 'article'}
              module={module}
            />
          ))}
        </div>
      </React.Fragment>
    )
  }
}

export default ModuleListView
