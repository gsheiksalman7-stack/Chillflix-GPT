import React from 'react'
import {IMG_CDN_URL} from "./utils/constants"

const MovieCard = ({posterPath}) => {
  if(!posterPath) return null
  return (
    <div className="min-w-[100px] max-w-[100px] md:min-w-[200px] mr-4">
        <img className="rounded-lg" src={IMG_CDN_URL + posterPath} alt='Movie Card' />
    </div>
  )
}

export default MovieCard