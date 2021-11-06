import { HeaderComponent } from "./components/HeaderComponent";
import { ContentComponent } from "./components/ContentComponent/ContentComponent";
import Layout from "antd/lib/layout/layout";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";

export function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout
          style={{
            backgroundColor: "rgb(228 220 245 / 86%)",
          }}
        >
          <HeaderComponent />
          <ContentComponent />
        </Layout>
      </Router>
    </Provider>
  );
}
