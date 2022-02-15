import React from "react";
import { Layout, Row, Col, Icon } from "antd";
import Navbarmenu from "./Navbarmenu";

const { Header, Footer } = Layout;
const AppBar = (props) => (WrappedComponent) => {
  return class HOC extends React.Component {
    render() {
      return (
        <React.Fragment>
          <Header
            style={{
              position: "fixed",
              backgroundColor:
                props.title === "Homepage" ? this.props.color : "",
              width: "100%",
              top: "0",
              padding: "0 25px",
              height: "65px",
              zIndex: "1000",
            }}
          >
            <Row type="flex">
              <Col xs={16} md={14} lg={16} xl={18}>
                <h4
                  style={{
                    position: "relative",
                    color: "white",
                    fontFamily: "sans-serif",
                    fontSize: "20px",
                  }}
                >
                  Color Picker
                </h4>
              </Col>
              <Col xs={8} md={10} lg={8} xl={6}>
                <Navbarmenu title={props.title} color={this.props.color} />
              </Col>
            </Row>
          </Header>
          <Row
            style={{
              height: "calc(100% - 70px)",
              top: "65px",
              position: "relative",
            }}
          >
            <WrappedComponent {...this.props} />
          </Row>
          <Footer style={{ backgroundColor: this.props.color }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                color: "white",
              }}
            >
              <div>
                <Icon
                  type="copyright"
                  style={{ position: "relative", paddingRight: "3px" }}
                />
                <span>2022 Color Picker</span>
              </div>
            </div>
          </Footer>
        </React.Fragment>
      );
    }
  };
};
export default AppBar;
