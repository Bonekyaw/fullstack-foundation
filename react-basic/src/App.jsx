import Greeting from "./components/Greeting";
import TabButton from "./components/TabButton";
import "./App.css";

function App() {
  const user = { name: "David", age: 38 };
  const brands = ["Apple", "Samsung", "Huawei", "Sony", "Nokia"];
  const onClickHandler = (name) => {
    alert(`Hello ${name}`);
  };

  return (
    <>
      <Greeting {...user} />
      <p>This is a paragraph from App.js</p>
      <TabButton onClick={() => onClickHandler("Mr. Phone Nyo")}>
        <p>Sign Up</p>
      </TabButton>
      {brands.map((brand) => (
        <p key={brand}>{brand}</p>
      ))}
    </>
  );
}

export default App;
