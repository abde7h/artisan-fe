import { redirect, useRouter } from "next/navigation";
import Modal from "../app/components/Modal";
import ProductForm from "@/app/components/ProductForm";
import { getCookie } from 'cookies-next';
import { UserLoggedInterface } from "@/lib/types";
import { useState } from "react";
import { getUserLogged } from "@/lib/actions";

const CreateProduct = () => {
  // const router = useRouter();

  const userLogged = getUserLogged();
  if (!userLogged) useRouter().push("/login");

  // const userLoggedCookie: any = getCookie("userLogged");
  // let userLoggedString: string | null = null;
  // if (userLoggedCookie)
  //   userLoggedString = userLoggedCookie.toString();

  // let userLogged: UserLoggedInterface | null = null;
  // if (userLoggedString)
  //   userLogged = JSON.parse(userLoggedString);

  return (
    //<Modal>
    <>

        {userLogged && (
          <ProductForm type="create" artisan={userLogged} />
        )}

    </>
    //</Modal>
  );
};

export default CreateProduct;