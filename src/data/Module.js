import { action, computed, observable, observe } from 'mobx'

import XIOT_API from './api'

class Module {
  @computed
  get id() {
    return 'M' + this.MAC.replace(/:/g, '_')
  }

  @computed
  get disabled() {
    return this.pong === 0
  }

  @computed
  get uiClassPath() {
    return `./Customs/${this.uiClassName.charAt(0).toUpperCase() +
      this.uiClassName.slice(1)}.jsx`
  }

  @observable
  beingEdited = false

  @observable
  MAC = '' // Mac address of the module transformed to be used as id
  @observable
  name = '' // Name of the module  (can change)
  @observable
  pong = 0 // 0, 1 or -1: not pinged, ping ok, ping nok

  type = '' // type of the module  (cannot change)
  ssid = '' // Name of the created wifi network
  ip = '' // IP on the Access Point created wifi network
  uiClassName = '' // uiClassName of the module
  heap = 0
  canSleep = false
  alert = false
  alertMsg = ''
  customData = {}

  constructor({
    MAC,
    name,
    pong,
    type,
    ssid,
    ip,
    uiClassName = '',
    customData = {}
  }) {
    if (!MAC) {
      throw new Error('ErrNoMac')
    }
    this.MAC = MAC
    this.name = name
    this.pong = pong
    this.type = type
    this.ssid = ssid
    this.ip = ip
    this.uiClassName = uiClassName
    // Make custom data observable but note that new properties would not be observed
    try {
      this.customData = observable(JSON.parse(customData))
    } catch (e) {
      this.customData = {}
    }

    // Whenever customData is modified, automatically send it to the server.
    // But this means that if an error occurs during the call, there will be a de-synchro (client updated, but no server).
    // TODO: change that, maybe with a specific action called from the CustomComponent.
    observe(this.customData, change => {
      // Only listen to update
      if (change.type === 'update') {
        this.beingEdited = true
        // TODO: handle failure
        XIOT_API.updateData(this.id, this.customData)
          .then(() => {
            this.beingEdited = false
          })
          .catch(() => {
            this.beingEdited = false
            throw new Error('ErrUpdateData')
          })
      }
    })
  }

  @action
  rename = newName => {
    this.beingEdited = true
    XIOT_API.rename(this.id, newName, this.name)
      .then(() => {
        this.beingEdited = false
        // Update the name locally (client-side) only if server call is successful
        this.name = newName
      })
      .catch(() => {
        this.beingEdited = false
        throw new Error('ErrRename')
      })
  }

  @action
  turnOff = () => {
    this.pong = 0
  }

  @action
  toggle = () => {
    this.pong = this.pong === 0 ? 1 : 0
  }
}

export default Module
