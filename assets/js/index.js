import { render, useState } from '@wordpress/element';
import { Panel, PanelBody, PanelRow, Button } from '@wordpress/components';

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
			<Panel>
				{questions.map((question) => {
					return (
						<>
							<PanelBody title={question.questionText}>
								<PanelRow>
									<input
										type='text'
										placeholder='Question'
										onChange={(e) =>
											setQuestionsData({
												...question,
												questionText: e.target.value,
											})
										}
										value={question.questionText}
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
														onChange={(e) =>
															setAnswerOptionData(
																{
																	...answerOption,
																	answerText:
																		e.target
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
											addNewAnswer(question.id)
										}>
										Add New Answer
									</Button>
								</PanelRow>
							</PanelBody>
						</>
					);
				})}

				<Button
					variant='primary'
					className='button button-primary'
					onClick={addNewQuestion}>
					Add New Questions
				</Button>
			</Panel>
		</>
	);
};

render(<QuizApp />, document.getElementById('root'));
