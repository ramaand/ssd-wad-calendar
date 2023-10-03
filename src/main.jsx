import './index.css'

import React from 'react'

import { createRoot } from 'react-dom/client'

import DeleteDialog from '~/components/dialogs/DeleteDialog'
import ActivityModal from '~/components/modals/ActivityModal'

import App from './App.jsx'

const rootElement = document.getElementById("root");
const renderRoot = createRoot(rootElement);

renderRoot.render(
  <React.StrictMode>
    <ActivityModal />
    <DeleteDialog />
    <App />
  </React.StrictMode>
);
