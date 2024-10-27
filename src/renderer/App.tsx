import { useState, useEffect } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// 検索欄の値
let searchText:string;

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
      <input 
        className='search-text'
        type="text"
        placeholder="検索ファイル名を入力"
        value = {searchText}
        onChange={(e) => searchText = e.target.value} // 入力のたびにsearchTextを更新
        />
      <button onClick={SearchFile}>検索</button>
    </div>
  </div>

  );
};


