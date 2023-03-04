 const moment = require('moment')
 export default {
  install: app => {
    app.config.globalProperties.truncate = str => {
      return `${str.slice(0, 8)}...${str.slice(-6)}`
    }
    app.config.globalProperties.formatNumber = num => {
      return num.toLocaleString('en-US')
    }
    app.config.globalProperties.formatSize = (size, unit = true) => {
      if (size < 1000) return `${size}` + ' '
      else if (size >= 1000 && size < 10000) return (size / 1000).toFixed(2) + (unit ? ' K' : '')
      else if (size >= 10000 && size < 1000000) return (size / 1000).toFixed(2) + (unit ? ' K' : '')
      else if (size >= 1000000 && size < 1000000000) return (size / 1000000).toFixed(2) + (unit ? ' M' : '')
      else return (size / 1000000000).toFixed(2) + (unit ? ' G' : '')
    }
    app.config.globalProperties.formatDate = ts => {
      return moment(ts*1000).format('YYYY MMM DD')
    }
    app.config.globalProperties.formatTime = ts => {
      return moment(ts*1000).format('H:mm:ss')
    }
  }
}