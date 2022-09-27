import axios from '../api/axios';
import { useDispatch } from 'react-redux';
import { refreshToken } from '../store/Auth/auth.actions';

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
			profilePicture
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
					profilePicture
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
					profilePicture
				)
			);
		}
		return accessToken;
	};

	return refresh;
};

export default useRefreshToken;
