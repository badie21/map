import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import Marker from '../components/Marker';
import ReactDOM from 'react-dom'

mapboxgl.accessToken =
	'pk.eyJ1IjoiYmFkaWUyMSIsImEiOiJja2huZms4cGgwcDE4MnJxcThtbm5yMHlsIn0.MR7xGS6luJViGFo6nfGxPg';

const Map = () => {
	const mapContainer = useRef(null);

	useEffect(() => {
		const map = new mapboxgl.Map({
			container: mapContainer.current,
			style: 'mapbox://styles/mapbox/streets-v11',
			zoom: 12.5,
			center: [-104.9876, 39.7405],
		});

    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
   

		return () => map.remove();
	}, []);

	return <div className="map-container" ref={mapContainer} />;
};

export default Map;
