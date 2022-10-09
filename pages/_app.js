import "../styles/globals.css";
import { store } from "../store/store";
import { Provider } from "react-redux";
import React, { useState, useEffect } from "react";

function MyApp({ Component, pageProps }) {
  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  if (typeof window === 'undefined') {
    return <></>;
  } else {
    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    );
  }
  // return (
  //   <Provider store={store}>
  //     <Component {...pageProps} />
  //   </Provider>
  // );
}

export default MyApp;
