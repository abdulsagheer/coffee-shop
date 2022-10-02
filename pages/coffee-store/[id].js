import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import coffeeStoresData from "./../../data/coffee-stores.json";

export async function getStaticProps({ params }) {
  console.log("params", params.id);
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
    <div>
      <Head>
        <title>{name}</title>
      </Head>
      <h1>CoffeeStore - {router.query.id}</h1>
      <button>
        <Link href="/">Back to Home</Link>
      </button>
      <p>{address}</p>
      <p>{name}</p>
      <p>{neighbourhood}</p>
      <Image src={imgUrl} alt="coffee store" height={700} width={1200} />
    </div>
  );
};

export default CoffeeStore;
