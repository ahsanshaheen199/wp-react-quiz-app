import { render } from '@wordpress/element';
import { HashRouter, Route, Switch } from 'react-router-dom';
import QuizList from './pages/QuizList';
import AddQuiz from './pages/AddQuiz';
import NotFound from './pages/NotFound';
import 'sweetalert2/dist/sweetalert2.min.css';
import '../css/index.css';
import { QuizProvider } from './context/QuizContext';

const QuizApp = () => {
	return (
		<>
			<HashRouter>
				<QuizProvider>
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
				</QuizProvider>
			</HashRouter>
		</>
	);
};

render(<QuizApp />, document.getElementById('wprqa'));
