import './App.css';
import About from './component/About';
import Footer from './component/Footer';
import Header from './component/Header';
import Home from './component/Home';
import Missing from './component/Missing';
import Nav from './component/Nav';
import Newpost from './component/Newpost';
import Postpage from './component/Postpage';

import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import './component/com.css';
import { format } from 'date-fns';
import Api from"./Api/post"
import Editpost from './component/Editpost';


function App() {
useEffect(()=>{
  const fetchPosts=async()=>{
    try{
      const response=await Api.get('./posts')
      setPosts(response.data||[]);
      console.log(response.data);

    }
    catch(err){
      if(err.response){
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
        
      }
      else{
        console.log(`Error:${err.message}`);
      }
    }
  }
  fetchPosts();
},[])






  const [posts, setPosts] = useState(
   []
  );

  const [search, setSearch] = useState(""); // Removed extra space initialization
  const [searchResult, setSearchResult] = useState([]); // Corrected initial state to empty array
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');

  const navigate=useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Generate new post ID
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    
    // Format current date and time
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
  
    // Create new post object
    const newPost = { id, title: postTitle, datetime, body: postBody };
  
    try {
      // Send POST request to the server to create new post
      const response = await Api.post('/posts', newPost);
      
      // Assuming response.data contains the newly created post
      const createdPost = response.data;
      
      // Update state with the new list of posts
      setPosts([...posts, createdPost]);
  
      // Clear form fields
      setPostTitle('');
      setPostBody('');
  
      // Navigate back to home page
      navigate('/');
    } catch (err) {
      console.error(`Failed to create post: ${err.message}`);
    }
  };
  
  const handleDelete = async(id) => {
    try{
      await Api.delete(`posts/${id}`)
    setPosts(posts.filter(post => post.id !== id));
   navigate('/');}catch(err){
    console.log(err.message);

   } };

  
  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatePost = { id, title: editTitle, datetime, body: editBody };
    try {
      const response = await Api.put(`/posts/${id}`, updatePost);
      setPosts(posts.map(post => post.id === id ? { ...response.data } : post));
      setEditTitle('');
      setEditBody('');
      navigate('/');
    } catch (err) {
      console.log(err.message);
    }
  };
  
 

 
useEffect(() => {
  const filterResult = posts.filter((post) => {
    // Check if post.title and post.body are defined and are strings
    const postTitle = post.title ? post.title.toLowerCase() : '';
    const postBody = post.body ? post.body.toLowerCase() : '';

    return postBody.includes(search.toLowerCase()) || postTitle.includes(search.toLowerCase());
  });

  setSearchResult(filterResult.reverse());
 
}, [posts, search]);




  return (
    <div className='App'>
      <Header title="SK WEB" />
      <Nav search={search} setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<Home post={searchResult} />} />
        <Route path="post" 
        element={
          <Newpost
            setPostBody={setPostBody}
            setPostTitle={setPostTitle}
            handleSubmit={handleSubmit}
            postBody={postBody}
            postTitle={postTitle}
          />

        } />

      <Route path="edit/:id" element={<Editpost  posts={posts} handleEdit={handleEdit}editBody={editBody}setEditBody={setEditBody}editTitle={editTitle}setEditTitle={setEditTitle}/>}/>

          
        <Route path="post/:id" element={<Postpage post={posts} handleDelete={handleDelete} />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<Missing />} /> {/* Catch-all route for 404 */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
