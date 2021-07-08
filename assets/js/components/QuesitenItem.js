import { PanelBody, PanelRow, Button } from '@wordpress/components';
import { v4 as uuid } from 'uuid';
import { __ } from '@wordpress/i18n';

function QuesitenItem({ question, setQuestions, questions, index }) {
	const setQuestionsData = (question) => {
		setQuestions(question);
	};

	const setAnswerOptionData = (answerOption) => {
		setQuestions({
			...question,
			answerOptions: [
				...question.answerOptions.map((answer) => {
					return answer.id === answerOption.id
						? answerOption
						: answer;
				}),
			],
		});
	};

	const addNewAnswer = (question) => {
		setQuestions({
			...question,
			answerOptions: [
				...question.answerOptions,
				{
					id: uuid(),
					answerText: 'Untitled Answer',
					isCorrect: false,
				},
			],
		});
	};

	const deleteAnswerData = (answerOption) => {
		setQuestions({
			...question,
			answerOptions: [
				...question.answerOptions.filter((answer) => {
					return answer.id !== answerOption.id;
				}),
			],
		});
	};

	return (
		<PanelBody
			title={`Question ${index + 1}: ${question.questionText}`}
			className='border-t border-b border-gray-400'
			initialOpen={false}
			buttonProps={{
				className:
					'relative components-panel__body-toggle border-none p-4 w-full text-left font-medium text-lg',
			}}>
			<PanelRow className='p-4 pt-0'>
				<label
					for={`question-title-${question.id}`}
					className='block text-sm font-medium text-gray-700 text'>
					{__('Question Title')}
				</label>
				<input
					id={`question-title-${question.id}`}
					type='text'
					placeholder='Question'
					onChange={(e) =>
						setQuestionsData({
							...question,
							questionText: e.target.value,
						})
					}
					value={question.questionText}
					className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full border-gray-300 rounded-md'
				/>
			</PanelRow>
			<PanelRow className='p-4'>
				{question.answerOptions.length > 0 ? (
					<h3 className='mb-3 text-lg font-medium'>
						{__('Answers')}
					</h3>
				) : (
					<h3 className='mb-2 text-lg font-medium'>
						{__('No Answer')}
					</h3>
				)}
				{question.answerOptions.map((answerOption, key) => {
					return (
						<div className='mb-3 flex items-center' key={key}>
							<div className='w-8/12'>
								<div className='flex items-center'>
									<div className='w-2/12'>
										<label
											for={`answer-title-${answerOption.id}`}
											className='text-sm font-medium text-gray-700 text'>
											{__('Answer Title')}
										</label>
									</div>
									<div className='w-10/12'>
										<input
											id={`answer-title-${answerOption.id}`}
											type='text'
											placeholder='Answer'
											value={answerOption.answerText}
											className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 w-full border-gray-300 rounded-md'
											onChange={(e) =>
												setAnswerOptionData({
													...answerOption,
													answerText: e.target.value,
												})
											}
										/>
									</div>
								</div>
							</div>
							<div className='w-2/12'>
								<div className='flex items-center justify-end'>
									<input
										type='radio'
										id={`answer-${key}-${question.id}`}
										name={`correct-answer-${question.id}`}
										className='mr-2'
									/>
									<label for={`answer-${key}-${question.id}`}>
										{__('Correct')}
									</label>
								</div>
							</div>
							<div className='w-2/12 text-right'>
								<Button
									variant='primary'
									className='text-red-600 rounded-md font-semibold hover:text-red-800'
									onClick={() =>
										deleteAnswerData(answerOption)
									}>
									{__('Delete')}
								</Button>
							</div>
						</div>
					);
				})}
				<div className='mt-3'>
					<Button
						variant='primary'
						className='text-blue-600 rounded-md font-semibold hover:text-blue-800 mt-2 flex items-center'
						onClick={() => addNewAnswer(question)}>
						{__('Add New Answer')}
					</Button>
				</div>
			</PanelRow>
		</PanelBody>
	);
}

export default QuesitenItem;
