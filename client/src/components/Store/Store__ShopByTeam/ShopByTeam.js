import { Link } from 'react-router-dom';
import ShopByTeamConfig from '../../../constants/shop__teamsLogoConfig';

import { ShopByTeamContainer, ShopByTeamLogo } from './ShopByTeam.styles';

const ShopByTeam = () => {
	return (
		<ShopByTeamContainer>
			{ShopByTeamConfig?.map((team) => (
				<Link to={`/shop?team=${team.key}`} key={team.key}>
					<ShopByTeamLogo key={team.key} src={team.logo} />
				</Link>
			))}
		</ShopByTeamContainer>
	);
};

export default ShopByTeam;
