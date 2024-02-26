import '@/app/App.css';
import ContainerGame from '@/components/ContainerGame';
import PanelQuestionGame from '@/components/PanelQuestionGame';

function App() {
  return (
    <div className="App">
      <ContainerGame>
        <PanelQuestionGame />
      </ContainerGame>
    </div>
  );
}

export default App;
