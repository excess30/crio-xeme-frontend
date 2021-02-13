import './App.css';
import MemeForm from './components/form';
import NavBar from './components/navbar';
import PostView from './components/posts';

function App() {
  return (
    <div>
      <NavBar />
      <div className="appbody">
        <MemeForm />
        <PostView />
      </div>
    </div>
  );
}

export default App;
