/* eslint-disable strict */

const caller = require('caller-id')
const internals = {}
const format = process.env['LOG_FORMAT'] || 'json'

internals.log = function log (level, id, file, msg, err) {
  if (process.env.NODE_ENV !== 'test') {
    if (format === 'string') {
      console.log('%s %s %s %s: %s %s',new Date().getTime(), level, id, file, msg, err)  // eslint-disable-line no-console
    } else {
      const logObj = {
        timestamp: new Date().getTime(),
        logLevel: level,
        class: file,
        id: id,
        msg: msg,
        error: err ? err.toString() : err
      }
      if (err) {
        if (err instanceof Error) {
          logObj.error = err ? err.toString() : err
        } else {
          logObj.error = JSON.stringify(err)
        }
      }
      console.log(JSON.stringify(logObj)) // eslint-disable-line no-console
    }
  }
}

internals.getFile = function getFile (callerInfo) {
  const file = callerInfo.filePath.split('/').pop().slice(0, -3)
  return file
}

exports.info = function info (id, msg) {
  const file = internals.getFile(caller.getData())
  internals.log('INFO', id, file, msg)
}

exports.err = function err (id, msg, err) {
  const file = internals.getFile(caller.getData())
  internals.log('ERROR', id, file, msg, err)
}

exports.fatal = function fatal (id, msg, err) {
  const file = internals.getFile(caller.getData())
  internals.log('FATAL', id, file, msg, err)
}
