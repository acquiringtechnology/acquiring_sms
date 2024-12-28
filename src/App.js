import { AllRoutes } from "./routes";
import { initializeFirebase } from "./firebase.config";
import { ToastContainer } from "react-toastify";
import store from './redux'
import { Provider } from 'react-redux';
initializeFirebase();

function App() {
  return (
    <Provider store={store}>
      {" "}
      <AllRoutes />
      <ToastContainer/>
    </Provider>
  );
}

export default App;
