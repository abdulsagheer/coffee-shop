import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import coffeeStoresData from "./../../data/coffee-stores.json";
import styles from "../../styles/coffee-store.module.scss";

export async function getStaticProps({ params }) {
  return {
    props: {
      coffeeStore: coffeeStoresData.find(
        (coffeeStore) => String(coffeeStore.id) === params.id
      ),
    },
  };
}

export async function getStaticPaths() {
  const paths = coffeeStoresData.map((coffeeStore) => {
    return {
      params: {
        id: String(coffeeStore.id),
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
}

const CoffeeStore = (props) => {
  const router = useRouter();

  const { address, name, neighbourhood, imgUrl } = props.coffeeStore;

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <h1>CoffeeStore - {router.query.id}</h1>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHome}>
            <Link href="/">
              <a>Back to Home</a>
            </Link>
          </div>
          <div className={styles.nameWrapper}>
            <p className={styles.name}>{name}</p>
          </div>
        </div>
        <div className={styles.col2}>
          <Image
            src={imgUrl}
            alt="coffee store"
            height={360}
            width={600}
            className={styles.storeImage}
          />
          <p>{address}</p>
          <p>{neighbourhood}</p>
        </div>
      </div>
    </div>
  );
};

export default CoffeeStore;
