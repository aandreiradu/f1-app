import React from 'react';
import { OverlayContainer } from './Overlay.styles';

const Overlay = ({ children }) => {
	return <OverlayContainer>{children}</OverlayContainer>;
};

export default Overlay;
