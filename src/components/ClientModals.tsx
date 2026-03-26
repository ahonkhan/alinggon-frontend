"use client";

import dynamic from "next/dynamic";

export const AdminGalleryModal = dynamic(() => import("@/components/AdminGalleryModal").then(m => m.AdminGalleryModal), { ssr: false });
export const CreateTicketModal = dynamic(() => import("@/components/support/CreateTicketModal"), { ssr: false });
export const ImageViewerModal = dynamic(() => import("@/components/support/ImageViewerModal"), { ssr: false });

export default function ClientModals() {
  return (
    <>
      <AdminGalleryModal />
      <CreateTicketModal />
      <ImageViewerModal />
    </>
  );
}
