import axios from 'axios'

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MjlmMzMxZDNlMzExOWFhYTdhZmZhZGI1OWQ5ODUyNSIsIm5iZiI6MTc1NDkwNTE1My43NTcsInN1YiI6IjY4OTliYTQxYTEwMGZmZmYyMDVkMTM2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.d_82KmhkH1YfisjCwXl7F5TS7Hd_uM5qGGGh9Zv671k',
  },
}

// fetch(
//   'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1',
//   options
// )
//   .then(res => res.json())
//   .then(res => console.log(res))
//   .catch(err => console.error(err))

export const fetcher = url => axios(url, options).then(res => res.data)
