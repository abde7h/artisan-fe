import { useRouter } from "next/navigation";
import ProductForm from "@/app/components/ProductForm";
import { getUserLogged } from "@/lib/actions";

const CreateProduct = () => {
  //const router = useRouter();

  const userLogged = getUserLogged();
  //if (!userLogged) router.push("/login");

  return (
    <>
        {userLogged && (
          <ProductForm type="create" artisan={userLogged} />
        )}
    </>
  );
};

export default CreateProduct;