import { render } from '@wordpress/element';
import { PanelBody } from '@wordpress/components';

const App = () => {
	return (
		<PanelBody title='Test Title'>
			<input type='text' />
		</PanelBody>
	);
};

render(<App />, document.getElementById('mainwrap'));
