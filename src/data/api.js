/**
 * Send a new set of data for the given module to the server
 *
 * @param {String} moduleId Identifier of the module
 * @param {Object} customData THe data to send
 */
function updateData(moduleIp, customData) {
  return new Promise((resolve /*, reject*/) => {
    // Simulate long-running renaming
    fetch(document.location.origin + '/api/data', {
      credentials: 'include',
      headers: { 'Xiot-forward-to': moduleIp },
      body: JSON.stringify(customData),
      method: 'POST'
    })
    // eslint-disable-next-line
    console.log(`Update custom data of '${moduleIp}' with '${JSON.stringify(customData)}'`)
    resolve()
  })
  // TODO: handle failure
}

function rename(moduleId, newName, oldName) {
  return new Promise((resolve /*, reject*/) => {
    // Simulate long-running renaming
    setTimeout(() => {
      // eslint-disable-next-line
      console.log(`Renaming '${moduleId}' from '${oldName}' to '${newName}'`)
      resolve()
    }, 2000)
  })
}

export default {
  updateData,
  rename
}
