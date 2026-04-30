export interface BookSummary {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
}

export interface Book extends BookSummary {
  edition_count?: number;
  publisher?: string[];
  language?: string[];
  subject?: string[];
  number_of_pages_median?: number;
}

export interface SearchResponse {
  numFound: number;
  start: number;
  docs: BookSummary[];
}
