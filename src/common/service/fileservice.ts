import * as fs from 'fs';
import * as path from 'path';
import { SearchResult } from '../dto/searchResult';
import { FileUtils } from '../utils/fileUtils';

export class FileService {

  /**
   * 指定したディレクトリからキーワードに一致するファイルを再帰的に検索します。
   * @param dir 検索開始ディレクトリのパス
   * @param keyword ファイル名に含まれるキーワード
   * @returns 一致するファイルパスのリスト
   */
  static searchFiles(fileName:string): Array<SearchResult> {
    // 戻り値
    let rtn = new Array<SearchResult>();
    try{
        let dir_root = "C:\\Users\\soro0\\OneDrive\\デスクトップ\\TODO";
        // ディレクトリ内のファイル、サブディレクトリ取得
        const files = fs.readdirSync(dir_root);

        // ファイルごとチェック
        for (const file of files) {
          console.log(file); // 確認ログ

          // ターゲットファイルのフルパス作成
          const filePath = path.join(dir_root, fileName);

          // ファイルが存在するか確認
          const hasTargetFile = fs.statSync(filePath);

          // 検索ファイル名を一部含むファイルの場合
          if(file == fileName) {
            var searchResult = new SearchResult();
            searchResult._id = "1";
            searchResult._path = filePath;
            searchResult._type = new FileUtils().getFileTypeFromExtention(path.extname(filePath));

            rtn.push(searchResult);
            console.log("ファイル発見");
            continue;
          }

          // ディレクトリであれば再帰的に検索
          if (hasTargetFile.isDirectory()) {
            console.log("ディレクトリ発見：");
          } else if (file.toLowerCase().includes(fileName.toLowerCase())) {
            // ファイル名にキーワードが含まれている場合、結果リストに追加
            // rtn.push(searchResult);
          }
        }
    }catch(ex){
        console.log(ex);
    }
    return rtn;
  }

}

