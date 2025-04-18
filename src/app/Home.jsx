import { useEffect, useState } from 'react';
import CardInfo from '../components/CardInfo';
import ResidentsList from '../components/ResidentsList';
import Search from '../components/Search';
import useFetch from '../hooks/useFetch';
import './Home.css';

function Home() {
	const [locationId, setLocationId] = useState(1);
	const [location, setLocation] = useFetch();

	useEffect(() => {
		const url = `https://rickandmortyapi.com/api/location/${locationId}`;
		setLocation(url);
	}, [locationId]);

	return (
		<div className="home">
			<Search setLocationId={setLocationId} />
			<CardInfo location={location} />
			<ResidentsList residents={location?.residents} />
		</div>
	);
}

export default Home;
