import React from 'react'
import { render } from 'react-dom'
import { action } from 'mobx'
import { observer } from 'mobx-react'

import Module from './data/Module.js'
import ModuleList from './data/ModuleList.js'
import ModuleListView from './Components/ModuleList.jsx'

import 'bulma/css/bulma.css'

import SAMPLE_DATA from './sample.js'

import SC from './Components/Customs/SwitchUIClass.jsx'

const store = new ModuleList()
Object.entries(SAMPLE_DATA).forEach(([k, v]) =>
  store.modules.push(
    new Module({
      MAC: k,
      ...v
    })
  )
)
//console.log(store.modules.slice())
let idx = 2
const App = observer(() => (
  <React.Fragment>
    <a
      className="button is-warning"
      onClick={action(e => {
        e.preventDefault()
        store.modules.push(
          new Module({
            MAC: `aa:82:96:eb:f3:8${idx}`,
            name: `Switch_${idx}`,
            ip: `192.168.4.${idx}`,
            pong: Math.floor(Math.random() * Math.floor(2))
          })
        )
        idx++
      })}
    >
      Add dynamic fake module
    </a>
    <div className="container">
      <ModuleListView moduleList={store} />
    </div>
  </React.Fragment>
))

render(<App />, document.getElementById('root'))
