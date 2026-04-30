---
name: bookexplorer-conventions
description: Project-specific coding conventions, architecture rules, and patterns for BookExplorer — a React Native (bare) app that searches and bookmarks books via the Open Library API.
license: MIT
metadata:
  author: project
  version: '1.0.0'
---

# BookExplorer — Project Conventions

## Screen Folder Structure

Every screen lives in its own folder under `src/screens/ScreenName/`:

```
src/screens/
  ScreenName/
    ScreenName.tsx       ← UI and render logic only (JSX, layout, useLayoutEffect for header)
    useScreenName.ts     ← All business logic: state, derived values, callbacks, navigation, selectors
    styles.ts            ← StyleSheet.create() export named `styles`
```

**ScreenName.tsx** imports from `./useScreenName` and `./styles`. It contains no business logic — only JSX, conditional rendering, and `useLayoutEffect` when setting navigation header options (since that requires rendering JSX for the header).

**useScreenName.ts** contains all hooks, state, selectors, callbacks, and derived values. Returns a plain object consumed by the screen component.

**styles.ts** exports a single `styles` const — nothing else.

## State Management — Redux Toolkit + RTK Query

- API calls use RTK Query (`createApi` in `src/api/booksApi.ts`).
- Local/persistent state uses Redux slices (`src/store/bookmarksSlice.ts`).
- Bookmark persistence is handled by `redux-persist` with `AsyncStorage` — no manual middleware needed.
- Typed hooks (`useAppSelector`, `useAppDispatch`) are in `src/store/hooks.ts` — always use these instead of raw `useSelector`/`useDispatch`.
- Selectors must be granular: select only the specific value needed, not the whole slice.

## List Performance Rules

- `FlatList` `keyExtractor` is always hoisted to module scope (stable reference, never inline).
- `renderItem` is always wrapped with `useCallback`.
- List item components are wrapped with `React.memo` (named function form, not arrow).
- List items own their own store subscriptions (e.g. bookmark status) — the parent list does not pass derived boolean props that cause it to re-render on every toggle.
- `onPress` callbacks passed to list items use `useCallback` and accept an ID or entity (not an inline arrow function).

## Conditional Rendering

- Never use `{value && <Component />}` — use `{value ? <Component /> : null}` instead.
- This prevents hard crashes when `value` is `0` or `""`.

## Styling

- All styles live in `StyleSheet.create()` — no inline style objects in JSX (except unavoidable dynamic values inside memo'd components).
- Use `borderCurve: 'continuous'` alongside every `borderRadius`.
- Use `gap` on a parent `View` instead of `marginBottom`/`marginRight` on individual children.
- Use `gap` for spacing between elements, `padding` for space within a container.
- Use `boxShadow` CSS string syntax instead of legacy `shadowColor`/`elevation` props.

## Navigation

- Native stack navigator (`@react-navigation/native-stack`) — never JS-based navigators.
- Navigation types live in `src/navigation/types.ts`.
- `useNavigation` and `useRoute` are called inside hooks (`useScreenName.ts`), except when the screen needs `navigation` for `useLayoutEffect` (header config).

## Component Conventions

- Shared UI components live in `src/components/`.
- Components accept only what they need — avoid passing whole objects when primitives suffice.
- No component renders both business logic and JSX in the same file (screens follow the hook/UI split; components are presentational by default).
- **200-line rule:** When a component file reaches 200 lines, split it into a folder matching the screen pattern:

```
src/components/ComponentName/
  ComponentName.tsx       ← JSX only
  useComponentName.ts     ← business logic, state, callbacks (omit if purely presentational)
  styles.ts               ← StyleSheet.create() export named `styles`
```

  Export the component from `ComponentName.tsx` as the default export. Consumers import from the folder path (`../../components/ComponentName/ComponentName`) — no barrel `index.ts` needed.

## API Integration

- Base URL: `https://openlibrary.org`
- Search endpoint: `GET /search.json?q=<query>&limit=25&fields=...`
- Cover images: `https://covers.openlibrary.org/b/id/<cover_i>-M.jpg` (list) / `-L.jpg` (detail)
- Fallback query when search is empty: `'bestseller'`
- Debounce delay for search input: `400ms`

## File & Folder Layout

```
src/
  api/          ← RTK Query API slices
  components/   ← Reusable presentational components
  hooks/        ← Generic utility hooks (useDebounce, etc.)
  navigation/   ← Navigator + route type definitions
  screens/      ← One folder per screen (ScreenName/ScreenName.tsx + hook + styles)
  store/        ← Redux store, slices, persist config, typed hooks
  theme/        ← Design tokens (colors)
  types/        ← Shared TypeScript interfaces (Book, SearchResponse)
```
