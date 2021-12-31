import { useEffect, useState } from "react";
import { api } from '../services/api';

import { Button } from './Button';
import { Content } from "./Content";

import '../styles/sidebar.scss';
import { GenreResponseProps } from "../interfaces/Genre";

export function SideBar() {
  
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  
  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      console.log('res', response.data)
      setGenres(response.data);
    });
  }, []);

  return (
    <>
    <nav className="sidebar">
        <span>Watch<p>Me</p></span>

        <div className="buttons-container">
          {genres.map(genre => (
            <Button
              key={String(genre.id)}
              title={genre.title}
              iconName={genre.name}
              onClick={() => handleClickButton(genre.id)}
              selected={selectedGenreId === genre.id}
            />
          ))}
        </div>

      </nav>
      <Content id={selectedGenreId}/>      
    </>
  )
}