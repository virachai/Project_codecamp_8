// import { library } from "@fortawesome/fontawesome-svg-core";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { fas } from "@fortawesome/free-solid-svg-icons";
// library.add(fas);
import { NavLink } from "react-router-dom";
import "./index.css";

const imgFeature =
  "https://s.isanook.com/ho/0/rp/rc/w535h321/ya0xa0m1w0/aHR0cHM6Ly9zLmlzYW5vb2suY29tL2hvLzAvdWQvNDEvMjA3NDQ1L25ld3Byb2plY3QtMjAyMS0wNi0wMXQxNTIzLmpwZw==.jpg";

const contentStyle = {
  height: "100%",
  maxHeight: "320px",
  color: "#000",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const NewsBlog = (props) => {
  if (!props.newsData) return <></>;

  const { newsName, id, imageURL } = props.newsData;
  return (
    <div>
      <article className="PostStandard highlight" style={{ contentStyle }}>
        <div className="gb-post-standard-thumbnail thumbnail highlight ">
          <NavLink to={"/news/" + id}>
            <div
              className="thumbnailImg"
              style={{
                height: 240,
                maxHeight: 240,
                overflow: "hidden",
                zIndex: 20,
              }}
            >
              <img
                src={imageURL || imgFeature}
                style={{
                  maxWidth: "100%",
                  minHeight: 240,
                  objectFit: "cover",
                  zIndex: 10,
                }}
                alt={newsName}
              />
            </div>
          </NavLink>
        </div>
        <div className="desc">
          <div className="PostBody highlight" style={{ padding: "4px 8px" }}>
            <h3
              className="postTitle gb-post-standard-title"
              style={{ contentStyle, height: 62 }}
            >
              <NavLink
                // title="title"
                to={"/news/" + id}
                style={{
                  color: "#212121",
                  fontFamily: "kanit",
                  fontSize: 20,
                }}
              >
                {newsName}
              </NavLink>
            </h3>
          </div>
        </div>
      </article>
    </div>
  );
};

export default NewsBlog;
