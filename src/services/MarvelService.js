import { useHttp } from "../hooks/http.hook";



const useMarvelService = () => {
  const { loading, request, error, clearError } = useHttp()

  const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  const _publicKey = import.meta.env.VITE_MARVEL_API_KEY;
  // const _publicKey = "40ad5e34c59f99b7cf492065754a5e7d";


  const getAllCharacters = async (offset = 200) => {
    const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&apikey=${_publicKey}`);

    return res.data.results.map(_transformCharacter)
  }

  const getCharacter = async (characterId) => {
    const res = await request(`${_apiBase}characters/${characterId}?apikey=${_publicKey}`)

    return _transformCharacter(res.data.results[0]);
  }

  const getAllComics = async (limit = 8, offset = 0) => {
    const res = await request(`${_apiBase}/comics?noVariants=true&limit=${limit}&offset=${offset}&apikey=${_publicKey}`);
    return res.data.results.map(_transformComics)
  }

  const getComics = async (id) => {
    const res = await request(`${_apiBase}comics/${id}?apikey=${_publicKey}`);
    return _transformComics(res.data.results[0]);
  }

  const _transformComics = (comics) => ({
    id: comics.id,
    title: comics.title,
    description: comics.description || 'There is no description',
    pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
    thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
    language: comics.textObjects.language || 'en-us',
    price: comics.prices[0].price ? `${comics.prices[0].price}$` : 'not available'
  })


  const _transformCharacter = ({ name, description, thumbnail, urls, id, comics }) => ({
    name, id,
    description: description ? description.length >= 210 ? description.slice(0, 210) + "..." : description
      : "There is no description for this character",
    thumbnail: `${thumbnail.path}.${thumbnail.extension}`,
    homepage: urls[0].url,
    wiki: urls[1].url,
    comics: comics.items
  })

  return { loading, error, getAllCharacters, getCharacter, clearError, getComics, getAllComics }

}


export default useMarvelService