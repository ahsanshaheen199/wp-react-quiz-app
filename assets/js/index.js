import { render, useState } from '@wordpress/element';
import { Panel, PanelBody, PanelRow, Button } from '@wordpress/components';
import { plusCircle } from '@wordpress/icons';
import { HashRouter, Route, Switch } from 'react-router-dom';
import QuizList from './pages/QuizList';
import AddQuiz from './pages/AddQuiz';
import NotFound from './pages/NotFound';
import '../css/index.css';

const QuizApp = () => {
	const [questions, setQuestions] = useState([
		{
			id: 'asdbasd',
			questionText: 'What is the capital of France?',
			answerOptions: [
				{ id: 'tyu', answerText: 'New York', isCorrect: false },
			],
		},
		{
			id: 'cxvxcvxcv',
			questionText: 'Who is CEO of Tesla?',
			answerOptions: [
				{ id: 'aqw', answerText: 'Jeff Bezos', isCorrect: false },
			],
		},
	]);

	const setQuestionsData = (question) => {
		setQuestions([
			...questions.map((ques) => {
				return ques.id === question.id ? question : ques;
			}),
		]);
	};

	const setAnswerOptionData = (answerOption, quesID) => {
		setQuestions([
			...questions.map((ques) => {
				if (quesID === ques.id) {
					return {
						...ques,
						answerOptions: [
							...ques.answerOptions.map((option) => {
								return option.id === answerOption.id
									? answerOption
									: option;
							}),
						],
					};
				} else {
					return ques;
				}
			}),
		]);
	};

	const addNewQuestion = () => {
		setQuestions([
			...questions,
			{
				id: 'okidoki',
				questionText: '',
				answerOptions: [
					{ id: 'uyt', answerText: '', isCorrect: false },
				],
			},
		]);
	};

	const addNewAnswer = (quesID) => {
		setQuestions([
			...questions.map((ques) => {
				if (quesID === ques.id) {
					return {
						...ques,
						answerOptions: [
							...ques.answerOptions,
							{
								id: 'newanswer',
								answerText: 'newanswer',
								isCorrect: false,
							},
						],
					};
				} else {
					return ques;
				}
			}),
		]);
	};

	console.log(questions);

	return (
		<>
			<HashRouter>
				<Switch>
					<Route exact path='/'>
						<QuizList />
					</Route>
					<Route path='/add'>
						<AddQuiz />
					</Route>
					<Route path='*'>
						<NotFound />
					</Route>
				</Switch>
			</HashRouter>
			{/* <div className='bg-white p-5 rounded-md'>
				<div className='container'>
					<h2 className='font-semibold text-2xl'>Create Quiz</h2>
				</div>
			</div>
			<div className='flex justify-center'>
				<div className='w-3/5'>
					<div className='rounded-md shadow-lg  p-4'>
						<Panel>
							{questions.map((question) => {
								return (
									<>
										<PanelBody
											title={question.questionText}
											className='border-t border-b border-gray-400'
											initialOpen={false}
											buttonProps={{
												className:
													'relative components-panel__body-toggle border-none p-4 w-full text-left font-medium',
											}}>
											<PanelRow>
												<input
													type='text'
													placeholder='Question'
													onChange={(e) =>
														setQuestionsData({
															...question,
															questionText:
																e.target.value,
														})
													}
													value={
														question.questionText
													}
												/>
											</PanelRow>
											<PanelRow>
												{question.answerOptions.map(
													(answerOption, key) => {
														return (
															<div>
																<input
																	type='text'
																	placeholder='Answer'
																	value={
																		answerOption.answerText
																	}
																	onChange={(
																		e
																	) =>
																		setAnswerOptionData(
																			{
																				...answerOption,
																				answerText:
																					e
																						.target
																						.value,
																			},
																			question.id
																		)
																	}
																/>
															</div>
														);
													}
												)}
												<Button
													className='mt-2'
													variant='primary'
													className='button button-primary'
													onClick={() =>
														addNewAnswer(
															question.id
														)
													}>
													Add New Answer
												</Button>
											</PanelRow>
										</PanelBody>
									</>
								);
							})}

							<Button
								icon={plusCircle}
								variant='primary'
								iconPosition='right'
								className='text-white bg-blue-600 py-4 px-5 rounded-md font-semibold hover:bg-blue-800 transition-colors wprqa-button flex items-center'
								onClick={addNewQuestion}>
								Add New Questions
							</Button>
						</Panel>
					</div>
				</div>
			</div> */}
		</>
	);
};

render(<QuizApp />, document.getElementById('wprqa'));
