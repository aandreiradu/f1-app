import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import AddBet from './AddBet';
import { AddBetButtonContainer, BetButton } from './AddBetBtn.styles';

const AddBetBtn = ({ text, placeBet, setPlaceBet }) => {
	const handlePlaceBet = () => {
		setPlaceBet((prevState) => !prevState);
	};

	return (
		<AddBetButtonContainer>
			<BetButton onClick={handlePlaceBet}>{text || 'Place Bet'}</BetButton>
		</AddBetButtonContainer>
	);
};

export default AddBetBtn;
