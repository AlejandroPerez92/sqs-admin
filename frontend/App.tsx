import Overview from "./views/Overview";
import { AlertProvider } from "./components/AlertProvider.tsx";

function App() {
  return (
    <>
      <AlertProvider>
        <Overview />
      </AlertProvider>
    </>
  );
}

export default App;
