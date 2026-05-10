import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PageWrapper from './components/PageWrapper/PageWrapper';
import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/Auth/LoginPage';
import SignupPage from './pages/Auth/SignupPage';
import Dashboard from './pages/Dashboard/Dashboard';
import MyTrips from './pages/Trips/MyTrips';
import CreateTrip from './pages/Trips/CreateTrip';
import ItineraryBuilder from './pages/ItineraryBuilder/ItineraryBuilder';
import ItineraryView from './pages/ItineraryView/ItineraryView';
import Explore from './pages/Explore/Explore';
import CityDetails from './pages/Explore/CityDetails';
import BudgetTracker from './pages/BudgetTracker/BudgetTracker';
import Checklist from './pages/Checklist/Checklist';
import NotFound from './pages/NotFound/NotFound';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing — full nav + footer */}
        <Route path="/" element={<PageWrapper><LandingPage /></PageWrapper>} />
        {/* Auth — no nav, no footer (standalone pages) */}
        <Route path="/login" element={<PageWrapper hideNav><LoginPage /></PageWrapper>} />
        <Route path="/signup" element={<PageWrapper hideNav><SignupPage /></PageWrapper>} />
        {/* App pages — nav + footer */}
        <Route path="/dashboard" element={<PageWrapper><Dashboard /></PageWrapper>} />
        <Route path="/trips" element={<PageWrapper><MyTrips /></PageWrapper>} />
        <Route path="/trips/create" element={<PageWrapper><CreateTrip /></PageWrapper>} />
        {/* Builder — no nav, no footer (focus mode) */}
        <Route path="/trips/:id/builder" element={<PageWrapper hideNav hideFooter><ItineraryBuilder /></PageWrapper>} />
        <Route path="/trips/:id/view" element={<PageWrapper><ItineraryView /></PageWrapper>} />
        <Route path="/cities" element={<PageWrapper><Explore /></PageWrapper>} />
        <Route path="/cities/:id" element={<PageWrapper><CityDetails /></PageWrapper>} />
        <Route path="/trips/:id/budget" element={<PageWrapper><BudgetTracker /></PageWrapper>} />
        <Route path="/checklist" element={<PageWrapper><Checklist /></PageWrapper>} />
        <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
      </Routes>
    </Router>
  );
}

export default App;
