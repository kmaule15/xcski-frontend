import Trail from "../MapComponent";

const MyTrails = () => {
  return (
    <>
      <p>A list of my trails</p>
      <Trail latitude={undefined} longitude={undefined} zoom={0} />
    </>
  );
};

export default MyTrails;
