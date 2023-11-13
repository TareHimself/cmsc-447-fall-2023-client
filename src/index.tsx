import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Nav from './components/Nav/Nav';
import Home from './routes/Home';
import {createBrowserRouter, RouterProvider, Route} from "react-router-dom"
import DownloadPage from './pages/DownloadPage';



const router = createBrowserRouter([
	{
		path:"/",
		element:<div>Hello world!</div>,

	},
	{
		path:"download",
		element: <DownloadPage/>

	},
]);

// import DownloadPage from './Components/DownloadPage';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);



root.render(
	
	<RouterProvider router={router}/>
	// <React.StrictMode>
	// 	<Home />
	// </React.StrictMode>
	
);

// root.render(

	
// 	<React.StrictMode>
// 		<Home />
// 		{/* <DownloadPage /> */}
// 	</React.StrictMode>

	
// );





// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
