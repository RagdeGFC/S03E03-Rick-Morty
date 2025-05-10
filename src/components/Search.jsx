import { useRef, useState } from 'react';
import './Search.css';
import DimensionSelector from './DimensionSelector';

function Search({ setLocationId }) {
	const [error, setError] = useState('');
	const [hasValue, setHasValue] = useState(false);
	const [selectedDimension, setSelectedDimension] = useState(1);
	const inputRef = useRef();

	const handleMouseMove = (e) => {
		const btn = e.currentTarget;
		const rect = btn.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		btn.style.setProperty('--x', `${x}px`);
		btn.style.setProperty('--y', `${y}px`);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		const id = parseInt(inputRef.current.value);

		if (isNaN(id)) {
			setError('❌ Invalid number');
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
		setSelectedDimension(id);
	};

	const handleReset = () => {
		inputRef.current.value = '';
		setLocationId(1);
		setHasValue(false);
		setSelectedDimension(1);
	};

	const handleInputChange = () => {
		setHasValue(inputRef.current.value.length > 0);
	};

	const handleDimensionChange = (id) => {
		setSelectedDimension(id);
		setLocationId(id);
		setHasValue(true);
		inputRef.current.value = '';
	};

	return (
		<div className="search-container">
			<form onSubmit={onSubmit} className="search">
				<input
					ref={inputRef}
					type="text"
					className="search__input"
					placeholder="Enter dimension number (1-126)"
					onChange={handleInputChange}
				/>
				<div
					className={`search__buttons ${
						hasValue || selectedDimension !== 1 ? 'has-value' : ''
					}`}
				>
					<button
						type="submit"
						className="search__btn btn-spotlight"
						onMouseMove={handleMouseMove}
					>
						Search
					</button>
					<button
						type="button"
						className="search__btn btn-spotlight"
						onClick={handleReset}
						onMouseMove={handleMouseMove}
					>
						Reset Filter
					</button>
				</div>
			</form>
			<DimensionSelector
				setLocationId={handleDimensionChange}
				selectedDimension={selectedDimension}
			/>
			<p className="message__error">{error && error}</p>
		</div>
	);
}

export default Search;
