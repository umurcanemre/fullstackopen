import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = (newToken) => token = newToken

const getAll = async () => {
    const resp = await axios.get(baseUrl)
    return resp.data
}
const createBlog = async newBlog => {
    const config = {
        headers: { Authorization: "Bearer " + token }
    }
    const resp = await axios.post(baseUrl, newBlog, config)
    return resp.data
}

const likeBlog = async (blog) => {
    const config = {
        headers: { Authorization: "Bearer " + token }
    }
    const resp = await axios.put(baseUrl, {...blog, likes: blog.likes +1, user:blog.user.id }, config)
    return resp.data
}

const deleteBlog = async (blog) => {
    const config = {
        headers: { Authorization: "Bearer " + token }
    }
    const resp = await axios.delete(baseUrl+"/"+blog.id, config)
    return resp.data
}

export default { getAll, setToken, createBlog, likeBlog, deleteBlog }