import { useEffect, useState } from 'react';
import Post from '../components/Post';

const Home = () => {
    
    const [posts, setPosts] = useState([])

    useEffect(() => {
        fetch('http://localhost:3000/posts').then(res => {
            res.json().then(psts => setPosts(psts));
        })
    }, [])

    return (
        <>
            <section>
                {posts.length > 0 && posts.map(post => (
                    <Post {...post} />
                ))}
            </section>
        </>
    )
}

export default Home