import React from 'react'
import {IMG_CDN_URL} from "./utils/constants"

const MovieCard = ({posterPath}) => {
  if(!posterPath) return null
  return (
    <div className="min-w-[80px] max-w-[80px] md:min-w-[160px] mr-2">
        <img className="rounded-md w-full h-auto" src={IMG_CDN_URL + posterPath} alt='Movie Card' />
    </div>
  )
}

export default MovieCard