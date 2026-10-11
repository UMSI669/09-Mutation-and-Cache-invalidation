import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import EventEditorScreen from './screens/EventEditorScreen';

export default function App() {
  return (
    <Provider store={store}>
      <EventEditorScreen />
    </Provider>
  );
}
