
import styles from "./themeToggle.module.css";
import sunImg from '../../assets/Images/sun.png'
import moonImg from '../../assets/Images/moon.png'

const ThemeToggle = () => {
  
  return (
    <div id="link"
      className={styles.container}
    
    >
      <img src={moonImg} alt="" width={14} height={14} />
      <div
        className={styles.ball}
      ></div>
      <img src={sunImg} alt="" width={14} height={14} />
    </div>
  );
};

export default ThemeToggle;