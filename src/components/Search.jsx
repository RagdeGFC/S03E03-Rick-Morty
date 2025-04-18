import { useRef, useState } from 'react';
import './Search.css';

function Search({ setLocationId }) {
	const [error, setError] = useState('');
	const [hasValue, setHasValue] = useState(false);
	const inputRef = useRef();

	const onSubmit = (e) => {
		e.preventDefault();
		const id = parseInt(inputRef.current.value);

		if (isNaN(id)) {
			setError('❌ Ivalid number');
			setTimeout(() => {
				setError('');
			}, 3000);
			return;
		}

		if (id < 1 || id > 126) {
			setError('❌ Hey! you must provide an id from 1 to 126');
			setTimeout(() => {
				setError('');
			}, 3000);
			return;
		}

		setLocationId(id);
	};

	const handleReset = () => {
		inputRef.current.value = '';
		setLocationId(1); // Volvemos a la dimensión inicial
		setHasValue(false);
	};

	const handleInputChange = () => {
		setHasValue(inputRef.current.value.length > 0);
	};

	return (
		<>
			<form onSubmit={onSubmit} className="search">
				<input
					ref={inputRef}
					type="text"
					className="search__input"
					placeholder="Enter dimension number (1-126)"
					onChange={handleInputChange}
				/>
				<div className={`search__buttons ${hasValue ? 'has-value' : ''}`}>
					<button type="submit" className="search__btn">
						Search
					</button>
					<button type="button" className="search__btn" onClick={handleReset}>
						Reset Filter
					</button>
				</div>
			</form>
			<p className="message__error">{error && error}</p>
		</>
	);
}

export default Search;
