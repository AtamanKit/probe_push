import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/service-worker.js')
      .then(function(registration) {
        console.log('ServiceWorker registration successful with scope:', registration.scope);
      }, 
      function(err) {
        console.log('ServiceWorker registration failed:', err);
      });
  });
}

if ('Notification' in window && navigator.serviceWorker) {
  Notification.requestPermission(function(status) {
    console.log('Notification permission status:', status);

    if (status === 'granted') {
      navigator.serviceWorker.ready.then(function(registration) {
        registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: 'YOUR_APPLICATION_SEVER_KEY'
        })
        .then(function(subscription) {
            console.log('Push notification subscription:', subscription);
        })
        .catch(function(error) {
            console.log('Push notification subscription error:', error);
        });
      });
    };
  });
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
