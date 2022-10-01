import Image from "next/image";
import Link from "next/link";
import styles from "./Card.module.scss";
import cls from "classnames";

const Card = ({ title, image, href }) => {
  return (
    <Link href={href}>
      <a className={styles.cardLink}>
        <div className={cls("glass", styles.container)}>
          <div className={styles.cardHeaderWrapper}>
            <h1 className={styles.cardHeader}>{title}</h1>
          </div>
          <div className={styles.cardImageWrapper}>
            <Image
              className={styles.cardImage}
              src={image}
              width={260}
              height={160}
              alt="card"
            />
          </div>
        </div>
      </a>
    </Link>
  );
};

export default Card;
