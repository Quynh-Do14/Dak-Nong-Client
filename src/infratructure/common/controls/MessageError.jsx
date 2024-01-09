import React from 'react';

export const MessageError = ({ isError = false, message }) => {
    return (
        <>
            {
                isError === true && message && message.length ?
                    <div className="message-error">{message}</div>
                    :
                    null
            }
        </>
    );
};

