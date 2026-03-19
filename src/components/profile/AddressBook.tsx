"use client";

import { useState } from "react";
import { MapPin, Plus, Trash2, Edit2, Home, Building2, Star } from "lucide-react";
import { useGetAddressesQuery, useDeleteAddressMutation } from "@/store/api/frontendApi";
import AddressModal from "./AddressModal";
import { toast } from "react-hot-toast";

export default function AddressBook() {
    const { data: addressesResponse, isLoading } = useGetAddressesQuery();
    const [deleteAddress] = useDeleteAddressMutation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState<any>(null);

    const addresses = addressesResponse?.data || [];

    const handleEdit = (address: any) => {
        setSelectedAddress(address);
        setIsModalOpen(true);
    };

    const handleAdd = () => {
        setSelectedAddress(null);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: number) => {
        if (window.confirm("Are you sure you want to delete this address?")) {
            try {
                await deleteAddress(id).unwrap();
                toast.success("Address deleted");
            } catch (error) {
                toast.error("Failed to delete address");
            }
        }
    };

    return (
        <div className="bg-white rounded-[2rem] border border-gray-100 p-8 md:p-12 shadow-xl shadow-slate-200/30">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center text-red-400">
                        <MapPin className="w-7 h-7" />
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-slate-800 uppercase tracking-tighter">My Addresses</h3>
                        <p className="text-[12px] font-black text-gray-800 uppercase tracking-widest mt-0.5">Manage your shipping locations</p>
                    </div>
                </div>

                <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 bg-slate-900 hover:bg-red-400 text-white font-black px-6 py-4 rounded-2xl text-[12px] uppercase tracking-widest transition-all shadow-lg active:scale-95"
                >
                    <Plus className="w-4 h-4" /> Add New Address
                </button>
            </div>

            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
                    {[1, 2].map(i => (
                        <div key={i} className="h-48 bg-gray-50 rounded-[2rem]" />
                    ))}
                </div>
            ) : addresses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {addresses.map((addr: any) => (
                        <div
                            key={addr.id}
                            className={`group relative p-8 bg-gray-50/50 rounded-[2rem] border-2 transition-all hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 ${addr.is_default ? 'border-red-100 bg-white' : 'border-transparent'}`}
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-900 shadow-sm">
                                        {addr.type === 'home' ? <Home className="w-5 h-5" /> : <Building2 className="w-5 h-5" />}
                                    </div>
                                    <span className="text-[12px] font-black text-slate-900 uppercase tracking-widest">{addr.type}</span>
                                    {addr.is_default && (
                                        <div className="bg-red-400 text-white text-[8px] font-black px-2 py-1 rounded-full uppercase tracking-widest flex items-center gap-1">
                                            <Star className="w-2 h-2 fill-white" /> Default
                                        </div>
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(addr)}
                                        className="p-2.5 hover:bg-blue-50 rounded-xl transition-colors text-gray-800 hover:text-blue-500"
                                    >
                                        <Edit2 className="w-4.5 h-4.5" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(addr.id)}
                                        className="p-2.5 hover:bg-red-50 rounded-xl transition-colors text-gray-800 hover:text-red-500"
                                    >
                                        <Trash2 className="w-4.5 h-4.5" />
                                    </button>
                                </div>
                            </div>

                            <p className="text-sm font-bold text-slate-600 leading-relaxed uppercase tracking-tight mb-2">
                                {addr.address}
                            </p>
                            <div className="text-[12px] font-black text-gray-800 uppercase tracking-widest">
                                {addr.city}{addr.state ? `, ${addr.state}` : ''} {addr.zip_code}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-gray-50/50 rounded-[3rem] border-2 border-dashed border-gray-100">
                    <MapPin className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                    <p className="text-xs font-black text-gray-800 uppercase tracking-widest">No addresses found</p>
                </div>
            )}

            <AddressModal
                isOpen={isModalOpen}
                address={selectedAddress}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
}
