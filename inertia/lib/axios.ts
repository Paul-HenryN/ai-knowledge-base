import Axios from 'axios'

export const axios = Axios.create({
  withXSRFToken: true,
})
