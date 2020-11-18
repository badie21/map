import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Modal from '../components/Modal';
import Mapir from 'mapir-react-component';

const Map = Mapir.setToken({
	transformRequest: (url) => {
		return {
			url,
			headers: {
				'x-api-key':
					'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjNkOTA2ZGVlMWRmMTY0MjJkYmMyZmQzZWFhNGJjNzYzOTdkNjI3MGNiZDAxZTZjMjdlNjkzYTllYzg2OTIyNjMyM2VlNmYzNjQ1MDNlMGYxIn0.eyJhdWQiOiIxMTUyNiIsImp0aSI6IjNkOTA2ZGVlMWRmMTY0MjJkYmMyZmQzZWFhNGJjNzYzOTdkNjI3MGNiZDAxZTZjMjdlNjkzYTllYzg2OTIyNjMyM2VlNmYzNjQ1MDNlMGYxIiwiaWF0IjoxNjA1NjIxMzUxLCJuYmYiOjE2MDU2MjEzNTEsImV4cCI6MTYwODEyNjk1MSwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.DR-mA0OrlZV9uKBZb9vUEAK9DenKNwd0zm569kG0h9t042qy1HqDpvXsr9FSZCv5cY4kR36-4dcxWoSn4qgOQn5EKwvqmj1d9NHnNIjSo0t83cO1i77wwvEhWE_TEwQexb7I4B3llm5K9mtw8RmOZ9tuEk0QlPv8TMd2-qnQvo8OpXRuUmiC5YrFqNMhI4b5Yzd6Efg48kMvP67t4WUc1_kmRnn6AxfwOAdvEcR05fq6QTcLY8peR2KNTWRPuGQvZI_nx6oFRqmdjB05ThoySr8V4dzwvAi7ByayJGVNi9ysEikzXrhBcybnB6wzFVdbQZzm6oOIuYTL-nWRHunMvg',
				'Mapir-SDK': 'reactjs',
			},
		};
	},
});

const Search = () => {
	const [text, setText] = useState('');
	const [addressList, setAddressList] = useState(null);
	const [modalShow, setModalShow] = useState(false);
	const [modalState, setModalState] = useState(null);

	useEffect(() => {
		if (text.length) {
			Axios({
				method: 'POST',
				url: 'https://map.ir/search/v2',
				headers: {
					'x-api-key':
						'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjNkOTA2ZGVlMWRmMTY0MjJkYmMyZmQzZWFhNGJjNzYzOTdkNjI3MGNiZDAxZTZjMjdlNjkzYTllYzg2OTIyNjMyM2VlNmYzNjQ1MDNlMGYxIn0.eyJhdWQiOiIxMTUyNiIsImp0aSI6IjNkOTA2ZGVlMWRmMTY0MjJkYmMyZmQzZWFhNGJjNzYzOTdkNjI3MGNiZDAxZTZjMjdlNjkzYTllYzg2OTIyNjMyM2VlNmYzNjQ1MDNlMGYxIiwiaWF0IjoxNjA1NjIxMzUxLCJuYmYiOjE2MDU2MjEzNTEsImV4cCI6MTYwODEyNjk1MSwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.DR-mA0OrlZV9uKBZb9vUEAK9DenKNwd0zm569kG0h9t042qy1HqDpvXsr9FSZCv5cY4kR36-4dcxWoSn4qgOQn5EKwvqmj1d9NHnNIjSo0t83cO1i77wwvEhWE_TEwQexb7I4B3llm5K9mtw8RmOZ9tuEk0QlPv8TMd2-qnQvo8OpXRuUmiC5YrFqNMhI4b5Yzd6Efg48kMvP67t4WUc1_kmRnn6AxfwOAdvEcR05fq6QTcLY8peR2KNTWRPuGQvZI_nx6oFRqmdjB05ThoySr8V4dzwvAi7ByayJGVNi9ysEikzXrhBcybnB6wzFVdbQZzm6oOIuYTL-nWRHunMvg',
					'content-type': 'application/json',
				},
				data: {
					text,
				},
			}).then((res) => {
				console.log(res.data.value);
				setAddressList(res.data.value);
			});
		}
	}, [text]);

	return (
		<>
			{modalShow && (
				<Modal closeModal={() => setModalShow(false)}>
					<div style={{ textAlign: 'right', padding: '2rem 1rem' }}>
						<div>
							<p>کشور :‌ {modalState.county}</p>
							<p>شهر :‌ {modalState.city}</p>
							<p>محدوده :‌ {modalState.province}</p>
							<p>محله :‌ {modalState.region}</p>
							<p>آدرس :‌ {modalState.address}</p>
						</div>
						<div style={{ position: 'relative', marginTop: '1rem' }}>
							<Mapir
								containerStyle={{ width: '100%' }}
								center={modalState.geom.coordinates}
								Map={Map}
							>
								<Mapir.Layer
									type="symbol"
									layout={{ 'icon-image': 'harbor-15' }}
								></Mapir.Layer>
								<Mapir.Marker
									coordinates={modalState.geom.coordinates}
									anchor="bottom"
								></Mapir.Marker>
							</Mapir>
						</div>
					</div>
				</Modal>
			)}
			<div className="search-wrapper">
				<input
					type="search"
					onChange={(e) => setText(e.target.value)}
					name="filter"
					value={text}
					id="filter"
					placeholder="جستجو..."
					autoFocus
				/>
			</div>
			{addressList && (
				<div className="address-list">
					<ul>
						{addressList.map((item, index) => {
							return (
								<li
									key={index}
									onClick={() => {
										setModalShow(true);
										setModalState(item);
									}}
								>
									{item.address}
								</li>
							);
						})}
					</ul>
				</div>
			)}
		</>
	);
};

export default Search;
