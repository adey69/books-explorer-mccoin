# BookExplorer — Requirements

Source: McCoin Virtual Assets LLC — React Native Test Task

---

## Goal

Build a React Native mobile app that:

- Fetches a list of books from a public API
- Displays them in a scrollable list
- Navigates to a detail screen on item tap
- Uses Redux Toolkit to manage state
- Applies good UI/UX principles: loading, error, and empty states

---

## Tech Stack

| Concern | Choice |
|---|---|
| Framework | React Native (Bare) |
| Language | TypeScript |
| Navigation | `@react-navigation/native` + `native-stack` |
| State management | Redux Toolkit + RTK Query |
| HTTP | `fetch` (via RTK Query `fetchBaseQuery`) |
| Persistence | `redux-persist` + `AsyncStorage` |

---

## API

**Open Library Search API** — `https://openlibrary.org/search.json`

| Parameter | Value |
|---|---|
| `q` | Search query string |
| `limit` | 25 results |
| `fields` | key, title, author_name, first_publish_year, cover_i, edition_count, publisher, language, subject, number_of_pages_median |

Cover images: `https://covers.openlibrary.org/b/id/<cover_i>-{M|L}.jpg`

---

## Features

### 1. Home Screen — Book List

- [x] Fetch books from the Open Library API on load (fallback query: `"bestseller"`)
- [x] Display results in a scrollable `FlatList`
- [x] Each item shows: cover thumbnail, title, author(s), publish year
- [x] Tap item → navigate to Book Detail screen
- [x] Loading state while fetching
- [x] Error state with retry button
- [x] Empty state when no results found
- [x] Pull-to-refresh

**Bonus:**
- [x] Search bar to filter/search results (debounced, 400 ms)

---

### 2. Book Detail Screen

- [x] Receives book data via navigation params
- [x] Displays full book info:
  - Title
  - Author(s)
  - First published year
  - Edition count
  - Pages (median)
  - Publisher(s)
  - Languages
  - Open Library key
  - Subject tags (up to 12)
- [x] Cover image (full-size), with letter-initial fallback
- [x] Bookmark/unbookmark toggle in header ("Save" / "Saved")

---

### 3. State Management

- [x] Book search results managed by RTK Query (automatic caching, loading/error states)
- [x] Bookmarked books stored in Redux slice (`bookmarksSlice`)
- [x] Bookmarks keyed by `book.key` (`Record<string, Book>`)

**Bonus:**
- [x] Bookmarks persisted across app sessions via `redux-persist` + `AsyncStorage`

---

## Evaluation Criteria

| Criterion | Implementation notes |
|---|---|
| **Functionality** | Data loads, navigation works, bookmarking works |
| **UI/UX** | Clean light theme, loading/error/empty states, pull-to-refresh |
| **Architecture** | Screen folder split (ScreenName / useScreenName / styles), modular components |
| **State Management** | RTK Query for remote data, Redux slice for bookmarks, redux-persist for session persistence |
| **Code Quality** | TypeScript throughout, no inline styles, memo'd list items, stable callbacks |
| **Networking** | Loading indicators, error handling, retry, debounced search |

---

## Submission Checklist

- [ ] GitHub repo link with README
- [ ] GIF or screenshot of the final app
- [ ] Brief explanation of:
  - Architecture decisions
  - Why Redux Toolkit was chosen over Zustand
  - Any challenges faced
- [ ] Send to: dev@mccoin.com, hr@mccoin.com
