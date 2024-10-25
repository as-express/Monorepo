import { Movie } from "apps/movie/src/schemas/movie.schema";

export interface MovieInterface {
    movie: Movie;         
    genre: string;     
}