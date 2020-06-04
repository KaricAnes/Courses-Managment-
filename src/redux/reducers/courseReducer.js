import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function courseReducer(state = initialState.courses, action) {
  console.log(state); //[{id: 1, title: "Securing React Apps with Auth0", slug: "rea},{}]
  console.log(action); //{type: "CREATE_COURSE_SUCCESS", course: {id: 30, title: "fddf", authorId: 1, category: "fdfd",}}

  switch (action.type) {
    case types.CREATE_COURSE:
      return [...state, { ...action.course }]; ////ovo ce naptraviti novi array koji sadrzi sve postojece kurseve sa jos jednim dodatnim
    case types.LOAD_COURSES_SUCCESS:
      return action.courses;
    case types.CREATE_COURSE_SUCCESS:
      return [...state, { ...action.course }];
    case types.UPDATE_COURSE_SUCCESS:
      return state.map((course) =>
        course.id === action.course.id ? action.course : course
      );
    //map returns a new array. I'm replacing element with matching course.id
    //with map, we do npt change order in array
    //with redux we often use spread operator, map, filter, reduce
    default:
      return state;
  }
}
