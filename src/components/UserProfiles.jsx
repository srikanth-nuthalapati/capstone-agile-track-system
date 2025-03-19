import React, { use, useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import '../styles/profile.css';

export default function UserProfiles() {
    const [users, setUsers] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [newUserName, setNewUserName] = useState('');
    const [newUserEmail, setNewUserEmail] = useState('');
    const [newUserPassword, setNewUserPassword] = useState('');
    const [newUserRole, setNewUserRole] = useState('employee'); 
    const { user } = useContext(UserContext);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/users');
                if (user?.role === 'admin') {
                    setUsers(response.data.filter(user => user?.role !== 'admin'));
                }
                else {
                    setSelectedUser(user);
                    fetchTasks(user?.id);
                }
            }
            catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, [user])

    const fetchTasks = async (id) => {
        try {
            const response = await axios.get(`http://localhost:3000/tasks?assignedTo=${id}`);
            setTasks(response.data);
        }
        catch (error) {
            console.error('Error fetching tasks:', error);
        }
    }

    const handleGetHistory = (userId) => {
        setSelectedUser(users.find(user => user?.id === userId));
        fetchTasks(userId);
    };

    const handleAddUser = async (event) => {
        event.preventDefault();

        try {
            await axios.post('http://localhost:3000/users', {
                name: newUserName,
                email: newUserEmail,
                password: newUserPassword,
                role: newUserRole,
            });

            const updatedUsers = await axios.get('http://localhost:3000/users');
            setUsers(updatedUsers.data.filter(user => user?.role !== 'admin'));
            setShowForm(false);
            setNewUserName('');
            setNewUserEmail('');
            setNewUserPassword('');
            setNewUserRole('employee');
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

  return (
    <div className='userProfile-container'>
        <h2>User Profiles</h2>
        {user?.role === 'admin' && (
            <div>
                <button onClick={() => setShowForm(!showForm)}>
                    {showForm ? 'cancel' : 'Add New User'}
                </button>
                {showForm && (
                    <form onSubmit={handleAddUser}>
                        <div>
                            <label>Name:</label>
                            <input 
                                type="text" 
                                value={newUserName}
                                onChange={(e) => setNewUserName(e.target.value)} 
                                required
                            />
                        </div>

                        <div>
                            <label>Email:</label>
                            <input 
                                type="email" 
                                value={newUserEmail}
                                onChange={(e) => setNewUserEmail(e.target.value)} 
                                required
                            />
                        </div>

                        <div>
                            <label>Password:</label>
                            <input 
                                type="password" 
                                value={newUserPassword}
                                onChange={(e) => setNewUserPassword(e.target.value)} 
                                required
                            />
                        </div>

                        <div>
                            <label>Role:</label>
                            <select 
                                value={newUserRole}
                                onChange={(e) => setNewUserRole(e.target.value)}
                                required
                            >
                                <option value="employee">Employee</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>

                        <button type='submit'>Create User</button>
                    </form>
                )}

                <ul>
                    {users.map((user) => (
                        <li key={user?.id}>
                            <strong>Name:</strong> {user?.name} <br />
                            <strong>Email:</strong> {user?.email} <br />
                            <button onClick={() => handleGetHistory(user?.id)}>Get History</button>
                        </li>
                    ))}
                </ul>
            </div>
        )}

        {user?.role !== 'admin' && (
            <div>
                <h3>Tasks Worked By {user?.name}</h3>
                <ul>
                    {tasks.map(task => (
                        <li key={task.id}>
                            <strong>Title:</strong> {task.title} <br />
                            <strong>Description:</strong> {task.description} <br />
                            <strong>Status:</strong> {task.status} <br />
                        </li>
                    ))}
                </ul>
            </div>
        )}

        {selectedUser && user?.role === 'admin' && (
            <div>
                <h3>Tasks Worked By {selectedUser.name}</h3>
                <ul>
                        {tasks.map(task => (
                            <li key={task.id}>
                                <strong>Title:</strong> {task.title} <br />
                                <strong>Description:</strong> {task.description} <br />
                                <strong>Status:</strong> {task.status}
                            </li>
                        ))}
                    </ul>
            </div>
        )}
    </div>
  )
}
