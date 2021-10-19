// import jwt_decode from "jwt-decode";
import { NavLink } from "react-router-dom";
// import { post } from "axios";
import { isLoggedIn } from "axios-jwt";
import {
  // useLocation,
  useHistory,
  useParams,
  Redirect,
  // Route,
  //NavLink,
} from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import "./index.css";
import axiosInstance, { BASE_URL } from "../../../config/axios";
import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  List,
  notification,
  Modal,
  // Tooltip,
  // Textarea,
  // InputNumber,
  // Typography,
} from "antd";
import {
  DeleteFilled,
  // EditFilled,
  SearchOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Upload, message } from "antd";
import {
  LoadingOutlined,
  PlusOutlined,
  // UploadOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
// import imgTest from "../../../assets/test.jpg";
// import { v4 as uuid_v4 } from "uuid";
library.add(fas);

const { confirm } = Modal;
// const groupData = ["รถนายก", "รถกู้ภัย", "วังดัง", "สำนักข่าว"];
// let groupDataArray = groupData.map((itm, index) => {
//   return { itemNo: index + 1, itemName: itm, onDeleted: false };
// });

// https://medium.com/swlh/0-aca5522c14c8
// isTokenExpired(accessToken)
// https://ant.design/components/upload/ -Pictures Wall
// url: "http://192.168.43.129:8000/uploads/news/test.jpg",

const NewsgroupList = (props) => {
  if (props.nid) {
    // props.setGroupData({ id: 1, name: "แบบร่าง" });
  }

  const { itemListData } = props;

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const { data } = await axiosInstance.get("/backend/group");
  //     console.log(data);
  //     setItemListData(data);
  //   };
  //   fetchData();
  // }, []);

  return (
    <>
      <List
        className="list-group-name"
        grid={{
          gutter: 0,
        }}
        style={{ padding: 12 }}
        dataSource={itemListData}
        renderItem={(item) => (
          <List.Item
            style={{
              margin: 0,
              padding: "4px 0",
              height: 41,
              borderBottom: "1px solid #e0e0e0",
            }}
          >
            <div style={{ textAlign: "left", width: "100%" }}>
              <div
                style={{
                  fontSize: 16,
                  width: "calc(100% - 35px)",
                  display: "inline-block",
                }}
              >{`${item.id}. ${item.groupName}`}</div>

              <Button
                type="text"
                danger
                icon={<PlusCircleOutlined />}
                onClick={() => {
                  props.setGroupData({ id: item.id, name: item.groupName });
                  props.setGroupIcon(false);
                }}
              />
            </div>
          </List.Item>
        )}
      />
    </>
  );
};

const NewsFormSection = (props) => {
  // const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const { nid, newsData, fileList, setFileList, itemListData, groupData } =
    props;
  // const imgOld = [...fileList];
  const [fileListBkk, setFileListBkk] = useState([]);

  // console.log(newsData);
  // console.log(newsData.imageData.uid);

  const [loading, setLoading] = useState(false);
  // const [fileList, setFileList] = useState(newsData.imageData || []);
  const [itemEdit, setItemEdit] = useState(null);
  const [itemGroup, setItemGroup] = useState(groupData);

  if (setItemGroup || itemEdit || setItemEdit) {
  }

  const setGroupName = () => {
    window.setTimeout(function () {
      if (Number(nid)) {
        console.log("newsData.group_id: ", newsData.group_id);
        const gName = itemListData.find(
          (element) => newsData.group_id === element.id
        );
        form.setFieldsValue({
          newsGroupName: itemGroup.name
            ? itemGroup.name
            : gName
            ? gName.groupName
            : null,
          newsTitle: newsData ? newsData.newsName : null,
          newsDesc: newsData ? newsData.newsDesc : null,
        });
      }
    }, 300);
  };

  if (nid) {
    setGroupName();
  }

  const getGroupData = (name) => {
    if (!name || !itemListData) return null;
    console.log("itemListData: ", itemListData);
    console.log("groupName: ", name);
    const gData = itemListData.find((itm) => name === itm.groupName);
    console.log("groupCode: ", gData.groupCode);
    // console.log("gData: ", gData);
    return gData;
  };

  const onSave = (values) => {
    console.log("Received values of form: ", values);
    if (fileList.length > 0) console.log("fileList: ", fileList);

    if (!values) return;
    const gData = getGroupData(values.newsGroupName);
    // console.log("gData: ", gData.groupCode);
    if (!gData) return;

    let formData = new FormData();
    // console.log("fileList originFileObj", fileList);
    formData.append("newsName", values.newsTitle);
    formData.append("newsDesc", values.newsDesc);
    formData.append("newsGroupId", gData.id);
    formData.append("newsGroupCode", gData.groupCode);

    //formData.append("file", this.state.fileList[0].originFileObj);
    // fileList[0].originFileObj.name = Date.now() + "_" + uuid_v4() + ".jpg";
    if (fileList.length > 0) {
      formData.append("newsImage", fileList[0].originFileObj);
      console.log(" fileList[0]: ", fileList[0]);
    }
    // console.log("formData: ", formData);

    axiosInstance
      .post("/backend/news", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then(
        (response) => {
          // console.log("get OK:");
          if (response) onReset();
          notification.info({
            message: `Process Success.`,
          });
        },
        (err) => {
          console.log("Process Failed!", err);
          notification.error({
            message: `Process Failed!`,
          });
        }
      );
  };

  const onUpdate = (values) => {
    if (!nid) return;
    console.log("Received values of form: ", values);
    if (fileList.length > 0) console.log("fileList: ", fileList);

    if (!values) return;
    const gData = getGroupData(values.newsGroupName);
    // console.log("gData: ", gData.groupCode);
    if (!gData) return;

    let formData = new FormData();
    // console.log("fileList originFileObj", fileList);
    formData.append("newsName", values.newsTitle);
    formData.append("newsDesc", values.newsDesc);
    formData.append("newsGroupId", gData.id);
    formData.append("newsGroupCode", gData.groupCode);

    //formData.append("file", this.state.fileList[0].originFileObj);
    // fileList[0].originFileObj.name = Date.now() + "_" + uuid_v4() + ".jpg";
    if (fileList.length > 0) {
      formData.append("newsImage", fileList[0].originFileObj);
      formData.append("newsImageName", fileList[0].name);
      console.log("fileList: ", fileList[0].name);
      // return;
    }

    axiosInstance
      .patch("/backend/news/" + nid, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then(
        (response) => {
          // console.log("get OK:");
          if (response) {
          }
          notification.info({
            message: `Update Success.`,
          });
        },
        (err) => {
          console.log("Process Failed !", err);
          notification.error({
            message: `Update Failed !`,
          });
        }
      );
  };

  const onFinish = (values) => {
    if (Number(nid)) {
      console.log("Edit", nid, values);
      onUpdate(values);
    } else {
      console.log("Create", values);
      onSave(values);
    }
  };

  const onReset = () => {
    // console.log("fileListBkk", fileListBkk, Array.isArray(fileListBkk));
    // console.log("imgOld", imgOld);
    // console.log("newsImage", form.getFieldValue("newsImage"), fileList.length);
    // const img = form.getFieldValue("newsImage");
    if (fileList.length) setFileListBkk(fileList);
    setFileList([]);
    form.resetFields();
    // form.resetFields(["newsImage"]);
    // console.log("fileList", fileList, img);
    if (Number(nid) && Array.isArray(fileListBkk)) setFileList(fileListBkk);
    setGroupName();
  };

  const showConfirm = () => {
    if (fileList.length === 0) return false;
    console.log("newsImage", form.getFieldValue("newsImage"), fileList.length);

    confirm({
      icon: <ExclamationCircleOutlined />,
      content: <span>Click to remove image!</span>,
      onOk() {
        form.resetFields(["newsImage"]);
        if (fileList.length) setFileListBkk(fileList);
        setFileList([]);
        // asyncCall();
      },
      onCancel() {
        // setFileList(imgArray);
        // console.log("Cancel");
        // console.log(Buffer.from("Hello World").toString("hex"));
      },
    });
    return false;
  };

  const propsImage = {
    beforeUpload: (file) => {
      setLoading(true);
      console.log("beforeUpload");
      const isJpgOrPng = file.type === "image/jpeg"; // || file.type === "image/png";
      if (!isJpgOrPng) {
        //message.error("You can only upload JPG/PNG file!");
        setLoading(false);
        message.error("You can only upload JPG file!");
        return Upload.LIST_IGNORE;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        setLoading(false);
        message.error("Image must smaller than 2MB!");
        return Upload.LIST_IGNORE;
      }
      setLoading(false);
      //file.name = Date.now() + "_" + uuid_v4() + ".jpg";
      return false;
      // return isJpgOrPng && isLt2M ? true : Upload.LIST_IGNORE;
    },
    onChange: (info) => {
      setLoading(false);
      if (info.file.status === "uploading") {
        //this.setState({ loading: true });
        // console.log("info.file.status : uploading");
        return;
      }
      //console.log("info.file.status", info.file.status);
      if (info.fileList.length > 1) {
        info.fileList.shift();
        // console.log("info.fileList.shift()");
      }
      if (info.fileList.length > 1) {
        info.fileList.shift();
        // console.log("info.fileList.shift()");
      }

      setFileList(info.fileList);
    },
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload Image</div>
    </div>
  );

  return (
    <>
      <div>
        <Form
          name="basicNewsForm"
          onFinish={onFinish}
          className="basic-news-form"
          style={{ position: "relative" }}
          form={form}
          initialValues={{
            newsGroupName: itemGroup.name || "แบบร่าง",
            // newsTitle: null,
            // newsDesc: null,
          }}
        >
          <Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              style={{ margin: "0 8px 0 0" }}
            >
              Save
            </Button>
            <Button
              htmlType="button"
              style={{ margin: "0 8px 0 0" }}
              onClick={onReset}
            >
              Reset
            </Button>
            <Button
              htmlType="button"
              style={{ margin: "0 8px 0 0" }}
              icon={<DeleteFilled style={{ color: "red" }} />}
              onClick={() => showConfirm()}
            >
              Img
            </Button>
          </Form.Item>
          <Form.Item
            onClick={() => props.setGroupIcon(!props.groupIcon)}
            style={{ position: "absolute", top: 0, right: 0 }}
            name="newsGroupName"
            rules={[
              {
                required: true,
                message: "Select Group!",
              },
            ]}
          >
            <Input
              placeholder="Group"
              readOnly={true}
              style={{ maxWidth: 120 }}
              prefix={
                <FontAwesomeIcon
                  icon={["fas", "border-all"]}
                  style={{ marginRight: 4, fontSize: "110%", opacity: 0.5 }}
                />
              }
            />
          </Form.Item>
          <Form.Item
            name="newsTitle"
            rules={[
              {
                required: true,
                message: "Please input Title!",
              },
            ]}
          >
            <Input.TextArea
              placeholder="Title"
              style={{ resize: "none", overflow: "hidden" }}
              rows="2"
              maxLength="90"
            />
          </Form.Item>
          <Form.Item
            name="newsDesc"
            rules={[
              {
                required: true,
                message: "Please input Description!",
              },
            ]}
          >
            <Input.TextArea
              placeholder="Description"
              maxLength="800"
              rows={8}
              style={{
                overflow: "hidden",
                overflowY: "scroll",
                maxWidth: "100%",
                resize: "none",
              }}
            ></Input.TextArea>
          </Form.Item>

          <Form.Item
            style={{ margin: 0 }}
            name="newsImage"
            rules={[
              {
                required: fileList.length === 0,
                message: "Please upload Image!",
              },
            ]}
          >
            <Upload
              {...propsImage}
              name="imageNewsUpload"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={{ showRemoveIcon: true, showPreviewIcon: false }}
              fileList={fileList}
              // file={[]}
              // file={Array.isArray(newsData.imageData) && newsData.imageData[0]}
              // onPreview={(file) => console.log("Your upload file:", file)}
              onRemove={() => showConfirm()}
            >
              {fileList.length < 1 && uploadButton}
            </Upload>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

const MgNewsFormPage = () => {
  const { nid } = useParams();
  let history = useHistory();

  const [itemListData, setItemListData] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [groupIcon, setGroupIcon] = useState(false);
  const [groupData, setGroupData] = useState({});
  const [newsData, setNewsData] = useState({});

  const getImageData = (newsData) => {
    const pathImg = newsData.newsImagePath;
    if (!pathImg) return [];
    const path2Url = (path) => {
      return (
        BASE_URL +
        "/" +
        [...path.split("\\")].filter((itm, index) => index > 0 && itm).join("/")
      );
    };
    console.log(path2Url(pathImg));
    return [
      {
        uid: "-1",
        name: pathImg.split("\\")[pathImg.split("\\").length - 1],
        status: "done",
        url: path2Url(pathImg),
      },
    ];
  };

  useEffect(() => {
    const fetchData = async (id) => {
      const { data } = await axiosInstance.get("/backend/news/" + id);
      // console.log("news", data);
      // console.log("nid", nid);
      if (data.id === Number(id) && Number(id)) {
        // data.imageData = getImageData(data);
        setNewsData(data);
        setFileList(getImageData(data));
        console.log("data.imageData", data.imageData);
      }

      // console.log(data !== null, data);
    };
    const fetchGroupData = async () => {
      const { data } = await axiosInstance.get("/backend/group");
      console.log("group", data);
      setItemListData(data);
      // console.log("nid", nid);
    };

    if (nid) {
      fetchData(nid);
    }
    fetchGroupData();
  }, [nid]);

  //"primary"
  const [groupFindActive, setGroupFindActive] = useState(false);

  const handleCancel = () => {
    history.push("/mg-news/");
  };

  document.body.style.position = "";
  document.body.style.top = "";

  if (!isLoggedIn()) {
    return <Redirect to={"/"} />;
  }

  const btSize = "default";
  let newsMode = "เพิ่มข่าว";
  if (nid) {
    newsMode = `แก้ไขข่าว [ ${nid} ]`;
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
            ฟอร์มข่าวหวย
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
          style={{ padding: 0, maxWidth: 414 }}
        >
          <div
            style={{
              padding: 12,
              backgroundColor: "#f5f5f5",
              position: "relative",
            }}
          >
            <h3 style={{ margin: 0, marginTop: 3 }}>{newsMode}</h3>
            <div style={{ position: "absolute", right: 12, top: 12 }}>
              <Button
                style={{ padding: "4px 8px", width: 68 }}
                type={groupIcon ? "primary" : "dashed"}
                icon={
                  <FontAwesomeIcon
                    icon={["fas", "border-all"]}
                    style={{ marginRight: 8, fontSize: "110%" }}
                  />
                }
                size={btSize}
                onClick={() => setGroupIcon(!groupIcon)}
              >
                กลุ่ม
              </Button>
            </div>
          </div>
          {groupIcon && (
            <div style={{ textAlign: "left", position: "relative" }}>
              <div>
                <h4
                  className="profile-section-border"
                  style={{ padding: "11px 0", margin: "0 12px" }}
                >
                  โปรดเลือกกลุ่มข่าว
                </h4>
                <div style={{ position: "absolute", right: 12, top: 8 }}>
                  <Input
                    style={{ width: groupFindActive ? 250 : 68 }}
                    prefix={<SearchOutlined className="site-form-item-icon" />}
                    placeholder="กลุ่ม"
                    onFocus={() => setGroupFindActive(true)}
                    // onBlur={() => setGroupFindActive(false)}
                  />
                </div>
              </div>

              <NewsgroupList
                itemListData={itemListData}
                setGroupData={setGroupData}
                setGroupIcon={setGroupIcon}
              />
            </div>
          )}

          {!groupIcon && (
            <div style={{ padding: 10 }}>
              <NewsFormSection
                nid={nid}
                setGroupData={setGroupData}
                setGroupIcon={setGroupIcon}
                itemListData={itemListData}
                groupData={groupData}
                newsData={newsData}
                fileList={fileList}
                setFileList={setFileList}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MgNewsFormPage;
