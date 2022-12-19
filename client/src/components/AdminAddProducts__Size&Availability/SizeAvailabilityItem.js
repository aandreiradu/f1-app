import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
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

const buildFunctionality = (config, index) => {
	console.log('buildFunctionality cfg', config);
	const { dataOption, stateController, onSizeSelected } = config;

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
				console.log('updatedItemIndex', updatedItemIndex);
				const updatedItem = {
					...prev[updatedItemIndex],
					size: e.target.value
				};
				console.log('updatedItem', updatedItem);
				const updatedState = [...prev];
				updatedState[updatedItemIndex] = updatedItem;
				console.log('updatedState', updatedState);
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

const SizeAvailabilityItem = ({
	configLeft,
	configRight,
	onActivityAdded,
	canBeRemoved,
	canAddSibling,
	onActivityRemoved,
	index
}) => {
	const {
		dataSource: dataSourceLeft,
		dataOption: dataOptionLeft,
		dataType: dataTypeLeft,
		dataTypeConfig: dataTypeConfigLeft,
		value
	} = configLeft;

	console.log('index', index, 'has value', value);

	console.log('@@@aradu configLeft', configLeft);
	const {
		dataOption: dataOptionRight,
		dataType: dataTypeRight,
		dataTypeConfig: dataTypeConfigRight
	} = configRight;

	const {
		handleOptionSelection: handleOptionSelectionLeft,
		handleInputChange: handleInputChangeLeft,
		index: indexLeft
	} = buildFunctionality(configLeft, index);
	const {
		handleOptionSelection: handleOptionSelectionRight,
		handleInputChange: handleInputChangeRight,
		index: indexRight
	} = buildFunctionality(configRight, index);

	const addActivityHandler = () => {
		onActivityAdded();
	};

	const removeActivityHandler = (index) => {
		console.log('removeActivityHandler index', index);
		onActivityRemoved(index);
	};

	return (
		<SAIContainer>
			<SAIGroup>
				<SAILeftSide>
					{dataOptionLeft === 'selector' && (
						<SAISelect onChange={handleOptionSelectionLeft} {...dataTypeConfigLeft} value={value}>
							<SAISelectOption defaultValue="Select size">Select size</SAISelectOption>
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
						<SAISelect onChange={handleOptionSelectionRight} {...dataTypeConfigRight} value={value}>
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
			{canAddSibling && (
				<SAIAddActionBtn icon={faPlus} onClick={addActivityHandler}>
					+
				</SAIAddActionBtn>
			)}
			{canBeRemoved && (
				<SAIAddActionBtn icon={faMinus} onClick={removeActivityHandler.bind(this, index)}>
					-
				</SAIAddActionBtn>
			)}
		</SAIContainer>
	);
};

export default SizeAvailabilityItem;
