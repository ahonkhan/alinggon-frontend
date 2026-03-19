"use client";

import { useState, useEffect } from "react";
import { X, MapPin, Building2, Home, Loader2 } from "lucide-react";
import { useAddAddressMutation, useUpdateAddressMutation } from "@/store/api/frontendApi";
import { toast } from "react-hot-toast";

interface AddressModalProps {
    address?: any;
    isOpen: boolean;
    onClose: () => void;
}

export default function AddressModal({ address, isOpen, onClose }: AddressModalProps) {
    const [type, setType] = useState(address?.type || "home");
    const [addressText, setAddressText] = useState(address?.address || "");
    const [city, setCity] = useState(address?.city || "");
    const [state, setState] = useState(address?.state || "");
    const [zipCode, setZipCode] = useState(address?.zip_code || "");
    const [isDefault, setIsDefault] = useState(address?.is_default || false);

    const [addAddress, { isLoading: isAdding }] = useAddAddressMutation();
    const [updateAddress, { isLoading: isUpdating }] = useUpdateAddressMutation();

    const isLoading = isAdding || isUpdating;

    useEffect(() => {
        if (address) {
            setType(address.type);
            setAddressText(address.address);
            setCity(address.city || "");
            setState(address.state || "");
            setZipCode(address.zip_code || "");
            setIsDefault(address.is_default || false);
        } else {
            setType("home");
            setAddressText("");
            setCity("");
            setState("");
            setZipCode("");
            setIsDefault(false);
        }
    }, [address, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = { type, address: addressText, city, state, zip_code: zipCode, is_default: isDefault };

        try {
            if (address?.id) {
                await updateAddress({ id: address.id, data }).unwrap();
                toast.success("Address updated");
            } else {
                await addAddress(data).unwrap();
                toast.success("Address added");
            }
            onClose();
        } catch (error) {
            toast.error("Failed to save address");
        }
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white rounded-[2.5rem] w-full max-w-xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
                <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">{address ? 'Edit Address' : 'Add New Address'}</h2>
                        <p className="text-[12px] font-black text-gray-800 uppercase tracking-[0.2em] mt-1">Provide your delivery details</p>
                    </div>
                    <button onClick={onClose} className="p-3 hover:bg-white rounded-2xl transition-colors text-gray-800 hover:text-red-500 shadow-sm border border-transparent hover:border-red-100">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="flex gap-4 p-1 bg-gray-100 rounded-[1.5rem]">
                        <button
                            type="button"
                            onClick={() => setType('home')}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-[1.2rem] text-[12px] font-black uppercase tracking-widest transition-all ${type === 'home' ? 'bg-white text-red-400 shadow-sm' : 'text-gray-800 hover:text-gray-600'}`}
                        >
                            <Home className="w-4 h-4" /> Home
                        </button>
                        <button
                            type="button"
                            onClick={() => setType('office')}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-[1.2rem] text-[12px] font-black uppercase tracking-widest transition-all ${type === 'office' ? 'bg-white text-red-400 shadow-sm' : 'text-gray-800 hover:text-gray-600'}`}
                        >
                            <Building2 className="w-4 h-4" /> Office
                        </button>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[11px] font-black text-gray-800 uppercase tracking-widest ml-1">Street Address</label>
                        <div className="relative">
                            <MapPin className="absolute left-4 top-4 w-5 h-5 text-gray-800" />
                            <textarea
                                value={addressText}
                                onChange={(e) => setAddressText(e.target.value)}
                                className="w-full bg-gray-50 border-2 border-transparent focus:border-red-400 focus:bg-white rounded-2xl py-4 pl-12 pr-4 text-sm font-black text-slate-700 transition-all outline-none min-h-[100px] resize-none"
                                placeholder="Enter your full address"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[11px] font-black text-gray-800 uppercase tracking-widest ml-1">City</label>
                            <input
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                className="w-full bg-gray-50 border-2 border-transparent focus:border-red-400 focus:bg-white rounded-2xl py-4 px-4 text-sm font-black text-slate-700 transition-all outline-none"
                                placeholder="City"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[11px] font-black text-gray-800 uppercase tracking-widest ml-1">Postal Code</label>
                            <input
                                type="text"
                                value={zipCode}
                                onChange={(e) => setZipCode(e.target.value)}
                                className="w-full bg-gray-50 border-2 border-transparent focus:border-red-400 focus:bg-white rounded-2xl py-4 px-4 text-sm font-black text-slate-700 transition-all outline-none"
                                placeholder="Zip"
                            />
                        </div>
                    </div>

                    <label className="flex items-center gap-3 group cursor-pointer w-fit">
                        <div
                            onClick={() => setIsDefault(!isDefault)}
                            className={`w-6 h-6 border-2 rounded-lg flex items-center justify-center transition-all ${isDefault ? 'bg-slate-900 border-slate-900' : 'border-gray-200 group-hover:border-red-300'}`}
                        >
                            {isDefault && <div className="w-2 h-2 bg-white rounded-sm" />}
                        </div>
                        <span className="text-[11px] font-black text-gray-800 uppercase tracking-widest">Set as default address</span>
                    </label>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-red-400 hover:bg-slate-900 text-white font-black py-5 rounded-[2rem] text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-red-200/50 flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50"
                        >
                            {isLoading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                "Save Address"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
