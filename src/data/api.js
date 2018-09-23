/**
 * Send a new set of data for the given module to the server
 *
 * @param {String} moduleId Identifier of the module
 * @param {Object} customData THe data to send
 */
function updateData(moduleIp, customData) {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line
    console.log(
      `Update custom data of '${moduleIp}' with '${JSON.stringify(customData)}'`
    )
    if (process.env.NODE_ENV === 'development') {
      setTimeout(() => {
        resolve()
      }, 2000)
    } else {
      // Simulate long-running renaming
      fetch(document.location.origin + '/api/data', {
        credentials: 'include',
        headers: { 'Xiot-forward-to': moduleIp },
        body: JSON.stringify(customData),
        method: 'POST'
      })
        .then(postData => {
          resolve(postData)
        })
        .catch(e => reject(e))
    }
  })
}

function rename(moduleIp, newName, oldName) {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line
    console.log(`Renaming '${moduleIp}' from '${oldName}' to '${newName}'`)

    if (process.env.NODE_ENV === 'development') {
      setTimeout(() => {
        resolve()
      }, 2000)
    } else {
      fetch(document.location.origin + '/api/rename', {
        credentials: 'include',
        headers: { 'Xiot-forward-to': moduleIp },
        body: `{"name":"${newName}"}`,
        method: 'POST'
      })
        .then(postData => {
          resolve(postData)
        })
        .catch(e => reject(e))
    }
  })
}

export default {
  updateData,
  rename
}
