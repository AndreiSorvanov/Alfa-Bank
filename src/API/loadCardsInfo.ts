import axios from "axios";
import { useDispatch } from "react-redux";
import { AnyAction, Dispatch } from "redux";
import { ICardProps } from "../components/CardsList/Card";
import { CATS_LIST_PATH } from "../config";
import { updateIsLoadingAction, updateCardsLoadingErrorAction, updateCardsAction } from "../store";

interface ICatImageResp {
  id: string;
  width: number;
  height: number;
  url: string;
}

interface ICatResp {
  id: string;
  name: string;
  life_span: string;
  weight: { "imperial": string, "metric": string };
  origin: string;
  temperament: string;
  description: string;
  image: ICatImageResp | null;
}

export async function loadCardsInfo(dispatch: Dispatch<AnyAction>) {
  dispatch(updateIsLoadingAction(true));

  try {
    const { data }: { data: Array<ICatResp> } = await axios.get(CATS_LIST_PATH);
    const cats: Array<ICardProps> = data.map((elem) => ({
      id: elem.id,
      name: elem.name,
      lifeSpan: elem.life_span,
      weight: elem.weight.metric,
      origin: elem.origin,
      temperament: elem.temperament,
      description: elem.description,
      imageLink: elem?.image?.url ?? null,
      isLiked: Math.random() < 0.5,
    }));

    dispatch(updateCardsAction(cats));
  } catch (error) {
    console.log(error);
    dispatch(updateCardsLoadingErrorAction('Не удалось загрузить список'));
  } finally {
    dispatch(updateIsLoadingAction(false));
  }
}

export function useLoadCardsInfo() {
  const dispatch = useDispatch();
  return () => {
    loadCardsInfo(dispatch);
  }
}
