import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled, { keyframes } from 'styled-components';

export const OpacityAnimation = keyframes`
    0%{
        opacity: 0;
    }

    50%{
        opacity: .65;
    }
    
    100%{
        opacity: 1;
    }
`;

export const DropdownContainer = styled.div`
	display: flex;
	flex-direction: column;
	/* align-items: center; */
	position: relative;
`;

export const OpenDropdown = styled.div`
	/* width: 60px; */
	width: 100%;
	border: 1px solid #ccc;
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
	border-radius: 7px;
`;

export const SearchInput = styled.input`
	padding: 6px;
	border-radius: 10px;
	width: 100%;
	display: flex;
	flex: 1;
	border: none;
	margin: none;
	outline: none;

	&:active,
	&:focus {
		outline: none;
	}
`;

export const Arrow = styled(FontAwesomeIcon)`
	width: 25px;
	height: 15px;
`;

export const DropdownList = styled.ul`
	/* width: 60px; */
	width: 100%;
	position: absolute;
	top: 110%;
	list-style-type: none;
	max-height: 150px;
	overflow: hidden;
	overflow-y: auto;
	border-radius: 7px;
	box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
`;

export const DropdownListItem = styled.li`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 5px;
	animation: ${OpacityAnimation} 0.5s linear;
	&:nth-child(odd) {
		background-color: #ccc;
	}
`;
