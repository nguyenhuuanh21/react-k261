import Home from "./pages/Home";
import Footer from "./shared/components/Layout/Footer";
import Header from "./shared/components/Layout/Header";
import Menu from "./shared/components/Layout/Menu";
import Sidebar from "./shared/components/Layout/Sidebar";
import Slider from "./shared/components/Layout/Slider";

import routes from "./routers/index";

import store, { persistor } from "./redux-setup/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <div>
            {/*	Header	*/}
            <Header />
            {/*	End Header	*/}
            {/*	Body	*/}
            <div id="body">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <Menu />
                  </div>
                </div>
                <div className="row">
                  <div id="main" className="col-lg-8 col-md-12 col-sm-12">
                    {/*	Slider	*/}
                    <Slider />
                    {/*	End Slider	*/}
                    <Routes>
                      {routes.map((route, index) => (
                        <Route
                          key={index}
                          path={route.path}
                          element={<route.element />}
                        />
                      ))}
                    </Routes>
                  </div>
                  <Sidebar />
                </div>
              </div>
            </div>
            {/*	End Body	*/}

            {/*	Footer	*/}
            <Footer />
            {/*	End Footer	*/}
          </div>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
