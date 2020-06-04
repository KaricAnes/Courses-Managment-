import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";
import { Redirect } from "react-router-dom";

class CoursesPage extends React.Component {
  state = {
    redirectToAddCoursePage: false, //use this to trigger redirect
  };

  componentDidMount() {
    const { courses, authors, actions } = this.props;

    if (courses.length === 0) {
      //svaki put ce se okinuti
      actions.loadCourses().catch((error) => {
        alert("Loading courses failed" + error);
      });
    }

    if (authors.length === 0) {
      //this.props.authors  --> samo kada ima promjene ce se okinuti
      actions.loadAuthors().catch((error) => {
        alert("Loading authors failed" + error);
      });
    }
  }

  render() {
    return (
      <>
        {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
        {/*Ukoliko je uslov lijevo true, ovo desno ce se izvrsiti  */}
        <h2>Courses</h2>

        <button
          style={{ marginBottom: 20 }}
          className="btn btn-primary add-course"
          onClick={() => this.setState({ redirectToAddCoursePage: true })}
        >
          Add Course
        </button>

        {<CourseList courses={this.props.courses} />}
        {/*this.props.courses.map((course) => {
         return <div key={course.title}>{course.title}</div>;
        })*/}
      </>
    );
  }
}

CoursesPage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    //ings: state.burgerBuilderR.ingredients  -->  MAxx
    //    courses: state.courses, //be specific, request only data your component needs. courses from reducers/index.js
    //cilj nam je dodamo relevantno authorovi ime na svaki kurs
    courses:
      state.authors.length === 0 //state.authors --> reducers/index.js
        ? [] //we need course and author data before we can do this mapping
        : state.courses.map((course) => {
            console.log(state.courses); //[{id: 2, authorId: 1, slug: "react-bi}, {}]
            console.log(state.authors); //[{id: 1, name: "Cory House"}, {id: 2, name: "Scott Allen"}]

            return {
              ...course, //adding exisiting course
              authorName: state.authors.find((a) => a.id === course.authorId) //network/repsonse/courses/authors
                .name, //state.athors.name
            }; //rezultat returna-> [{authorId: 1, authorName: "Cory House", category: "JavaScript", id: 1...}..]
          }),
    authors: state.authors,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      //onAddIngredient: (name) => dispatch(actionCreators.addIngredient(name)),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
