import { Reducer } from '@reduxjs/toolkit';
import { ActionCreator, AnyAction } from 'redux';
import { ICardProps } from './components/CardsList/Card';

const UPDATE_IS_LOADING = 'UPDATE_IS_LOADING';
const UPDATE_CARDS = 'UPDATE_CARDS';
const UPDATE_CARDS_LOADING_ERROR = 'UPDATE_CARDS_LOADING_ERROR';
const UPDATE_CARD_LIKE = 'UPDATE_CARD_LIKE';
const DELETE_CARD = 'DELETE_CARD';
const UPDATE_LIKE_FILTER = 'UPDATE_LIKE_FILTER';

export interface IState {
  isLoading: boolean;
  cards: Array<ICardProps>,
  cardsLoadingError: string;
  likeFilter: boolean;
}

const initialState: IState = {
  isLoading: false,
  cardsLoadingError: '',
  cards: [],
  likeFilter: false,
}


export const updateIsLoadingAction: ActionCreator<AnyAction> = (isLoading: boolean) => {
  return { type: UPDATE_IS_LOADING, isLoading };
}

export const updateCardsAction: ActionCreator<AnyAction> = (cards: Array<ICardProps>) => {
  return { type: UPDATE_CARDS, cards };
}

export const updateCardsLoadingErrorAction: ActionCreator<AnyAction> = (error: string) => {
  return { type: UPDATE_CARDS_LOADING_ERROR, error };
}

export const updateCardLikeAction: ActionCreator<AnyAction> = (id: string, isLiked: boolean) => {
  return { type: UPDATE_CARD_LIKE, id, isLiked };
}

export const deleteCardAction: ActionCreator<AnyAction> = (id: string) => {
  return { type: DELETE_CARD, id };
}

export const updateLikeFilterAction: ActionCreator<AnyAction> = (filterValue: boolean) => {
  return { type: UPDATE_LIKE_FILTER, filterValue };
}

export const rootReducer: Reducer<IState> = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_CARDS:
      return {
        ...state,
        cards: action.cards,
        cardsLoadingError: '',
      }
    case UPDATE_CARDS_LOADING_ERROR:
      return {
        ...state,
        cards: [],
        cardsLoadingError: action.error,
      };
    case UPDATE_CARD_LIKE: {
      const index = state.cards.findIndex((card) => card.id === action.id);
      const cards = index !== -1
        ? [...state.cards.slice(0, index), { ...state.cards[index], isLiked: action.isLiked }, ...state.cards.slice(index + 1)]
        : [...state.cards];

      return {
        ...state,
        cards: [...cards],
      };
    }
    case DELETE_CARD: {
      const index = state.cards.findIndex((card) => card.id === action.id);
      const cards = index !== -1
        ? [...state.cards.slice(0, index), ...state.cards.slice(index + 1)]
        : [...state.cards];

      return {
        ...state,
        cards: [...cards],
      };
    }
    case UPDATE_LIKE_FILTER:
      return {
        ...state,
        likeFilter: action.filterValue,
      };
    default:
      return state;
  }
}
