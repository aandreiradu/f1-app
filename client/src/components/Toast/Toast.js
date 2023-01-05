import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import './Toast.css';

const Toast = ({ message, description, isActive }) => {
	// const [activeToast,setActiveToast] = useState(false);
	console.log('@@isActive TOAST COMPONENT', isActive);

	useEffect(() => {
		console.log('useEffect isActive run');
	}, [isActive]);

	// if(isActive) {
	// 	setActiveToast(true);
	// }

	return (
		// <div className="toast active">
		<div className={`toast ${isActive ? 'active' : null}`}>
			<div className="toast-content">
				<i className="fas fa-solid fa-check check"></i>

				<div className="message">
					<span className="text text-1">{message || 'Success'}</span>
					<span className="text text-2">{description || 'Your changes has been saved'}</span>
				</div>
			</div>
			<i className="fa-solid fa-xmark close"></i>

			<div className="progress active"></div>
		</div>
	);
};

export default Toast;
