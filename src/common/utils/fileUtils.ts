import { FileType } from "../dto/fileType";

export class FileUtils {

    /**
     * ファイルタイプ取得メソッド
     * @param extention ファイル拡張子
     * @returns 
     */
    public getFileTypeFromExtention(extention:string): string{
        switch(extention){
            case ".htm":
                return FileType.Html_Xml;
            case ".txt":
                return FileType.Text;
            case ".css":
                return FileType.StyleSheet;
            case ".js":
                return FileType.Script;
            case ".gif":
                return FileType.Image;
            case ".mp3":
                return FileType.Sound;
            case ".mov":
                return FileType.MultiMedia;
            case ".lzh":
                return FileType.Compression;
            case ".pdf":
                return FileType.Application;
            case ".class":
                return FileType.Java;
            case ".c":
                return FileType.C_Cpp;
            case ".hlp":
                return FileType.Help;
            case ".exe":
                return FileType.Exe_Lib;
            case ".fon":
                return FileType.WinFont;
            case ".ani":
                return FileType.WinOther;
            case ".csv":
            default:
                return FileType.Other;
        }
    }
}