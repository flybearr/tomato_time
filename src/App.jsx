import Layout from "./layout";
import Time from "./page/time";
import List from "./page/List";
import RingTone from "./page/RingTone";
import Analytics from "./page/Analytics";
import { TimeContextProvider } from "./context/TimeContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter basename="/tomato_time">
      <TimeContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Time />} />
            <Route path="/list" element={<List />} />
            <Route path="/ring" element={<RingTone />} />
            <Route path="/analytics" element={<Analytics />} />
          </Route>
        </Routes>
      </TimeContextProvider>
    </BrowserRouter>
  );
}

export default App;
