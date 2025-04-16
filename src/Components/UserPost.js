

const UserPost = ({post}) => {
  return (
    <div className="userPost">
      <h2>{post.title}</h2>
      <p>{post.textBody}</p>
      <h6>Made by {post.username}</h6>
    </div>
  )
}

export default UserPost
