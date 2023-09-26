import PostProps from "./Interfaces/PostProps";

const Post = (pp: PostProps) : JSX.Element => {
    function checkAnon(name: string | undefined): string{
        if(name===undefined || name===null){
            return "Anonymous"
        }
        return name;
    }
    return(<>
    <h1>{pp.title}</h1>
    <h3>By {checkAnon(pp.creatorName)} on {pp.postTime.toLocaleDateString()+pp.postTime.toLocaleTimeString()}</h3>
    <p>{pp.text}</p>
    {pp.comments.map(c => c)}
    </>);
};
  
  export default Post;
  