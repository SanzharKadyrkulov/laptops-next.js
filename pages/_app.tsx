import NextNprogress from "nextjs-progressbar";
import { Provider } from "react-redux";
import "../styles/main.scss";
import { createWrapper } from "next-redux-wrapper";
import { store } from "../store";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextNprogress
        color="white"
        startPosition={0.3}
        stopDelayMs={200}
        height={2}
        showOnShallow={true}
      />
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}
const makestore = () => store;
export const wrapper = createWrapper(makestore);

export default wrapper.withRedux(MyApp);
