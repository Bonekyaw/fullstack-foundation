import "./App.css";

export default function App() {
  // const handleSubmit = (e: FormEvent) => {
  //   e.preventDefault();
  //   // Call API or perform any action with the form data
  //   const formData = new FormData(e.target as HTMLFormElement);
  //   // const name = formData.get("name");
  //   const data = Object.fromEntries(formData.entries()); // { name: "John", city: "New York", salary: 50000 }
  //   console.log("Form Data", data);
  // };

  const formAction = (formData: FormData) => {
    const data = Object.fromEntries(formData.entries());
    console.log("Form Data", data);
  };

  return (
    <form action={formAction} className="row">
      <input type="text" name="name" placeholder="Name" />
      <input type="text" name="city" placeholder="City" />
      <input type="text" name="salary" placeholder="Salary" />
      <button type="reset">Reset</button>
      <button type="submit">Update</button>
    </form>
  );
}
