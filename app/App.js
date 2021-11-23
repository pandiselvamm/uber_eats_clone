import * as React from "react";
import RootNavigation from "./Navigation";
import configureStore from './redux/store';
import { Provider as ReduxProvider } from 'react-redux'
const store = configureStore();
export default function App() {
  return (
    <ReduxProvider store={store}>
      <RootNavigation />
    </ReduxProvider>
  );
}
