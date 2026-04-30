import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Book } from '../types';

export interface BookmarksState {
  items: Record<string, Book>;
}

const initialState: BookmarksState = {
  items: {},
};

const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    toggleBookmark(state, action: PayloadAction<Book>) {
      const book = action.payload;
      if (state.items[book.key]) {
        delete state.items[book.key];
      } else {
        state.items[book.key] = book;
      }
    },
    clearBookmarks(state) {
      state.items = {};
    },
  },
});

export const { toggleBookmark, clearBookmarks } = bookmarksSlice.actions;
export default bookmarksSlice.reducer;
