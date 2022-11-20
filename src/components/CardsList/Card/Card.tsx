import { useDispatch } from 'react-redux';
import { deleteCardAction, updateCardLikeAction } from '../../../store';
import { DeleteButton } from './DeleteButton';
import { Like } from './Like';
import styles from './Card.module.css';

export interface ICardProps {
  id: number;
  isLiked: boolean;
  name: string;
  latinName: string;
  minLength: number;
  maxLength: number;
  minWeight: number;
  maxWeight: number;
  lifespan: number;
  habitat: string;
  geo: string;
  imageLink: string;
}

export function Card({ id, isLiked, name, latinName, minLength, maxLength, minWeight, lifespan, maxWeight, habitat, geo, imageLink }: ICardProps) {
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
          <img className={styles.image} src={imageLink} alt={name} />
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.info}>
            <h2 className={styles.name}>{`${name} (${latinName})`}</h2>
            <ul className={styles.characteristics}>
              <li>
                <span className={styles.characteristicTitle}>Geo</span>: {`${geo}`}
              </li>
              <li>
                <span className={styles.characteristicTitle}>Habitat</span>: {`${habitat}`}
              </li>
              <li>
                <span className={styles.characteristicTitle}>Lifespan</span>: {`${lifespan}`}
              </li>
              <li>
                <span className={styles.characteristicTitle}>Length</span>: {`${minLength} - ${maxLength}`}
              </li>
              <li>
                <span className={styles.characteristicTitle}>Weight</span>: {`${minWeight} - ${maxWeight}`}
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
