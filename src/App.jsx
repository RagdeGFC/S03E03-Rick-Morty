import { useEffect, useState } from 'react';
import useFetch from './hooks/useFetch';
import CardInfo from './components/CardInfo';
import ResidentsList from './components/ResidentsList';
import Search from './components/Search';
import './App.css';
import '../card-styles.css';
import randomIndex from './helpers/randomIndex';
import { bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8, bg9 } from './assets/images/';

const images = [bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8, bg9];

function App() {
	const [location, setLocation] = useFetch();
	const [locationId, setLocationId] = useState(1);
	const [img, setImg] = useState(images[randomIndex(images.length)]);

	useEffect(() => {
		setLocation(`https://rickandmortyapi.com/api/
			location/${locationId}`);
	}, [locationId]);

	function changePhrase() {
		setImg(images[randomIndex(images.length)]);
	}

	const handleMouseMove = (e) => {
		const btn = e.currentTarget;
		const rect = btn.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		btn.style.setProperty('--x', `${x}px`);
		btn.style.setProperty('--y', `${y}px`);
	};

	return (
		<div>
			<div className="hero" style={{ backgroundImage: `url('${img}')` }}>
				<button
					onClick={changePhrase}
					className="btn btn-spotlight"
					onMouseMove={handleMouseMove}
				>
					Change Image{' '}
				</button>
			</div>

			<div className="container">
				<Search setLocationId={setLocationId} />
				<CardInfo location={location} />
				<ResidentsList residents={location?.residents} />
			</div>
		</div>
	);
}

export default App;
