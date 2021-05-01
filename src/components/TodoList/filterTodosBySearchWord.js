   
import MiniSearch from 'minisearch'

const SEARCH_CONFIG = 
{ 
    fuzzy: 0.2, 
    boost: { name: 2 }
}

export default (todos, searchWord = '') =>
{
    if(searchWord == null) return todos
    if(searchWord.length === 0) return todos

    const miniSearch = new MiniSearch(
    {
        fields: ['name', 'description'], 
        storeFields: ['name', 'description', 'tasks']
    })

    miniSearch.addAll(todos)

    const searchResult = miniSearch.search(searchWord, SEARCH_CONFIG)

    return searchResult
}    