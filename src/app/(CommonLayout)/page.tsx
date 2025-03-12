"use client"
import { useUser } from '@/context/UserContext';
// import { getCurrentUser } from '@/services/AuthService';
import React from 'react';

const HomePage =() => {
    // const user = await getCurrentUser()
    // const user = useUser()
    const user = useUser()
    console.log(user)
    return (
        <div>
            home
        </div>
    );
};

export default HomePage;