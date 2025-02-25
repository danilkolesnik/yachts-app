"use client"
import React, { useState } from 'react';
import { URL } from '@/utils/constants';
import Link from 'next/link';
import axios from 'axios';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        await axios.post(`${URL}/auth/register`, { email, password })
            .then((res) => {
                console.log(res.data);
            })

    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
                <h2 className="text-2xl font-bold text-center text-black">Register</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="form-group">
                        <label className="block text-sm font-medium text-black">Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200 text-black"
                        />
                    </div>
                    <div className="form-group">
                        <label className="block text-sm font-medium text-black">Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200 text-black"
                        />
                    </div>
                    <div className="form-group">
                        <label className="block text-sm font-medium text-black">Confirm Password:</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200 text-black"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
                    >
                        Register
                    </button>
                </form>
                <p className="text-center text-sm text-black">
                    Already have an account?{' '}
                    <Link href={'/auth/login'}>
                    <button
                        className="text-blue-500 hover:underline"
                    >
                        Login
                    </button>
                    </Link>
                  
                </p>
            </div>
        </div>
    );
};

export default Register;