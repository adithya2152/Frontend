import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Layout } from './components/Layout';
import { LoginForm } from './components/LoginForm';
import { SignupForm } from './components/SignupForm';
import { Dashboard } from './pages/Dashboard';
import { DriversPage } from './pages/DriversPage';
import { VehiclesPage } from './pages/VehiclesPage';
import { TripsPage } from './pages/TripsPage';
import { ProfilePage } from './pages/ProfilePage';
import { AboutPage } from './pages/AboutPage';
import LeaderboardPage from './pages/LeaderboardPage';
import AssignBadgesPage from './pages/AssignBadgesPage';
import AddRulePage from './pages/AddRulePage';
import BadgeCreatorPage from './pages/BadgeCreatorPage';
import { PointUpdationPage } from './pages/PointUpdationPage';
import { BrowserRouter } from 'react-router-dom';

type Page = 'dashboard' | 'drivers' | 'vehicles' | 'trips' | 'my-trips' | 'leaderboard' | 'profile' | 'about' | 'assign-badges' | 'add-rule' | 'badge-creator' | 'point-updation';
interface CurrentPage {
  page: Page;
  action: string | null;
}

function AppContent() {
  const { user, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState<CurrentPage>({ page: 'dashboard', action: null });
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const handleNavigate = (page: string, options: { action?: string } = {}) => {
    setCurrentPage({ page: page as Page, action: options.action || null });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading FleetManager...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return authMode === 'login' ? (
      <LoginForm onToggleMode={() => setAuthMode('signup')} />
    ) : (
      <SignupForm onToggleMode={() => setAuthMode('login')} />
    );
  }

  const renderPage = () => {
    switch (currentPage.page) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />;
      case 'drivers':
        return user.role === 'manager' ? <DriversPage action={currentPage.action} /> : <Dashboard onNavigate={handleNavigate} />;
      case 'assign-badges':
        return user.role === 'manager' ? <AssignBadgesPage /> : <Dashboard onNavigate={handleNavigate} />;
      case 'vehicles':
        return user.role === 'manager' ? <VehiclesPage action={currentPage.action} /> : <Dashboard onNavigate={handleNavigate} />;
      case 'trips':
        return user.role === 'manager' ? <TripsPage action={currentPage.action} /> : <Dashboard onNavigate={handleNavigate} />;
      case 'my-trips':
        return user.role === 'driver' ? <TripsPage action={currentPage.action} /> : <Dashboard onNavigate={handleNavigate} />;
      case 'leaderboard':
        return <LeaderboardPage onNavigate={handleNavigate} />;
      case 'profile':
        return <ProfilePage onNavigate={handleNavigate} />;
      case 'about':
        return <AboutPage />;
      case 'add-rule':
        return user.role === 'manager' ? <AddRulePage /> : <Dashboard onNavigate={handleNavigate} />;
      case 'badge-creator':
        return user.role === 'manager' ? <BadgeCreatorPage /> : <Dashboard onNavigate={handleNavigate} />;
      case 'point-updation':
        return user.role === 'manager' ? <PointUpdationPage /> : <Dashboard onNavigate={handleNavigate} />;
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <Layout currentPage={currentPage.page} onNavigate={(page) => handleNavigate(page as string)}>
      {renderPage()}
    </Layout>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;