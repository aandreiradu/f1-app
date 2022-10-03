import styled from 'styled-components';
import {
	ScheduleWrapper,
	ScheduleHeader,
	ScheduleHeaderTitle,
	ScheduleHeaderCompetition
} from '../Schedule/Schedule.styles';

export const QualyfingWrapper = styled(ScheduleWrapper)`
	margin-bottom: 100px;
`;

export const QualyfingHeader = styled(ScheduleHeader)``;

export const QualyfingHeaderTitle = styled(ScheduleHeaderTitle)`
	font-size: 1.7rem;
`;

export const QualyfingHeaderCompetition = styled(ScheduleHeaderCompetition)``;

export const QualyfingResultsContainer = styled.main`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 20px;
`;

export const QualyfingResultItem = styled.div``;
