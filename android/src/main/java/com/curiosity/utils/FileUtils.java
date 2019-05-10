package com.curiosity.utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.text.DecimalFormat;

public class FileUtils {


    public static void deleteDirWithFile(File dir) {
        if (dir == null || !dir.exists()) return;
        if (dir.isFile()) {
            dir.delete();
            return;
        }
        File[] files = dir.listFiles();
        for (int i = 0; i < files.length; i++) {
            if (files[i].isFile())
                files[i].delete(); // 删除所有文件
            else if (files[i].isDirectory())
                deleteDirWithFile(files[i]); // 递规的方式删除文件夹

        }
        dir.delete();// 删除目录本身
    }


    /**
     * 获取指定文件夹的大小
     *
     * @param file
     * @return
     * @throws Exception
     */
    public static String getDirectorySize(File file) {
        String size = "";
        File list[] = file.listFiles();//文件夹目录下的所有文件
        if (list == null) {//4.2的模拟器空指针。
            return "0.00KB";
        }
        if (list != null) {
            for (int i = 0; i < list.length; i++) {
                if (list[i].isDirectory()) {//判断是否父目录下还有子目录
                    size = size + getDirectorySize(list[i]);
                } else {
                    size = size + getFileSize(list[i]);
                }
            }
        }
        return size == "" ? "0.00KB" : size;
    }


    /**
     * 获取指定文件的大小
     *
     * @return
     * @throws Exception
     */
    public static String getFileSize(File file) {
        long size = 0;
        if (file.exists()) {
            FileInputStream fis = null;
            try {
                fis = new FileInputStream(file);//使用FileInputStream读入file的数据流
                size = fis.available();//文件的大小
            } catch (IOException e) {
                e.printStackTrace();
            } finally {
                try {
                    fis.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }

        } else {
        }
        return FormatFileSize(size);
    }

    /**
     * 转换文件大小
     *
     * @param fileSize
     * @return
     */
    private static String FormatFileSize(long fileSize) {
        DecimalFormat df = new DecimalFormat("#.00");
        String fileSizeString = "";
        String wrongSize = "0B";
        if (fileSize == 0) {
            return wrongSize;
        }
        if (fileSize < 1024) {
            fileSizeString = df.format((double) fileSize) + "B";
        } else if (fileSize < 1048576) {
            fileSizeString = df.format((double) fileSize / 1024) + "KB";
        } else if (fileSize < 1073741824) {
            fileSizeString = df.format((double) fileSize / 1048576) + "MB";
        } else {
            fileSizeString = df.format((double) fileSize / 1073741824) + "GB";
        }
        return fileSizeString;
    }


    /**
     * 给定根目录，返回一个相对路径所对应的实际文件名.
     *
     * @param baseDir     指定根目录
     * @param absFileName 相对路径名，来自于ZipEntry中的name
     * @return java.io.File 实际的文件
     */
    public static File getRealFileName(String baseDir, String absFileName) {
        String[] dirs = absFileName.split("/");
        File ret = new File(baseDir);
        String substr = null;
        if (dirs.length > 1) {
            for (int i = 0; i < dirs.length - 1; i++) {
                substr = dirs[i];
                try {
                    substr = new String(substr.getBytes("8859_1"), "GB2312");
                } catch (UnsupportedEncodingException e) {
                    e.printStackTrace();
                }
                ret = new File(ret, substr);
            }
            if (!ret.exists())
                ret.mkdirs();
            substr = dirs[dirs.length - 1];
            try {
                substr = new String(substr.getBytes("8859_1"), "GB2312");
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
            ret = new File(ret, substr);
            return ret;
        }
        return ret;
    }

}
