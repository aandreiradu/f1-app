import { faShopify } from '@fortawesome/free-brands-svg-icons';
import { useSelector } from 'react-redux';
import Footer from '../../components/Footer/Footer';
import { StoreGlobalSettings } from '../Shop/Shop.styles';
import { AdminWrapper, AdminAction, AdminActionIcon, AdminActionName } from './Admin.styles';
import { selectIsAdmin } from '../../store/Auth/auth.selector';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Admin = () => {
	const navigate = useNavigate();
	const isAdmin = useSelector(selectIsAdmin);

	useEffect(() => {
		console.log('@@@Admin useEffect run for checking if user is auth', isAdmin);
		if (!isAdmin) {
			return navigate('/');
		}
	}, [isAdmin]);

	return (
		<>
			<StoreGlobalSettings />
			<AdminWrapper>
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
