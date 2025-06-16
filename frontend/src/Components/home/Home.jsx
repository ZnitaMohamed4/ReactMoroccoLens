import styles from "../../style";
import { Billing, Business, CardDeal, CTA, Stats, Hero } from "../";
import Footer from "../footer/Footer";
  
const Home = () => (
    <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
            <Hero />
            <Stats />
            <Business />
            <Billing />
            <CardDeal />
            <CTA />
            <Footer />
        </div>
    </div>
);

export default Home;