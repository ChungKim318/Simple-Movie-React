import axios from 'axios'

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MjlmMzMxZDNlMzExOWFhYTdhZmZhZGI1OWQ5ODUyNSIsIm5iZiI6MTc1NDkwNTE1My43NTcsInN1YiI6IjY4OTliYTQxYTEwMGZmZmYyMDVkMTM2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.d_82KmhkH1YfisjCwXl7F5TS7Hd_uM5qGGGh9Zv671k',
  },
}

const END_POINT = 'https://api.themoviedb.org/3/movie'
// const API_KEY = '729f331d3e3119aaf7affadb59d98525'

// fetch(
//   'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1',
//   options
// )
//   .then(res => res.json())
//   .then(res => console.log(res))
//   .catch(err => console.error(err))

export const fetcher = url => axios(url, options).then(res => res.data)

export const tmdbAPI = {
  getMovieList: type => `${END_POINT}/${type}?language=en-US&page=1`,
  getBanner: () => `${END_POINT}/upcoming?language=en-US&page=1`,
  getMovieWithPage: (type, page) => {
    const res = `${END_POINT}/${type}?language=en-US&page=${page}`
    return res
  },
  searchMovie: (query, page) => {
    const res = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`
    return res
  },
  getMovieDetail: movieId => {
    const res = `${END_POINT}/${movieId}?language=en-US`
    return res
  },
  getMovieMeta: (movieId, type) => {
    const res = `${END_POINT}/${movieId}/${type}?language=en-US`
    return res
  },
  imageOriginal: path => {
    const res = `https://image.tmdb.org/t/p/original/${path}`
    return res
  },
  image500: path => {
    const res = `https://image.tmdb.org/t/p/w500/${path}`
    return res
  },
}
