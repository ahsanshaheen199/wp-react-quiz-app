import { __ } from '@wordpress/i18n';

function QuizList() {
	return (
		<div className='bg-white p-5 rounded-md'>
			<div className='container'>
				<div className='flex'>
					<div>
						<h2 className='font-semibold text-2xl'>
							{__('Quizzes')}
						</h2>
					</div>
					<div>{__('Add New')}</div>
				</div>
			</div>
		</div>
	);
}

export default QuizList;
