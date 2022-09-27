import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import classes from './ErrorModal.module.css';

const ErrorModal = (props) => {
	console.log('error modal props', props);
	const { message, title, onConfirm, linkURL, linkText, hideCloseBtn } = props;

	const confirmHandler = () => {
		onConfirm();
	};

	return (
		<div className={classes['modal-wrapper']}>
			<div className={classes['modal']}>
				<div className={classes['overlay']}></div>
				<span
					className={`${classes.close} ${hideCloseBtn && classes['hide-modal-closeBtn']}`}
					onClick={confirmHandler}
				>
					&times;
				</span>
				<h2 className={hideCloseBtn && classes['extra-space']}>{title ? title : 'Ooops!'}</h2>
				<p>{message ? message : 'Something went wrong, please try again later!'}</p>
				{hideCloseBtn && (
					<div className={classes['modal_redirect']}>
						<FontAwesomeIcon icon={faCircleInfo} className={classes['modal-info-icon']} />
						<a className={classes['modal-link']} href={linkURL || ''} target="_blank">
							{linkText}
						</a>
					</div>
				)}
				<button className={hideCloseBtn && classes['hide-modal-closeBtn']} onClick={confirmHandler}>
					Close
				</button>
			</div>
		</div>
	);
};

export default ErrorModal;
