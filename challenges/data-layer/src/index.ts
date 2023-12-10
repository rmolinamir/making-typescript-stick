export interface DataEntity {
  id: string;
}
export interface Movie extends DataEntity {
  director: string;
}
export interface Song extends DataEntity {
  singer: string;
}

export interface Comic extends DataEntity {
  author: string;
}

export type DataEntityMap = {
  movie: Movie;
  song: Song;
};

type DataEntityKey = keyof DataEntityMap;

type DataFetcher<T extends DataEntityKey = DataEntityKey> =
  & { [K in T as `add${Capitalize<K>}`]: (entity: DataEntityMap[K]) => DataEntityMap[K]; }
  & { [K in T as `get${Capitalize<K>}`]: (entityId: DataEntityMap[K]['id']) => DataEntityMap[K] | undefined; }
  & { [K in T as `getAll${Capitalize<K>}s`]: () => DataEntityMap[K][]; }
  & { [K in T as `clear${Capitalize<K>}s`]: () => void; }

export class DataStore implements DataFetcher {
  //
  // Movies
  //

  private movies: Movie[] = [];

  addMovie(movie: Movie) {
    this.movies.push(movie);
    return movie;
  }

  getMovie(id: string) {
    return this.movies.find((movie) => movie.id === id);
  }

  getAllMovies() {
    return this.movies;
  }

  clearMovies() {
    this.movies = [];
  }

  //
  // Songs
  //

  private songs: Song[] = [];

  addSong(song: Song) {
    this.songs.push(song);
    return song;
  }

  getSong(id: string) {
    return this.songs.find((song) => song.id === id);
  }

  getAllSongs() {
    return this.songs;
  }

  clearSongs() {
    this.songs = [];
  }
}
