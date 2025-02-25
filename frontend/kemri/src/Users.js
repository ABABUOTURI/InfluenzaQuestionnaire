import React, { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/users/") // Django API URL
      .then((response) => {
        console.log(response.data); // Debugging
        setUsers(response.data);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  return (
    <div>
      <h2>Users List</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.username} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
