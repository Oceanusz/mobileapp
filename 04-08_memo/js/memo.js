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

// 保存（ほぞん）
function saveLocalStorage() {
    const save = document.getElementById("save");

    save.addEventListener("click", function(e) {
        e.preventDefault();

        const key = document.getElementById("textKey").value;
        const value = document.getElementById("textMemo").value;

        if (key === "" || value === "") {
            window.alert("Key、Memoはいずれも必須です。");
            return;
        } else {
            // confirm trước khi lưu
            let w_confirm = confirm("LocalStorageに\n「" + key + " : " + value + "」\nを保存（save）しますか？");
            if (w_confirm === true) {
                localStorage.setItem(key, value);
                viewStorage();
                let w_msg = "LocalStorageに\n「" + key + " : " + value + "」\nを保存しました。";
                window.alert(w_msg);

                document.getElementById("textKey").value = "";
                document.getElementById("textMemo").value = "";
                viewStorage();
            }
        }
    }, false);
}

// データ選択ボタン（selectボタン）
function selectTable() {
    const select = document.getElementById("select");
    select.addEventListener("click", function(e) {
        e.preventDefault();

        const cnt = selectCheckBox();

        if (cnt === "0") {
            window.alert("1つ以上選択(select)してください。");
        }
    }, false);
}



// テーブルからデータ選択（checkbox版）
// Trả về số lượng đã chọn (string): "0", "1", "2", ...
// Nếu >=1 thì sẽ gán textKey/textMemo bằng mục đầu tiên được chọn
function selectCheckBox() {

    const chkbox1 = document.getElementsByName("chkbox1");
    const table1  = document.getElementById("table1");

    let w_cnt = 0;
    let w_textKey  = "";
    let w_textMemo = "";

    for (let i = 0; i < chkbox1.length; i++) {
        if (chkbox1[i].checked) {
            w_cnt++;
            if (w_cnt === 1) {
                w_textKey  = table1.rows[i + 1].cells[1].textContent;
                w_textMemo = table1.rows[i + 1].cells[2].textContent;
            }
        }
    }

    if (w_cnt === 0) {
        alert("1つ選択(select)してください。");
        return;
    }

    if (w_cnt > 1) {
        alert("選択(select)は1つだけにしてください。");
        return;
    }

    // đúng 1 dòng
    document.getElementById("textKey").value  = w_textKey;
    document.getElementById("textMemo").value = w_textMemo;
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

        // td1: checkbox
        let checkbox = "<input name='chkbox1' type='checkbox'>";
        td1.innerHTML = checkbox;

        // td2: Key
        td2.innerHTML = w_key;

        // td3: Value
        td3.innerHTML = localStorage.getItem(w_key);

        // append
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

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

        const chkbox1 = document.getElementsByName("chkbox1");
        const table1  = document.getElementById("table1");

        // (1) đếm số checkbox được chọn
        let w_cnt = 0;
        for (let i = 0; i < chkbox1.length; i++) {
            if (chkbox1[i].checked) {
                w_cnt++;
            }
        }

        // (2) nếu không chọn gì -> báo lỗi
        if (w_cnt === 0) {
            window.alert("1つ以上選択(select)してください。");
            return;
        }

        // (3) nếu chỉ 1, lấy key/value đầu tiên và confirm theo format cũ
        if (w_cnt === 1) {
            var key = "";
            var value = "";
            for (let i = 0; i < chkbox1.length; i++) {
                if (chkbox1[i].checked) {
                    key   = table1.rows[i + 1].cells[1].textContent;
                    value = table1.rows[i + 1].cells[2].textContent;
                    break;
                }
            }

            let w_confirm = confirm("LocalStorageのデータ\n「" + key + " : " + value + "」\nを削除(delete)しますか？");
            if (w_confirm === true) {
                localStorage.removeItem(key);
                let w_msg = "LocalStorageから\n" + key + " : " + value + "\nを削除(delete)しました。";
                window.alert(w_msg);
                document.getElementById("textKey").value = "";
                document.getElementById("textMemo").value = "";
                viewStorage();
            }
            return;
        }

        // (4) trường hợp >= 2: gom danh sách key để hiện confirm, rồi xóa từng cái
        // build message list
        var msg = "以下の " + w_cnt + " 件のデータを削除(delete)しますか？\n\n";
        for (let i = 0; i < chkbox1.length; i++) {
            if (chkbox1[i].checked) {
                var k = table1.rows[i + 1].cells[1].textContent;
                msg += "・" + k + "\n";
            }
        }

        let w_confirm2 = confirm(msg);
        if (w_confirm2 === true) {
            // xóa từng item (duyệt ngược không cần thiết khi xóa từ localStorage theo key,
            // nhưng giữ kiểu đơn giản: duyệt từ đầu)
            for (let i = 0; i < chkbox1.length; i++) {
                if (chkbox1[i].checked) {
                    var key2 = table1.rows[i + 1].cells[1].textContent;
                    localStorage.removeItem(key2);
                }
            }

            window.alert(w_cnt + " 件のデータを削除しました。");
            document.getElementById("textKey").value = "";
            document.getElementById("textMemo").value = "";
            viewStorage();
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
