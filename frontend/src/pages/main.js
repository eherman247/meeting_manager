import ReactPlayer from "react-player";

const Home = () => {
  return (
    <>
      <h1>Welcome to Meeting Manager</h1>
      <h2>App Tutorial</h2>
      <p>
        Below is a brief video of how to use the app, if it is your first time
        trying it out I highly recommend watching it to get a quick overview of
        how the app works.
      </p>
      <ReactPlayer
        src="https://youtu.be/rjUZQv-auOI"
        controls={true}
        width="300px"
        height="300px"
        playing={false}
      />
    </>
  );
};

export default Home;
