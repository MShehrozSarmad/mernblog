const Post = () => {
    return (
        <>
            <div className="post">
                <div>
                    <img
                        src="https://images.unsplash.com/photo-1724127902295-b2f5ba9a2b20?q=80&w=1856&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="post-img"
                    />
                </div>
                <div>
                    <h2>Test Post Lorem, ipsum dolor.</h2>
                    <div className="info">
                        <span className="author">@sheri</span>
                        <span className="date">09-13-2024</span>
                    </div>
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                        Incidunt amet, pariatur assumenda sint odit animi voluptates
                        magni dolorum quae, repudiandae repellendus rerum labore
                        praesentium dolor?
                    </p>
                </div>
            </div>
        </>
    )
}

export default Post