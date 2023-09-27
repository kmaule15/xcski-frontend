import { useState } from "react";

const CreateTrail = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [length, setLength] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [typesAllowed, setTypesAllowed] = useState("");

  return (
    <form>
      <label>Create Your Trail</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </form>
  );
};

export default CreateTrail;
