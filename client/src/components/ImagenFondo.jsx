import React from 'react';

const Background = ({ children }) => {
    return (
        <div className="bg-[url('/Home.png')] bg-cover w-full h-screen flex items-center justify-center overflow-hidden overflow-x-hidden p-0 m-0">
        {children}
        </div>
);
};

export default Background;
