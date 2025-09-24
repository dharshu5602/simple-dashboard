import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css"; 

function App() {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);

  // Fetch Users
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  // Fetch Tasks
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos?_limit=5")
      .then((res) => setTasks(res.data))
      .catch((err) => console.error("Error fetching tasks:", err));
  }, []);

  const today = new Date().toLocaleDateString();

  return (
    <div className="dashboard-bg">
      
      <nav className="navbar navbar-expand-lg shadow-sm custom-navbar">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold fs-4 text-light" href="/">
             My Dashboard
          </a>
          <span className="navbar-text text-light fw-semibold">{today}</span>
        </div>
      </nav>

      <div className="container mt-4">
      
        <section className="row mb-4">
          <div className="col-md-4 mb-3">
            <div className="card stat-card bg-gradient-info text-white">
              <div className="card-body">
                <h5 className="card-title">Total Users</h5>
                <p className="display-6 fw-bold">{users.length}</p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card stat-card bg-gradient-success text-white">
              <div className="card-body">
                <h5 className="card-title">Completed Tasks</h5>
                <p className="display-6 fw-bold">12</p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card stat-card bg-gradient-warning text-dark">
              <div className="card-body">
                <h5 className="card-title">Pending Tasks</h5>
                <p className="display-6 fw-bold">5</p>
              </div>
            </div>
          </div>
        </section>

        
        <section className="mb-5">
          <h2 className="mb-3 text-primary"> Users</h2>
          <div className="table-responsive shadow-sm rounded-3">
            <table className="table table-hover align-middle">
              <thead className="table-gradient text-white">
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Company</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user.id}>
                      <td className="fw-semibold">{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{user.company?.name}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center text-muted">
                      Loading users...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        
        <section>
          <h2 className="mb-3 text-success"> Tasks</h2>
          <ul className="list-group shadow-sm">
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <li
                  key={task.id}
                  className={`list-group-item d-flex justify-content-between align-items-center task-item ${
                    task.completed ? "task-done" : ""
                  }`}
                >
                  <div>
                    <input
                      type="checkbox"
                      className="form-check-input me-2"
                      defaultChecked={task.completed}
                    />
                    {task.title}
                  </div>
                  {task.completed && (
                    <span className="badge bg-success rounded-pill">Done</span>
                  )}
                </li>
              ))
            ) : (
              <li className="list-group-item text-muted">Loading tasks...</li>
            )}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default App;
