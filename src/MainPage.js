import './App.css';
import { useLocation, useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import UserPost from './Components/UserPost';

function MainPage() {
  
  const location = useLocation();
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/displayPosts') //makes a fetch request to the specified path
      .then(res => {
        return res.json() //any objects found are returned
      })
      .then(data => { //any objects returned are put in the data array
        setPosts(data) //the data array is saved to the posts state
      }) 
  } , [])



  return (
    <div>
      <div className="mainPageHeader">
          <h2>Welcome, {location.state.user}</h2>
          <button onClick={ () => navigate("/poster", {state : {user : location.state.user}}) }>+</button>
      </div>
      <div className='mainPageBody'>
          {posts.map((post) => ( //every item(post) in the posts array is passed through a UserPost component.
            <UserPost key = {post.id} post = {post} /> 
          ))}
      </div>
    </div>
  );
}

export default MainPage;