// Route Switch Center Layout
import {
  // BrowserRouter as Router,
  Switch,
  Route,
  // useLocation,
} from "react-router-dom";
import HomeContent from "./HomeContent";
import NewsContent from "./NewsContent";
import LottoContent from "./LottoContent";
import SearchContent from "./SearchContent";

function CenterRoute() {
  // const location = useLocation();
  return (
    <>
      {/* {location.pathname} */}
      {/* <Router> */}
      <Switch>
        <Route exact path="/">
          <HomeContent />
        </Route>
        <Route path="/news/">
          <NewsContent />
        </Route>
        <Route path="/lotto/">
          <LottoContent />
        </Route>
        <Route path="/lotto-stat/">
          <LottoContent />
        </Route>
        <Route path="/number-checker/">
          <SearchContent />
        </Route>
      </Switch>
      {/* </Router> */}
    </>
  );
}

export default CenterRoute;
