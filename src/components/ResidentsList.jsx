import React from 'react';
import ResidentCard from './ResidentCard';
import './ResidentList.css';

function ResidentsList({ residents }) {
	return (
		<div className="cards-container">
			{residents?.map((url) => (
				<ResidentCard key={url} url={url} />
			))}
		</div>
	);
}

export default ResidentsList;
