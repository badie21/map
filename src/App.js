import React from 'react';
import { Switch, Route, Link, BrowserRouter as Router } from 'react-router-dom';
import './static/main.css';
import './static/responsive.css';
import Map from './pages/Map';
import Search from './pages/Search';
import Home from './pages/Home';

function App() {
	return (
		<>
			<Router>
				<div className="App">
					<header>
						<ul>
							<li>
								<Link to="/">
									خانه
									<i className="ion-ios-home"></i>
								</Link>
							</li>
							<li>
								<Link to="/map">
									نقشه
									<i className="ion-map"></i>
								</Link>
							</li>
							<li>
								<Link to="/search">
									جستجو
									<i className="ion-search"></i>
								</Link>
							</li>
						</ul>
					</header>
					{/* define routs  */}
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>
						<Route path="/map">
							<Map />
						</Route>
						<Route path="/search">
							<Search />
						</Route>
					</Switch>
					{/* define routes end */}
				</div>
			</Router>
		</>
	);
}

export default App;
