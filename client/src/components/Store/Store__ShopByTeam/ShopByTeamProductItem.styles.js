import styled from 'styled-components';

export const ShopByTeamProductItemWrapper = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const SBTProductItem = styled.div`
	height: 250px;
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 10px;
	padding: 1rem 0;
	border-bottom: 1px solid #1f1f1f;
`;

export const SBTProductImage = styled.img`
	flex: 1;
	width: 100%;
	height: 100%;
	object-fit: cover;
`;

export const SBTProductInfo = styled.div`
	flex: 1;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	/* align-items: center; */

	text-align: left;
	align-items: flex-start;
`;

export const SBTProductPrice = styled.p`
	font-weight: 600;
	color: red;
	font-size: 1.1rem;
	line-height: 1.2;
`;

export const SBTProductTitle = styled.h2`
	font-weight: 400;
	color: #1f1f1f;
	font-size: 1.1rem;
	line-height: 1.2;
	margin-bottom: 10px;
`;

export const SBTProductDescription = styled.p`
	overflow: hidden;
	text-overflow: ellipsis;
	font-size: 15px;
	white-space: normal;
	color: #1f1f1f;
`;
