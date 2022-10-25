import {
	Position1,
	Position2,
	Position3,
	ImageWrapper,
	DriverInfoWrapper,
	DriverInfo
} from '../Schedule/ScheduleItem.styles';
import VerstappenJPG from '../../assets/schedule images/verstappen.png';
import { BetResultWrapper } from './AddBet.styles';

const BetResults = () => {
	return (
		<BetResultWrapper>
			<Position1>
				<ImageWrapper>
					<img src={VerstappenJPG} alt="position 1" />
				</ImageWrapper>
				<DriverInfoWrapper>
					<DriverInfo>Max Verstappen</DriverInfo>
				</DriverInfoWrapper>
			</Position1>
			<Position2>
				<ImageWrapper>
					<img src={VerstappenJPG} alt="position 1" />
				</ImageWrapper>
				<DriverInfoWrapper>
					<DriverInfo>Max Verstappen</DriverInfo>
				</DriverInfoWrapper>
			</Position2>
			<Position3>
				<ImageWrapper>
					<img src={VerstappenJPG} alt="position 1" />
				</ImageWrapper>
				<DriverInfoWrapper>
					<DriverInfo>Max Verstappen</DriverInfo>
				</DriverInfoWrapper>
			</Position3>
		</BetResultWrapper>
	);
};

export default BetResults;
