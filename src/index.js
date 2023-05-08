// Internet Explorer 11 requires polyfills and partially supported by this project.
// import 'react-app-polyfill/ie11';
// import 'react-app-polyfill/stable';
import ReactDOM from "react-dom";

import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import "typeface-poppins";
import "./i18n";
import "./react-chartjs-2-defaults";
import "./styles/app-base.css";
import "./styles/app-components.css";
import "./styles/app-utilities.css";
import App from "app/App";
import * as serviceWorker from "./serviceWorker";
import reportWebVitals from "./reportWebVitals";

// Sentry.init({
//   dsn: "https://f3cfa961e10c48d593722be81e87bf58@o1217286.ingest.sentry.io/6359340",
//   integrations: [new BrowserTracing()],

//   // Set tracesSampleRate to 1.0 to capture 100%
//   // of transactions for performance monitoring.
//   // We recommend adjusting this value in production
//   tracesSampleRate: 1.0,
// });

// import swDev from './swDev';

ReactDOM.render(<App />, document.getElementById("root"));

reportWebVitals();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
// swDev();
