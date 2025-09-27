import React from 'react'

const MovieCard = () => {
  return (
    <div className="p-3 rounded-lg movie-card bg-slate-800">
      <img
        src="https://photo.znews.vn/w660/Uploaded/xbhunku/2019_03_28/avengersendgamepostertophalf.jpg"
        alt=""
        className="w-full h-[250px] rounded-lg object-cover mb-5"
      />
      <h3 className="mb-3 text-xl font-bold ">Spider man: Home coming</h3>
      <div className="flex items-center justify-between mb-10 text-sm opacity-50">
        <span>2017</span>
        <span>7.4</span>
      </div>
      <button className="w-full px-6 py-3 capitalize rounded-lg bg-primary">
        Watch now
      </button>
    </div>
  )
}

export default MovieCard
