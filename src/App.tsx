import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  MemoryRouter,
  Routes,
  Route,
} from "react-router-dom";
import { DebugLayout } from './components/pages/DebugLayout';
import { Home } from './components/pages/Home';
import { Settings } from './components/pages/Settings';
import { RoutesEnum } from './routes';



function App() {
  return (
    <MemoryRouter initialEntries={[`${RoutesEnum.HOME}`]}>
      <Routes>
        <Route path={RoutesEnum.HOME} element={<DebugLayout><Home/></DebugLayout>} errorElement={"error bro"}/>
        <Route path={RoutesEnum.SETTINGS} element={<DebugLayout><Settings/></DebugLayout>} errorElement={"error bro"}/>
      </Routes>
    </MemoryRouter>
  );
}

export default App;
