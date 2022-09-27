import styled, { createGlobalStyle, keyframes } from 'styled-components';
import { titiliumFont } from '../../Utils/fonts/titiliumFont';

const growingBorders = keyframes`
     0% {
        transform: scale(0);
    }

    100% {
        transform: scale(1);
    }
`;

export const RaceHubGlobalStyle = createGlobalStyle`    
    *{
        ${titiliumFont}
    }
`;

export const RaceHubWrapper = styled.main`
	margin: 20px 0;
`;

export const RaceHeader = styled.div`
	position: relative;
	height: 180px;
	width: 100%;
	overflow: hidden;
	display: flex;
	align-items: center;
	border-radius: 10px;
`;

export const RaceImage = styled.img`
	object-fit: cover;
	height: 100%;
	width: 100%;
	filter: brightness(65%);
	backdrop-filter: brightness(65%);
`;

export const RaceContent = styled.div`
	position: absolute;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	top: 0;
	bottom: 0;
	color: #fff;

	& h1 {
		text-transform: uppercase;
		font-weight: bold;
		font-family: ${titiliumFont};
		font-size: 1.5rem;
		text-align: center;
	}

	& p {
		border-radius: 15px;
		margin-top: 5px;
		padding: 5px 10px;
		text-transform: uppercase;
		/* background-color: #15151e; */
		background-color: rgba(0, 0, 0, 0.5);
		text-align: center;
	}
`;

export const RaceYearWrapper = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 10px 0;
`;

export const RaceYearImage = styled.img`
	width: 120px;
	height: auto;
	object-fit: cover;
`;

export const RaceTime = styled.div`
	width: 100%;
	margin: 10px 0;
	color: #fff;
	text-transform: uppercase;

	& p {
		font-size: 1.6rem;
		font-weight: bold;
		text-transform: uppercase;
	}

	& h2 {
		font-size: 1.2rem;
		text-transform: uppercase;
	}
`;
export const RaceScheduleListing = styled.ul`
	width: 100%;
	border-top: solid 10px #e10600;
	border-right: solid 10px #e10600;
	border-bottom: solid 10px #e10600;
	border-top-right-radius: 15px;
	border-bottom-right-radius: 15px;
	padding: 10px 10px 10px 0;
	transition: transform 1s linear;
	transform-origin: center;
	transform-style: preserve-3d;
	animation: ${growingBorders} 0.5s linear;
`;

export const RaceHub = styled.section``;
