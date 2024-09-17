import { formatISO9075 } from 'date-fns'
import { Link } from 'react-router-dom'
const Post = ({ title, summary, content, cover, createdAt, author, _id }) => {
    return (
        <>
            <div className="post">
                <Link to={`/post/${_id}`}>
                    <div>
                        <img
                            src={'http://localhost:3000/' + cover}
                            alt="post-img"
                        />
                    </div>
                </Link>
                <div>
                    <Link to={`/post/${_id}`}>
                        <h2>{title}</h2>
                    </Link>
                    <div className="info">
                        <span className="author">@{author.username}</span>
                        <span className="date">{formatISO9075(new Date(createdAt))}</span>
                    </div>
                    <p>{summary}
                    </p>
                </div>
            </div>
        </>
    )
}

export default Post