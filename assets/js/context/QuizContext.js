import { createContext, useReducer } from '@wordpress/element';
import QuizReducer from '../reducer/QuizReducer';

export const QuizContext = createContext();

const initialState = {
	quizzes: [],
};

export const QuizProvider = ({ children }) => {
	const [state, dispatch] = useReducer(QuizReducer, initialState);
	return (
		<QuizContext.Provider value={{ state, dispatch }}>
			{children}
		</QuizContext.Provider>
	);
};
