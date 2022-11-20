import axios from "axios";
import { useDispatch } from "react-redux";
import { AnyAction, Dispatch } from "redux";
import { ICardProps } from "../components/CardsList/Card";
import { ANIMALS_LIST_PATH } from "../config";
import { updateIsLoadingAction, updateCardsLoadingErrorAction, updateCardsAction } from "../store";

interface IAnimalResp {
  id: number;
  name: string;
  latin_name: string;
  length_min: number;
  length_max: number;
  weight_min: number;
  weight_max: number;
  lifespan: number;
  habitat: string;
  geo_range: string;
  image_link: string;
}

export async function loadCardsInfo(dispatch: Dispatch<AnyAction>) {
  dispatch(updateIsLoadingAction(true));

  try {
    const { data }: { data: Array<IAnimalResp> } = await axios.get(ANIMALS_LIST_PATH);
    const animals: Array<ICardProps> = data.map((elem) => ({
      id: elem.id,
      name: elem.name,
      latinName: elem.latin_name,
      minLength: elem.length_min,
      maxLength: elem.length_max,
      minWeight: elem.weight_min,
      maxWeight: elem.weight_max,
      lifespan: elem.lifespan,
      habitat: elem.habitat,
      geo: elem.geo_range,
      imageLink: elem.image_link,
      isLiked: Math.random() < 0.5,
    }));

    dispatch(updateCardsAction(animals));
  } catch (error) {
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
