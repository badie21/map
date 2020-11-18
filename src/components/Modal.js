import React from 'react';

// ion - close - round;

const Modal = (props) => {
	const { closeModal } = props;

	const closeHnadler = () => (
		<i
			name="times"
			onClick={closeModal}
			className="ion-close-round"
			style={{
				color: '#000000',
				padding: '10px',
				cursor: 'pointer',
				backgroundColor: 'transparent',
				border: 0,
				position: 'absolute',
				top: '0.3rem',
				right: '0.5rem',
			}}
		></i>
	);

	return (
		<div className="overlay">
			<div className="content">
				{closeHnadler()}
				{props.children}
			</div>
		</div>
	);
};

export default Modal;
