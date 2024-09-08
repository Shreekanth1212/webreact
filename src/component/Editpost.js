import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Editpost = ({ posts, handleEdit, editBody, setEditBody, editTitle, setEditTitle }) => {
  const { id } = useParams();
  const post = posts.find(post => post.id.toString() === id);

  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  }, [post, setEditTitle, setEditBody]);

  const onSubmit = (e) => {
    e.preventDefault();
    handleEdit(post.id); // Call handleEdit with the correct ID
  };

  return (
    <main>
      {post && (
        <>
          <h2>Edit post</h2>
          <form className="newPostForm" onSubmit={onSubmit}>
            <label htmlFor="postTitle">Title:</label>
            <input
              id="PostTitle"
              type="text"
              required
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <label htmlFor="postBody">Body:</label>
            <textarea
              id="PostBody"
              required
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
            />
            <button className="editButton" type="submit">Submit</button>
          </form>
        </>
      )}
    </main>
  );
};

export default Editpost;
