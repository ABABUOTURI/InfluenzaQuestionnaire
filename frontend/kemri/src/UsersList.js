import React, { useEffect, useState } from "react";
import { fetchUsers } from "../utils/api"; // Adjust the path based on your folder structure

const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const data = await fetchUsers();
      setUsers(data);
    };
    getUsers();
  }, []);

  return (
    <div>
      <h2>Users List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.username}</li> // Adjust fields as per your API
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
