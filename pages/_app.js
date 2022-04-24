import "../styles/globals.css";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps, props }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
