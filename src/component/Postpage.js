import React from 'react'
import { useParams,Link} from 'react-router-dom'



const Postpage = ({post,handleDelete}) => {
  const{id}=useParams();
  const postt=post.find(post=>(post.id).toString()===id);
  return (
 <main className='PostPage'>
 <article className='post'>
 {
  postt&&<>
  <h2>{postt.title}</h2>
  <p className='postDate'>{postt.datetime}</p>
  <p className='postBody'>{postt.body}</p>
  <button className='deleteButton' onClick={()=>handleDelete(postt.id)}>delete post</button>
  <Link to={`/edit/${postt.id}`}><button className='editButton' 
  >Edit post</button></Link>
  </>
 }
 {
  !postt &&
<>
<h2>page not found</h2></> }
 
 
 </article>
 </main>
  )
}

export default Postpage