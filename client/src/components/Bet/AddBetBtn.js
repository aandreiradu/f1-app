import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import AddBet from './AddBet';
import { AddBetButtonContainer, BetButton } from './AddBetBtn.styles';

const AddBetBtn = (props) => {
	const { text, placeBet, setPlaceBet, disabled } = props;
	const handlePlaceBet = () => {
		setPlaceBet((prevState) => !prevState);
	};

	return (
		<AddBetButtonContainer>
			<BetButton onClick={handlePlaceBet} {...props}>
				{text || 'Place Bet'}
			</BetButton>
		</AddBetButtonContainer>
	);
};

export default AddBetBtn;
