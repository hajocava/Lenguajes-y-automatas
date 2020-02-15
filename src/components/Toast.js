import React from 'react'
import { Toast } from 'react-bootstrap'

export default function ToastMessage({ toggleShowToast, showToast, title, body }) {

    return (
        <Toast show={showToast} onClose={toggleShowToast} style={{ position: 'absolute', top: 80, right: 30 }}>
            <Toast.Header>
                <div
                    style={{
                        display: 'inline',
                        height: '15px',
                        width: '15px',
                        borderRadius: '3px',
                        backgroundColor: '#ec5d5d',
                        marginRight: '.8rem'
                    }}
                />
                <strong className="mr-auto">{title}</strong>
            </Toast.Header>
            <Toast.Body>{body}</Toast.Body>
        </Toast>
    );
}
