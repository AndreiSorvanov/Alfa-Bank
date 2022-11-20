import './App.css';
import { Content } from './components/Content';
import { Header } from './components/Header';
import { Layout } from './components/Layout';
import { CardsList } from './components/CardsList';
import { Title } from './components/Title';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { rootReducer } from './store';

const store = configureStore({ reducer: rootReducer });

function App() {
  return (
    <Provider store={store}>
      <Layout>
        <Header>
          <Title title={'Список карточек'} />
        </Header>
        <Content>
          <CardsList />
        </Content>
      </Layout>
    </Provider>
  );
}

export default App;
