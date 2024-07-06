import '../styles/index.css';

function MyApp({ Component, pageProps }) {
  return (
    <div className='app_wrapper'>
      <div>
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
