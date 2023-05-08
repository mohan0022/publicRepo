import "@fake-db";
import history from "@history";
import { Router, Switch, Route } from "react-router-dom";
import {
  createGenerateClassName,
  jssPreset,
  StylesProvider,
} from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { create } from "jss";
import jssExtend from "jss-plugin-extend";
import rtl from "jss-rtl";
import Provider from "react-redux/es/components/Provider";
import { SnackbarProvider } from "notistack";
import DateFnsUtils from "@date-io/date-fns";
import { Suspense, useEffect, useState } from "react";
import FuseMessage from "@fuse/core/FuseMessage";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import FuseTheme from "@fuse/core/FuseTheme";
import { useSelector } from "react-redux";
import AppContext from "./AppContext";
import routes from "./fuse-configs/routesConfig";
import store from "./store";
import { PrivateRouter } from "./privateRouter";

import Root from "./Root";

const jss = create({
  ...jssPreset(),
  plugins: [...jssPreset().plugins, jssExtend(), rtl()],
  insertionPoint: document.getElementById("jss-insertion-point"),
});

const generateClassName = createGenerateClassName({ disableGlobal: true });

const persistor = persistStore(store);

const App = () => {
  //   const login = useSelector(({ auth }) => auth.login);
  return (
    <Suspense
      fallback={
        <div
          style={{
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
          }}
        >
          <p>Loading...</p>
        </div>
      }
    >
      <AppContext.Provider
        value={{
          routes,
        }}
      >
        <StylesProvider jss={jss} generateClassName={generateClassName}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <FuseTheme>
                  <Router history={history}>
                    <SnackbarProvider
                      maxSnack={5}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      classes={{
                        containerRoot:
                          "bottom-0 right-0 mb-52 md:mb-68 mr-8 lg:mr-80 z-99",
                      }}
                    >
                      <Switch>
                        {/* <Route
                          exact
                          path={[
                            "/login",
                            "/signup",
                            "/forget-password",
                            "/verify",
                            "/change-password",
                          ]}
                        >
                          <Login>
                            <Switch>
                           
                            </Switch>
                          </Login>
                        </Route> */}
                        <Route path="/" component={PrivateRouter} />
                      </Switch>
                      <FuseMessage />
                    </SnackbarProvider>
                  </Router>
                  <Root />
                </FuseTheme>
              </MuiPickersUtilsProvider>
            </PersistGate>
          </Provider>
        </StylesProvider>
      </AppContext.Provider>
    </Suspense>
  );
};

export default App;
