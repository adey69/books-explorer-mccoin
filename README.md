# Book Explorer

A small React Native app that searches the [Open Library](https://openlibrary.org/developers/api) catalog, lists results, and opens a detail view for any book. Built as a take-home for McCoin Virtual Assets.

## Stack

- React Native 0.85 (CLI, not Expo) + TypeScript
- React Navigation (native stack)
- Redux Toolkit + RTK Query for data fetching and cache
- AsyncStorage for bookmark persistence

## Folder structure

```
src/
  api/             RTK Query slice for Open Library
  components/      Presentational pieces (list item, search bar, states)
  hooks/           Small hooks (useDebounce)
  navigation/      Stack + param types
  screens/         Home, BookDetail
  store/           configureStore, slice, hooks, persistence middleware
  theme/           Color tokens
  types/           Shared TS types
App.tsx            Provider + bootstrap
```

## Getting started

```bash
npm install
cd ios && pod install && cd ..

npm run ios
# or
npm run android
```

If your machine isn't already set up for React Native CLI (Xcode, CocoaPods, Android SDK, JDK), follow the official [environment setup guide](https://reactnative.dev/docs/environment-setup) first.

## Features

- Search Open Library with a debounced input (400ms)
- Falls back to a default query when the input is empty so the screen never feels empty on first load
- Pull-to-refresh, loading, error, and empty states all distinct
- Tap a book to open the detail screen with cover, authors, first published year, editions, languages, subjects, and the Open Library key
- Save / unsave a book from the detail header — bookmarks survive app restarts via AsyncStorage and show a small dot on the list row

## Architecture notes

The app is intentionally split into thin layers so each piece can be tested or swapped without touching the others.

**Data layer.** All network calls go through a single RTK Query slice (`src/api/booksApi.ts`). The slice owns its base URL, the `searchBooks` endpoint, and the cache. Components consume it through the generated `useSearchBooksQuery` hook, which gives loading, fetching, error, and refetch out of the box. Caching by query argument is automatic — the same search isn't re-fetched while the cache entry is fresh.

**State layer.** Domain state that isn't server data lives in a regular slice (`bookmarksSlice`). Bookmarks are keyed by the book's Open Library key for O(1) lookup. A small custom middleware (`persistence.ts`) writes the bookmarks map to AsyncStorage whenever the slice changes, and `App.tsx` hydrates it on launch. I kept persistence as a middleware rather than pulling in `redux-persist` — the surface is small, and a 30-line middleware is easier to read than the rehydration lifecycle of a full library.

**UI layer.** Screens orchestrate; components are presentational and receive props. Loading / error / empty are separate components so each state is easy to style and easy to find.

## Why Redux Toolkit (and RTK Query)

The brief allowed Zustand or Redux Toolkit. I went with RTK because:

- The data side of this app is mostly a search endpoint plus its loading/error state, which is exactly what RTK Query is designed for. Using it avoided hand-rolling fetch + useEffect + cancellation + cache.
- For client state, `createSlice` keeps the bookmarks reducer to ~25 lines with full TypeScript inference.
- The two patterns compose cleanly in one `configureStore` call, so the whole app has a single store and a single set of devtools.

Zustand would have been fine for the bookmarks slice alone, but I'd still have wanted something for the API layer, and mixing two libraries for what is a small app felt like more cost than benefit.

## Bonus features included

- Search bar with debounce
- Bookmark persistence via AsyncStorage (custom middleware)

## Challenges

- Open Library's `/search.json` returns very fat documents by default. Requesting only the `fields` I render keeps payloads small and the list smooth on first paint.
- RTK Query's `skip` option and the empty-string query case interacted awkwardly — I ended up using a fallback query (`bestseller`) when the input is empty so there's always something on screen, instead of toggling skip and managing an extra "haven't searched yet" state.
- Native stack `headerRight` + dispatch needs to live inside `useLayoutEffect` so the header re-renders when the bookmarked flag flips. Easy to miss the first time.

## What I'd add next

- An offline cache for the last successful search so the list survives airplane mode
- A dedicated Bookmarks tab using `useAppSelector` over the slice
- Snapshot tests for the screens and a unit test for the persistence middleware
