import { faShopify } from '@fortawesome/free-brands-svg-icons';
import Footer from '../../components/Footer/Footer';
import { StoreGlobalSettings } from '../Shop/Shop.styles';
import { AdminWrapper, AdminAction, AdminActionIcon, AdminActionName } from './Admin.styles';

const Admin = () => {
	return (
		<>
			<StoreGlobalSettings />
			<AdminWrapper>
				<AdminAction to={'/admin/addProducts'}>
					<AdminActionName>Add Products To Store</AdminActionName>
					<AdminActionIcon icon={faShopify} />
				</AdminAction>
				<AdminAction to={'/admin/addProducts'}>
					<AdminActionName>Add Products To Store</AdminActionName>
					<AdminActionIcon icon={faShopify} />
				</AdminAction>
			</AdminWrapper>
			<Footer />
		</>
	);
};

export default Admin;
