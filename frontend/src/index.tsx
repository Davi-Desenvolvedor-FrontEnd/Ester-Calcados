import Header from './components/Header'
import Produtos from './components/Produtos';
import SideBar from './components/SideBar';

export default function App() {
  return (
    <div className="app-container">
      <Header />
      <main>
        <SideBar />
        <Produtos />
      </main>
    </div>
  );
}
