import MapComponent, { Trail } from '../MapComponent'

const MyTrails = () => {
  return (
    <>
      <p>A list of my trails</p>
      <MapComponent latitude={undefined} longitude={undefined} zoom={0} setSelectedTrail={function (trail: Trail | null): void {
        throw new Error("Function not implemented.");
      } } />
    </>
  );
};

export default MyTrails;
