import * as fs from 'fs/promises';
import * as path from 'path';
import { SearchResult } from '../dto/searchResult';
import { FileUtils } from '../utils/fileUtils';

export class FileService {

   /**
   * 検索語を含むファイルを検索
   * @param dir_root 検索開始ディレクトリのパス
   * @param searchText ファイル名に含まれるキーワード
   * @returns 一致するファイルパスのリスト（Promise）
   */
   static async searchFiles(dir_root: string, searchText: string): Promise<Array<SearchResult>> {
    // 戻り値
    let rtn = new Array<SearchResult>();
    let i = 1;

    try {
      // console.log("【メソッド開始】" + " [ディレクトリ] " + dir_root + " [検索語] " + searchText);
      
      // 何も入力されていないときは、空のリストを返す
      if (searchText === "") return rtn;

      // ディレクトリ内のファイルとサブディレクトリのリストを取得
      const files = await fs.readdir(dir_root);

      // 各ファイルをチェック
      for (const file of files) {
        const filePath = path.join(dir_root, file);
        const stat = await fs.stat(filePath);

        // ディレクトリであれば再帰的に検索
        if (stat.isDirectory()) {
          const subResult = await this.searchFiles(filePath, searchText);
          // 親戻り値と結合
          rtn = rtn.concat(subResult);
        }

        // ファイル名に検索キーワードが含まれる場合
        if (file.includes(searchText)) {
          // ファイル情報作成
          const searchResult = new SearchResult();

          searchResult._id = (i++).toString();
          searchResult._path = filePath;
          searchResult._type = new FileUtils().getFileTypeFromExtention(path.extname(filePath));

          // ファイル情報リストに追加
          rtn.push(searchResult);
        }
      }
    } catch (ex) {
      // console.log("エラーが発生しました。", ex);
    }
    return rtn;
  }
}

