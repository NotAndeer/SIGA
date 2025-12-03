import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { MemberProvider } from './context/MemberContext';
import { EventProvider } from './context/EventContext';
import AppRoutes from './routes/AppRoutes';
import Layout from './components/layout/Layout';
import './styles/App.css';

function App() {
  return (
    <AuthProvider>
      <MemberProvider>
        <EventProvider>
          <Router>
            <div className="App">
              <Layout>
                <AppRoutes />
              </Layout>
            </div>
          </Router>
        </EventProvider>
      </MemberProvider>
    </AuthProvider>
  );
}

export default App;
