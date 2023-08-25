import styles from "./CountryItem.module.css";

function CountryItem({ x }) {
  return (
    <li className={styles.countryItem}>
      <span>{x.emoji}</span>
      <span>{x.country}</span>
    </li>
  );
}

export default CountryItem;
