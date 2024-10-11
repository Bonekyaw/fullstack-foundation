/* eslint-disable react/prop-types */
const Greeting = ({ name, age }) => {
  return (
    <>
      <h1>Hello {name} </h1>
      {age && <p>Your age is {age}</p>}
    </>
  );
};

// Greeting.propTypes = {name: String, age: Number};

export const color = "green";
export const size = 28;

export default Greeting;
