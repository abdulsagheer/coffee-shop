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
  return {
    paths: [{ params: { id: "0" } }, { params: { id: "1" } }],
    fallback: false,
  };
}

const CoffeeStore = (props) => {
  const router = useRouter();

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>CoffeeStore - {router.query.id}</h1>
      <button>
        <Link href="/">Back to Home</Link>
      </button>
      <p>{props.coffeeStore.address}</p>
      <p>{props.coffeeStore.name}</p>
    </div>
  );
};

export default CoffeeStore;
