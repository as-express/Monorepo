import { Movie } from "apps/movie/src/schemas/movie.schema";

export interface MovieInterface {
    _id: string;         
    genre: string;       // The genre title to push the movie into
}