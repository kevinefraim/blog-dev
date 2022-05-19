import AppLayout from "components/AppLayout";
import "semantic-ui-css/semantic.min.css";
import "styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  );
}

export default MyApp;
