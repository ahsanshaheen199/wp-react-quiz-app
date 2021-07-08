import { render } from '@wordpress/element';
import { HashRouter, Route, Switch } from 'react-router-dom';
import QuizList from './pages/QuizList';
import AddQuiz from './pages/AddQuiz';
import NotFound from './pages/NotFound';
import '../css/index.css';
import { QuestionProvider } from './context/QuestionContext';

const QuizApp = () => {
	return (
		<>
			<HashRouter>
				<QuestionProvider>
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
				</QuestionProvider>
			</HashRouter>
		</>
	);
};

render(<QuizApp />, document.getElementById('wprqa'));
