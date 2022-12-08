import styled, { keyframes, css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const SizeAvailabilityHeightAnimation = keyframes`
    from {
        height: 0%;
    }

    to {
        height: 200px;
    }
`;

const borderWidthGrowing = keyframes`
	0%{
		width: 0%;
	}
	100%{
		width: 100%;
    }
`;
const borderWidthGrowingReverse = keyframes`
	0%{
        width: 100%;
	}
	100%{
        width: 0%;
    }
`;

export const SizeAvailabilityContainer = styled.div`
	width: 100%;
	border-radius: 10px;
	display: flex;
	flex-direction: column;
	border-bottom: 1px solid #1f1f1f;
	border-radius: 0;
	height: 40px;
	min-height: ${(props) => (props.isOpen ? '250px' : '40px')};
	/* overflow-y: auto; */
	overflow: hidden;
	transition: all 0.45s ease-in-out;
	${(props) =>
		props.isOpen &&
		css`
			border: 1px solid #1f1f1f;
			padding: 10px;
			border-radius: 10px;
		`};
	line-height: 1;
`;

export const SizeAvailabilityInnerContent = styled.div`
	position: relative;
	display: flex;
	justify-content: space-between;
	align-items: center;
	color: #1f1f1f;
	padding-bottom: 5px;

	&::before {
		${(props) =>
			props.isOpen
				? css`
						content: '';
						position: absolute;
						left: 0;
						bottom: 0;
						width: 0;
						border-bottom: solid 1px #1f1f1f;
						animation: ${borderWidthGrowing} 0.25s linear forwards;
				  `
				: css`
						content: '';
						position: absolute;
						left: 0;
						bottom: 0;
						width: 0;
						border-bottom: solid 1px #1f1f1f;
						animation: ${borderWidthGrowingReverse} 0.25s linear forwards;
				  `}
	}
`;

export const SizeAvailabilityInnerContentIcon = styled(FontAwesomeIcon)`
	width: 30px;
	height: 20px;
	object-fit: contain;
`;

export const SizeAvailabilityConfirmBtn = styled.button`
	margin: 20px auto;
	width: 175px;
	padding: 5px 3px;
	border: none;
	border-radius: 10px;
	font-size: 16px;
	color: #fff;
	background: #e10600;
	transition: all 0.25s ease-in-out;

	&:disabled {
		cursor: not-allowed;
		background-color: #1f1f1f;
		color: #fff;
	}
`;

export const SizeAvailabilityIsSaved = styled.p`
	text-align: center;
	font-size: 14px;
	color: #3cb371;
	visibility: hidden;

	${(props) =>
		props.show &&
		css`
			visibility: visible;
		`}
`;
