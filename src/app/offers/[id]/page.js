"use client"
import React, { use, useState, useEffect } from 'react';
import axios from 'axios';
import { URL } from '@/utils/constants';
import Header from '@/component/header';
import Loader from '@/ui/loader';
import Image from 'next/image';

const OfferDetail = ({ params }) => {
    const { id } = use(params); // Unwrap the params Promise
    const [offer, setOffer] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (id) {
            axios.get(`${URL}/offer/${id}`)
                .then(response => setOffer(response.data.data))
                .catch(error => console.error('Error fetching offer:', error));
        }
    }, [id]);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append('file', selectedFile);

        setUploading(true);
        try {
            const response = await axios.post(`http://localhost:3002/upload/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            const newImageUrl = `${URL}/${response.data.file.path.replace(/\\/g, '/')}`;
            setOffer((prevOffer) => ({
                ...prevOffer,
                imageUrls: [...prevOffer.imageUrls, newImageUrl],
            }));
        } catch (error) {
            console.error('Error uploading image:', error);
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (url) => {
        console.log(url);
        try {
          await axios.post('http://localhost:3002/upload/delete', { url: encodeURIComponent(url) })
            .then(res => console.log(res));
      
          setOffer((prevOffer) => ({
            ...prevOffer,
            imageUrls: prevOffer.imageUrls.filter((imageUrl) => imageUrl !== url),
          }));
        } catch (error) {
          console.error('Error deleting image:', error);
        }
      };

    if (!offer) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <Loader />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <div className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded">
                <h1 className="text-3xl font-bold mb-4">Offer Details</h1>
                <div className="space-y-4">
                    <div className="flex justify-between">
                        <span className="font-medium text-gray-700">ID:</span>
                        <span className="text-black">{offer.id}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Customer:</span>
                        <span className="text-black">{offer.customerFullName}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Yacht Name:</span>
                        <span className="text-black">{offer.yachtName}</span>
                    </div>
                </div>
                <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4">Before</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {offer.imageUrls.map((url, index) => (
                            <div key={index} className="relative">
                                <Image
                                    src={url}
                                    alt={`Offer Image ${index + 1}`}
                                    width={500}
                                    height={300}
                                    className="w-full h-auto rounded shadow"
                                />
                                <button
                                    onClick={() => handleDelete(url)}
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-700"
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4">Upload New Image</h2>
                    <input type="file" onChange={handleFileChange} />
                    <button
                        onClick={handleUpload}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        disabled={uploading}
                    >
                        {uploading ? 'Uploading...' : 'Upload'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OfferDetail;