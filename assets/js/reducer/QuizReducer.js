const QuizReducer = (state, action) => {
	switch (action.type) {
		case 'ADD_QUIZ':
			return {
				...state,
				quizzes: [action.quiz, ...state.quizzes],
			};
	}
	return state;
};

export default QuizReducer;
