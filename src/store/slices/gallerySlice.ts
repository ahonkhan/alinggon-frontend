import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PersonalPicture } from '../api/frontendApi';

interface GalleryState {
    pictures: PersonalPicture[];
    viewerIndex: number | null;
    passwordModalId: number | null;
    unlockedPictures: Record<number, string | undefined>;
}

const initialState: GalleryState = {
    pictures: [],
    viewerIndex: null,
    passwordModalId: null,
    unlockedPictures: {},
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
    },
});

export const {
    setGalleryData,
    openViewer,
    closeViewer,
    openPasswordModal,
    closePasswordModal,
    unlockPicture,
} = gallerySlice.actions;

export default gallerySlice.reducer;
