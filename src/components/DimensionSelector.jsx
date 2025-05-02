import { useState } from 'react';
import './DimensionSelector.css';
import useDimensions from '../hooks/useDimensions';

function DimensionSelector({ setLocationId }) {
	const [selectedDimension, setSelectedDimension] = useState(1);
	const { dimensions, loading, error } = useDimensions();

	const handleDimensionChange = (e) => {
		const value = parseInt(e.target.value);
		setSelectedDimension(value);
		setLocationId(value);
	};

	if (loading) {
		return (
			<div className="dimension-selector">
				<select disabled className="dimension-selector__select">
					<option>Loading dimensions...</option>
				</select>
			</div>
		);
	}

	if (error) {
		return (
			<div className="dimension-selector">
				<select disabled className="dimension-selector__select">
					<option>Error loading dimensions</option>
				</select>
			</div>
		);
	}

	return (
		<div className="dimension-selector">
			<select
				value={selectedDimension}
				onChange={handleDimensionChange}
				className="dimension-selector__select"
			>
				{dimensions.map((dimension) => (
					<option key={dimension.id} value={dimension.id}>
						#{dimension.id} - {dimension.name} ({dimension.dimension})
					</option>
				))}
			</select>
		</div>
	);
}

export default DimensionSelector;
