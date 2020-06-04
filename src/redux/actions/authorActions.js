import * as types from "./actionTypes";
import * as authorApi from "../../api/authorApi";

export function loadAuthorsSuccess(authors) {
  return { type: types.LOAD_AUTHORS_SUCCESS, authors };
}

export function loadAuthors() {
  return function(dispatch) {
    return authorApi
      .getAuthors()
      .then(authors => {
        dispatch(loadAuthorsSuccess(authors));
      })
      .catch(error => {
        throw error;
      });
  };
}



/*export const fetchIngredients = () => {
  return (dispatch) => {
    //unutar ovog dispatcha mi mozemo executati asinq kod i dipatchati novu akciju kada se zavrsi taj asinq kod
    axios
      .get("https://react-moj-hamburger.firebaseio.com/ingredients.json")
      .then((response) => {
        dispatch(setIngredients(response.data));
      })
      .catch((error) => {
        dispatch(setIngredientsFailed());
      });
  };
};*/