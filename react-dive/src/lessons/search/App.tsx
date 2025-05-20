import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router";

import "./App.css";

const users = [
  { id: 1, name: "David Aung" },
  { id: 1, name: "Smith Aung" },
  { id: 1, name: "Aung Aung" },
  { id: 1, name: "Phone Nyo" },
  { id: 1, name: "Mi Nay" },
  { id: 1, name: "Mi Khant" },
];

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || ""; // abc.com/users/?search=aung
  const [inputValue, setInputValue] = useState(searchQuery);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (inputValue) {
        searchParams.set("search", inputValue);
      } else {
        searchParams.delete("search");
      }
      setSearchParams(searchParams);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [inputValue, searchParams, setSearchParams]);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Link to="/help">Go to other page</Link>
      <h3>Search Filter & Debouncing </h3>
      <input
        type="text"
        placeholder="Search users by name ..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      {/* <button type="submit">Search</button> */}
      <ul>
        {filteredUsers.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
