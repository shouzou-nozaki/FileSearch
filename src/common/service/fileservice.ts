import * as fs from 'fs';
import * as path from 'path';
import { SearchResult } from '../dto/searchResult';
import { FileUtils } from '../utils/fileUtils';

export class FileService {

  /**
   * 指定したディレクトリからキーワードに一致するファイルを再帰的に検索します。
   * @param dir_root 検索開始ディレクトリのパス
   * @param searchText ファイル名に含まれるキーワード
   * @returns 一致するファイルパスのリスト
   */
  static searchFiles(dir_root:string, searchText:string): Array<SearchResult> {
    // 戻り値
    let rtn = new Array<SearchResult>();
    let i = 1;
    try{
      console.log("【メソッド開始】" + " [ディレクトリ] " + dir_root + " [検索語] " + searchText);
      // 何も入力されていないときは、処理を終える
      if(searchText === "") return rtn;

      // ディレクトリ内のファイル、サブディレクトリ取得
      const files = fs.readdirSync(dir_root);

      // ファイルごとチェック
      files.forEach(file => {
        console.log(file);
        // 現在ファイルのフルパス作成
        const filePath = path.join(dir_root, file);

        // ディレクトリであれば再帰的に検索
        if (fs.statSync(filePath).isDirectory()) {
          // TODO:別スレッド化
          let subResult = this.searchFiles(filePath, searchText);
          rtn = rtn.concat(subResult); // 親のrtnに統合
        }

        // 検索ファイル名を一部含むファイルの場合
        if(~file.indexOf(searchText)) {
          // 検索結果データ作成
          var searchResult = new SearchResult();
          searchResult._id = (i++).toString();
          searchResult._path = filePath;
          searchResult._type = new FileUtils().getFileTypeFromExtention(path.extname(filePath));

          // 返却データの格納
          rtn.push(searchResult);
        }
      })
    }catch(ex){
      console.log("エラーが発生しました。" + ex);
    }
    return rtn;
  }

}

