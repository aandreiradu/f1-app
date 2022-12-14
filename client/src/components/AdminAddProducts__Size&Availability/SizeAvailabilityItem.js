import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {
	SAIContainer,
	SAILeftSide,
	SAIMiddleBar,
	SAIRightSide,
	SAISelect,
	SAISelectOption,
	SAIInput,
	SAIAddActionBtn,
	SAIGroup
} from './SizeAvailabilityItem.styles';

const buildFunctionality = (config) => {
	console.log('buildFunctionality cfg', config);
	const { dataOption, stateController, onSizeSelected, index } = config;

	let handleOptionSelection;
	if (dataOption === 'selector') {
		handleOptionSelection = (e) => {
			e.cancelBubble = true;
			if (e && e.stopPropagation) {
				e.stopPropagation();
			}
			console.log('selected value', e.target.value);
			onSizeSelected((prev) => {
				const updatedItemIndex = prev?.findIndex((item) => +item.index === index);
				const updatedItem = {
					...prev[updatedItemIndex],
					size: e.target.value
				};
				const updatedState = [...prev];
				updatedState[updatedItemIndex] = updatedItem;
				return updatedState;
			});
		};
	}

	let handleInputChange;
	if (dataOption === 'input') {
		handleInputChange = (e) => {
			if (e && e.stopPropagation) {
				e.stopPropagation();
			}
			stateController?.setter((prev) => {
				const updatedItemIndex = prev?.findIndex((item) => +item.index === index);
				console.log('input updatedItemIndex', updatedItemIndex);
				const updatedItem = {
					...prev[updatedItemIndex],
					availability: +e.target.value
				};
				const updatedState = [...prev];
				updatedState[updatedItemIndex] = updatedItem;
				return updatedState;
			});
		};
	}

	return {
		handleOptionSelection,
		handleInputChange
	};
};

const SizeAvailabilityItem = ({ configLeft, configRight, onActivityAdded }) => {
	console.log('configRightconfigRight', configRight);
	const {
		dataSource: dataSourceLeft,
		dataOption: dataOptionLeft,
		dataType: dataTypeLeft,
		dataTypeConfig: dataTypeConfigLeft,
		value
	} = configLeft;
	const {
		dataOption: dataOptionRight,
		dataType: dataTypeRight,
		dataTypeConfig: dataTypeConfigRight
	} = configRight;

	const {
		handleOptionSelection: handleOptionSelectionLeft,
		handleInputChange: handleInputChangeLeft,
		index: indexLeft
	} = buildFunctionality(configLeft);
	const {
		handleOptionSelection: handleOptionSelectionRight,
		handleInputChange: handleInputChangeRight,
		index: indexRight
	} = buildFunctionality(configRight);

	const addActivityHandler = () => {
		onActivityAdded();
	};

	return (
		<SAIContainer>
			<SAIGroup>
				<SAILeftSide>
					{dataOptionLeft === 'selector' && (
						<SAISelect onChange={handleOptionSelectionLeft} {...dataTypeConfigLeft} value={value}>
							<SAISelectOption disabled defaultValue="Select size">
								Select size
							</SAISelectOption>
							{dataSourceLeft?.map((option, index) => (
								<SAISelectOption key={index}>{option}</SAISelectOption>
							))}
						</SAISelect>
					)}
					{dataOptionLeft === 'input' && (
						<SAIInput
							onChange={handleInputChangeLeft}
							type={dataTypeLeft || 'text'}
							{...dataTypeConfigLeft}
						/>
					)}
				</SAILeftSide>
				<SAIMiddleBar />
				<SAIRightSide>
					{dataOptionRight === 'selector' && (
						<SAISelect onChange={handleOptionSelectionRight} {...dataTypeConfigRight}>
							<SAISelectOption disabled selected value="Select size">
								Select size
							</SAISelectOption>
							{dataSourceLeft?.map((option, index) => (
								<SAISelectOption key={index}>{option}</SAISelectOption>
							))}
						</SAISelect>
					)}
					{dataOptionRight === 'input' && (
						<SAIInput
							onChange={handleInputChangeRight}
							type={dataTypeRight || 'text'}
							{...dataTypeConfigRight}
						/>
					)}
				</SAIRightSide>
			</SAIGroup>
			<SAIAddActionBtn icon={faPlus} onClick={addActivityHandler}>
				+
			</SAIAddActionBtn>
		</SAIContainer>
	);
};

export default SizeAvailabilityItem;
