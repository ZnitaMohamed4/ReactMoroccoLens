import styles from "./style";
import Navbar from "./Components/navbar/Navbar";
import Home from "./Components/home/Home";
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Components/Dashboard.jsx';
import Chat from "./Components/Chat.jsx";

  const App = () => (
    <div className="bg-white w-full overflow-hidden">
      <div className="mb-10">
        <div className={` ${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <Navbar />
          </div>
        </div>
      </div>
      
      <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Chat />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </div>
  );

  export default App;