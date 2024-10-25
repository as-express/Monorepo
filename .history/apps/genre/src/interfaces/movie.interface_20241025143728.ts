import { Movie } from "apps/movie/src/schemas/movie.schema";

export interface MovieInterface {
    _id: Movie;         
    genre: string;     
}