import { useState, useEffect } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// データ型を定義
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
      </Routes>
    </Router>
  );
}

/**
 * ファイル検索処理
 * @returns 
 */
const SearchFile = () =>{
  // const query = document.getElementById("search-text")?.nodeValue;
  return;
}


const HomeScreen = () => {
  // 検索画面
  return (
    <div>
      <div className="logo">File<span>Probe</span></div>

      <div className="search-box">
        <input className='search-text' type="text" placeholder="検索ファイル名を入力"/>
        <button onClick={SearchFile}>検索</button>
      </div>
    </div>
  );
};


