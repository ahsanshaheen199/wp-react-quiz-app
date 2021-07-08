import { createContext, useReducer } from '@wordpress/element';
import questionReducer from '../reducer/questionReducer';

export const QuestionContext = createContext();

const initialState = {
	quizzes: [
		{
			quizTitle: '',
			questions: [
				{
					id: 'asdbasd',
					questionText: 'What is the capital of France?',
					answerOptions: [
						{ id: 'tyu', answerText: 'New York', isCorrect: false },
					],
				},
			],
		},
	],
};

export const QuestionProvider = ({ children }) => {
	const [state, dispatch] = useReducer(questionReducer, initialState);
	return (
		<QuestionContext.Provider value={{ state, dispatch }}>
			{children}
		</QuestionContext.Provider>
	);
};
