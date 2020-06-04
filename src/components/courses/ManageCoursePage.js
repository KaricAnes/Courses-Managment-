import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
//import { bindActionCreators } from "redux";
//import {loadCourses} from "../../redux/actions/courseActions";
import { newCourse } from "../../../tools/mockData";
import CourseForm from "./CourseForm";

const ManageCoursePage = ({
  courses,
  authors,
  loadAuthors,
  loadCourses,
  course: initialCourse, //naming conflict alias
  saveCourse,
  history, //any component loaded via <Route> gets history passed in on props from Rect router //<Route path="/course" component={ManageCoursePage} />
}) => {
  //assign any variables koje nistu destrctrd on left to a variable calld props.
  //({...props.course}) // nema vise naming konflikta
  //course: initialCourse,
  //const { courses, authors, actions } = this.props;

  const [course, setCourse] = useState(initialCourse); //default value ovo u zagradi, iz mapSTP
  //First variable is state variable [course], and the second value is the setter function
  // for that variable [setCourse].

  const [errors, setErrors] = useState({}); //run all erros when we run validation //prazan array kao 2. argument znaci da ce se effect runati samo jednom kad se comp mounts

  //okinut ce se samo ako odem direktno na course/:slug
  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch((error) => {
        alert("Loading courses failed" + error);
      });
    } else {
      setCourse({ ...initialCourse }); //na refresh da se forma populate-a i dalje
    }

    if (authors.length === 0) {
      //this.props.authors  --> samo kada ima promjene ce se okinuti
      loadAuthors().catch((error) => {
        alert("Loading authors failed" + error);
      });
    }
  }, [initialCourse]);

  function handleChange(event) {
    console.log(event.target);
    console.log(course);
    const { name, value } = event.target; //destructuring se morao odraditi ovdje. Bez njgea eror
    setCourse({
      ...course,
      //[event.target.name]: event.target.value,
      //title:              'naziv Kursa'

      [name]: name === "authorId" ? parseInt(value, 10) : value,
    });
    console.log(course);

    /*const { name, value } = event.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: name === "authorId" ? parseInt(value, 10) : value, //events return nums as strings 
    }));*/
  }

  function handleSaveCourse(event) {
    event.preventDefault();
    saveCourse(course).then(() => {
      console.log(history);

      history.push("/courses");
    });
  }

  return (
    <CourseForm
      course={course}
      errors={errors}
      authors={authors}
      onChange={handleChange}
      onSave={handleSaveCourse}
    />
  );
};

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export function getCourseBySlug(courses, slug) {
  console.log(courses); //[{authorId, category, id, slug, title}]

  return courses.find((course) => course.slug === slug) || null;
}

//mapStateToProps se runa svaki put kada dodje do promjene u STORE-u.
//So when courses are available, we will call getCourseBySlug
function mapStateToProps(state, ownProps) {
  console.log("mapStateToProps se okinula");

  //ownProps lets us access the components props. We will use this to read url data injected on props by React Router.
  const slug = ownProps.match.params.slug;
  console.log(ownProps);
  console.log(state); //{courses: Array(40), authors: Array(3)}
  //debugger;
  const course =
    slug && state.courses.length > 0 //ukoliko imamo slug i ukoliko su courses stigli onda zelimo kurs po slugu
      ? getCourseBySlug(state.courses, slug)
      : newCourse;
  return {
    //ings: state.burgerBuilderR.ingredients  -->  MAxx
    //courses: state.courses, //be specific, request only data your component needs. courses from reducers/index.js
    course: course, //read url to detremine if course should be created or edited
    courses: state.courses,
    authors: state.authors,
  };
}

const mapDispatchToProps = {
  loadCourses: courseActions.loadCourses,
  loadAuthors: authorActions.loadAuthors,
  saveCourse: courseActions.saveCourse,
  //loadCourses  --> gore koristimo named import--> import
  //onAddIngredient: (name) => dispatch(actionCreators.addIngredient(name)),
};

/*
 By default, a connected component receives props. ...
connect can accept an argument called mapDispatchToProps ,
 which lets you create functions that dispatch when called,
  and pass those functions as props to your component.
 */

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
