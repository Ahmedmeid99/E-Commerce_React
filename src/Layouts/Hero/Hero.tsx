import React from "react";
import styles from "./Hero.module.css";

function Hero() {
  return (
    <div className={`${styles.img_container}`}>
      <h1>One Store For Everything</h1>
      <p>Shop our collection of clothing, accessories, and more!</p>
    </div>
  );
}

export default React.memo(Hero);
