import { Movie } from "apps/movie/src/schemas/movie.schema";

export interface MovieInterface {
    _id: string;         // Assuming you are using a string for the movie ID
    genre: string;       // The genre title to push the movie into
}