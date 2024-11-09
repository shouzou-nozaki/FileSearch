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
            case ".html":
            case ".shtml":
            case ".mht":
            case ".xml":
            case ".xhtml":
            case ".xht":
                return FileType.Html_Xml;

            case ".txt":
            case ".asc":
            case ".sjis":
                return FileType.Text;

            case ".css":
            case ".xsl":
                return FileType.StyleSheet;

            case ".js":
            case ".pl":
            case ".pm":
            case ".cgi":
            case ".asp":
            case ".bat":
            case ".sh":
            case ".php":
            case ".tcl":
            case ".vbs":
                return FileType.Script;

            case ".gif":
            case ".jpg":
            case ".jpeg":
            case ".jpe":
            case ".jfif":
            case ".png":
            case ".bmp":
            case ".dib":
            case ".rle":
            case ".ico":
            case ".ai":
            case ".art":
            case ".cam":
            case ".cdr":
            case ".cgm":
            case ".cmp":
            case ".dpx":
            case ".fal":
            case ".q0":
            case ".fpx":
            case ".j6i":
            case ".mac":
            case ".maki":
            case ".mng":
            case ".pcd":
            case ".pct":
            case ".pic":
            case ".pict":
            case ".pcx":
            case ".pmp":
            case ".pnm":
            case ".psd":
            case ".ras":
            case ".sj1":
            case ".tif":
            case ".tiff":
            case ".nsk":
            case ".tga":
            case ".wmf":
            case ".wpg":
            case ".xbm":
            case ".xpm":
                return FileType.Image;

            case ".mp3":
            case ".mid":
            case ".mid":
            case ".wav":
            case ".aif":
            case ".aiff":
            case ".aifc":
            case ".au":
            case ".snd":
                return FileType.Sound;

            case ".mov":
            case ".qt":
            case ".mpg":
            case ".mpeg":
            case ".wm":
            case ".wma":
            case ".wmv":
            case ".asf":
            case ".wax":
            case ".wvx":
            case ".asx":
            case ".ra":
            case ".rv":
            case ".rm":
            case ".ram":
            case ".rmm":
            case ".rpm":
            case ".swf":
            case ".avi":
            case ".dvr-ms":
            case ".scr":
            case ".smi":
            case ".smil":
            case ".vdo":
            case ".vrml":
            case ".wrl":
                return FileType.MultiMedia;

            case ".lzh":
            case ".zip":
            case ".cab":
            case ".tar":
            case ".gz":
            case ".tgz":
            case ".tar.gz":
            case ".hqx":
            case ".sit":
            case ".Z":
            case ".uu":
                return FileType.Compression;

            case ".pdf":
            case ".doc":
            case ".xls":
            case ".xlsx":
            case ".ppt":
            case ".pps":
            case ".dcr":
            case ".dir":
            case ".dxr":
            case ".dwt":
            case ".fla":
            case ".jxw":
            case ".ppd":
            case ".ps":
            case ".eps":
            case ".ai":
            case ".rtf":
            case ".wri":
                return FileType.Application;

            case ".class":
            case ".jar":
            case ".java":
                return FileType.Java;

            case ".c":
            case ".cpp":
            case ".h":
            case ".obj":
                return FileType.C_Cpp;

            case ".hlp":
            case ".chm":
            case ".man":
                return FileType.Help;

            case ".exe":
            case ".dll":
            case ".com":
            case ".ocx":
            case ".sys":
            case ".a":
            case ".so":
                return FileType.Exe_Lib;

            case ".fon":
            case ".ttf":
            case ".ttc":
                return FileType.WinFont;

            case ".ani":
            case ".cur":
            case ".db":
            case ".inf":
            case ".ini":
            case ".reg":
            case ".scr":
            case ".url":
                return FileType.WinOther;

            case ".csv":
            case ".cnf":
            case ".conf":
            case ".cf":
            case ".log":
            case ".dat":
            case ".bak":
            case ".bin":
            case ".dic":
            case ".old":
            case ".org":
            case ".tmp":
            default:
                return FileType.Other;
        }
    }
}