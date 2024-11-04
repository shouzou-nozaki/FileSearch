import { useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

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
  const [searchResults, setSearchResults] = useState<Array<{ id: number, path: string, type: string }>>([]);

  /**
   * ファイル検索処理
   */
  const SearchFile = async () => {
    // ElectronのIPCを使って検索を実行し、結果を取得します
    const results = await window.electron.ipcRenderer.searchFiles(searchText);

    // サンプルデータを仮の結果として使用（実際には `results` を使用）
    const sampleResults = [
      { id: 1, path: '/path/to/file1.txt', type: 'テキスト' },
      { id: 2, path: '/path/to/image.png', type: '画像' },
      { id: 3, path: '/path/to/document.pdf', type: 'PDF' },
    ];

    // 検索結果を状態に保存
    setSearchResults(sampleResults);
  };

  return (
    <div>
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
        <div>
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
                <tr key={result.id}>
                  <td>{result.id}</td>
                  <td>{result.path}</td>
                  <td>{result.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
