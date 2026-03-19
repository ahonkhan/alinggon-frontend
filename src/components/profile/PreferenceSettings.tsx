"use client";

import { useState, useEffect } from "react";
import { Bell, Mail, Smartphone, Loader2, Settings2 } from "lucide-react";
import { useUpdatePreferencesMutation } from "@/store/api/frontendApi";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-hot-toast";

export default function PreferenceSettings() {
    const { user } = useAuth();
    const [preferences, setPreferences] = useState(user?.preferences || {
        email_notifications: true,
        order_updates: true,
        promotions: false,
        sms_alerts: false
    });
    const [updatePreferences, { isLoading }] = useUpdatePreferencesMutation();

    useEffect(() => {
        if (user?.preferences) {
            setPreferences(user.preferences);
        }
    }, [user]);

    const handleToggle = async (key: string) => {
        const newPrefs = { ...preferences, [key]: !preferences[key] };
        setPreferences(newPrefs);

        try {
            await updatePreferences({ preferences: newPrefs }).unwrap();
            toast.success("Preferences updated");
        } catch (error) {
            toast.error("Failed to update preferences");
        }
    };

    return (
        <div className="bg-white rounded-[2rem] border border-gray-100 p-8 md:p-12 shadow-xl shadow-slate-200/30">
            <div className="flex items-center gap-4 mb-10">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-400">
                    <Settings2 className="w-7 h-7" />
                </div>
                <div>
                    <h3 className="text-xl font-black text-slate-800 uppercase tracking-tighter">Preferences</h3>
                    <p className="text-[12px] font-black text-gray-800 uppercase tracking-widest mt-0.5">Customize your experience</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <PreferenceToggle
                    icon={Mail}
                    label="Email Notifications"
                    sub="Receive updates via email"
                    isEnabled={preferences.email_notifications}
                    onToggle={() => handleToggle('email_notifications')}
                    isLoading={isLoading}
                />
                <PreferenceToggle
                    icon={Bell}
                    label="Order Updates"
                    sub="Alerts about your purchase status"
                    isEnabled={preferences.order_updates}
                    onToggle={() => handleToggle('order_updates')}
                    isLoading={isLoading}
                />
                <PreferenceToggle
                    icon={Smartphone}
                    label="SMS Alerts"
                    sub="Real-time mobile notifications"
                    isEnabled={preferences.sms_alerts}
                    onToggle={() => handleToggle('sms_alerts')}
                    isLoading={isLoading}
                />
                <PreferenceToggle
                    icon={Settings2}
                    label="Promotions"
                    sub="Exclusive deals and offers"
                    isEnabled={preferences.promotions}
                    onToggle={() => handleToggle('promotions')}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
}

function PreferenceToggle({ icon: Icon, label, sub, isEnabled, onToggle, isLoading }: any) {
    return (
        <div className="flex items-center justify-between p-6 bg-gray-50/50 rounded-3xl border border-transparent hover:border-gray-200 transition-all group">
            <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${isEnabled ? 'bg-red-400 text-white' : 'bg-white text-gray-800 shadow-sm'}`}>
                    <Icon className="w-6 h-6" />
                </div>
                <div>
                    <h4 className="text-xs font-black text-slate-800 uppercase tracking-tight">{label}</h4>
                    <p className="text-[12px] font-bold text-gray-800 uppercase tracking-widest mt-0.5">{sub}</p>
                </div>
            </div>

            <button
                onClick={onToggle}
                disabled={isLoading}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors outline-none ${isEnabled ? 'bg-slate-900' : 'bg-gray-200'}`}
            >
                <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${isEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
        </div>
    );
}
