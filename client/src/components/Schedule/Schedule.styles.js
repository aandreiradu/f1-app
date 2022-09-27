import styled from 'styled-components';

export const ScheduleWrapper = styled.div`
	color: #fff;
	width: 100%;
	margin: 40px auto;
	${(props) => props}

	@media (max-width: 676px) {
		margin: 10px auto;
	}
`;

export const ScheduleHeader = styled.div`
	border-top: solid 10px #e10600;
	border-right: solid 10px #e10600;
	border-top-right-radius: 15px;
	padding-top: 10px;
	padding-right: 10px;
	margin-bottom: 40px;
`;

export const ScheduleHeaderTitle = styled.h1`
	font-size: 2rem;
	font-weight: bold;
	font-family: 'Titillium Web', sans-serif;
`;

export const ScheduleHeaderCompetition = styled.h2`
	text-transform: uppercase;
	margin-bottom: 20px;
	font-size: 1rem;
	font-weight: 500;
`;

export const ScheduleResults = styled.div`
	width: 100%;
	height: 100%;
	/* display: flex;
    flex-wrap: wrap; */
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
	grid-gap: 20px 10px;
`;
