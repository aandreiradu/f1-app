import { useReducer, useCallback } from 'react';
import axios from '../api/axios';

const initialState = {
	isLoading: false,
	data: null,
	error: null
};

const httpReducer = (state, action) => {
	console.log('useAxiosInterceptors received', state, action);

	switch (action.type) {
		case 'SEND':
			return {
				isLoading: true,
				error: null,
				data: null
			};

		case 'RESPONSE':
			return {
				isLoading: false,
				error: null,
				data: action.payload
			};

		case 'ERROR':
			console.log('ERROR TYPE. Payload is ', action.payload);
			return {
				isLoading: false,
				error: action.payload
			};

		case 'CLEAR':
			return initialState;

		default:
			throw new Error(`Unhandled HTTP action : ${action}`);
	}
};

const useAxiosInterceptorsPublic = () => {
	const [httpState, dispatch] = useReducer(httpReducer, initialState);

	const clear = useCallback(() => {
		dispatch({ type: 'CLEAR' });
	}, []);

	const sendRequest = useCallback(async (requestConfig, applyData) => {
		console.log('PUBLIC sendRequest RECEIVED', requestConfig);
		const { method, url, body, headers, withCredentials, others } = requestConfig || {};
		dispatch({ type: 'SEND' });

		try {
			console.log('BODY', body);
			const response = await axios({
				method,
				url,
				data: body,
				headers,
				withCredentials,
				...others
			});
			// setTimeout(() => {
			console.log('response', response);
			console.log('responseStatus', response?.status);

			console.log('payload will be', {
				status: response?.status,
				...response.data
			});

			dispatch({
				type: 'RESPONSE',
				payload: {
					status: response?.status,
					...response.data
				}
			});
			applyData({ ...response?.data, status: response?.status });
			// }, 6000);
		} catch (error) {
			console.error('error useAxiosInterceptors', error);
			dispatch({
				type: 'ERROR',
				payload: {
					...(error?.response?.data || error),
					status: error?.response?.status || error?.status || 500
				}
			});
		}
	}, []);

	return {
		isLoading: httpState.isLoading,
		responseData: httpState.data,
		error: httpState.error,
		sendRequest,
		clear
	};
};

export default useAxiosInterceptorsPublic;
