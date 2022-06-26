import React from 'react'
import { useParams, Link } from 'react-router-dom/cjs/react-router-dom.min'
import { useEffect, useState } from 'react/cjs/react.development'
import useMarvelService from '../../services/marvel-service'
import Spinner from '../../components/spinner/spinner'
import ErrorIndicator from '../../components/errorIndicator/errorIndicator'
import SingleComic from '../singleComic/SingleComic'

const SingleComicPage = () => {
    const {id} = useParams()

    return (
        <SingleComic id = {id} />
    )
}

export default SingleComicPage