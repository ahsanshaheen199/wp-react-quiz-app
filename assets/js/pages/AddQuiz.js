import { __ } from '@wordpress/i18n';
import { useContext, useState } from '@wordpress/element';
import { Button } from '@wordpress/components';
import { plusCircle } from '@wordpress/icons';
import { v4 as uuid } from 'uuid';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import QuesitenItem from '../components/QuesitenItem';
import { addQuiz } from '../actions/quizActions';
import { QuizContext } from '../context/QuizContext';
import apiFetch from '@wordpress/api-fetch';

function AddQuiz() {
	const [quiz, setQuizData] = useState({
		quizTitle: '',
		questions: [],
	});

	const history = useHistory();

	const { dispatch } = useContext(QuizContext);

	const addQuizData = () => {
		apiFetch({
			path: `/wprqa/v1/quizzes`,
			method: 'POST',
			body: JSON.stringify(quiz),
			headers: {
				'X-WP-Nonce': wprqaData.nonce,
			},
		}).then((response) => {
			dispatch(addQuiz(quiz));
			Swal.fire({
				toast: true,
				icon: 'success',
				title: __(response.message),
				position: 'top-end',
				showConfirmButton: false,
				timer: 2000,
				showClass: {
					popup: 'swal2-noanimation',
				},
				hideClass: {
					popup: '',
				},
			});

			setQuizData({
				quizTitle: '',
				questions: [],
			});

			history.push('/');
		});
	};

	const addNewQuestion = () => {
		setQuizData({
			...quiz,
			questions: [
				...quiz.questions,
				{
					id: uuid(),
					questionText: 'Untitled Question',
					answerOptions: [],
				},
			],
		});
	};

	const deleteQuestion = (question) => {
		setQuizData({
			...quiz,
			questions: [
				...quiz.questions.filter((ques) => {
					return ques.id !== question.id;
				}),
			],
		});
	};

	const setQuestions = (question) => {
		setQuizData({
			...quiz,
			questions: [
				...quiz.questions.map((ques) => {
					return ques.id === question.id ? question : ques;
				}),
			],
		});
	};

	return (
		<>
			<div className='bg-white py-5 rounded-md'>
				<div className='container mx-auto px-4'>
					<div className='flex items-center justify-between'>
						<div>
							<h2 className='font-semibold text-2xl'>
								{__('Add Quiz')}
							</h2>
						</div>
						<div>
							<a
								className='rounded-md text-white hover:text-white bg-blue-600 hover:bg-blue-800 transition-all py-4 px-5 font-semibold text-sm cursor-pointer'
								onClick={addQuizData}>
								{__('Save Quiz')}
							</a>
						</div>
					</div>
				</div>
			</div>
			<div className='mt-10'>
				<div className='container mx-auto px-4'>
					<div className='flex justify-center'>
						<div className='w-8/12'>
							<div className='bg-white rounded-md p-10'>
								<div className='mb-6'>
									<input
										type='text'
										value={quiz.quizData}
										placeholder={__('Add Quiz Title')}
										onChange={(e) =>
											setQuizData({
												...quiz,
												quizTitle: e.target.value,
											})
										}
										className='w-full block focus:border-indigo-500 border-gray-300'
									/>
								</div>

								{quiz.questions.length > 0 ? (
									<h3 className='mb-3 text-xl font-medium'>
										{__('Questions:')}
									</h3>
								) : (
									<h3 className='mb-2 text-xl font-medium'>
										{__('No Questions')}
									</h3>
								)}

								{quiz.questions.length > 0 &&
									quiz.questions.map((question, index) => {
										return (
											<>
												<QuesitenItem
													question={question}
													index={index}
													setQuestions={setQuestions}
													deleteQuestion={
														deleteQuestion
													}
												/>
											</>
										);
									})}

								<Button
									icon={plusCircle}
									variant='primary'
									iconPosition='right'
									className='text-white bg-blue-600 py-4 px-5 rounded-md font-semibold hover:bg-blue-800 transition-colors wprqa-button flex items-center mt-5'
									onClick={addNewQuestion}>
									{__('Add New Questions')}
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default AddQuiz;
