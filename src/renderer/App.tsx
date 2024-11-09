import { useState } from 'react';
import { MemoryRouter as Router, Routes, Route, Search } from 'react-router-dom';
import './App.css';
import { SearchResult } from '../common/dto/searchResult';
import { FileService } from '../common/service/fileservice';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
      </Routes>
    </Router>
  );
}

const HomeScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState<Array<SearchResult>>([]);
  const [loading, setLoading] = useState(false);  // ローディング状態を追加
  
  /**
   * ファイル検索処理
   */
  const SearchFile = async () => {
    // ElectronのIPCを使って検索を実行し、結果を取得します
    setLoading(true);
    const results = await window.electron.ipcRenderer.searchFiles("C:\\Users\\soro0", searchText);

    // サンプルデータを仮の結果として使用（実際には `results` を使用）
    const sampleResults = [
      { id: 1, path: '/path/to/file1.txt', type: 'テキスト' },
      { id: 2, path: '/path/to/image.png', type: '画像' },
      { id: 3, path: '/path/to/document.pdf', type: 'PDF' },
    ];

    // 検索結果を状態に保存
    setSearchResults(results);
    setLoading(false);
  };

  return (
    <div className='search-window'>
      <div className="logo">File<span>Probe</span></div>

      <div className="search-box">
        <input 
          className='search-text'  
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="検索ファイル名を入力"
        />
        <button onClick={SearchFile}>検索</button>
      </div>

      {/* 検索結果がある場合にテーブルを表示 */}
      {searchResults.length > 0 && (
        <div className="search-result">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>パス</th>
                <th>種類</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((result) => (
                <tr key={result._id}>
                  <td>{result._id}</td>
                  <td>{result._path}</td>
                  <td>{result._type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
