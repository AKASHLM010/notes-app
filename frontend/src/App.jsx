import { useEffect, useState } from 'react'
import axios from 'axios';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [notes, setNotes] = useState([]);

  async function addNote(){
    await axios({
      method: "post",
      url: "http://localhost:4500/add",
      data: {
        id: Math.random().toString(),
        title: title,
        content: content,
      },
    });
    setTitle("");
    setContent("");
    getNotes();
  }

  async function getNotes(){
    const response = await axios({
      method: "get",
      url: "http://localhost:4500/notes",
    });
    setNotes(response.data.data);
  }

  useEffect(()=>{
    getNotes();
  },[]);

  return (
    <>
      <div className="form">
        <input
        value={title}
        onChange={(e)=>{
          setTitle(e.target.value);
        }}
        type="text"
        placeholder='Title'
        />
        <input value={content} onChange={(e)=>{setContent(e.target.value)}}
        type="text"
        placeholder='Content'
        />
        <button onClick={addNote}>Add</button>

      </div>

      <div className="notes">
        {
          notes.map((element)=>{
            return (
            <div key={element.id}>
              <h2>{element.title}</h2>
              <p>{element.content}</p>
              </div>
            )
          })
        }
       
      </div>
    </>
  )
}

export default App
