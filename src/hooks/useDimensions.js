import { useState, useEffect } from 'react';

const useDimensions = () => {
	const [dimensions, setDimensions] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchDimensions = async () => {
			try {
				const allDimensions = [];
				// La API tiene 7 páginas de ubicaciones
				for (let page = 1; page <= 7; page++) {
					const response = await fetch(
						`https://rickandmortyapi.com/api/location?page=${page}`,
					);
					const data = await response.json();
					allDimensions.push(...data.results);
				}
				setDimensions(allDimensions);
				setLoading(false);
			} catch (err) {
				setError('Error fetching dimensions');
				setLoading(false);
			}
		};

		fetchDimensions();
	}, []);

	return { dimensions, loading, error };
};

export default useDimensions;
