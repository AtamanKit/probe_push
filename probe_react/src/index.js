import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { apiUrl } from './components/utils';
import axios from 'axios';

// 'use strict'
//============= Sript for Push Notification===========

if (Notification.permission !== 'denied') {
  fetch(`${apiUrl()}/store/publickey`, {
    method: 'GET',
  })
  .then(res => res.json())
  .then(result => localStorage.setItem('vapid_public_key', result.vapid_public_key))
  .catch(error => console.log(error))

  const applicationServerPublicKey = localStorage.getItem('vapid_public_key')

  let swRegistration = null;
  let isSubscribed = false;

  function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  if ('serviceWorker' in navigator && 'PushManager' in window) {
    console.log('Service Worker and Push are supported');

    navigator.serviceWorker.register('sw.js')
    .then(swReg => {
      console.log('Service Worker is registered', swReg);

      swRegistration = swReg;
      subscribeUser();
      initializeUI();
    })
    .catch(error => console.error('Service Worker Error', error));
  } else {
    console.worn('Push messaging is not supported')
  };

  function subscribeUser() {
    const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
    swRegistration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: applicationServerKey
    })
    .then(subscription => {
      localStorage.setItem('subToken', JSON.stringify(subscription));

      isSubscribed = true;
      initializeUI();
    })
    .catch(error => console.error('Failed to subscribe the user:', error))
  }

  function initializeUI() {
    swRegistration.pushManager.getSubscription()
    .then(subscription => {
      isSubscribed = !(subscription === null);

      if (isSubscribed) {
        console.log('User IS subscribed');

      } else {
        console.log('User is NOT subscribed');
      }
    })
  }
}

//================= React script ===========================
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
