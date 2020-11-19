import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Axios from 'axios';

const styles = {
	width: '100vw',
	height: 'calc(100vh - 88px)',
	position: 'absolute',
};

const MapboxGLMap = () => {
	const [map, setMap] = useState(null);
	const mapContainer = useRef(null);

	useEffect(() => {
		mapboxgl.accessToken =
			'pk.eyJ1IjoiYmFkaWUyMSIsImEiOiJja2huZms4cGgwcDE4MnJxcThtbm5yMHlsIn0.MR7xGS6luJViGFo6nfGxPg';
		const initializeMap = ({ setMap, mapContainer }) => {
			const map = new mapboxgl.Map({
				container: mapContainer.current,
				center: [51.371963, 35.710402],
				zoom: 12.5,
				style: 'https://map.ir/vector/styles/main/mapir-xyz-style.json',
				hash: true,
				tms: true,
				transformRequest: (url, resourceType) => {
					return {
						url: url,
						headers: {
							'x-api-key':
								'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjNkOTA2ZGVlMWRmMTY0MjJkYmMyZmQzZWFhNGJjNzYzOTdkNjI3MGNiZDAxZTZjMjdlNjkzYTllYzg2OTIyNjMyM2VlNmYzNjQ1MDNlMGYxIn0.eyJhdWQiOiIxMTUyNiIsImp0aSI6IjNkOTA2ZGVlMWRmMTY0MjJkYmMyZmQzZWFhNGJjNzYzOTdkNjI3MGNiZDAxZTZjMjdlNjkzYTllYzg2OTIyNjMyM2VlNmYzNjQ1MDNlMGYxIiwiaWF0IjoxNjA1NjIxMzUxLCJuYmYiOjE2MDU2MjEzNTEsImV4cCI6MTYwODEyNjk1MSwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.DR-mA0OrlZV9uKBZb9vUEAK9DenKNwd0zm569kG0h9t042qy1HqDpvXsr9FSZCv5cY4kR36-4dcxWoSn4qgOQn5EKwvqmj1d9NHnNIjSo0t83cO1i77wwvEhWE_TEwQexb7I4B3llm5K9mtw8RmOZ9tuEk0QlPv8TMd2-qnQvo8OpXRuUmiC5YrFqNMhI4b5Yzd6Efg48kMvP67t4WUc1_kmRnn6AxfwOAdvEcR05fq6QTcLY8peR2KNTWRPuGQvZI_nx6oFRqmdjB05ThoySr8V4dzwvAi7ByayJGVNi9ysEikzXrhBcybnB6wzFVdbQZzm6oOIuYTL-nWRHunMvg',
						},
					};
				},
			});

			map.on('load', () => {
				setMap(map);
				map.resize();
			});

			map.on('click', function (e) {
				e.preventDefault();
				const { lngLat } = e;

				if (
					document.getElementsByClassName(
						'mapboxgl-popup mapboxgl-popup-anchor-top'
					)
				) {
					console.log('heeeeey');
				}
				Axios({
					method: 'GET',
					url: `https://map.ir/reverse?lat=${lngLat.lat}&lon=${lngLat.lng}`,
					headers: {
						'x-api-key':
							'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjNkOTA2ZGVlMWRmMTY0MjJkYmMyZmQzZWFhNGJjNzYzOTdkNjI3MGNiZDAxZTZjMjdlNjkzYTllYzg2OTIyNjMyM2VlNmYzNjQ1MDNlMGYxIn0.eyJhdWQiOiIxMTUyNiIsImp0aSI6IjNkOTA2ZGVlMWRmMTY0MjJkYmMyZmQzZWFhNGJjNzYzOTdkNjI3MGNiZDAxZTZjMjdlNjkzYTllYzg2OTIyNjMyM2VlNmYzNjQ1MDNlMGYxIiwiaWF0IjoxNjA1NjIxMzUxLCJuYmYiOjE2MDU2MjEzNTEsImV4cCI6MTYwODEyNjk1MSwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.DR-mA0OrlZV9uKBZb9vUEAK9DenKNwd0zm569kG0h9t042qy1HqDpvXsr9FSZCv5cY4kR36-4dcxWoSn4qgOQn5EKwvqmj1d9NHnNIjSo0t83cO1i77wwvEhWE_TEwQexb7I4B3llm5K9mtw8RmOZ9tuEk0QlPv8TMd2-qnQvo8OpXRuUmiC5YrFqNMhI4b5Yzd6Efg48kMvP67t4WUc1_kmRnn6AxfwOAdvEcR05fq6QTcLY8peR2KNTWRPuGQvZI_nx6oFRqmdjB05ThoySr8V4dzwvAi7ByayJGVNi9ysEikzXrhBcybnB6wzFVdbQZzm6oOIuYTL-nWRHunMvg',
						'content-type': 'application/json',
					},
				}).then((res) => {
					const { data } = res;

					let popup = new mapboxgl.Popup({ closeOnClick: false })
						.setLngLat([lngLat.lng, lngLat.lat])
						.setHTML(
							`
								<div class='popup'>
						<div>
							<p>کشور :‌ ${data.county}</p>
							<p>شهر :‌${data.city}</p>
							<p>محدوده :‌ ${data.province}</p>
							<p>محله :‌ ${data.region}</p>
							<p>آدرس :‌ ${data.address}</p>
						</div>
							`
						)
						.addTo(map);
				});

				// [lngLat.lng, lngLat.lat];
			});
		};

		if (!map) initializeMap({ setMap, mapContainer });
	}, [map]);

	return <div ref={(el) => (mapContainer.current = el)} style={styles} />;
};

export default MapboxGLMap;
