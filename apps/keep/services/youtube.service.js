import { utilService } from '../../../services/util.service.js'

export const youtubeService = {
  getYoutubeTopRes,
}
const STORAGE_KEY = 'youtubeDB'

const API_KEY = 'AIzaSyD9_iqARjy74PqkjSJM0Nco0qyDUp41gHA'

function getYoutubeTopRes(value) {
  const youtube = utilService.loadFromStorage(STORAGE_KEY) || {}
  if (youtube[value]) return Promise.resolve(youtube[value])
  return axios
    .get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${API_KEY}&q=${value}`
    )
    .then((res) => {
      const videoId = res.data.items[0].id.videoId
      youtube[value] = videoId
      utilService.saveToStorage(STORAGE_KEY, youtube)
      return videoId
    })
    .catch((err) => {
      console.log('err: ', err)
      throw 'Had a problem'
    })
  // .finally(() => {
  //   console.log('Finally!')
  // })
}
// const API_KEY = 'AIzaSyCIKkbmX5MtzvJ3OU-Pb-MHecqk0W7zVe0'
