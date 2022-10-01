import { useState, useEffect } from 'react';
import {
	QualyfingResultRow,
	QualyfingResultHeader,
	QualyfingResultCountryHost,
	QualyfingResultHeaderIcon,
	GrandPrixName
} from './QualyfingResult.styles';
import { faCirclePlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const QualyfingResult = (props) => {
	const { countryHost, grandPrixName } = props;
	const [isOpen, setIsOpen] = useState(false);

	const handleSelectSection = () => {
		console.log('open section');
		setIsOpen((prev) => !prev);
	};

	useEffect(() => {
		console.log('isopen', isOpen);
	}, [isOpen]);

	return (
		<QualyfingResultRow shouldAnimate={isOpen} onClick={handleSelectSection}>
			<QualyfingResultHeader shouldAnimate={isOpen}>
				<QualyfingResultCountryHost>{countryHost || 'N/A'}</QualyfingResultCountryHost>
				<GrandPrixName>{grandPrixName || 'N/A'}</GrandPrixName>
				<QualyfingResultHeaderIcon icon={isOpen ? faXmark : faCirclePlus} />
			</QualyfingResultHeader>
			{props.children}
		</QualyfingResultRow>
	);
};

export default QualyfingResult;
