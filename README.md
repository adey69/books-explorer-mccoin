# BookExplorer

A React Native app that searches the [Open Library](https://openlibrary.org/developers/api) catalog, lets you explore book details, and saves your favourites across sessions. Built as a take-home assessment for McCoin Virtual Assets.

> **Screenshots**
<img width="1320" height="2868" alt="Simulator Screenshot - iPhone 17 Pro Max - 2026-05-01 at 01 10 32" src="https://github.com/user-attachments/assets/d666a73d-dcef-44e5-ab7a-08fd7abe17a7" />
<img width="1320" height="2868" alt="Simulator Screenshot - iPhone 17 Pro Max - 2026-05-01 at 01 10 24" src="https://github.com/user-attachments/assets/f378f168-f13b-4c0f-94b9-2ac54b3bcc76" />
---

## Stack

| Concern       | Choice                                              |
| ------------- | --------------------------------------------------- |
| Runtime       | React Native 0.85 (bare CLI, not Expo) + TypeScript |
| Navigation    | React Navigation 7 — native stack + bottom tabs     |
| Server state  | RTK Query (inside Redux Toolkit)                    |
| Client state  | Redux Toolkit slice                                 |
| Persistence   | redux-persist + AsyncStorage                        |
| Debugging     | Reactotron (dev only)                               |
| Splash screen | react-native-bootsplash                             |

---

## Features

- **Debounced search** (400 ms) against Open Library `/search.json`; falls back to a `"bestseller"` query when the input is empty so the list is never blank on cold launch
- **Pull-to-refresh** — distinct loading, fetching, error, and empty states
- **Book detail** — cover image, authors, first published year, edition count, page count, publishers, languages, subjects, and Open Library key
- **Save / unsave** — pill button in the detail header bookmarks a book; a dot on each list card shows saved status
- **Bookmarks tab** — dedicated bottom tab listing every saved book, persisted across restarts
- **Splash screen + app icon** — custom branded assets generated from the project logo for both iOS and Android

---

## Folder structure

```
src/
  api/                 RTK Query slice (Open Library)
  assets/
    images/            Source logo (book_explorer_logo.png)
    bootsplash/        Generated splash assets
  components/          Presentational components (BookListItem, SearchBar,
                       HomeHeader, EmptyState, ErrorState, LoadingState)
  config/              ReactotronConfig (dev only)
  hooks/               useDebounce
  navigation/          RootNavigator (stack + tabs), param type definitions
  screens/
    Home/              HomeScreen + useHomeScreen + styles
    BookDetail/        BookDetailScreen + useBookDetailScreen + styles
    Bookmarks/         BookmarksScreen + useBookmarksScreen + styles
  store/               configureStore, bookmarksSlice, typed hooks
  theme/               Color tokens (warm bookstore palette)
  types/               Shared TypeScript interfaces (Book, SearchResponse)
App.tsx                Providers, PersistGate, splash hide, Toast
```

Each screen follows a strict three-file split: `ScreenName.tsx` (JSX only), `useScreenName.ts` (all logic, hooks, selectors), `styles.ts` (`StyleSheet.create` export). The rule enforces that nothing in a screen file can cause an accidental re-render from business-logic changes, and nothing in a hook file can accidentally reference a style.

---

## Getting started

```bash
yarn install
cd ios && pod install && cd ..

yarn ios
# or
yarn android
```

Requires Xcode, CocoaPods, Android SDK, and JDK. Follow the official [React Native environment setup guide](https://reactnative.dev/docs/environment-setup) if your machine is not already configured.

---

## Architecture decisions

### Screen / hook / styles split

Every screen is three files. The `.tsx` file contains only JSX and `useLayoutEffect` (needed for header options). All state, selectors, navigation calls, and callbacks live in the hook. Styles are isolated in their own file.

This split means the UI layer and the logic layer can evolve independently. It also makes the files easier to scan — a reviewer looking at the screen file only sees layout; a reviewer looking at the hook only sees behaviour.

### Data layer — RTK Query

All network traffic goes through a single `createApi` slice in `src/api/booksApi.ts`. The slice owns the base URL, the `searchBooks` endpoint definition, and the cache. Screens consume the generated `useSearchBooksQuery` hook, which provides `isLoading`, `isFetching`, `isError`, `data`, and `refetch` without any hand-rolled fetch logic or `useEffect` cancellation.

Caching is automatic and keyed by query argument — the same search is not re-fetched while its cache entry is still fresh. Field selection (`?fields=...`) is applied at the endpoint level to keep payloads small, so the list renders quickly even on slow connections.

### Client state — bookmarksSlice

Bookmarks are client state, not server state, so they live in a regular `createSlice`. Items are stored as a `Record<string, Book>` keyed by Open Library key, which gives O(1) lookup when checking whether a book is already saved.

Persistence is handled by `redux-persist` with `AsyncStorage`. The rehydration lifecycle — including the `REHYDRATE` action and the `serializableCheck` ignore list — is wired in `configureStore` and surfaced through `PersistGate` in `App.tsx`.

### Navigation — tabs nested in a stack

The root navigator is a native stack. Its first screen is a bottom tab navigator (`MainTabs`) containing the Home and Bookmarks tabs. `BookDetail` is a separate screen on the root stack, above the tabs.

This means navigating to a book's detail screen from either tab slides the detail view over the entire app — tab bar included — which is the correct native pattern. The detail screen does not need to be duplicated in each tab.

### Debugging — Reactotron

Reactotron is configured in `src/config/ReactotronConfig.ts` and conditionally loaded with the Redux enhancer only when `__DEV__` is true. The `require(...)` guard ensures the module is tree-shaken in release builds.

---

## Why Redux Toolkit over Zustand

The brief permitted either. Two technical reasons favoured RTK here, plus one practical one.

1. **The API layer.** The data side of this app is a search endpoint with loading, error, and cache behaviour. RTK Query handles all of that with a single `createApi` declaration. The common Zustand alternative is to pair it with React Query for server state — a valid pattern, but it means two separate libraries, two devtools connections, and two persistence integrations rather than one.

2. **Composability.** RTK Query's cache reducer and the bookmarks slice both live in one `configureStore` call. There is a single store, a single Redux DevTools connection, and a single `redux-persist` integration. That unity simplifies the dev setup and keeps the state graph easy to inspect end-to-end.

3. **Prior experience.** I have significantly more production experience with RTK than with Zustand. Given that the goal was to produce a well-architected submission rather than learn a new library under time pressure, defaulting to the tool I know deeply was the right call.

To be clear: Zustand + React Query is a legitimate and popular architecture. It is lighter, has less boilerplate, and suits many apps well. The choice here was not that Zustand cannot work alongside a network layer — it can — but that RTK gives a more cohesive single-store solution for this particular combination of requirements, and it is the stack I can defend in detail.

---

## Bonus features

- Debounced search with fallback query
- Bookmark persistence across sessions (redux-persist + AsyncStorage)
- Dedicated Bookmarks tab
- Copyable Open Library key with clipboard toast
- Custom splash screen and app icon
- Warm bookstore UI theme with card-style list and rich detail screen
- Reactotron integration for Redux action and state inspection during development
