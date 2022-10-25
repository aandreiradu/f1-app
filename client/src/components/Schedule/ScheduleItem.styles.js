import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const CardSchedule = styled.div`
	width: 100%;
	position: relative;
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
	border-top: solid 2px #e10600;
	border-right: solid 2px #e10600;
	border-top-right-radius: 10px;
	/* padding: 0 10px; */
	padding-right: 10px;
	/* margin: 20px 5px; */
`;

export const Title = styled.span`
	position: absolute;
	content: '';
	top: -15px;
	left: 0;
	background-color: #000;
	padding-right: 10px;
	color: #fff;
	font-size: 1.2rem;
	font-weight: bold;
	line-height: 24px;
	font-family: 'Titillium Web';
`;

export const Period = styled.div`
	width: 100%;
	padding-bottom: 15px;
	border-bottom: 1px solid #949498;
	margin: 15px 0;
`;

export const TimeFlag = styled.div`
	display: flex;
	flex-wrap: nowrap;
	justify-content: space-between;
	align-items: center;

	& p {
		font-family: 'Titillium Web';
		font-size: 18px;
		line-height: 24px;
	}
`;

export const CountryFlag = styled.div`
	width: 30px;
	border-radius: 3px;
	position: relative;
	top: -2px;

	& img {
		display: block;
		width: 100%;
		height: auto;
	}
`;

export const MonthFlag = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;

	& p {
		display: inline-block;
		padding: 2px 8px 1px;
		border-radius: 5px;
		color: #000;
		background: #fff;
		white-space: nowrap;
		font-family: 'Titillium Web';
	}
`;

export const FinishWrapper = styled.div`
	height: 18px;
	border-radius: 5px;
	overflow: hidden;
	margin-left: 5px;

	& img {
		height: 100%;
		width: 100%;
		object-fit: cover;
	}
`;

export const EventDetails = styled.div``;

export const EventDescription = styled.div`
	font-family: 'Titillium Web';
	padding-bottom: 10px;
	border-bottom: 1px solid #949498;
	margin-bottom: 10px;
	min-height: 70px;
	font-size: 1rem;
	cursor: pointer;
`;

export const EventCountryWrapper = styled.div`
	display: flex;
	align-items: center;

	& i {
		margin-left: 7px;
		color: #e10600;
		font-size: 1.03rem;
		transition: transform 0.5s ease-out;

		&:hover {
			transform: translateX(4px);
		}
	}
`;

export const EventCountry = styled(Link)`
	color: #fff;
	font-size: 1.23rem;
	font-weight: bold;
	font-family: 'Titillium Web';
`;

export const GrandPrixName = styled.p`
	font-size: 1.1rem;
`;

export const EventResult = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
`;

export const ImageWrapper = styled.div`
	position: relative;
	height: 80px;
	background-color: #15151e;
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;

	&::before {
		display: block;
		content: ' ';
		/* background-image: url('https: //www.formula1.com/etc/designs/fom-website/images/patterns/white-stripe.png'); */
		background-size: 12px;
		min-width: 100%;
		min-height: 100%;
		opacity: 0.4;
	}

	& img {
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
	}
`;

export const DriverInfoWrapper = styled.div`
	padding-top: 2px;
	background-color: #fff;
	border-bottom-right-radius: 10px;
	border-right: solid 1px #949498;
	border-bottom: solid 1px #949498;
`;

export const DriverInfo = styled.div`
	/* border-right: solid 1px #949498;
    border-bottom: solid 1px #949498;
    border-bottom-right-radius: 10px; */
	padding-right: 5px;
	padding-bottom: 5px;
	display: flex;
	align-items: center;
	justify-content: center;
	padding-bottom: 0;
	color: #000;
`;

export const Position3 = styled.div`
	order: 3;
	flex: 0 0 31%;

	& ${ImageWrapper} {
		height: 55px;

		& img {
			max-width: 85px;
		}
	}
`;

export const Position2 = styled.div`
	order: 1;
	flex: 0 0 33%;

	& ${ImageWrapper} {
		height: 65px;

		& img {
			/* width: 95%; */
			max-width: 90px;
		}
	}
`;

export const Position1 = styled.div`
	display: flex;
	flex-direction: column;
	order: 2;
	flex: 0 0 34%;

	& ${ImageWrapper} {
		& img {
			max-width: 105px;
		}
	}
`;

export const NotDisputed = styled(Link)`
	width: 100%;
	height: 100%;

	${ImageWrapper}

	& img {
		object-fit: contain;
	}
`;

export const RaceFinishedBtn = styled(Link)`
	color: #fff;
	border: 1px solid #e10600;
	padding: 1px 10px;
	text-transform: uppercase;
	font-size: 0.8rem;
	border-radius: 5px;
	background-color: transparent;

	&:active,
	&:focus {
		outline: none;
	}
`;
