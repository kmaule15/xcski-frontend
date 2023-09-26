import CommentProps from "./CommentProps";

interface PostProps {
    //for url for getting post later
    id: number;
    title: string;
    //TO-DO: string for now, chnage to user after creating user interface
    creatorName: string;
    //description could be first few lines of text? maybe redundancy
    description?: string;
    text: string;
    comments: CommentProps[];
    postTime: Date;
  }
  export default PostProps;