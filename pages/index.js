import Head from "next/head";
import Image from "next/image";
import Banner from "../components/Banner/Banner";
import styles from "../styles/Home.module.scss";
import Hero from "../public/images/hero-image.png";
import Card from "../components/Card/Card";
import coffeeStores from "../data/coffee-stores.json";

export async function getStaticProps(context) {
  return {
    props: { coffeeStores },
  };
}

export default function Home(props) {
  console.log("first getStaticProps");
  console.log(props);
  const handleOnClickBtnClick = () => {
    console.log("Button clicked");
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Shop</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner
          buttonText={"View Stores Nearby"}
          handleOnClick={handleOnClickBtnClick}
        />
        <div className={styles.heroImage}>
          <Image src={Hero} alt="hero" />
        </div>
        <div className={styles.cardLayout}>
          {coffeeStores.map((coffeeStore) => (
            <Card
              key={coffeeStore.id}
              title={coffeeStore.name}
              image={coffeeStore.imgUrl}
              href={`/coffee-store/${coffeeStore.id}`}
              className={styles.card}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
