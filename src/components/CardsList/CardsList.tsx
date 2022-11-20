import { ICardProps, Card } from './Card';
import styles from './CardsList.module.css';
import { ChangeEvent, useEffect } from 'react';
import { Rings } from  'react-loader-spinner'
import { useDispatch, useSelector } from 'react-redux';
import { IState, updateLikeFilterAction } from '../../store';
import { LikeFilter } from './LikeFilter';
import { useLoadCardsInfo } from '../../API/loadCardsInfo';

export function CardsList() {
  const dispatch = useDispatch();

  const isLoading = useSelector<IState, boolean>((state) => state.isLoading);
  const cardsLoadingError = useSelector<IState, string>((state) => state.cardsLoadingError);
  const cards = useSelector<IState, Array<ICardProps>>((state) => state.cards);
  const likeFilter = useSelector<IState, boolean>((state) => state.likeFilter);
  const loadCardsInfo = useLoadCardsInfo();

  const filteredCards = likeFilter ? cards.filter((card) => card.isLiked === likeFilter) : cards;

  useEffect(() => {
    loadCardsInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilter = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateLikeFilterAction(event.currentTarget.checked));
  }

  return (
    <>
      {isLoading
        ? (<div className={styles.loader}>
            <Rings color="#a9a9a9" height={80} width={80} />
          </div>)
        : cardsLoadingError
          ? <div className={styles.error}>{cardsLoadingError}</div>
          : cards.length > 0
            ? (<>
                <LikeFilter like={likeFilter} onSetFilter={handleFilter} />
                {
                  filteredCards.length > 0
                  ? <ul className={styles.cardsList}>
                      {filteredCards.map((card) => <Card key={card.id} {...card} />)}
                    </ul>
                  : <div className={styles.empty}>Нет карточек</div>
                }
              </>)
            : <div className={styles.empty}>Нет карточек</div>
      }
    </>
  );
}
