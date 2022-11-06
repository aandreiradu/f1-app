import styled from 'styled-components';

export const OverlayContainer = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	height: 100vh;
	width: 100vw;
	z-index: ${(props) => (props.zIndex ? props.zIndex : '2')};
	background-color: rgba(0, 0, 0, 0.6);
`;
