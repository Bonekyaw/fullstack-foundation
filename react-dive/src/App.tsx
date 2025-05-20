import { useReducer, type FormEvent, type ChangeEvent } from "react";
import "./App.css";

type FormState = {
  name: string;
  city: string;
  salary: string;
};

type FormAction =
  | { type: "UPDATE_FIELD"; field: keyof FormState; value: string }
  | { type: "RESET" };

const initialState = {
  name: "",
  city: "",
  salary: "",
};

function formReducer(state: FormState, action: FormAction) {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value }; // {name, city, salary, name: "John"}
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export default function App() {
  const [formState, dispatch] = useReducer(formReducer, initialState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch({ type: "UPDATE_FIELD", field: name as keyof FormState, value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Call API or perform any action with the form data
    console.log("Submitted:");
    dispatch({ type: "RESET" });
  };

  return (
    <form onSubmit={handleSubmit} className="row">
      <input
        type="text"
        name="name"
        value={formState.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        type="text"
        name="city"
        value={formState.city}
        onChange={handleChange}
        placeholder="City"
      />
      <input
        type="text"
        name="salary"
        value={formState.salary}
        onChange={handleChange}
        placeholder="Salary"
      />
      <button type="submit">Update</button>
    </form>
  );
}
