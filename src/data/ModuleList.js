import { observable, action, computed } from 'mobx'

class ModuleList {
  @observable
  modules = []
  @computed
  get enabledModulesCount() {
    return this.modules.filter(s => s.pong).length
  }

  @action
  allOff() {
    this.modules.forEach(module => module.turnOff())
  }
}

export default ModuleList
