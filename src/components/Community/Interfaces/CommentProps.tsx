interface CommentProps{
    //if null, anonymous, otherwise get from username
    creatorName: string; 
    commentText: string;
    //Date represents both date and time in typescript
    postTime: Date;
  }
  
  export default CommentProps;