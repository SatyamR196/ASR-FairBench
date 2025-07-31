import React, { useState } from 'react';
import axios from 'axios';
import Button from "./Button";
import { Password } from 'primereact/password';

function StopAudit({ baseUrl }) {
    const [showPrompt, setShowPrompt] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // console.log(process.env.ADMIN_PASSWORD) ;

    const handleButtonClick = () => {
        setShowPrompt(true);
    };

    const handleCancel = () => {
        setShowPrompt(false);
        setPassword('');
        setError('');
    };

    const handleConfirm = async () => {
        console.log("Stop Transcript Req sent sucessfully");
        try {
            const response = await axios.get(`${baseUrl}/api/stop?passkey=${password}`, {
                // your payload here
            });
            alert(`${response.data.message}`);
            console.log(response)
        } catch (err) {
            console.error(err);
            alert('API request failed.');
        }

        // Reset
        setPassword('');
        setShowPrompt(false);
        setError('');
    };

    return (
        <div >
            <Button 
                type="button"
                shadow="#782e0c"
                bg="#cf4200"
                color="white"
                onClick={handleButtonClick}>Stop Audit
            </Button>

            {showPrompt && (
                <div style={modalStyles.overlay}>
                    <div style={modalStyles.modal}>
                        <h4>Enter Admin Password</h4>
                        {/* <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            style={{ padding: '5px', width: '100%' }}
                        /> */}
                        <div className="card flex justify-content-center">
                            <Password value={password} placeholder="Password" variant="filled" onChange={(e) => setPassword(e.target.value)} filled toggleMask feedback={false} />
                        </div>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'flex-end', gap: '20px' }}>
                            <Button
                                type="button"
                                shadow="#782e0c"
                                bg="#d32828"
                                color="white"
                                onClick={handleCancel}>Cancel
                            </Button>
                            <Button
                                type="button"
                                shadow="blue"
                                bg="#3b82f6"
                                color="white"
                                onClick={handleConfirm}>Confirm
                            </Button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

const modalStyles = {
    overlay: {
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        // backgroundColor: 'rgba(0,0,0,0.4)',
        height : "130vh",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999,
    },
    modal: {
        background: 'white',
        padding: '25px',
        borderRadius: '8px',
        minWidth: '280px',
        display: 'flex',
        flexDirection:'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
    }
};

export default StopAudit;
