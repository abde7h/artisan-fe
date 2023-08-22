import { redirect, useRouter } from "next/navigation";
import Modal from "../app/components/Modal";
import ProductForm from "@/app/components/ProductForm";
import { getCookie } from 'cookies-next';
import { UserLoggedInterface } from "@/lib/types";
import { useState } from "react";

const CreateProduct = () => {
  // const router = useRouter();

  // if (!getCookie("userLogged")) router.push("/login");
  // const userLogged = getUserLogged();

  const userLoggedCookie: any = getCookie("userLogged");
  let userLoggedString: string | null = null;
  if (userLoggedCookie)
    userLoggedString = userLoggedCookie.toString();

  let userLogged: UserLoggedInterface | null = null;
  if (userLoggedString)
    userLogged = JSON.parse(userLoggedString);

  return (
    //<Modal>
    <>
      <div className="flex items-center flex-col bottom-0">
        <h3 className="md:text-5xl text-3xl font-extrabold text-left max-w-5xl w-full">Create a New Product</h3>

        <ProductForm type="create" artisan={userLogged} />
      </div>
    </>
    //</Modal>
  );
};

export default CreateProduct;