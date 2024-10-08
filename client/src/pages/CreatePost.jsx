import { useState } from 'react';
import {Navigate} from 'react-router-dom';
import Editor from '../components/Editor';

const CreatePost = () => {

    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [content, setContent] = useState('')
    const [files, setFiles] = useState('')
    const [redirect, setredirect] = useState(false)

    const createNewPost = async (e) => {
        const data = new FormData();
        data.set('title', title)
        data.set('summary', summary)
        data.set('content', content)
        data.set('file', files[0])
        console.log(files[0], title, summary,content);
        console.log(data);
        e.preventDefault()
        const res = await fetch('http://localhost:3000/createpost', {
            credentials: 'include',
            method:'post',
            body: data
        })

        if(res.ok){
            setredirect(true)
        }
    }

    if(redirect){
        return <Navigate to={'/'} />
    }

    return (
        <form className="create-post-form" onSubmit={createNewPost}>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title" placeholder="Enter title" value={title} onChange={e => setTitle(e.target.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="summary">Summary</label>
                <input type="text" id="summary" name="summary" placeholder="Enter summary" value={summary} onChange={e => setSummary(e.target.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="picture">Picture</label>
                <input type="file" id="picture" name="picture" onChange={e => setFiles(e.target.files)}/>
            </div>
            <div className="form-group">
                <label htmlFor="content">Content</label>
                {/* id="content" name="content"  */}
                {/* <ReactQuill modules={modules} formats={formats} value={content} onChange={newContent => setContent(newContent)}/> */}
                <Editor value={content} onChange={setContent} />
            </div>
            <button type="submit">Create Post</button>
        </form>
    );
};

export default CreatePost;