// import React from "react";
//import React from "react";
import jwt_decode from "jwt-decode";
import { NavLink } from "react-router-dom";
// import axios from "axios";
import { isLoggedIn, getAccessToken } from "axios-jwt";
import {
  // useLocation,
  useHistory,
  Redirect,
  // Route,
  //NavLink,
} from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import "./index.css";
import axiosInstance from "../../../config/axios";
import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  List,
  Typography,
  notification,
  Modal,
} from "antd";
import {
  DeleteFilled,
  EditFilled,
  // SaveFilled,
  RollbackOutlined,
  SaveOutlined,
} from "@ant-design/icons";

library.add(fas);

const { confirm } = Modal;
// const groupData = ["รถนายก", "รถกู้ภัย", "วังดัง", "สำนักข่าว"];
// let groupDataArray = groupData.map((itm, index) => {
//   return { itemNo: index + 1, itemName: itm, onDeleted: false };
// });

// https://medium.com/swlh/0-aca5522c14c8
// isTokenExpired(accessToken)

const NewsgroupItem = (props) => {
  //if (props) props = props;

  const [editItem, setEditItem] = useState("");
  const [updateItem, setUpdateItem] = useState("");

  const itemNo = props.itemValue.id;
  const itemName = props.itemValue.groupName;
  const editItemNo = props.editItemNo;

  const deleteItem = (id, idNO) => {
    if (!Boolean(id)) {
      notification.error({
        message: `something went wrong`,
      });
      return;
    }
    console.log("deleteItem", idNO);

    axiosInstance
      .delete("/backend/group/" + idNO)
      .then((response) => {
        if (!response) return;
        onReset();
        props.fetchGroupList();
        notification.success({
          message: "You have been deleted item",
          description: `Item: (${idNO}) ${id}`,
        });
        // notification.info({
        //   message: `Process Success.`,
        // });
        return true;
      })
      .catch((err) => {
        console.log("err: ", err);
        notification.error({
          message: "Delete Failed !",
        });
        return;
      });
  };

  const onDelete = (id, idNO = 0) => {
    confirm({
      title: "Do you want to delete this items?",
      // icon: <ExclamationCircleOutlined />,
      content: `Item: (${idNO}) ${id}`,
      onOk() {
        //alert(id);
        deleteItem(id, idNO);
      },
      onCancel() {
        //Do Nothing
      },
    });
  };

  //event.target.value

  const onEdit = (id, idNO = 0) => {
    props.setEditItemNo(idNO);
    setEditItem(id);
    setUpdateItem(id);
  };

  const onReset = () => {
    setTimeout(function () {
      setEditItem("");
      setUpdateItem("");
    }, 50);
  };

  const onSaveData = (id, gName) => {
    if (!id || !gName) return;
    console.log(gName);
    axiosInstance
      .patch("/backend/group/" + id, { groupName: gName })
      .then((response) => {
        if (!response) return;

        props.setEditItemNo(0);
        props.fetchGroupList();

        notification.success({
          message: "Updated Success",
        });
      })
      .catch((err) => {
        console.log("err: ", err);
        notification.error({
          message: "Process Failed !",
        });
      });
  };

  const onSave = (id, gName) => {
    onSaveData(id, gName);
    onReset();
  };

  if (itemNo !== editItemNo) {
    onReset();
  }

  return (
    <>
      {!editItem && (
        <span style={{ fontSize: 16 }}>{`${itemNo}. ${itemName}`}</span>
      )}

      {editItem && (
        <span style={{ fontSize: 16, width: "calc(100% - 100px)" }}>
          <Input
            style={{ fontSize: 16 }}
            value={updateItem}
            onChange={(e) => {
              if (e !== null) setUpdateItem(e.target.value);
            }}
          />
        </span>
      )}
      <Typography.Text>
        {!editItem && (
          <span>
            <Button
              style={{ marginRight: 12 }}
              type="text"
              icon={<EditFilled style={{ color: "var(--primary300Color)" }} />}
              onClick={() => onEdit(itemName, itemNo)}
            />
            <Button
              style={{ marginRight: 6 }}
              type="text"
              icon={<DeleteFilled style={{ color: "var(--accentRedColor)" }} />}
              onClick={() => onDelete(itemName, itemNo)}
            />
          </span>
        )}

        {editItem && itemNo === editItemNo && (
          <span>
            <Button
              style={{ marginRight: 12 }}
              type="text"
              icon={
                <SaveOutlined style={{ color: "var(--primary500Color)" }} />
              }
              onClick={() => onSave(itemNo, updateItem)}
            />
            <Button
              className="btn-reset-edit"
              style={{ marginRight: 6 }}
              type="text"
              icon={<RollbackOutlined />}
              onClick={() => onReset()}
            />
          </span>
        )}
      </Typography.Text>
    </>
  );
};
const NewsgroupList = (props) => {
  if (props) {
  }

  const [editItemNo, setEditItemNo] = useState(0);

  return (
    <>
      <List
        style={{ marginLeft: 12 }}
        size="large"
        dataSource={props.itemListData}
        renderItem={(item) => (
          <List.Item
            style={{
              padding: "9px 0",
              height: 51,
              maxHeight: 51,
              borderBottom: "1px solid #e0e0e0",
            }}
          >
            <NewsgroupItem
              itemValue={item}
              setEditItemNo={setEditItemNo}
              editItemNo={editItemNo}
              fetchGroupList={props.fetchGroupList}
            />
          </List.Item>
        )}
      />
    </>
  );
};

