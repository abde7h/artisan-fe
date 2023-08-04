import { useEffect, useState } from "react"

const PostsList = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetch("https://randomuser.me/api/?results=100")
            .then(async res => await res.json())
            .then(res => {
                setUsers(res.results)
            })
            .catch(err => {
                console.error(err)
            })
    }, [])

    

    return (
        <h1>Post List</h1>
    )
}

export default PostsList