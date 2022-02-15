import React, { useState, useEffect } from "react";
import { Layout, Button, Row, Col, Icon } from "antd";
import { withRouter } from "react-router-dom";
import AppBar from "../components/AppBar";
import { HexColorPicker } from "react-colorful";

const Homepage = (props) => {
  const { Content } = Layout;
  const [color, setColor] = useState(props.color);
  const changeColor = (value) => {
    if (value) {
      const formData = new FormData();
      formData.append("email", props.email);
      formData.append("color", value);
      props.fetch(
        `/register/colorUpdate`,
        "POST",
        formData,
        async (response) => {
          if (response.success) {
            props.color_update(value);
          }
        },
        (err) => {
          if (err.status === 401) {
            props.history.push("/loginpage");
          }
        }
      );
    }
  };
  useEffect(() => setColor(props.color), [props.color]);

  return (
    <React.Fragment>
      <Content className="homepageContent">
        <Row
          type="flex"
          style={{
            height: "calc(100% - 64px)",
            alignItems: "Center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Col
          // xs={{ span: 21, offset: 3 }}
          // md={{ span: 8, offset: 4 }}
          // lg={{ span: 8, offset: 4 }}
          // xl={{ span: 12, offset: 4 }}
          >
            <h1 style={{ color: "#fafafa", fontFamily: "sans-serif" }}>
              Welcome {props.username}.
            </h1>
            <Button
              style={{
                width: "270px",
                fontWeight: "bold",
                height: "60px",
                fontSize: "larger",
                borderRadius: "20px",
              }}
              onClick={() => {
                props.history.push("/loginpage");
              }}
            >
              Current Theme - {color}
            </Button>
            <h1 style={{ color: "#fafafa", fontFamily: "sans-serif" }}>
              Your current theme will be applied to header and footer.
            </h1>
          </Col>
          {props.colorPicker && (
            <Col
            // md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 8 }}
            >
              <HexColorPicker color={color} onChange={changeColor} />
            </Col>
          )}
        </Row>
      </Content>
    </React.Fragment>
  );
};

export default AppBar({ title: "Homepage" })(withRouter(Homepage));
