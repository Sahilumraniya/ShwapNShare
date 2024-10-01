import React from 'react'
import conf from '../conf/conf';
import { useNavigate, useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useSelector } from 'react-redux';

const Room = () => {
    const { id } = useParams();
    const navigator = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const myMeeting = async (element) => {
        if (!userData) {
            navigator("/login");
        }
        // generate Kit Token
        const appID = conf.appId;
        const serverSecret = conf.serverSecret;
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, id, Date.now().toString(), userData?.email ?? "test");

        // Create instance object from Kit Token.
        const zp = ZegoUIKitPrebuilt.create(kitToken);
        // start the call
        zp.joinRoom({
            container: element,
            sharedLinks: [
                {
                    name: 'Copy link',
                    url:
                        window.location.protocol + '//' +
                        window.location.host + window.location.pathname
                },
            ],
            scenario: {
                mode: ZegoUIKitPrebuilt.GroupCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
            },
            onLeaveRoom: () => {
                window.location.href = "/rooms";
            }
        });
    }

    return (
        <div className="myCallContainer" ref={myMeeting} style={{ width: '100vw', height: '100vh' }}>
        </div>
    );
}

export default Room;