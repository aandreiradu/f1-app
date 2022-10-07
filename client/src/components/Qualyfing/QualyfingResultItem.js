import React from 'react';
import { TableLimiter, TableRow } from './QualyfingResultItem.styles';

const QualyfingResultItem = (props) => {
	const { constructorId, driverName, position, Q1, Q2, Q3, team } = props;
	return (
		<TableRow>
			<td>{position}</td>
			<td>{driverName}</td>
			<td>{team}</td>
			<td>{Q1}</td>
			<td>{Q2}</td>
			<td>{Q3}</td>
		</TableRow>
	);
};

export default QualyfingResultItem;
