import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled, { keyframes, css } from 'styled-components';

const growingHeightOpen = keyframes`
  0%{
    height: 40px;
  }

  100%{
    height: 250px;
  }
`;

const growingHeightClose = keyframes`
  0%{
    height: 250px;
  }

  100%{
    height: 40px;
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

export const QualyfingResultRow = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 60px;
	overflow: hidden;
	animation: ${(props) =>
		props.shouldAnimate
			? css`
					${growingHeightOpen} .35s linear forwards
			  `
			: css`
					${growingHeightClose} .35s linear backwards
			  `};
	animation-fill-mode: forwards;
	/* margin-bottom: 10px; */
	border-top-right-radius: 10px;
	border-top: 1px solid red;
	border-right: 1px solid red;
	border-color: ${(props) => props.shouldAnimate && '#fff'};
	overflow-y: auto;
`;

export const QualyfingResultHeader = styled.div`
	position: relative;
	width: 100%;
	padding: 0 5px 0 10px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 60px;
	border-color: ${(props) => props.shouldAnimate && '#fff'};
	transition: border 0.35s ease-in;

	&::before {
		${(props) =>
			props.shouldAnimate &&
			css`
				content: '';
				position: absolute;
				left: 0;
				bottom: 0;
				width: 0;
				border-bottom: solid 1px #fff;
				animation: ${borderWidthGrowing} 0.35s linear forwards;
			`}
	}
`;

export const QualyfingResultHeaderIcon = styled(FontAwesomeIcon)`
	width: 30px;
	height: 20px;

	:disabled {
		background-color: tomato;
	}
`;

export const QualyfingResultCountryHost = styled.h3`
	font-weight: 500;
	font-size: 1.1rem;
	flex: 30%;
`;

export const GrandPrixName = styled.span`
	flex: 50%;
`;
