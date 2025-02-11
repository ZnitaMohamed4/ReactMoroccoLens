import { moroccan_road } from "../assets";
import styles, { layout } from "../style";
import Button from "./Button";

const CardDeal = () => (
  <section className={layout.section}>
    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>
        Threads of Time <br className="sm:block hidden" /> Morocco’s Living <span className="text-gradient">Heritage</span>
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
      From the rich textures of handwoven tapis to the flowing elegance of traditional attire, Morocco’s artistry weaves history into every thread. Wander through a world where fabric, form, and folklore come together in timeless beauty.
      </p>

      <Button styles={`mt-10`} />
    </div>

    <div className={layout.sectionImg}>
      <img src={moroccan_road} alt="billing" className="w-[85%] h-[75%] relative z-[5] object-cover" />
    </div>
  </section>
);

export default CardDeal;