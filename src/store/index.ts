import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import type { PersistConfig } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { booksApi } from '../api/booksApi';
import bookmarksReducer from './bookmarksSlice';
import type { BookmarksState } from './bookmarksSlice';

const bookmarksPersistConfig: PersistConfig<BookmarksState> = {
  key: 'bookmarks',
  storage: AsyncStorage,
};

export const store = configureStore({
  reducer: {
    [booksApi.reducerPath]: booksApi.reducer,
    bookmarks: persistReducer(bookmarksPersistConfig, bookmarksReducer) as unknown as typeof bookmarksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(booksApi.middleware),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
