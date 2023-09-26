import { useCallback, useEffect, useRef, useState } from "react";
import PostProps from "./Interfaces/PostProps";

type BareBonesPost ={
  title: string;
  creatorName: string;
  description?: string;
  date: string;
}

//redo to use Post and Comment
const Community = () => {
  const ppl: BareBonesPost[]= [{
    title: "Test Post",
    creatorName: "Post Creator Name",
    description: "description",
    date: "22 March, 2019 12:45PM"
  },
    {
      title: "Test Post",
      creatorName: "Anonymous",
      date: "22 December, 2023 12:45PM"
    }
  ];
  const [posts, setPosts]= useState<BareBonesPost[]>(ppl);
  return (<>
  <h1>Community</h1>
  {posts.map(p => 
  <div>
    <h4>{p.title}</h4>
    <p>by {p.creatorName} on {p.date}</p>
    <p>description</p>
    <a></a>
  </div>

    )}
  </>);
};

export default Community;
