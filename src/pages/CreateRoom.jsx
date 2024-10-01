import React, { useState } from 'react';
import { roomTokenService } from '../api/rest.app';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const randomID = (length = 5) => {
    const chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP';
    return Array.from({ length }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
};

const CreateRoom = () => {
    const [topic, setTopic] = useState('');
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const handleTopicChange = (event) => {
        setTopic(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Logic to create a video call room
        // console.log(`Creating video call room for topic: ${topic}`);
        const roomId = randomID(10);
        if (userData) {
            roomTokenService.create({
                topic,
                userId: userData._id,
                roomId
            }).then(() => {
                navigate(`/room/${roomId}`);
                toast("Room created", { type: "success" })
            }).catch((e) => {
                console.error("Error ::", e);

                toast("Error while creating room", { type: "error" })
            })
        }

        setTopic(''); // Clear the input
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-800 text-black dark:text-white">
            <h1 className='text-xl md:text-2xl py-4 font-bold'>Create Room</h1>
            <form onSubmit={handleSubmit} className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-md">
                <input
                    type="text"
                    value={topic}
                    onChange={handleTopicChange}
                    placeholder="Enter topic name"
                    required
                    className="p-2 mb-4 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                />
                <button
                    type="submit"
                    className="w-full px-4 py-2 rounded bg-blue-600 text-white transition duration-200 hover:bg-blue-500">
                    Create Video Call Room
                </button>
            </form>
        </div>
    );
};

export default CreateRoom;
