import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router'

function Poster() {

    const navigate = useNavigate(); // uses navigate hook
    const location = useLocation(); // uses location hook

    const [title, setTitle] = useState(''); //stores the title user input
    const [textBody, setTextBody] = useState(''); //stores the body user input

    const post = { username : location.state.user , title, textBody}; //creates an object using the user's username and the title and body if their post
    

    const handleSubmit = (e) => {
      e.preventDefault(); //prevents the page from refreshing on submit
      console.log(post)
      fetch("http://localhost:8000/newPost", { //makes a request to the API
          method: "POST", //specifies that the request is a POST HTTP request
          headers: {"Content-Type": "application/json"}, //specifies that the body, or payload, is a JSON string
          body: JSON.stringify(post)//turns the Javascript object into a JSON string and is specified as the main body of the POST request, to be added to the JSON file
        }).then(() => { 
          navigate("/mainPage" , {state : {user : location.state.user}}); //takes the user back to the main page.
        })
      
    }

  return (
    <div>
      <div className = "mainPageHeader">
        <h2 className = "logo" onClick={ () => navigate("/mainPage", {state : {user : location.state.user}}) }>Maskd</h2>
    </div>
      <div className = 'newPostContainer'>
        <form className = 'newPostForm' onSubmit={handleSubmit}>
            <div id='postTitle'>
                <label>
                    Title: 
                </label>
                <input
                type = "text"
                required
                value = {title}
                onChange = {(e) => setTitle(e.target.value.substring( 0 , 140 )/* sets character limit to 140 characters */)}
                />
            </div>
            <div id='postBody'>
                <label>
                    Body: 
                </label>
                <textarea
                rows = "8"
                cols = "60"
                value = {textBody}
                onChange = {(e) => setTextBody(e.target.value.substring( 0 , 1700 )/* sets character limit to 1700 characters */)}
                />
            </div>
            <button>Make Post</button>
        </form>
      </div>
    </div>
  )
}

export default Poster
