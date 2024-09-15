import {formatISO9075} from 'date-fns'
const Post = ({ title, summary, content, cover, createdAt, author }) => {
    return (
        <>
            <div className="post">
                <div>
                    <img
                        src={'http://localhost:3000/'+cover}
                        alt="post-img"
                    />
                </div>
                <div>
                    <h2>{title}</h2>
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