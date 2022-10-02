import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	fetchQualyfingResultFailure,
	fetchQualyfingResultStart,
	fetchQualyfingResultSuccess
} from '../../store/Qualyfing/qualyfing.actions';
import {
	QualyfingResultRow,
	QualyfingResultHeader,
	QualyfingResultCountryHost,
	QualyfingResultHeaderIcon,
	GrandPrixName
} from './QualyfingResult.styles';
import { faCirclePlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { selectQualyResultByRoundNo } from '../../store/Qualyfing/qualyfing.selector';
import useAxiosInterceptorsPublic from '../../hooks/useHttpInterceptorsPublic';
import QualyfingResultItem from './QualyfingResultItem';
import {
	QualyResultsTable,
	TableBody,
	TableLimiter,
	TableHeader
} from './QualyfingResultItem.styles';

const QualyfingResult = (props) => {
	const dispatch = useDispatch();
	const { isLoading, sendRequest, error } = useAxiosInterceptorsPublic();
	const { countryHost, grandPrixName, roundNo, season } = props;
	const [isOpen, setIsOpen] = useState(false);
	const cachedQualyResult = useSelector((state) => selectQualyResultByRoundNo(state, roundNo));
	console.log('cachedQualyResult', cachedQualyResult);

	const handleSelectSection = () => {
		console.log('open roundno', roundNo);
		console.log('cachedQualyResult', cachedQualyResult);
		if (!isOpen && !cachedQualyResult) {
			try {
				dispatch(fetchQualyfingResultStart());
				console.log('NO INFO FOR THIS ROUND => MAKE REQUEST');
				const controller = new AbortController();
				sendRequest(
					{
						url: `https://ergast.com/api/f1/${season}/${roundNo}/qualifying.json`,
						method: 'GET',
						withCredentials: false,
						signal: controller.signal
					},
					(qualyResponse) => {
						console.log('qualyResponse', qualyResponse);
						const { QualifyingResults } = qualyResponse?.MRData?.RaceTable?.Races[0] || null;
						if (QualifyingResults) {
							console.log('DISPATCH THIS', { roundNo: roundNo, results: QualifyingResults });
							dispatch(
								fetchQualyfingResultSuccess({ roundNo: roundNo, results: QualifyingResults })
							);
						}
					}
				);
			} catch (errorQualy) {
				console.log(`errorQualy for roundNo: ${roundNo}`, errorQualy);
				dispatch(
					fetchQualyfingResultFailure(
						errorQualy?.message || errorQualy || 'Someting went wrong! Try again later.'
					)
				);
			}
		} else {
			console.log('INFO IN STORE => dont make request');
		}

		setIsOpen((prev) => !prev);
	};

	useEffect(() => {
		if (isOpen) {
			console.log('cachedQualyResult', cachedQualyResult);
		}
	}, [isOpen]);

	return (
		<QualyfingResultRow shouldAnimate={isOpen} onClick={handleSelectSection}>
			<QualyfingResultHeader shouldAnimate={isOpen}>
				<QualyfingResultCountryHost>{countryHost || 'N/A'}</QualyfingResultCountryHost>
				<GrandPrixName>{grandPrixName || 'N/A'}</GrandPrixName>
				<QualyfingResultHeaderIcon icon={isOpen ? faXmark : faCirclePlus} />
			</QualyfingResultHeader>
			<QualyResultsTable>
				{isOpen && (
					<>
						<TableHeader>
							<tr>
								<th style={{ width: '1%' }}>Pos</th>
								<th style={{ width: '3.5%' }}>Driver</th>
								<th style={{ width: '2.5%' }}>Team</th>
								{/* <TableLimiter></TableLimiter> */}
								<th>Q1</th>
								<th>Q2</th>
								{/* <TableLimiter></TableLimiter> */}
								<th>Q3</th>
							</tr>
						</TableHeader>
						<TableBody>
							{isOpen &&
								cachedQualyResult?.results?.length > 0 &&
								cachedQualyResult?.results?.map((item) => {
									console.log('ITEM', item);
									return (
										<QualyfingResultItem
											constructorId={item?.Constructor?.constructorId}
											driverName={item?.Driver?.familyName?.slice(0, 3)?.toUpperCase()}
											team={item?.Constructor?.name}
											position={item?.position}
											Q1={item?.Q1 || ''}
											Q2={item?.Q2 || ''}
											Q3={item?.Q3 || ''}
										/>
									);
								})}
						</TableBody>
					</>
				)}
			</QualyResultsTable>
		</QualyfingResultRow>
	);
};

export default QualyfingResult;
