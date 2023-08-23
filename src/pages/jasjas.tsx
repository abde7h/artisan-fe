import React, { useState } from 'react';

const categories = ['Categoría 1', 'Categoría 2', 'Categoría 3'];

function UploadForm() {
    const [file, setFile] = useState<File | null>(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [cost, setCost] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isPopupVisible, setPopupVisible] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        // Do something with the form data (e.g., submit to server)
        console.log('Form submitted:', {
            file,
            name,
            description,
            cost,
            selectedCategory,
        });

        // Close the popup after submitting
        setPopupVisible(false);
    };

    return (
        <div className="h-screen flex justify-center items-center">
            <button
                className="bg-blue-500 text-white py-2 px-4 rounded"
                onClick={() => setPopupVisible(true)}
            >
                Abrir Popup
            </button>

            {isPopupVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-md w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2">
                        <h1 className="text-2xl font-bold mb-4 text-center">Subir Producto</h1>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="image" className="block font-medium">Imagen</label>
                                <input
                                    type="file"
                                    id="image"
                                    onChange={handleFileChange}
                                    className="border rounded p-2 w-full"
                                />
                            </div>
                            <div>
                                <label htmlFor="name" className="block font-medium">Nombre</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    className="border rounded p-2 w-full"
                                />
                            </div>
                            <div>
                                <label htmlFor="description" className="block font-medium">Descripción</label>
                                <textarea
                                    id="description"
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                    className="border rounded p-2 w-full"
                                />
                            </div>
                            <div>
                                <label htmlFor="cost" className="block font-medium">Costo</label>
                                <input
                                    type="text"
                                    id="cost"
                                    value={cost}
                                    onChange={e => setCost(e.target.value)}
                                    className="border rounded p-2 w-full"
                                />
                            </div>
                            <div>
                                <label htmlFor="category" className="block font-medium">Categoría</label>
                                <select
                                    id="category"
                                    value={selectedCategory}
                                    onChange={e => setSelectedCategory(e.target.value)}
                                    className="border rounded p-2 w-full"
                                >
                                    <option value="">Seleccione una categoría</option>
                                    {categories.map((category, index) => (
                                        <option key={index} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white rounded p-2 w-full hover:bg-blue-600"
                            >
                                Subir Producto
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UploadForm;
