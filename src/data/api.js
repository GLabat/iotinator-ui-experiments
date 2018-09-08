/**
 * Send a new set of data for the given module to the server
 *
 * @param {String} moduleId Identifier of the module
 * @param {Object} customData THe data to send
 */
function updateData(moduleId, customData) {
  // PUT <iotinaot>/api/data {<custom_data>}, headers:{"Xiot-forward-to": model.__ip}
  // fetch('http://www.iotinator.com/debug.htmlapi/data', {
  //   credentials: 'include',
  //   headers: {},
  //   referrer: 'http://www.iotinator.com/debug.html',
  //   referrerPolicy: 'no-referrer-when-downgrade',
  //   body: '{"level":"46","id":"M5c_cf_7f_24_7a_ef"}',
  //   method: 'PUT',
  //   mode: 'cors'
  // })

  // eslint-disable-next-line
  console.log(
    `Update custom data of '${moduleId}' with '${JSON.stringify(customData)}'`
  )
}

function rename(moduleId, newName, oldName) {
  // eslint-disable-next-line
  console.log(`Renaming '${moduleId}' from '${oldName}' to '${newName}'`)
}

export default {
  updateData,
  rename
}
