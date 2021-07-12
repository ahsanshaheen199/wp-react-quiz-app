import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';
import { Link } from 'react-router-dom';
import { QuizContext } from '../context/QuizContext';

function QuizList() {
	const { state, dispatch } = useContext(QuizContext);

	console.log(state);
	return (
		<>
			<div className='bg-white py-5 rounded-md'>
				<div className='container mx-auto px-4'>
					<div className='flex items-center justify-between'>
						<div>
							<h2 className='font-semibold text-2xl'>
								{__('Quizzes')}
							</h2>
						</div>
						<div>
							<Link
								className='rounded-md text-white hover:text-white bg-blue-600 hover:bg-blue-800 transition-all py-4 px-5 font-semibold text-sm'
								to='/add'>
								{__('Add New')}
							</Link>
						</div>
					</div>
				</div>
			</div>

			<div className='mt-10'>
				<div className='container mx-auto px-4'>
					<div className='flex'>
						<div className='w-full'>
							<table className='w-full'>
								<thead className='bg-white'>
									<tr>
										<th className='text-left'>Title</th>
										<th className='text-left'>Author</th>
										<th className='text-left'>Date</th>
										<th className=''></th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>Intro to CSS</td>
										<td>Adam</td>
										<td>858</td>
									</tr>
									<tr>
										<td>
											A Long and Winding Tour of the
											History of UI Frameworks and Tools
											and the Impact on Design
										</td>
										<td>Adam</td>
										<td>112</td>
									</tr>
									<tr>
										<td>Intro to JavaScript</td>
										<td>Chris</td>
										<td>1,280</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default QuizList;
