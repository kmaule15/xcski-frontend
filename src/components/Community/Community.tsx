import PostsList from "./Posts/PostList";
import "./Community.css";
import EventsList from "./Events/EventList";
import MyEvents from "./Events/MyEvents";
import "../Login/BackgroundSquares.css";

const Community = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-3 rounded-left">
          <h2>Events</h2>
          <EventsList />
        </div>
        <div className="col-md-4 rounded-middle">
          <h2>Posts</h2>
          <PostsList />
        </div>
        <div className="col-sm-3 rounded-right right-column">
          <MyEvents />
        </div>
      </div>
      <div className="squares-background"></div>
    </div>
  );
};

export default Community;
