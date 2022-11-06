import {
	Position1,
	Position2,
	Position3,
	ImageWrapper,
	DriverInfoWrapper,
	DriverInfo
} from '../Schedule/ScheduleItem.styles';
import { BetResultWrapper, DeleteBetSelection } from './AddBet.styles';
import scheduleImages from '../../constants/scheduleImages';
import Dropdown from '../Dropdown/Dropdown';

const BetResults = ({ bets, drivers, handleSelectedDriverForBetting, handleRemoveBetSelected }) => {
	console.log('bets BetResults', bets);

	return (
		<BetResultWrapper>
			<Position1 betting={true}>
				{bets[0]?.key ? (
					<>
						<DeleteBetSelection
							onClick={(e) => {
								e.stopPropagation();
								return handleRemoveBetSelected(1, bets[0]?.key);
							}}
						>
							x
						</DeleteBetSelection>
						<ImageWrapper>
							<img
								src={
									scheduleImages?.find((item) => {
										// console.log('key', bets[0].key);
										const result = item?.driverId?.toUpperCase().includes(bets[0].key);
										// console.log('result', result);
										return result;
									})?.imgSrc
								}
								alt="position 1"
							/>
						</ImageWrapper>
						<DriverInfoWrapper>
							<DriverInfo>Max Verstappen</DriverInfo>
						</DriverInfoWrapper>
					</>
				) : (
					<Dropdown
						search
						dataSource={drivers?.filter((driver) => {
							return (
								driver?.key !== bets[0]?.key &&
								driver?.key !== bets[1]?.key &&
								driver?.key !== bets[2]?.key
							);
						})}
						position="Position 1"
						betsPosition={0}
						onSelectedDriver={handleSelectedDriverForBetting}
						onRemoveSelection={handleRemoveBetSelected}
					/>
				)}
			</Position1>
			<Position2 betting={true} onClick={handleRemoveBetSelected}>
				{bets[1]?.key ? (
					<>
						<DeleteBetSelection
							onClick={(e) => {
								e.stopPropagation();
								return handleRemoveBetSelected(2, bets[1]?.key);
							}}
						>
							x
						</DeleteBetSelection>
						<ImageWrapper>
							<img
								src={
									scheduleImages?.find((item) => {
										// console.log('key', bets[0].key);
										const result = item?.driverId?.toUpperCase().includes(bets[1].key);
										// console.log('result', result);
										return result;
									})?.imgSrc
								}
								alt="position 2"
							/>
						</ImageWrapper>
						<DriverInfoWrapper>
							<DriverInfo>Max Verstappen</DriverInfo>
						</DriverInfoWrapper>
					</>
				) : (
					<Dropdown
						search
						dataSource={drivers?.filter((driver) => {
							return (
								driver?.key !== bets[0]?.key &&
								driver?.key !== bets[1]?.key &&
								driver?.key !== bets[2]?.key
							);
						})}
						position="Position 2"
						betsPosition={1}
						onSelectedDriver={handleSelectedDriverForBetting}
					/>
				)}
			</Position2>
			<Position3 betting={true} onClick={handleRemoveBetSelected}>
				{bets[2]?.key ? (
					<>
						<DeleteBetSelection
							onClick={(e) => {
								e.stopPropagation();
								return handleRemoveBetSelected(3, bets[2]?.key);
							}}
						>
							x
						</DeleteBetSelection>
						<ImageWrapper>
							<img
								src={
									scheduleImages?.find((item) => {
										// console.log('key', bets[0].key);
										const result = item?.driverId?.toUpperCase().includes(bets[2].key);
										// console.log('result', result);
										return result;
									})?.imgSrc
								}
								alt="position 3"
							/>
						</ImageWrapper>
						<DriverInfoWrapper>
							<DriverInfo>Max Verstappen</DriverInfo>
						</DriverInfoWrapper>
					</>
				) : (
					<Dropdown
						search
						dataSource={drivers?.filter((driver) => {
							return (
								driver?.key !== bets[0]?.key &&
								driver?.key !== bets[1]?.key &&
								driver?.key !== bets[2]?.key
							);
						})}
						position="Position 3"
						betsPosition={2}
						onSelectedDriver={handleSelectedDriverForBetting}
					/>
				)}
			</Position3>
		</BetResultWrapper>
	);
};

export default BetResults;
