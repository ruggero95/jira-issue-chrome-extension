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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SettingProvider } from './components/context/settingsContext';
import { ThemeProvider } from './components/context/themeContext';
import { Filter } from './components/pages/Filter';
import { FilterProvider } from './components/context/filterContext';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SettingProvider>
        <FilterProvider>
          <ThemeProvider>
            <MemoryRouter initialEntries={[`${RoutesEnum.HOME}`]}>
              <Routes>
                <Route path={RoutesEnum.HOME} element={<DebugLayout><Home /></DebugLayout>} errorElement={"error bro"} />
                <Route path={RoutesEnum.SETTINGS} element={<DebugLayout><Settings /></DebugLayout>} errorElement={"error bro"} />
                <Route path={RoutesEnum.FILTER} element={<DebugLayout><Filter /></DebugLayout>} errorElement={"error bro"} />
              </Routes>
            </MemoryRouter>
          </ThemeProvider>

        </FilterProvider>

      </SettingProvider>
    </QueryClientProvider>

  );
}

export default App;
