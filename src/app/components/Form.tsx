import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Mensaje from './Mensaje';
import { CategoryInterface, ProductInterface } from '../../common.types'

interface Params {
    postEditar: ProductInterface;
}

function Form({ postEditar }: Params) {

    const { data: session } = useSession()
    const [listaCategorias, setListaCategorias] = useState<CategoryInterface[]>([])
    const [mensaje, setMensaje] = useState("")
    const [loading, setLoading] = useState(false);

    const [id, setId] = useState<string>()
    const [artisan, setArtisan] = useState<number>()
    const [name, setName] = useState<string>()
    const [image, setImage] = useState<string>()
    const [description, setDescription] = useState<string>()
    const [price, setPrice] = useState<number>()
    const [category, setCategory] = useState<number>()
    const [creationDate, setCreationDate] = useState<string>()
    const [sold, setSold] = useState<boolean>()
    const [user, setUser] = useState<number | null>()
    const [buyDate, setBuyDate] = useState<string | null>()

    useEffect(() => {
        fetch("https:localhost:8080/1.0.0/category")
            .then(async res => await res.json())
            .then(res => {
                setListaCategorias(res.results)
            })
            .catch(err => {
                console.error(err)
            })
    }, [])

    useEffect(() => {
        if (Object.keys(postEditar).length > 0) {
            setId(postEditar.product_id)
            setArtisan(postEditar.artisan_id)
            setName(postEditar.name)
            setImage(postEditar.image)
            setDescription(postEditar.description)
            setPrice(postEditar.price)
            setCategory(postEditar.category_id)
            setCreationDate(postEditar.creation_date)
            setSold(postEditar.sold)
            setUser(postEditar.user_id)
            setBuyDate(postEditar.buy_date)
        }
    }, [])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //setArtisan(session.user.email)
        setArtisan(1)

        const fecha = new Date(); // Fecha actual
        const year = fecha.getFullYear();
        const month = String(fecha.getMonth() + 1).padStart(2, '0'); // Agregamos '0' al mes si tiene un solo dígito
        const day = String(fecha.getDate()).padStart(2, '0'); // Agregamos '0' al día si tiene un solo dígito
        setCreationDate(`${year}-${month}-${day}`)

        if ([name, image, description].includes("") || (price || category) === 0) {
            setMensaje("Todos los campos són obligatorios!")

            setTimeout(() => {
                setMensaje("")
            }, 3000);
            return;
        }

        //guardarGasto({ nombre, cantidad, categoria, id, fecha })
    }

    return (
        <div>
            <form
                onSubmit={handleSubmit}
            >
                <legend>{postEditar.name ? "Editar Gasto" : "Nuevo Gasto"}</legend>
                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

                <div className="campo">
                    <label htmlFor="name">Nombre</label>

                    <input
                        id="name"
                        type="text"
                        placeholder="Añade el Nombre del Producto"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>

                <div className="campo">
                    <label htmlFor="description">Descripción</label>

                    <input
                        id="description"
                        type="text"
                        placeholder="Añade la Descripción del Producto"
                        value={name}
                        onChange={e => setDescription(e.target.value)}
                    />
                </div>

                <div className="campo">
                    <label htmlFor="image">Imagen</label>

                    <input
                        id="image"
                        type="text"
                        placeholder="Añade la Imagen del Producto"
                        value={name}
                        onChange={e => setImage(e.target.value)}
                    />
                </div>

                <div className="campo">
                    <label htmlFor="price">Precio</label>

                    <input
                        id="price"
                        type="number"
                        placeholder="Añade el Precio del Producto"
                        value={name}
                        onChange={e => setPrice(Number(e.target.value))}
                    />
                </div>

                <div className="campo">
                    <label htmlFor="categoria">Categoría</label>

                    <select
                        id="categoria"
                        value={category}
                        onChange={e => setCategory(Number(e.target.value))}
                    >
                        <option value="0">-- Seleccione --</option>
                        <option value="ahorro">Ahorro</option>
                        {listaCategorias.map((categoria) => (
                            <option value={categoria.category_id}>{categoria.name}</option>
                        ))}
                    </select>
                </div>

                <button type='submit'>
                    {loading ? <Image src="/loading-indicator.png"
                        width={30}
                        height={30}
                        alt='loading'
                        className='animate-spin' /> :
                        postEditar.name ? "Guardar Cambios" : "Crear Producto"}
                </button>
            </form>
        </div>
    )
}

export default Form