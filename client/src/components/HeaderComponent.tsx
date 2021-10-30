import { Row, Col, Layout, Button } from "antd";
import { Link } from "react-router-dom";
import { getDataLocalStorage } from "../utils/localStorage";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { logoutUserThunkCreator } from "../store/reducers/userReducers/logoutUserReducer";
const { Header } = Layout;

export function HeaderComponent() {
  const dispatch = useDispatch();
  const history = useHistory();
  const data = getDataLocalStorage();

  const { auth } = useSelector((state: any) => state.auth);

  async function logoutHandleClick() {
    dispatch(logoutUserThunkCreator());
    history.push("/");
  }
  return (
    <Header style={{ color: "white" }}>
      <Row style={{ textAlign: "center" }} justify="space-between">
        <Col span={2} offset={3}>
          <Link to={`/`}>DIPLOM</Link>
        </Col>
        <Col span={3} offset={2}>
          <Row justify="space-between">
            <Col>
              {auth && (
                <Button type="link" onClick={logoutHandleClick}>
                  Log out
                </Button>
              )}
            </Col>
            {auth && (
              <Col>
                <Link to="/reserved">User</Link>
              </Col>
            )}
            {data && data.isAdmin && (
              <Col>
                <Link to="/admin/panel">Admin</Link>
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </Header>
  );
}
