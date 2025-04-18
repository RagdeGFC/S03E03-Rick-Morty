import { useState, useCallback } from 'react';
import axios from 'axios';

function useFetch() {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const dataFetch = useCallback(async (url) => {
		if (!url) return;

		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), 10000);

		try {
			setLoading(true);
			setError(null);
			setData(null);

			const response = await axios.get(url, {
				signal: controller.signal,
				timeout: 10000,
			});

			clearTimeout(timeoutId);

			if (response.status !== 200) {
				throw new Error(`Error: ${response.status}`);
			}

			setData(response.data);
		} catch (err) {
			if (axios.isCancel(err)) {
				setError('La petición tardó demasiado tiempo');
			} else if (err.code === 'ECONNABORTED') {
				setError('Tiempo de espera agotado');
			} else if (!err.response) {
				setError('Error de red. Por favor, verifica tu conexión');
			} else {
				setError(err.message || 'Error al cargar los datos');
			}
			setData(null);
		} finally {
			setLoading(false);
		}
	}, []);

	return [data, dataFetch, loading, error];
}

export default useFetch;
