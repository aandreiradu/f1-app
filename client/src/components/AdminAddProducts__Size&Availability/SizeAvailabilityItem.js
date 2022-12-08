import {
	SAIContainer,
	SAILeftSide,
	SAIMiddleBar,
	SAIRightSide,
	SAISelect,
	SAISelectOption,
	SAIInput
} from './SizeAvailabilityItem.styles';

const SizeAvailabilityItem = ({ configLeft, configRight, onSizeSelected }) => {
	const { dataSource, dataOption, dataType, dataTypeConfig, stateController } = configRight;

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

	return (
		<SAIContainer>
			<SAILeftSide>{configLeft?.text || `Size`}</SAILeftSide>
			{/* <SAIMiddleBar /> */}
			<SAIRightSide>
				{dataOption === 'selector' && (
					<SAISelect onChange={handleOptionSelection} {...dataTypeConfig}>
						{/* <SAISelectOption disabled>Select size</SAISelectOption> */}---
						<SAISelectOption disabled defaultValue="Select size">
							Select size
						</SAISelectOption>
						{dataSource?.map((option, index) => (
							<SAISelectOption key={index}>{option}</SAISelectOption>
						))}
					</SAISelect>
				)}
				{dataOption === 'input' && (
					<SAIInput onChange={handleInputChange} type={dataType || 'text'} {...dataTypeConfig} />
				)}
			</SAIRightSide>
		</SAIContainer>
	);
};

export default SizeAvailabilityItem;
