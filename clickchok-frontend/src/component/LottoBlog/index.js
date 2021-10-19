import React, { useState } from "react";
import { Button, List } from "antd";
import { NavLink } from "react-router-dom";
import LottoNumItem from "../LottoNumItem";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import "./index.css";

library.add(fas);

const LottoBlog = (props) => {
  const [noLimit, setNoLimit] = useState(false);
  let dataLimit = props.data;
  const { listNewsData } = props;
  //listNewsData={listNewsData}

  if (props.limit && !noLimit) {
    dataLimit = dataLimit.filter((itm, index) => itm && index < props.limit);
  }
  return (
    <div
      style={{
        padding: "8px",
      }}
    >
      {/* <Divider orientation="left">{value}</Divider> */}
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
        }}
      >
        <h2
          style={{
            fontFamily: "Roboto Mono",
            fontSize: 18,
            fontWeight: "bold",
            color: "#14171a",
            letterSpacing: "0px",
          }}
        >
          {props.title}
        </h2>
        {props.link !== null && (
          <NavLink to={props.link || "/lotto/"}>
            <Button
              icon={
                <FontAwesomeIcon
                  icon={["fas", "arrow-right"]}
                  style={{ color: "var(--neutral400Color)" }}
                />
              }
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                border: 0,
              }}
            ></Button>
          </NavLink>
        )}
      </div>
      <List
        style={{ margin: "0 -6px" }}
        id="lotto-list"
        grid={{
          gutter: 16,
          // xs: 1,
          // sm: 2,
          // md: 4,
          // lg: 4,
          // xl: 6,
          // xxl: 3,
        }}
        dataSource={dataLimit}
        renderItem={(item) => (
          <List.Item style={{ margin: "0 6px 18px" }}>
            <LottoNumItem
              title={item.title}
              count={item.count}
              modal={props.modal}
              listNewsData={listNewsData}
            />
          </List.Item>
        )}
      />
      {props.loading !== null && (
        <Button
          onClick={() => setNoLimit(true)}
          type="primary"
          size="small"
          style={{ minWidth: "100%" }}
          disabled={props.data.length <= (props.limit || 3) || noLimit}
        >
          Load More...
        </Button>
      )}
    </div>
  );
};

export default LottoBlog;
