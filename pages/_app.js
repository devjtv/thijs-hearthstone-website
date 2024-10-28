import Head from "next/head";
import "../styles/globals.scss";
import 'react-tippy/dist/tippy.css';
import Header from "../components/Header";
import Footer from "../components/Footer";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from "../context/AuthContext";

const queryClient = new QueryClient();


const MyApp = ({ Component, pageProps }) => {
  return(
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          rtl={false}
          theme="dark"
        />
        <Head>
          <title>Thijs | Official Community</title>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#333333" />
        </Head>
        <main>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </main>
      </QueryClientProvider>
    </AuthProvider>
  );
};
export default MyApp;
