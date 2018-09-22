import React from 'react'
import PropTypes from 'prop-types'
import { action } from 'mobx'

import Module from 'data/Module'

let idx = 2

const NewFakeModule = ({ store }) => (
  <a
    className="button is-warning"
    onClick={action(e => {
      e.preventDefault()
      store.modules.push(
        new Module({
          MAC: `aa:82:96:eb:f3:8${idx}`,
          name: `Switch_${idx}`,
          ip: `192.168.4.${idx}`,
          uiClassName: 'switchUIClass',
          custom: '{"status": "on"}',
          pong: Math.floor(Math.random() * Math.floor(2))
        })
      )
      idx++
    })}
  >
    Add dynamic fake module
  </a>
)
NewFakeModule.propTypes = {
  store: PropTypes.any
}

export default NewFakeModule
