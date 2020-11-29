import ChatArea from './ChatArea';

function Main(props) {
	const { pageProps, pageActions } = props;

	return <ChatArea pageProps={pageProps} pageActions={pageActions} />
}

export default Main;
