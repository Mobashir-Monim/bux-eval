javascript: (function () {
    "use strict";
    var rows = null;
    var missing = [];
    var txtarea = null;
    $(".content-left.inputContainer").append(
        '<div id="marks_entry_dialog">Copy Paste student Info <br>serialNo col1, Id in col2 and marks in col3<br><br>Example:<br>1 03101027 88<br>2 14301020 78<p><textarea id="marks_entry_textarea" style="width: 130px;height: 300px;float: left;"></textarea><span id="marks_entry_missing" style="vertical-align:top;"></span></p></div>'
    );
    $("#marks_entry_dialog").dialog({
        autoOpen: false,
        resizable: true,
        width: "350",
        height: 300,
        modal: true,
        buttons: {
            Run: function () {
                if ($(this).find("textarea").val().length) {
                    rows = $(this).find("textarea").val().split("\n");
                    missing = [];
                    $("#marks_entry_missing").text("");
                    $("#marks_entry_textarea").css({ borderColor: "black" });
                    broker(0);
                    txtarea = $(this).find("textarea");
                }
            },
            Close: function () {
                $(this).dialog("close");
            },
        },
    });
    var buttonElement = document.createElement("input");
    buttonElement.setAttribute("id", "auto-button");
    buttonElement.setAttribute("name", "auto-button");
    buttonElement.setAttribute("class", "ui-button ui-widget ui-state-default ui-corner-all");
    buttonElement.setAttribute("value", "Auto Load Grade Sheet");
    buttonElement.setAttribute("type", "button");
    buttonElement.addEventListener(
        "click",
        function () {
            $("#marks_entry_dialog").find("textarea").val("");
            $("#marks_entry_dialog").dialog("option", "title", "Loading....").dialog("open");
            $("span.ui-dialog-title").text("Auto Marks Entry");
            missing = [];
            $("#marks_entry_missing").text("");
            $("#marks_entry_textarea").css("margin-right", "12px");
            return false;
        },
        false
    );
    $(".content-left.inputContainer").append(buttonElement);
    function broker(y) {
        if (y < rows.length) {
            $("#marks_entry_missing")
                .text("")
                .append("<b>Checking " + y + " of " + rows.length + " Records</b>");
            var cells = rows[y].split("\t");
            if (cells.length < 3 || !process_data(cells[1], cells[2])) {
                console.log("in missing true. push data");
                console.log(rows[y]);
                missing.push(rows[y]);
            }
            setTimeout(function () {
                broker(y + 1);
            }, 500);
        } else {
            $("#marks_entry_missing").text("").append("<b>All Records Checked!</b><br>");
            if (missing.length > 0) {
                $("#marks_entry_missing").append("<b>Mismatched Data:</b><br>");
                for (var y in missing) {
                    $("#marks_entry_missing").append(missing[y] + "<br>");
                }
                txtarea.css({ borderColor: "red" });
            }
        }
    }
    function process_data(id, marks) {
        if ($("td[title=" + id + "]").length) {
            console.log(id + " found data, setting marks: " + marks);
            $("td[title=" + id + "]")
                .next()
                .next()
                .next()[0]
                .click();
            $("#" + $("td[title=" + id + "]").parent()[0].id + "_examMark1").val(marks);
            $("#" + $("td[title=" + id + "]").parent()[0].id + "_examMark1").trigger(jQuery.Event("keydown", { keyCode: 13, which: 13 }));
            $("td[title=" + id + "]")
                .next()
                .next()[0]
                .click();
            return true;
        } else {
            return false;
        }
    }
})();
