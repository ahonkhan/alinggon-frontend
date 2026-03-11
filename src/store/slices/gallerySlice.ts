import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PersonalPicture } from '../api/frontendApi';

interface GalleryState {
    pictures: PersonalPicture[];
    viewerIndex: number | null;
    passwordModalId: number | null;
    unlockedPictures: Record<number, string | undefined>;
    isBulkUnlockMode: boolean;
}

const initialState: GalleryState = {
    pictures: [],
    viewerIndex: null,
    passwordModalId: null,
    unlockedPictures: {},
    isBulkUnlockMode: false,
};

const gallerySlice = createSlice({
    name: 'gallery',
    initialState,
    reducers: {
        setGalleryData: (state, action: PayloadAction<PersonalPicture[]>) => {
            state.pictures = action.payload;
        },
        openViewer: (state, action: PayloadAction<number>) => {
            state.viewerIndex = action.payload;
        },
        closeViewer: (state) => {
            state.viewerIndex = null;
        },
        openPasswordModal: (state, action: PayloadAction<number>) => {
            state.passwordModalId = action.payload;
        },
        closePasswordModal: (state) => {
            state.passwordModalId = null;
        },
        unlockPicture: (state, action: PayloadAction<{ id: number; imagePath: string }>) => {
            state.unlockedPictures[action.payload.id] = action.payload.imagePath;
        },
        openBulkPasswordModal: (state) => {
            state.isBulkUnlockMode = true;
            state.passwordModalId = -1; // Special ID for bulk
        },
        unlockAllPictures: (state, action: PayloadAction<Record<number, string>>) => {
            state.unlockedPictures = { ...state.unlockedPictures, ...action.payload };
            state.isBulkUnlockMode = false;
            state.passwordModalId = null;
        },
        resetBulkMode: (state) => {
            state.isBulkUnlockMode = false;
            state.passwordModalId = null;
        }
    },
});

export const {
    setGalleryData,
    openViewer,
    closeViewer,
    openPasswordModal,
    closePasswordModal,
    unlockPicture,
    openBulkPasswordModal,
    unlockAllPictures,
    resetBulkMode
} = gallerySlice.actions;

export default gallerySlice.reducer;
