
import axios from 'axios'
import joinURL from 'url-join'

const SERVER_URL = 'http://localhost:3000'
const PATH = 'todo_list'


export async function postTodo(payload)
{
    const url = joinURL(SERVER_URL, PATH)

    return await axios
        .post(url, payload)
        .then(res => res.data)
}

export async function getTodoList()
{
    const url = joinURL(SERVER_URL, PATH)

    return await axios
        .get(url)
        .then(res => res.data)
}

export async function getTodo(todoId)
{
    const todoIdAsString = todoId.toString()
    const url = joinURL(SERVER_URL, PATH, todoIdAsString)

    return await axios
        .get(url)
        .then(res => res.data)
}

export async function deleteTodo(todoId)
{
    const todoIdAsString = todoId.toString()
    const url = joinURL(SERVER_URL, PATH, todoIdAsString)

    await axios
        .delete(url)
        .then(res => res.data)
}

export async function updateTodo(todoId, payload)
{
    const todoIdAsString = todoId.toString()
    const url = joinURL(SERVER_URL, PATH, todoIdAsString)

    return await axios
        .put(url, payload)
        .then(res => res.data)
}