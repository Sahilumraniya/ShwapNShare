import React, { useEffect, useRef } from 'react';
import conf from '../conf/conf';
import { useNavigate, useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useSelector } from 'react-redux';

const Room = () => {
    const { id } = useParams();  // Extracting the room ID from the URL
    const navigate = useNavigate();  // Used for redirecting
    const userData = useSelector((state) => state.auth.userData);  // Getting user data from redux
    const meetingContainer = useRef(null);  // Container reference for Zego UI

    useEffect(() => {
        // If no user data, redirect to the login page
        if (!userData) {
            navigate("/login");
            return;
        }

        // Initialize Zego only once userData is present
        const initializeZego = async () => {
            try {
                const appID = conf.appId;
                const serverSecret = conf.serverSecret;

                // Generate the Kit Token
                const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
                    appID,
                    serverSecret,
                    id,
                    Date.now().toString(),
                    userData?.email ?? "test"
                );

                // Create the Zego UI Kit instance
                const zp = ZegoUIKitPrebuilt.create(kitToken);

                // Join the room
                zp.joinRoom({
                    container: meetingContainer.current,
                    sharedLinks: [
                        {
                            name: 'Copy link',
                            url: `${window.location.protocol}//${window.location.host}${window.location.pathname}`,
                        },
                    ],
                    scenario: {
                        mode: ZegoUIKitPrebuilt.GroupCall,  // Set mode for group call
                    },
                    showPreJoinView: false,
                    showLeavingView: false,
                    onLeaveRoom: () => {
                        navigate("/rooms");  // Redirect to rooms page on leave
                    },
                });
            } catch (error) {
                console.error('Error initializing the room:', error);
            }
        };

        initializeZego();

        return () => {
            // Any necessary cleanup for Zego SDK
            if (meetingContainer.current) {
                meetingContainer.current.innerHTML = '';
            }
        };
    }, [userData, id, navigate]);  // Depend on userData, id, and navigate to re-run effect if needed

    return (
        <div
            ref={meetingContainer}
            className="myCallContainer"
            style={{ width: '100vw', height: '100vh' }}  // Full-screen container for the meeting
        />
    );
};

export default Room;
