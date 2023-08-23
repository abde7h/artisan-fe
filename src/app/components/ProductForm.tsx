import { createNewProduct, editProduct } from '@/lib/actions'
import { CategoryInterface, FormProductState, ProductInterface, UserLoggedInterface } from '@/lib/types'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import FormField from './FormField'
import CustomMenu from './create-product/CustomMenu'
import Button from './Button'
import Image from 'next/image';
import { getCategories, uploadImage } from '@/lib/api-requests'

type Props = {
  type: string,
  artisan: UserLoggedInterface,
  product?: ProductInterface
}

const ProductForm = ({ type, artisan, product }: Props) => {
  const router = useRouter();

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [imagenData, setImagenData] = useState<File | null>(null);

  const [form, setForm] = useState<FormProductState>({
    artisan_id: artisan?.user?.id,
    name: product?.name || "",
    image: product?.image || "",
    description: product?.description || "",
    price: product?.price || 0,
    category_id: product?.category_id || "",
    creation_date: product?.creation_date || new Date().toISOString().substring(0, 10),
    sold: product?.sold || false,
    user_id: product?.user_id || null,
    buy_date: product?.buy_date || null,
    visible: product?.visible || true
  });

  let listaCategorias = [
    {
      category_id: "1",
      name: "Muebles de madera"
    },
    {
      category_id: "2",
      name: "Arte en cerámica"
    },
    {
      category_id: "3",
      name: "Esculturas en metal"
    },
    {
      category_id: "4",
      name: "Tejidos hechos a mano"
    }
  ]

  const handleStateChange = (fieldName: keyof FormProductState, value: string) => {
    setForm((prevForm) => ({ ...prevForm, [fieldName]: value }));
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.includes('image')) {
      alert('Porfavor sube una imagen!');

      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);
    setImagenData(file);

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
        await createNewProduct(form, imagenData)

        router.push("/")
      }

      if (type === "edit") {
        await editProduct(form, artisan.user.id)

        router.push("/")
      }

    } catch (error) {
      alert(`Ha habido un problema al ${type === "create" ? "crear" : "editar"} el proyecto. ¡Inténtalo de nuevo!`);
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2">
        <h1 className="text-2xl font-bold mb-4 text-center">Subir Producto</h1>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label htmlFor="image" className="block font-medium">Imagen</label>
            <input
              type="file"
              id="image"
              accept='image/*'
              required={type === "create" ? true : false}
              onChange={(e) => handleChangeImage(e)}
              className="border rounded p-2 w-full"
            />
          </div>

          <FormField
            title="Nombre"
            state={form.name}
            placeholder="Mesa de ..."
            setState={(value) => handleStateChange('name', value)}
          />

          <FormField
            title='Descripción'
            state={form.description}
            isTextArea
            placeholder="Es una mesa de ..."
            setState={(value) => handleStateChange('description', value)}
          />

          <FormField
            type="number"
            title="Precio"
            state={form.price}
            setState={(value) => handleStateChange('price', value)}
          />

          <div>
            <label htmlFor="category" className="block font-medium">Categoría</label>
            <select onChange={(e) => handleStateChange('category_id', e.target.value)} className="border rounded p-2 w-full">
              <option value="">Seleccione una categoría</option>
              {listaCategorias.map((categoria, index) => (
                <option key={index} value={categoria.category_id}>
                  {categoria.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="bg-amber-900 text-white rounded p-2 w-full hover:bg-amber-800"
          >{`${type === "create" ? "Subir Producto" : "Editar Producto"}`}</button>
        </form>
      </div>
    </div>
  )
}

export default ProductForm