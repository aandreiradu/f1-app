import axios from '../api/axios';
import { useDispatch } from 'react-redux';
import { refreshToken } from '../store/Auth/auth.actions';
import { shopUserAddToFavorites } from '../store/Store__UserProducts/store__userProducts.actions';

const useRefreshToken = () => {
	const dispatch = useDispatch();

	const refresh = async () => {
		const response = await axios.get('/refresh', {
			withCredentials: true
		});

		const {
			accessToken,
			fullName,
			roles,
			username,
			email,
			favoriteConstructor,
			favoriteDriver,
			imageUrl,
			isAdmin,
			favoriteProducts,
			favoriteProductsCount,
			cartItemsCount
		} = response.data || null;
		if (accessToken) {
			console.log(
				'REFRESH GENERATED NEW ACCESS TOKEN',
				JSON.stringify({
					accessToken,
					fullName,
					roles,
					username,
					email,
					favoriteConstructor,
					favoriteDriver,
					imageUrl,
					isAdmin,
					favoriteProducts,
					favoriteProductsCount,
					cartItemsCount
				})
			);
			dispatch(
				refreshToken(
					accessToken,
					fullName,
					roles,
					username,
					email,
					favoriteConstructor,
					favoriteDriver,
					imageUrl,
					isAdmin,
					favoriteProductsCount,
					cartItemsCount
				)
			);
			if (favoriteProducts.length > 0) {
				console.error('@@@SHOULD DISPATCH ALSO FAVORITES HERE', favoriteProducts);
				dispatch(shopUserAddToFavorites(favoriteProducts));
			}
		}
		return accessToken;
	};

	return refresh;
};

export default useRefreshToken;
