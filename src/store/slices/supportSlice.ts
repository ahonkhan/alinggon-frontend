import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SupportState {
    isCreateModalOpen: boolean;
    imageViewerUrl: string | null;
}

const initialState: SupportState = {
    isCreateModalOpen: false,
    imageViewerUrl: null,
};

const supportSlice = createSlice({
    name: 'support',
    initialState,
    reducers: {
        openCreateModal: (state) => {
            state.isCreateModalOpen = true;
        },
        closeCreateModal: (state) => {
            state.isCreateModalOpen = false;
        },
        openImageViewer: (state, action: PayloadAction<string>) => {
            state.imageViewerUrl = action.payload;
        },
        closeImageViewer: (state) => {
            state.imageViewerUrl = null;
        },
    },
});

export const { openCreateModal, closeCreateModal, openImageViewer, closeImageViewer } = supportSlice.actions;
export default supportSlice.reducer;
