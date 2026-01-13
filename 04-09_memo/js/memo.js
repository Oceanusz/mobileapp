"use strict";

// A: ページが読み込まれたタイミングで実行するコード
document.addEventListener("DOMContentLoaded", function() {

    if (typeof localStorage === "undefined") {
        Swal.fire({
            icon: "error",
            title: "エラー",
            text: "このブラウザはLocal Storageが使えません。",
        });
        return;
    } else {
        viewStorage();
        saveLocalStorage();
        delLocalStorage();
        allClearLocalStorage();
        selectTable();
    }

}, false);


// 保存（save）
function saveLocalStorage() {
    const save = document.getElementById("save");

    save.addEventListener("click", function(e) {
        e.preventDefault();

        const key = document.getElementById("textKey").value;
        const value = document.getElementById("textMemo").value;

        if (key === "" || value === "") {
            Swal.fire({
                icon: "error",
                title: "入力エラー",
                text: "Key と Memo は必須です。",
            });
            return;
        }

        Swal.fire({
            icon: 'question',
            title: '確認',
            text: "「" + key + " : " + value + "」を保存しますか？",
            showCancelButton: true,
            confirmButtonText: 'はい',
            cancelButtonText: 'キャンセル'
        }).then((result) => {

            if (result.isConfirmed) {
                localStorage.setItem(key, value);

                Swal.fire({
                    icon: "success",
                    title: "保存しました",
                    text: "「" + key + " : " + value + "」を保存しました。",
                    showConfirmButton: false,
                    timer: 1800
                });
                
                  

                document.getElementById("textKey").value = "";
                document.getElementById("textMemo").value = "";
                viewStorage();
            }
        });

    }, false);
}



// selectボタン
function selectTable() {
    const select = document.getElementById("select");
    select.addEventListener("click", function(e) {
        e.preventDefault();

        const cnt = selectCheckBox();

        if (cnt === "0") {
            Swal.fire({
                icon: 'error',
                title: 'エラー',
                text: '1つ以上選択してください。',
            });
        }
    }, false);
}




// checkbox一覧の取得
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
        Swal.fire({
            icon: "error",
            title: "エラー",
            text: "1つ選択(select)してください。"
        });
        return;
    }

    if (w_cnt > 1) {
        Swal.fire({
            icon: "error",
            title: "エラー",
            text: "選択(select)は1つだけにしてください。"
        });
        return;
    }

    // đúng 1 dòng
    document.getElementById("textKey").value  = w_textKey;
    document.getElementById("textMemo").value = w_textMemo;

    Swal.fire({
        icon: "success",
        title: "選択しました",
        text: "データを読み込みました。",
        timer: 1200,
        showConfirmButton: false
    });
}




// 表示
function viewStorage() {

    const list = document.getElementById("list");
    while (list.rows[0]) list.deleteRow(0);

    for (let i = 0; i < localStorage.length; i++) {

        let w_key = localStorage.key(i);
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");

        td1.innerHTML = "<input name='chkbox1' type='checkbox'>";
        td2.innerHTML = w_key;
        td3.innerHTML = localStorage.getItem(w_key);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        list.appendChild(tr);
    }

    $("#table1").tablesorter({
        sortList: [[1, 0]]
    });
    $("#table1").trigger("update");
}



// 削除（1件または複数件 OK）
function delLocalStorage() {
    const del = document.getElementById("del");

    del.addEventListener("click", function(e) {
        e.preventDefault();

        const chkbox1 = document.getElementsByName("chkbox1");
        const table1 = document.getElementById("table1");

        let w_cnt = 0;
        let selectedKeys = [];

        for (let i = 0; i < chkbox1.length; i++) {
            if (chkbox1[i].checked) {
                w_cnt++;
                selectedKeys.push({
                    key: table1.rows[i + 1].cells[1].textContent,
                    value: table1.rows[i + 1].cells[2].textContent
                });
            }
        }

        if (w_cnt === 0) {
            Swal.fire({
                icon: "error",
                title: "エラー",
                text: "1つ以上選択(select)してください。",
            });
            return;
        }


        // ---- confirm (1件 or 複数件) ----
        let message = "";

        if (w_cnt === 1) {
            message = "「" + selectedKeys[0].key + " : " + selectedKeys[0].value + "」を削除しますか？";
        } else {
            message = "以下の " + w_cnt + " 件を削除しますか？\n\n";
            selectedKeys.forEach(obj => {
                message += "・" + obj.key + "\n";
            });
        }

        Swal.fire({
            icon: "question",
            title: "確認",
            html: message.replace(/\n/g, "<br>"),
            showCancelButton: true,
            confirmButtonText: "はい",
            cancelButtonText: "キャンセル"
        }).then((result) => {

            if (result.isConfirmed) {

                // delete
                selectedKeys.forEach(obj => {
                    localStorage.removeItem(obj.key);
                });

                Swal.fire({
                    icon: "success",
                    title: "削除しました",
                    text: (w_cnt === 1)
                        ? "「" + selectedKeys[0].key + " : " + selectedKeys[0].value + "」を削除しました。"
                        : w_cnt + " 件のデータを削除しました。",
                    showConfirmButton: false,
                    timer: 1800
                });
                
                

                document.getElementById("textKey").value = "";
                document.getElementById("textMemo").value = "";
                viewStorage();
            }
        });

    }, false);
}



// 全削除
function allClearLocalStorage() {
    const allClearLocalStorage = document.getElementById("allClear");

    allClearLocalStorage.addEventListener("click", function(e) {
        e.preventDefault();

        Swal.fire({
            icon: "warning",
            title: "全削除しますか？",
            text: "この操作は取り消せません。",
            showCancelButton: true,
            confirmButtonText: "はい、削除します",
            cancelButtonText: "キャンセル"
        }).then((result) => {

            if (result.isConfirmed) {
                localStorage.clear();

                Swal.fire({
                    icon: 'success',
                    title: '全削除完了',
                    text: 'LocalStorageのデータをすべて削除しました。',
                    showConfirmButton: false,
                    timer: 1800
                  });
                  

                viewStorage();
                document.getElementById("textKey").value = "";
                document.getElementById("textMemo").value = "";
            }
        });

    }, false);
}
