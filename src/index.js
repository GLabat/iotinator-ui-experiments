import React from 'react'
import { render } from 'react-dom'
import { observer } from 'mobx-react'

import Module from './data/Module.js'
import ModuleList from './data/ModuleList.js'
import ModuleListView from './Components/ModuleList.jsx'
import NewFakeModule from './Components/NewFakeModule.jsx'

import './styles.scss'

const store = new ModuleList()

fetch(document.location.origin + '/api/list')
  .then(response => response.json())
  .then(data => {
    Object.entries(data.agentList).forEach(([k, v]) =>
      store.modules.push(
        new Module({
          MAC: k,
          ...v
        })
      )
    )
    render(<App />, document.getElementById('app'))
  })

//console.log(store.modules.slice())
const App = observer(() => (
  <React.Fragment>
    <NewFakeModule store={store} />
    <ModuleListView moduleList={store} />
  </React.Fragment>
))

if (process.env.NODE_ENV === 'development') {
  // DEBUG: expose the store (module list in window to test outside of the UI)
  // Ex: window.store.modules[0].customData.speed = "5"
  window.store = store
}
