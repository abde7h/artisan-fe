import { createNewProduct, updateProduct } from '@/lib/actions'
import { FormProductState, ProductInterface, UserLoggedInterface } from '@/lib/types'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import FormField from './FormField'
import CustomMenu from './create-product/CustomMenu'
import Button from './Button'
import Image from 'next/image';

type Props = {
  type: string,
  artisan: any,
  product?: ProductInterface
}

const ProductForm = ({ type, artisan, product }: Props) => {
  const router = useRouter();

  const [submitting, setSubmitting] = useState<boolean>(false);
  
  const [form, setForm] = useState<FormProductState>({
    artisan_id: artisan?.user?.id,
    name: product?.name || "",
    image: product?.image || "",
    description: product?.description || "",
    price: product?.price || 0,
    category_id: product?.category_id || "",
    creation_date: product?.creation_date || "" /*new Date().toLocaleDateString()*/,
    sold: product?.sold || false,
    user_id: product?.user_id || null,
    buy_date: product?.buy_date || null,
  });

  const listaCategorias = [{
    category_id: '1',
    name: 'Electrónica'
  },
  {
    category_id: '2',
    name: 'Ropa'
  },
  {
    category_id: '3',
    name: 'Hogar'
  }];

  const handleStateChange = (fieldName: keyof FormProductState, value: string) => {
    setForm((prevForm) => ({ ...prevForm, [fieldName]: value }));
  };

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.includes('image')) {
      alert('Porfavor sube una imagen!');

      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      const result = reader.result as string;

      handleStateChange("image", result)
    };
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true)

    try {
      if (type === "create") {
        await createNewProduct(form, artisan.user.id)

        router.push("/")
      }

      if (type === "edit") {
        await updateProduct(form, artisan.user.id)

        router.push("/")
      }

    } catch (error) {
      alert(`Ha habido un problema al ${type === "create" ? "crear" : "editar"} el proyecto. ¡Inténtalo de nuevo!`);
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleFormSubmit}
      className="flex items-center justify-start flex-col w-full lg:pt-24 pt-12 gap-10 text-lg max-w-5xl mx-auto">
      <div className="flex items-center justify-start w-full lg:min-h-[400px] min-h-[200px] relative">
        <label htmlFor="poster" className="flex justify-center items-center z-10 text-center w-full h-full p-20 text-black border-2 border-black border-dashed">
          {!form.image && 'Elige una imagen para tu producto'}
        </label>
        <input
          id="image"
          type="file"
          accept='image/*'
          required={type === "create" ? true : false}
          className="absolute z-30 w-full opacity-0 h-full cursor-pointer"
          onChange={(e) => handleChangeImage(e)}
        />
        {form.image && (
          <Image
            src={form?.image}
            className="sm:p-10 object-contain z-20" alt="image"
            fill
          />
        )}
      </div>

      <FormField
        title="Nombre"
        state={form.name}
        placeholder="Nombre"
        setState={(value) => handleStateChange('name', value)}
      />

      <FormField
        title='Descripción'
        state={form.description}
        placeholder="Showcase and discover remarkable developer projects."
        isTextArea
        setState={(value) => handleStateChange('description', value)}
      />

      <FormField
        type="number"
        title="Precio"
        state={form.price}
        //placeholder="https://jsmastery.pro"
        setState={(value) => handleStateChange('price', value)}
      />

      <CustomMenu
        title="Categoria"
        state={form.category_id}
        categories={listaCategorias}
        setState={(value) => handleStateChange('category_id', value)}
      />

      <div className="flexStart w-full">
        <Button
          title={submitting ? `${type === "create" ? "Creating" : "Editing"}` : `${type === "create" ? "Create" : "Edit"}`}
          type="submit"
          leftIcon={submitting ? "" : "/plus.svg"}
          submitting={submitting}
        />
      </div>
    </form>
  )
}

export default ProductForm