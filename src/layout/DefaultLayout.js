import React from 'react';
import { AppSidebar, AppFooter, AppHeader, AppContent } from '../components/index';
import { useLocation, Navigate } from 'react-router-dom';
import routes from '../routes';
import Profile from '../views/Home/Profile/Profile';
import Login from '../views/pages/login/Login';
import MemberUpdate from '../views/Home/Member/Update'; // Import the MemberUpdate component

const DefaultLayout = () => {
  const location = useLocation();

  const findMatchingRoute = () => {
    const { pathname } = location;
    return routes.find(route => {
      const pathSegments = pathname.split('/');
      const routeSegments = route.path.split('/');

      for (let i = 0; i < routeSegments.length; i++) {
        if (routeSegments[i].startsWith(':')) continue;
        if (routeSegments[i] !== pathSegments[i]) return false;
      }

      return true;
    });
  };

  const renderContent = () => {
    const matchedRoute = findMatchingRoute();

    if (matchedRoute) {
      if (matchedRoute.path === '/login') {
        return <Login />;
      } else if (matchedRoute.path.includes('/Home/Profile')) {
        // Render the profile component with header and footer
        return (
          <>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100">
              <AppHeader />
              <div className="body flex-grow-1">
                <AppContent>
                  <Profile />
                </AppContent>
              </div>
              <AppFooter />
            </div>
          </>
        );
      } else {
        return (
          <>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100">
              <AppHeader />
              <div className="body flex-grow-1">
                <AppContent>
                  {/* Render the component based on the matched route */}
                  <matchedRoute.element />
                </AppContent>
              </div>
              <AppFooter />
            </div>
          </>
        );
      }
    } else {
      console.log("No matching route found. Redirecting to login...");
      return <Navigate to="/login" />;
    }
  };

  return (
    <div>
      {renderContent()}
    </div>
  );
};

export default DefaultLayout;
