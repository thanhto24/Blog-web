import React, { useState, useEffect } from 'react';

const ListFollowing = () => {
    const email = 'tqthanh22@clc.fitus.edu.vn';
    
    const [following, setFollowing] = useState([]);

    useEffect(() => {
        const fetchFollowing = async () => {
            try {
                const response = await fetch('http://localhost:5000/users/following', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: email }),
                });
                if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
                const data = await response.json();
                console.log(data);
                setFollowing(data);
            } catch (error) {
                console.error('Failed to fetch following users:', error);
            }
        };
        fetchFollowing();
    }, [email]);
    // console.log(following);
    return (
        <div>
            <h2>Following</h2>
            <ul>
                {following.map((user) => (
                    <li key={user}>{user}</li>
                ))}
            </ul>
        </div>
    );
}

export default ListFollowing;