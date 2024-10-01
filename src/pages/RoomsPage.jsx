import React, { useEffect, useState } from 'react';
import { roomTokenService } from '../api/rest.app';
import { Loading } from '../components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RoomsPage = () => { // Assume currentUserId is passed as a prop
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const userData = useSelector((state) => state.auth.userData);
    // console.log("userData ::", userData);


    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const data = await roomTokenService.find({
                    query: {
                        $populate: "userId"
                    }
                });
                // console.log(data.data);
                setRooms(data.data);
            } catch (error) {
                console.error("Error fetching rooms:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRooms();
    }, [setRooms]);

    const handleDelete = async (roomId) => {
        try {
            await roomTokenService.remove(roomId); // Adjust according to your API
            setRooms(rooms.filter(room => room.roomId !== roomId));
        } catch (error) {
            console.error("Error deleting room:", error);
        }
    };

    if (loading) return <Loading />;

    return (
        <div className="bg-white text-black py-10 dark:bg-gray-900 dark:text-white px-5 md:px-20">
            <div className="flex flex-col md:flex-row items-center justify-between px-10 py-4">
                <p className="text-4xl font-bold mb-4 md:mb-0">Rooms</p>
                <Link
                    className="bg-blue-500 text-white font-bold py-2 px-6 rounded hover:bg-blue-600 transition duration-200"
                    to="/create-room"
                >
                    Create New Room
                </Link>
            </div>
            <ul className='space-y-4 py-7'>
                {rooms.map((room) => (
                    <li key={room.roomId} className="relative p-4 border rounded-lg shadow-md bg-gray-100 border-gray-300 dark:bg-gray-800 dark:border-gray-700">
                        <Link to={`/room/${room.roomId}`} className="block">
                            <h2 className='text-xl font-semibold'>Topic: {room.topic}</h2>
                            <p><strong>Created By:</strong> {room.userId?.name ?? room.userId?.email.split("@")[0]}</p>
                            <p><strong>Created At:</strong> {new Date(room.createdAt).toLocaleString()}</p>
                        </Link>
                        {room.userId?._id === userData._id && (
                            <button
                                className="absolute top-2 right-2 bg-red-500 text-white font-bold py-1 px-2 rounded hover:bg-red-600 transition-colors"
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent triggering the link
                                    if (window.confirm("Are you sure you want to delete this room?")) {
                                        handleDelete(room._id);
                                    }
                                }}
                            >
                                Delete
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RoomsPage;
