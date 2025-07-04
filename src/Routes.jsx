import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import Homepage from "pages/homepage";
import AuthenticationPortal from "pages/authentication-portal";
import NotificationsCenter from "pages/notifications-center";
import AboutContact from "pages/about-contact";
import JobSeekerDashboard from "pages/job-seeker-dashboard";
import JobSeekerOnboardingWizard from "pages/job-seeker-onboarding-wizard";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<Homepage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/authentication-portal" element={<AuthenticationPortal />} />
        <Route path="/notifications-center" element={<NotificationsCenter />} />
        <Route path="/about-contact" element={<AboutContact />} />
        <Route path="/job-seeker-dashboard" element={<JobSeekerDashboard />} />
        <Route path="/job-seeker-onboarding-wizard" element={<JobSeekerOnboardingWizard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;