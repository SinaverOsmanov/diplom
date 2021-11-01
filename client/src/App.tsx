import { HeaderComponent } from "./components/HeaderComponent";
import { ContentComponent } from "./components/ContentComponent";
import Layout from "antd/lib/layout/layout";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";

export function App() {
  return (
    <Provider store={store}>
      <Shell />
    </Provider>
  );
}

function Shell() {
  return (
    <Router>
      <Layout
        style={{
          backgroundColor: "rgb(248 242 255)",
        }}
      >
        <HeaderComponent />
        <ContentComponent />
      </Layout>
    </Router>
  );
}
