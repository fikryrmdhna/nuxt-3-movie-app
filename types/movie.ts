export interface MovieList {
    results: Movie[];
    total_pages: number;
    total_results: number;
}
export interface Movie {
    adult: boolean;
    backdrop_path: string | null;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    formatted_vote_average: string;
    vote_count: number;
}

// DETAIL MOVIE TYPE

export interface MovieDetail {
    adult: boolean;
    backdrop_path: string | null;
    belongs_to_collection: {
        id: number;
        name: string;
        poster_path: string | null;
        backdrop_path: string | null;
    } | null;
    budget: number;
    genres: Genre[];
    homepage: string;
    id: number;
    imdb_id: string | null;
    origin_country: string[];
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    production_companies: ProductionCompany[];
    production_countries: ProductionCountry[];
    release_date: string;
    revenue: number;
    runtime: number | null;
    spoken_languages: SpokenLanguage[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface Genre {
    id: number;
    name: string;
}

export interface ProductionCompany {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
}

export interface ProductionCountry {
    iso_3166_1: string;
    name: string;
}

export interface SpokenLanguage {
    english_name: string;
    iso_639_1: string;
    name: string;
}

// DETAIL MOVIE TYPE

// REVIEW MOVIE TYPE

export interface ReviewList {
    results: Review[];
    page: number;
    total_pages: number;
    total_results: number;
}
export interface Review {
    author: string;
    author_details: {
      name: string;
      username: string;
      avatar_path: string | null;
      rating: number | null;
    };
    content: string;
    created_at: string;
    id: string;
    updated_at: string;
    url: string;
}

// REVIEW MOVIE TYPE

export interface ApiError {
    message: string;
    status?: number;
    [key: string]: any;
}

export interface FetchResponse {
    request_token: string;
    session_id: string
}
