import {useHttp} from '../hooks/http.hook'


const useMarvelService = () => {

    const {loading, request, error, clearError} = useHttp()

    const _baseOffset = 210;
    const _apiBase = "https://gateway.marvel.com:443/v1/public/"
    const _apiKey = "apikey=6a0307786b9b72c9814abc1377e28de7"

    const getAllCharacters = async (offset = _baseOffset, limit = 9) => {
        const res = await request(`${_apiBase}characters?limit=${limit}&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter)
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`)
        return _transformCharacter(res.data.results[0])
    }

    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`)
        return _transformCharacter(res.data.results[0])
    }

    

    const getAllComics = async (offset = 10) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`)
        return res.data.results.map(_transformComic)
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`)
        return _transformComic(res.data.results[0])
    }

    const _transformCharacter = (char) => {

        const descr = !char.description ? "Here is no description.." : char?.description;

        return {
            id: char.id,
            name: char.name,
            description: descr,
            thumbnail: char.thumbnail.path + "." + char.thumbnail.extension ,
            homepage:  char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    const _transformComic = (comic) => {

        const descr = !comic.description ? "Here is no description.." : comic.description;
    
        return {
            id: comic.id,
            title: comic.title,
            thumbnail: comic.thumbnail.path + "." + comic.thumbnail.extension,
            price: comic.prices[0].price,
            description: descr,
            pages: comic.pageCount
        }
    }

    return {loading, error,clearError, getAllCharacters, getCharacter, getAllComics, getComic, getCharacterByName}

}


export default useMarvelService;