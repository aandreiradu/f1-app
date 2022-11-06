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
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const BetResults = ({
	bets,
	drivers,
	handleSelectedDriverForBetting,
	handleRemoveBetSelected,
	isSubmited
}) => {
	return (
		<BetResultWrapper>
			<Position1 betting={true}>
				{bets[0]?.key ? (
					<>
						{!isSubmited && (
							<DeleteBetSelection
								icon={faXmark}
								onClick={(e) => {
									e.stopPropagation();
									handleRemoveBetSelected(1, bets[0]?.key);
								}}
							/>
						)}
						<ImageWrapper style={{ borderTopRightRadius: 0 }}>
							<img
								src={
									scheduleImages?.find((item) => {
										const result = item?.driverId?.toUpperCase().includes(bets[0].key);
										return result;
									})?.imgSrc
								}
								alt="position 1"
							/>
						</ImageWrapper>
						<DriverInfoWrapper>
							<DriverInfo>{bets[0]?.name}</DriverInfo>
						</DriverInfoWrapper>
					</>
				) : (
					<Dropdown
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
					/>
				)}
			</Position1>
			<Position2 betting={true}>
				{bets[1]?.key ? (
					<>
						{!isSubmited && (
							<DeleteBetSelection
								icon={faXmark}
								onClick={(e) => {
									e.stopPropagation();
									handleRemoveBetSelected(2, bets[1]?.key);
								}}
							/>
						)}
						<ImageWrapper style={{ borderTopRightRadius: 0 }}>
							<img
								src={
									scheduleImages?.find((item) => {
										const result = item?.driverId?.toUpperCase().includes(bets[1].key);
										return result;
									})?.imgSrc
								}
								alt="position 2"
							/>
						</ImageWrapper>
						<DriverInfoWrapper>
							<DriverInfo>{bets[1]?.name}</DriverInfo>
						</DriverInfoWrapper>
					</>
				) : (
					<Dropdown
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
			<Position3 betting={true}>
				{bets[2]?.key ? (
					<>
						{!isSubmited && (
							<DeleteBetSelection
								icon={faXmark}
								onClick={(e) => {
									e.stopPropagation();
									handleRemoveBetSelected(3, bets[2]?.key);
								}}
							/>
						)}
						<ImageWrapper style={{ borderTopRightRadius: 0 }}>
							<img
								src={
									scheduleImages?.find((item) => {
										const result = item?.driverId?.toUpperCase().includes(bets[2].key);
										return result;
									})?.imgSrc
								}
								alt="position 3"
							/>
						</ImageWrapper>
						<DriverInfoWrapper>
							<DriverInfo>{bets[2]?.name}</DriverInfo>
						</DriverInfoWrapper>
					</>
				) : (
					<Dropdown
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
