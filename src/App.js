import { BrowserRouter } from "react-router-dom";
import { NavbarMain } from "./components/NavbarMain";

import LocalRoutes from "./routes";


function App() {
  return (
    <>
      <BrowserRouter>
        <NavbarMain />
        <hr />
        <LocalRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