const NewsgroupForm = (props) => {
  if (props) {
  }

  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});

  // To disable submit button at the beginning.
  useEffect(() => {
    forceUpdate({});
  }, []);

  const btResetEdit = () => {
    try {
      const btReset = document.querySelector(".btn-reset-edit");
      if (btReset !== null) btReset.click();
    } catch (err) {
      console.log(err);
    }
  };

  const onReset = () => {
    form.resetFields();
    btResetEdit();
    // props.fetchGroupList();
  };

  const createGroup = async (params) => {
    //console.log("Login Success:", params);
    // return;
    const response = axiosInstance
      .post("/backend/group", params)
      .then((response) => {
        if (!response) return;
        onReset();
        props.fetchGroupList();
        notification.success({
          message: "Item added",
          description: `You have been added item: ${params.groupName}`,
        });
        // notification.info({
        //   message: `Process Success.`,
        // });
        return true;
      })
      .catch((err) => {
        console.log("err: ", err);
        notification.error({
          message: "Process Failed !",
        });
        return;
      });
    if (response) {
      return true;
    }
    return;
  };

  const onFinish = (values) => {
    console.log("Finish:", values);
    if (!values.groupName) return;

    createGroup(values);
    props.fetchGroupList();
  };

  return (
    <>
      <Form
        form={form}
        name="horizontal_login"
        layout="inline"
        onFinish={onFinish}
      >
        <Form.Item
          name="groupName"
          rules={[{ required: true, message: "Please input Group Name!" }]}
          style={{ margin: 0, width: "calc(100% - 128px)" }}
        >
          <Input placeholder="Group Name" style={{ fontFamily: "Sarabun" }} />
        </Form.Item>
        <Form.Item shouldUpdate>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              disabled={
                !form.isFieldsTouched(true) ||
                !!form.getFieldsError().filter(({ errors }) => errors.length)
                  .length
              }
            >
              เพิ่ม
            </Button>
          )}
        </Form.Item>
        <Form.Item style={{ margin: 0 }}>
          <Button htmlType="button" onClick={onReset}>
            ล้าง
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

const MgNewsgroupPage = () => {
  let history = useHistory();

  /*const getData = async () => {
	const res = await  axiosInstance.get("/backend/group");
	if(!res) return [];
	return await res.data;
  }*/
  const [itemListData, setItemListData] = useState([]);

  const handleCancel = () => {
    history.push("/mg-news/");
  };

  document.body.style.position = "";
  document.body.style.top = "";

  const fetchGroupList = async () => {
    axiosInstance.get("/backend/group").then(
      (response) => {
        // console.log("get OK", response.data);
        setItemListData(response.data);
      },
      (err) => {
        console.log("get fail", err);
      }
    );
  };

  // const [listGroup, setListGroup] = useState([]);
  // console.log("itemListData", itemListData);

  useEffect(() => {
    fetchGroupList();
  }, []);

  const accessToken = getAccessToken();
  const decoded = jwt_decode(accessToken);
  const memberData = isLoggedIn()
    ? decoded
    : { username: "", firstName: "", lastName: "" };

  if (!isLoggedIn()) {
    return <Redirect to={"/"} />;
  }

  return (
    <>
      <div className="mg-news-page">
        <div className="ant-modal-header" style={{ position: "relative" }}>
          <button
            type="button"
            aria-label="Close"
            className="ant-modal-close"
            style={{ right: "unset", left: 0 }}
            onClick={() => handleCancel()}
          >
            <span className="ant-modal-close-x">
              <span
                role="img"
                aria-label="close"
                className="anticon anticon-close ant-modal-close-icon"
              >
                <FontAwesomeIcon
                  icon={["fas", "arrow-left"]}
                  style={{
                    opacity: 0.8,
                  }}
                />
              </span>
            </span>
          </button>
          <div className="ant-modal-title" style={{ textAlign: "center" }}>
            จัดการกลุ่มข่าว
          </div>
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              height: 56,
            }}
          >
            <NavLink to={"/profile/" || "#"}>
              <Button
                type="text"
                style={{
                  borderRadius: 20,
                  margin: "8px 0",
                  height: 40,
                  padding: "10px 11px",
                }}
              >
                <FontAwesomeIcon
                  icon={["fas", "user"]}
                  style={{
                    opacity: 0.8,
                    fontSize: 18,
                  }}
                />
              </Button>
            </NavLink>
          </div>
        </div>

        <div
          className="profile-section-mini"
          style={{ padding: 0, maxWidth: 414, textAlign: "center" }}
        >
          <div className="avatar-section" style={{ padding: 15 }}>
            <div style={{ width: 60 }}>
              <Button
                type="ghost"
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  backgroundColor: "white",
                }}
              >
                <FontAwesomeIcon
                  icon={["fas", "user"]}
                  style={{ fontSize: 32, color: "var(--neutral500Color)" }}
                />
              </Button>
            </div>
            <div
              style={{
                width: "calc(100% - 120px)",
                padding: "4px 16px",
                textAlign: "left",
              }}
            >
              <div>{memberData && memberData.username}</div>
              <div>
                {memberData && memberData.firstName}{" "}
                {memberData && memberData.lastName}
              </div>
            </div>

            <div style={{ width: 60 }}>
              <h4
                style={{
                  padding: 0,
                  margin: 0,
                  paddingTop: 4,
                  marginBottom: "-4px",
                }}
              >
                {itemListData.length}
              </h4>
              <span style={{ color: "gray" }}>Group</span>
            </div>
          </div>

          <div
            className="profile-section-border"
            style={{ padding: "18px 8px", maxHeight: 70, height: 70 }}
          >
            <NewsgroupForm
              setItemList={setItemListData}
              fetchGroupList={fetchGroupList}
            />
          </div>
          <div>
            <NewsgroupList
              itemListData={itemListData}
              fetchGroupList={fetchGroupList}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MgNewsgroupPage;
