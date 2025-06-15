  import styles from "./style";
  import { Billing, Business, CardDeal, CTA, Footer, Navbar, Stats,  Hero, Chat, PingTest } from "./Components";

  const App = () => (
    <div className="bg-white w-full overflow-hidden">
      <div className={` ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>

      <div className={`bg-primary ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Hero />
        </div>
      </div>
      
      <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Stats />
          <Chat />
          <Business />
          <Billing />
          <CardDeal />
          <CTA />
          <Footer />
          <div>
            <h1 className="text-xl font-bold text-center">Frontend</h1>
            <PingTest />
          </div>
        </div>
      </div>
    </div>
    
    
  );

  export default App;