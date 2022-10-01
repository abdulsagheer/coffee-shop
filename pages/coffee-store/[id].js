import Link from "next/link";
import { useRouter } from "next/router";

const CoffeeStore = () => {
  const router = useRouter();
  return (
    <div>
      <h1>CoffeeStore - {router.query.id}</h1>
      <button>
        <Link href="/">Back to Home</Link>
      </button>
    </div>
  );
};

export default CoffeeStore;
