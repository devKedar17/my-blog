 import { Routes, Route } from 'react-router-dom';
import Navigation from './routes/navigation/navigation.component';
//import Navigation from './routes/home/navigation/navigation.component';
import Home from './routes/home/home.component';
import About from './components/AboutPage/about.component';
import Contact from './components/conatctPage/contact.component';
import Authentication from './routes/authentication/authentication.component';
import BlogPage from './components/Blog/blogPage.component';
import AddBlog from './components/Blog/addBlog.component';
import BlogView from './components/Blog/blogView.component';
import './App.scss';

const App=() => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/auth' element={<Authentication />} />
        <Route path='/blog' element={<BlogPage />} />
        <Route path='/add-blog' element={<AddBlog />} />
        <Route path='/blog-view' element={<BlogView />} />
      </Route>
    </Routes>
    
  );
}

export default App;
