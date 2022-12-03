import { useDispatch } from 'react-redux';
import { deleteCardAction, updateCardLikeAction } from '../../../store';
import { DeleteButton } from './DeleteButton';
import { Like } from './Like';
import noImage from './images/no-image.webp';
import styles from './Card.module.css';

export interface ICardProps {
  id: string;
  isLiked: boolean;
  name: string;
  lifeSpan: string;
  weight: string;
  origin: string;
  temperament: string;
  description: string;
  imageLink: string | null;
}

export function Card({ id, isLiked, name, lifeSpan, weight, origin, temperament, description, imageLink }: ICardProps) {
  const dispatch = useDispatch();

  const changeLike = (isLikedValue: boolean) => {
    dispatch(updateCardLikeAction(id, isLikedValue));
  }

  const deleteCard = () => {
    dispatch(deleteCardAction(id));
  }

  return (
    <li className={styles.cardContainer}>
      <article className={styles.card}>
        <div className={styles.imageContainer}>
          <img className={styles.image} src={imageLink ?? noImage} alt={name} />
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.info}>
            <h2 className={styles.name}>{name}</h2>
            <ul className={styles.characteristics}>
              <li>
                <span className={styles.characteristicTitle}>Lifespan</span>: {lifeSpan}
              </li>
              <li>
                <span className={styles.characteristicTitle}>Weight</span>: {weight}
              </li>
              <li>
                <span className={styles.characteristicTitle}>Origin</span>: {origin}
              </li>
              <li>
                <span className={styles.characteristicTitle}>Temperament</span>: {temperament}
              </li>
              <li>
                <span className={styles.characteristicTitle}>Description</span>: {description}
              </li>
            </ul>
          </div>
          <div className={styles.buttons}>
            <DeleteButton onDelete={deleteCard} />
            <Like isLiked={isLiked} onChangeLike={changeLike} />
          </div>
        </div>
      </article>
    </li>
  );
}
