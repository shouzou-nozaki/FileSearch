import { useState, useRef } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { SearchResult } from '../common/dto/searchResult';


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
  // 検索キーワード
  const [searchText, setSearchText] = useState('');
  // 検索結果
  const [searchResults, setSearchResults] = useState<Array<SearchResult>>([]);
  // ローディング状態
  const [loading, setLoading] = useState(false);
  // コピーメッセージ
  const [showMessage, setShowMessage] = useState(false);
  // メッセージ表示位置
  const [messagePosition, setMessagePosition] = useState({ x: 0, y: 0 });
  // メッセージエレメント
  const messageRef = useRef<HTMLDivElement>(null);
/**
 * ファイル検索処理
 */
const SearchFile = async () => {
  // ElectronのIPCを使って検索を実行し、結果を取得します
  setLoading(true);
  const results = await window.electron.fileSearch.searchFiles("C:\\Users\\soro0", searchText);

  // 検索結果を状態に保存
  setSearchResults(results);
  setLoading(false);
};

  /**
   * パスのコピー処理
   */
  const CopyPath = (event: React.MouseEvent, path: string) => {
    window.electron.clipboard.copyPath(path);

    // クリック位置を取得してメッセージ表示位置を設定
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    setMessagePosition({ x: rect.left, y: rect.top });
    setShowMessage(true);

    // 2秒後にメッセージを非表示
    setTimeout(() => setShowMessage(false), 2000);
  };

/**
 * 表示画面
 */
return (
  <div className='search-window'>
    {/* ロゴ */}
    <div className="logo">File<span>Probe</span></div>

    {/* 検索欄 */}
    <div className="search-box">
      {/* キーワード入力欄 */}
      <input 
        className='search-text'  
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="検索ファイル名を入力"
      />
      {/* 検索ボタン */}
      <button onClick={SearchFile}>検索</button>
    </div>

      {/* ローディングアニメーション */}
      {loading && (
      <div className="loading-spinner">
        <div className="spinner"></div>
        <span>検索中です...</span>
      </div>
    )}

    {/* 検索結果がある場合にテーブルを表示 */}
    {searchResults.length > 0 && (
      <div className="search-result">
        <table>
          {/* ヘッダー */}
          <thead>
            <tr>
              <th>#</th>
              <th>パス</th>
              <th>種類</th>
            </tr>
          </thead>
          {/* テーブルデータ */}
          <tbody>
            {searchResults.map((result) => (
              <tr key={result._id}>
                {/* id */}
                <td>{result._id}</td>
                {/* パス */}
                <td>
                  <span
                    className="file-link"
                    onClick={(event) => CopyPath(event,result._path)}
                    style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    {result._path}
                  </span>
                </td>
                {/* タイプ */}
                <td>{result._type}</td>
              </tr>
            ))}
          </tbody>
        </table>

        
      {/* コピー完了メッセージの表示 */}
      {showMessage && (
        <div
          ref={messageRef}
          style={{
            position: 'fixed',
            left: `${messagePosition.x}px`,
            top: `${messagePosition.y - 30}px`,
            padding: '5px 10px',
            background: '#28a745',
            color: 'white',
            borderRadius: '5px',
            fontSize: '0.9rem',
            pointerEvents: 'none',
            transform: 'translateX(-50%)',
            zIndex: "1",
          }}
        >
          コピーしました
        </div>
      )}

      </div>
    )}
  </div>
);
};
