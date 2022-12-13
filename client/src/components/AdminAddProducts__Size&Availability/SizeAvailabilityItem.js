import {
	SAIContainer,
	SAILeftSide,
	SAIMiddleBar,
	SAIRightSide,
	SAISelect,
	SAISelectOption,
	SAIInput
} from './SizeAvailabilityItem.styles';

const buildFunctionality = (config) => {
	const { dataOption, stateController, onSizeSelected } = config;

	let handleOptionSelection;
	if (dataOption === 'selector') {
		handleOptionSelection = (e) => {
			e.cancelBubble = true;
			if (e && e.stopPropagation) {
				e.stopPropagation();
			}
			console.log('selected value', e.target.value);
			onSizeSelected(e.target.value);
		};
	}

	let handleInputChange;
	if (dataOption === 'input') {
		handleInputChange = (e) => {
			if (e && e.stopPropagation) {
				e.stopPropagation();
			}
			console.log('input target', e.target.value);
			stateController?.setter(e.target.value);
		};
	}

	return {
		handleOptionSelection,
		handleInputChange
	};
};

const SizeAvailabilityItem = ({ configLeft, configRight }) => {
	console.log('configRightconfigRight', configRight);
	const {
		dataSource: dataSourceLeft,
		dataOption: dataOptionLeft,
		dataType: dataTypeLeft,
		dataTypeConfig: dataTypeConfigLeft,
		stateController: stateControllerLeft,
		onSizeSelected
	} = configLeft;
	const {
		dataSource: dataSourceRight,
		dataOption: dataOptionRight,
		dataType: dataTypeRight,
		dataTypeConfig: dataTypeConfigRight,
		stateController: stateControllerRight,
		onSizeSelected: onSizeSelectedRight
	} = configRight;

	const {
		handleOptionSelection: handleOptionSelectionLeft,
		handleInputChange: handleInputChangeLeft
	} = buildFunctionality(configLeft);
	const {
		handleOptionSelection: handleOptionSelectionRight,
		handleInputChange: handleInputChangeRight
	} = buildFunctionality(configRight);

	return (
		<SAIContainer>
			<SAILeftSide>
				{dataOptionLeft === 'selector' && (
					<SAISelect onChange={handleOptionSelectionLeft} {...dataTypeConfigLeft}>
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
						<SAISelectOption disabled defaultValue="Select size">
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
		</SAIContainer>
	);
};

export default SizeAvailabilityItem;
