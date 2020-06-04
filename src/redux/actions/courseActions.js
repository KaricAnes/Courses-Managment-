import * as types from "./actionTypes";
import * as courseApi from "../../api/courseApi";

/*export function createCourse(course) {
  return { type: types.CREATE_COURSE, course };
}*/

export function loadCourseSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses: courses }; //action.courses (coursesReducer)
}

export function updateCourseSuccess(course) {
  return { type: types.UPDATE_COURSE_SUCCESS, course: course }; //action.courses (coursesReducer)
}

export function createCourseSuccess(course) {
  return { type: types.CREATE_COURSE_SUCCESS, course: course }; //action.courses (coursesReducer)
}

export function loadCourses() {
  return function (dispatch) {
    //disptach kao argument da bi se moglo ova sinq aktivirati
    return courseApi
      .getCourses()
      .then((courses) => {
        console.log(courses);

        dispatch(loadCourseSuccess(courses));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function saveCourse(course) {
  console.log(course); //{id: null, title: "dssd", authorId: 1, category: "sdsddsds"}

  return function (dispatch) {
    //disptach kao argument da bi se moglo ova sinq aktivirati
    return courseApi
      .saveCourse(course)
      .then((savedCourse) => {
        console.log(/*savedcourse{id: 26, title: "ds", authorId: 3, category: "dssddssd", createdAt: 1590961191160}*/);

        course.id
          ? dispatch(updateCourseSuccess(savedCourse))
          : dispatch(createCourseSuccess(savedCourse));
      })
      .catch((error) => {
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
