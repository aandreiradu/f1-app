import { useRef, useState } from 'react';
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
import { QualyResultsTable, TableBody, TableHeader } from './QualyfingResultItem.styles';
import LoaderIcon from '../../components/LoaderReusable/LoaderIcon';
import ErrorModal from '../UI/ErrorModal';

const QualyfingResult = (props) => {
	const qualyRef = useRef();
	const [isOpen, setIsOpen] = useState(false);
	const [showModal, setShowModal] = useState(true);
	const [disableButton, setDisableButton] = useState(false);
	const dispatch = useDispatch();
	const { countryHost, grandPrixName, roundNo, season } = props;
	const { isLoading, sendRequest, error } = useAxiosInterceptorsPublic();
	const cachedQualyResult = useSelector((state) => selectQualyResultByRoundNo(state, roundNo));

	const scrollToResultSelected = (e) => {
		console.log('scrollToResultSelected received', e);
		const headerOffset = 80;
		const elementPosition = e?.current?.getBoundingClientRect()?.top;
		const offsetPosition = elementPosition + window?.pageYOffset - headerOffset;

		window.scrollTo({
			top: offsetPosition,
			behavior: 'smooth'
		});
	};

	const handleSelectSection = () => {
		setDisableButton(true);
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
							setDisableButton(false);
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
				setDisableButton(false);
			}
		} else {
			setDisableButton(false);
			console.log('INFO IN STORE => dont make request');
		}
		setIsOpen((prev) => !prev);
	};

	const confirmErrorHandler = () => setShowModal(false);

	return (
		<QualyfingResultRow shouldAnimate={isOpen} ref={qualyRef}>
			{error && showModal && (
				<ErrorModal
					title="Ooops!"
					message={error?.message || 'Something went wrong 😔'}
					onConfirm={confirmErrorHandler}
				/>
			)}
			<QualyfingResultHeader shouldAnimate={isOpen}>
				<QualyfingResultCountryHost>{countryHost || 'N/A'}</QualyfingResultCountryHost>
				<GrandPrixName>{grandPrixName || 'N/A'}</GrandPrixName>

				{!disableButton && (
					<QualyfingResultHeaderIcon
						icon={isOpen ? faXmark : faCirclePlus}
						onClick={() => {
							handleSelectSection();
							scrollToResultSelected(qualyRef);
						}}
					/>
				)}
			</QualyfingResultHeader>
			{isLoading ? (
				<LoaderIcon heightContainer={'100%'} />
			) : (
				<QualyResultsTable>
					{isOpen && (
						<>
							<TableHeader>
								<tr>
									<th style={{ width: '1%' }}>Pos</th>
									<th style={{ width: '3.5%' }}>Driver</th>
									<th style={{ width: '2.5%' }}>Team</th>
									<th>Q1</th>
									<th>Q2</th>
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
												key={item?.Driver?.driverId}
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
			)}
		</QualyfingResultRow>
	);
};

export default QualyfingResult;
