import styled from 'styled-components';

export const QualyResultItemWrapper = styled.div`
	width: 100%;
`;

export const QualyResultsTable = styled.table`
	font-size: 14px;
	width: 100%;
	border-collapse: collapse;
	border-spacing: 0;
	color: #fff;

	/* thead tr th {
		padding: 10px 5px 5px;
		text-align: center;
	} */
`;

export const TableHeader = styled.thead`
	color: #fff;

	tr th {
		padding: 10px 6px 10px;
		text-align: center;
	}
`;

export const TableLimiter = styled.td`
	display: table-cell;
	padding: 0;
	width: 5%;
`;

export const TableRow = styled.tr`
	text-align: center;
	color: #000;

	&:nth-child(odd) {
		background-color: #fff;
	}
	&:nth-child(even) {
		background-color: #ccc;
	}
`;

export const TableBody = styled.tbody`
	tr td {
		padding: 18px 6px 14px;
		text-align: center;
		color: #000;
	}
`;
