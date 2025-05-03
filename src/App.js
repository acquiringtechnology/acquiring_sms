import { AllRoutes } from "./routes";
import { initializeFirebase } from "./firebase.config";
import { ToastContainer } from "react-toastify";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import store from "./redux";
import { Provider } from "react-redux";
initializeFirebase();

const darkTheme = createTheme({
  palette: {
    mode: "light", //dark
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Provider store={store}>
        {" "}
        <AllRoutes />
        <ToastContainer />
      </Provider>
    </ThemeProvider>
  );
}

export default App;
