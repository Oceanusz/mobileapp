"use strict";

// A: ページが読み込まれたタイミングで実行するコード
document.addEventListener("DOMContentLoaded", function() {

    // 1.localStorageが使えるか確認
    if (typeof localStorage === "undefined") {
        window.alert("このブラウザはLocal Storage機能が実装されていません");
        return;
    } else {
        viewStorage();
        saveLocalStorage();
        delLocalStorage();
        allClearLocalStorage();
        selectTable();
    }

}, false);

// 2.localStorageへの保存（ほぞん）
// C: 関数定義
function saveLocalStorage() {
    // D: 定数の定義
    const save = document.getElementById("save");

    // E: イベントリスナーを追加
    save.addEventListener("click", function(e) {
        e.preventDefault();

        // F: HTMLのid名「textKey」の要素を取得してセット
        const key = document.getElementById("textKey").value;

        // G: HTMLのid名「textMemo」の要素を取得してセット
        const value = document.getElementById("textMemo").value;

        // H: 値の入力チェック
        if (key === "" || value === "") {
            window.alert("Key、Memoはいずれも必須です。");
            return;
        } else {
            let w_confirm = confirm("LocalStorageに\n「" + key + " : " + value + "」\nを保存（save）しますか？");
            if (w_confirm === true) {
            localStorage.setItem(key, value);
            viewStorage();
            let w_msg = "LocalStorageに " + key + " : " + value + " を保存しました";
            window.alert(w_msg);
            

            document.getElementById("textKey").value = "";
            document.getElementById("textMemo").value = "";
            viewStorage();
            }
        }
    }, false);
}

//データ選択
function selectTable() {
    const select = document.getElementById("select");
    select.addEventListener("click",
    function(e) {
        e.preventDefault();
        selectCheckBox();
    }, false   
    );
};

//テーブルからデータ選択
// テーブルからデータ選択（checkbox版）
function selectCheckBox() {

    let w_sel = "0";    
    let w_cnt = 0;      

    const chkbox1 = document.getElementsByName("chkbox1");
    const table1 = document.getElementById("table1");

    let w_textKey = "";
    let w_textMemo = "";

    // すべてのチェックボックスを確認
    for (let i = 0; i < chkbox1.length; i++) {

        if (chkbox1[i].checked) {
            w_cnt++;

            // 最初にチェックされた1件のみ取得
            if (w_cnt === 1) {
                w_textKey  = table1.rows[i + 1].cells[1].textContent;
                w_textMemo = table1.rows[i + 1].cells[2].textContent;
            }
        }
    }

    // --- 判定処理ここから ---

    // 1件だけの場合（正常）
    if (w_cnt === 1) {
        document.getElementById("textKey").value  = w_textKey;
        document.getElementById("textMemo").value = w_textMemo;

        w_sel = "1";
        return w_sel;
    }

    // 0件または2件以上の場合
    if (w_cnt === 0) {
        window.alert("1つ選択(select)してください。");
    } else {
        window.alert("選択(select)は1つだけにしてください。");
    }

    return w_sel; 
}



// LocalStorageからのデータの取得（取得）とテーブル表示
function viewStorage() {

    // HTMLのテーブル初期化
    const list = document.getElementById("list");
    while (list.rows[0]) list.deleteRow(0);
  
    // LocalStorage すべての情報を取得
    for (let i = 0; i < localStorage.length; i++) {
  
      // LocalStorage のキーと値を取得
      let w_key = localStorage.key(i);
      let tr = document.createElement("tr");
      let td1 = document.createElement("td");
      let td2 = document.createElement("td");
      let td3 = document.createElement("td");
  
      // td1: ラジオボタン
      let checkbox = "<input name='chkbox1' type='checkbox'>";
      td1.innerHTML = checkbox;
  
      // td2: Key
      td2.innerHTML = w_key;
  
      // td3: Value
      td3.innerHTML = localStorage.getItem(w_key);
  
      // trタグの中にtdタグを追加
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
  
      // listタグの中にtrタグを追加
      list.appendChild(tr);
    }

    // tablesorter
  $("#table1").tablesorter({
    sortList: [[1, 0]]
  });

  $("#table1").trigger("update");
  }

  // localStorage から削除
  function delLocalStorage() {
    const del = document.getElementById("del");

    del.addEventListener("click", function(e) {
        e.preventDefault();
        let w_sel = "0";
        w_sel = selectCheckBox();

        const radio1 = document.getElementsByName("radio1");
        const table1 = document.getElementById("table1");

        if (w_sel === "1") {

            const key = document.getElementById("textKey").value;
            const value = document.getElementById("textMemo").value;
            let w_confirm = confirm("LocalStorageのデータ\n「" + key + " : " + value + "」\nを削除(delete)しますか？");
            if (w_confirm === true) {
            localStorage.removeItem(key);
            let w_msg = "LocalStorageから\n" + key + " : " + value + "\nを削除(delete)しました。";
            window.alert(w_msg);
            document.getElementById("textKey").value = "";
            document.getElementById("textMemo").value = "";
            viewStorage();
        }
      }
    }, false);
}

// localStorage all clear
function allClearLocalStorage() {
    const allClearLocalStorage = document.getElementById("allClear");

    allClearLocalStorage.addEventListener("click", function(e) {
        e.preventDefault();
        let w_confirm = confirm("LocalStorageのデータを全て削除 (all clear) します。\nよろしいですか?");
        if (w_confirm === true ) {
            localStorage.clear();
            const list = document.getElementById("list");
            list.innerHTML = "";
            let w_msg = "LocalStorageからのデータの全削除(all clear)しました。";
            window.alert(w_msg);
            document.getElementById("textKey").value = "";
            document.getElementById("textMemo").value = "";
            viewStorage();
        }
 }, false);
}