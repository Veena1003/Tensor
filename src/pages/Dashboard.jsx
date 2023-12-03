import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const { user, signOutUser } = useAuth();
    const navigate = useNavigate();
    const [text, setText] = useState('');
    const [option, setOption] = useState('');
    const [formSubmissions, setFormSubmissions] = useState([]);

    const fetchFormSubmissions = async () => {
        try {
            const response = await fetch(`http://localhost:3001/get-submissions/${user.email}`);
            const submissionsData = await response.json();
            setFormSubmissions(submissionsData);
            console.log(formSubmissions)
        } catch (error) {
            console.error('Error fetching form submissions:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user.email)
        console.log(text)
        console.log(option)

        try {
            const response = await fetch('http://localhost:3001/submit-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: user.email, text: text, option: option }),
            });

            if (response.ok) {
                // You need to define the appropriate function for fetching submissions
                // fetchFormSubmissions();
                // Clear the form fields
                setText('');
                setOption('');
            } else {
                console.error('Form submission failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleLogout = async () => {
        try {
            await signOutUser();
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        // Fetch previous form submissions from Node.js server
        fetchFormSubmissions();
    }, [user.email, formSubmissions]);


    return (
        <div>
            <h1 style={{ color: 'black' }}>Home</h1>
            <p>This is the Dashboard page.</p>
            <button onClick={handleLogout}>Logout</button>

            <h2>Customer Service Requests</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="text">Additional Comments:</label>
                    <input
                        type="text"
                        id="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Enter text"
                    />
                </div>
                <div>
                    <label htmlFor="option">Option:</label>
                    <select
                        id="option"
                        value={option}
                        onChange={(e) => setOption(e.target.value)}
                    >
                        <option value="General Queries">General Queries</option>
                        <option value="Product Features Queries">Product Features Queries</option>
                        <option value="Product Pricing Queries">Product Pricing Queries</option>
                        <option value="Product Feature Implementation Requests"> Product Feature Implementation Requests</option>
                    </select>
                </div>
                <button type="submit">Submit</button>
            </form>


            {/* Display cards for previous form submissions */}
            <div>
                <h3>Previous Submissions</h3>
                {formSubmissions.map((submission, index) => (
                    <Card key={index} data={submission} />
                ))}
            </div>
        </div>

    );
};

// Card Component to display each form submission
const Card = ({ data }) => {
    return (
        <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px', margin: '8px 0' }}>
            <p>
                <strong>Option:</strong> {data.option}
            </p>
            <p>
                <strong>Text:</strong> {data.text}
            </p>
            {/* Add more fields as needed */}
        </div>
    );
};

export default Dashboard;
