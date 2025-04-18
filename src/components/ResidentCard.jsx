import React, { useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import './ResidentCard.css';

function ResidentCard({ url }) {
	const [resident, getResident, loading, error] = useFetch();

	useEffect(() => {
		if (url) {
			getResident(url);
		}
	}, [url, getResident]);

	if (loading) {
		return (
			<div className="card loading">
				<div className="loading-spinner"></div>
				<p>Cargando información del residente...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className="card error">
				<p>{error}</p>
				<button className="retry-button" onClick={() => getResident(url)}>
					Reintentar
				</button>
			</div>
		);
	}

	if (!resident) return null;

	const status = resident.status.toLowerCase();
	const statusIcon =
		status === 'alive' ? ' 🟢 ' : status === 'dead' ? ' 🔴 ' : ' ⚫ ';

	return (
		<div className="card">
			<div className="card-header">
				<img
					src={resident.image}
					alt={resident.name}
					onError={(e) => {
						e.target.onerror = null;
						e.target.src =
							'https://via.placeholder.com/300x300?text=Image+Not+Found';
					}}
				/>
				<span className="card-label">
					{statusIcon}
					{resident.status}
				</span>
			</div>
			<div className="card-body">
				<h3 className="card-title">{resident.name}</h3>
				<div className="card-stats">
					<div className="card-stats-item">
						<span>Specie</span>
						<span>{resident.species}</span>
					</div>
					<div className="card-stats-item">
						<span>Origin</span>
						<span>{resident.origin?.name}</span>
					</div>
					<div className="card-stats-item">
						<span>Episodes</span>
						<span>{resident.episode?.length}</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ResidentCard;
