#Requires AutoHotkey v2.0
#SingleInstance Force
SetKeyDelay 50, 50

; Homework Checker -> OnCampus gradebook
; Leave this script running (put a shortcut to it in your Startup folder:
; press Win+R, type  shell:startup , and drop a shortcut in that folder).
;
; 1) In Homework Checker, click "Send to gradebook". This script notices it,
;    asks you to click the first student's score box, then types every score.
; 2) F3 still works too: it types whatever scores are on the clipboard.
; Esc stops a paste partway through.

MARK := "##HWC-SCORES##"
pasting := false
busy := false

OnClipboardChange(ClipChanged)

ClipChanged(dataType) {
    global busy
    if (dataType != 1 || busy)
        return
    clip := A_Clipboard
    if (InStr(clip, MARK) != 1)
        return
    busy := true
    text := LTrim(SubStr(clip, StrLen(MARK) + 1), "`r`n")
    A_Clipboard := text            ; leave plain scores on the clipboard (still pasteable into Sheets)
    Sleep(100)
    PasteScores(text, true)
    busy := false
}

F3:: {
    if (A_Clipboard = "") {
        MsgBox "Clipboard is empty. Click 'Copy scores column' first."
        return
    }
    PasteScores(A_Clipboard, true)
}

PasteScores(text, waitForClick) {
    global pasting
    text := StrReplace(text, "`r`n", "`n")
    text := StrReplace(text, "`r", "`n")
    text := RTrim(text, "`n")
    lines := StrSplit(text, "`n")

    if (MsgBox(lines.Length " scores ready.`n`nClick OK, then click the FIRST student's score box in the gradebook.", "Homework Checker → Gradebook", "OKCancel T60") != "OK")
        return

    ToolTip("Click the first student's score box…  (Esc to cancel)")
    pasting := true
    if !KeyWait("LButton", "D T30") {      ; nothing clicked within 30 s
        ToolTip()
        pasting := false
        return
    }
    KeyWait("LButton")
    ToolTip()
    Sleep(300)

    for i, line in lines {
        if !pasting
            break
        line := Trim(line)
        if (line != "")
            SendText(line)
        if (i < lines.Length) {
            Sleep(50)
            Send("{Down}")      ; or "{Tab}" if that's what your gradebook expects
            Sleep(50)
        }
    }
    pasting := false
}

; Esc halts a paste in progress (Esc works normally otherwise)
#HotIf pasting
Esc:: {
    global pasting
    pasting := false
    ToolTip()
}
#HotIf
