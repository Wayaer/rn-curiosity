package com.curiosity.database;

import android.content.ContentValues;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteException;
import android.os.Build;

import androidx.annotation.RequiresApi;

import com.curiosity.NativeTools;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableNativeMap;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nonnull;

public class Database extends ReactContextBaseJavaModule {

    private static final String NAME = "NativeSQLite";
    public static String CREATE_DB = null;
    private String invokeInfo = "";

    public Database(@Nonnull ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Nonnull
    @Override
    public String getName() {
        return NAME;
    }

    public SQLiteDatabase openOrCreateDatabase(String db_name) {
        SQLiteDatabase db = SQLiteDatabase.openOrCreateDatabase(getCurrentActivity().getDatabasePath(db_name + ".db"), null);
        return db;
    }

    @ReactMethod
    public void initSQLite(String db_name, Callback callback) {
        callback.invoke(this.openOrCreateDatabase(db_name));
    }

    @ReactMethod
    public void createTable(String db_name, String table_name, ReadableMap columnNameMap, Callback callback) {
        SQLiteDatabase db = this.openOrCreateDatabase(db_name);
        invokeInfo = db.toString();
        String create_table = "create table " + table_name + "(id integer primary key autoincrement,";
        HashMap<String, Object> cm = columnNameMap.toHashMap();
        for (Map.Entry<String, Object> entry : cm.entrySet()) {
            create_table = create_table + entry.getKey() + " " + entry.getValue() + ",";
        }
        create_table = create_table.substring(0, create_table.length() - 1) + ")";
        try {
            db.execSQL(create_table);
        } catch (SQLiteException exception) {
            invokeInfo = exception.toString();
        }
        db.close();
        callback.invoke(invokeInfo);
    }

    @ReactMethod
    private void deleteTable(String db_name, String table_name, Callback callback) {
        SQLiteDatabase db = this.openOrCreateDatabase(db_name);
        invokeInfo = db.toString();

        try {
            db.execSQL("DROP TABLE " + table_name);
        } catch (SQLiteException exception) {
            invokeInfo = exception.toString();
        }
        db.close();
        callback.invoke(invokeInfo);
    }

    private void insertCommand(String db_name, String com, Callback callback) {
        SQLiteDatabase db = this.openOrCreateDatabase(db_name);
        try {
            db.execSQL(com);
        } catch (SQLiteException exception) {
            invokeInfo = exception.toString();
        }
        db.close();
        callback.invoke(invokeInfo);
    }

    @ReactMethod
    public void insert(String db_name, String table_name, ReadableMap readableMap, Callback callback) {
        SQLiteDatabase db = this.openOrCreateDatabase(db_name);
        invokeInfo = db.toString();
        ContentValues v = new ContentValues();
        ReadableNativeMap map = (ReadableNativeMap) readableMap;
        HashMap<String, Object> m = map.toHashMap();
        for (HashMap.Entry<String, Object> entry : m.entrySet()) {
            v.put(entry.getKey(), String.valueOf(entry.getValue()));
        }
        try {
            db.insert(table_name, null, v);
        } catch (SQLiteException exception) {
            NativeTools.LogInfo(exception.toString());
            invokeInfo = exception.toString();
        }
        v.clear();
        db.close();
        callback.invoke(invokeInfo);
    }

    @RequiresApi(api = Build.VERSION_CODES.KITKAT)
    @ReactMethod
    public void delete(String db_name, String table_name, String key, String value, Callback callback) {
        SQLiteDatabase db = this.openOrCreateDatabase(db_name);
        invokeInfo = db.toString();
        try {
            db.delete(table_name, key + "=?", new String[]{value});
        } catch (SQLiteException exception) {
            invokeInfo = exception.toString();
        }
        db.close();
        callback.invoke(invokeInfo);
    }

    @ReactMethod
    public void update(String db_name, String table_name, ReadableMap readableMap, String key, String value, Callback callback) {
        SQLiteDatabase db = this.openOrCreateDatabase(db_name);
        invokeInfo = db.toString();
        try {
            ContentValues v = new ContentValues();
            ReadableNativeMap map = (ReadableNativeMap) readableMap;
            HashMap<String, Object> m = map.toHashMap();
            for (HashMap.Entry<String, Object> entry : m.entrySet()) {
                v.put(entry.getKey(), String.valueOf(entry.getValue()));
            }
            db.update(table_name, v, key + "=?", new String[]{value});
        } catch (SQLiteException e) {
            invokeInfo = e.toString();
        }
        db.close();
        callback.invoke(invokeInfo);
    }
}
