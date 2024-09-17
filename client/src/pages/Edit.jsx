import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Editor from '../components/Editor';

const Edit = () => {
  const { id } = useParams();

  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [content, setContent] = useState('')
  const [files, setFiles] = useState('')
  const [redirect, setredirect] = useState(false)
  const [postId, setPostId] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/post/${id}`).then(res => {
      res.json().then(postDoc => {
        setTitle(postDoc.title);
        setSummary(postDoc.summary);
        setContent(postDoc.content);
        setFiles(postDoc.files);
        setPostId(postDoc._id);
      })
    })
  }, [])

  const updatePost = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.set('title', title)
    data.set('summary', summary)
    data.set('content', content)
    data.set('id', postId)
    
    if(files?.[0]){
      data.set('file', files?.[0])
    }
    console.log(files?.[0], title, summary, content);
    console.log(data);

    const res = await fetch('http://localhost:3000/post/', {
      credentials: 'include',
      method: 'PUT',
      body: data
    })

    if (res.ok) {
      setredirect(true)
    }
  }

  if (redirect) {
    return <Navigate to={`/post/${id}`} />
  }

  return (
    <form className="create-post-form" onSubmit={updatePost}>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" placeholder="Enter title" value={title} onChange={e => setTitle(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="summary">Summary</label>
        <input type="text" id="summary" name="summary" placeholder="Enter summary" value={summary} onChange={e => setSummary(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="picture">Picture</label>
        <input type="file" id="picture" name="picture" onChange={e => setFiles(e.target.files)} />
      </div>
      <div className="form-group">
        <label htmlFor="content">Content</label>
        <Editor value={content} onChange={setContent} />
      </div>
      <button type="submit">Update Post</button>
    </form>
  );
};

export default Edit;