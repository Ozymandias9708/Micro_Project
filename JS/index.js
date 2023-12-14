const connToken = "90931481|-31949303199675516|90960625"
const jpdbBaseURL = "http://api.login2explore.com:5577"
const jpdbIML = "/api/iml"
const jpdbIRL = "/api/irl"
const DBName = "SCHOOL-DB"
const RelationName = "STUDENT-TABLE"



$("#roll").focus();
$("#name").prop("disabled", true);
$("#class").prop("disabled", true);
$("#birthDate").prop("disabled", true);
$("#address").prop("disabled", true);
$("#enrollDate").prop("disabled", true);


function saveToLocal(jsonObj) {
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem("rec_no", lvData.rec_no);
}

function getStudentRollAsJsonObj() {
    var roll = $("#roll").val();
    var jsonObj = {
        Roll_No: roll 
    }
    return JSON.stringify(jsonObj);
}

function fillData(jsonObj) {
    saveToLocal(jsonObj);
    var record = JSON.parse(jsonObj.data).record;
    $("#name").val(record.Full_Name);
    $("#class").val(record.Class);
    $("#birthDate").val(record.Birth_Date);
    $("#address").val(record.Address);
    $("#enrollDate").val(record.Enrollment_Date);
}


function getStudent() {
    var studentRollJSONStrObj = getStudentRollAsJsonObj();
    var getReqStrObj = createGET_BY_KEYRequest(connToken, DBName, RelationName, studentRollJSONStrObj)
    // alert(getReqStrObj)
    jQuery.ajaxSetup({ async: false });
    var resultObj = executeCommandAtGivenBaseUrl(getReqStrObj, jpdbBaseURL, jpdbIRL);
    // alert(JSON.stringify(resultObj));
    jQuery.ajaxSetup({ async: true });
    if (resultObj.status == 400) {
        $("#roll").prop("disabled", false);
        $("#name").prop("disabled", false);
        $("#class").prop("disabled", false);
        $("#birthDate").prop("disabled", false);
        $("#address").prop("disabled", false);
        $("#enrollDate").prop("disabled", false);


        $("#save").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#name").focus();
    }
    else if (resultObj.status == 200) {
        $("#roll").prop("disabled", true);
        $("#name").prop("disabled", false);
        $("#class").prop("disabled", false);
        $("#birthDate").prop("disabled", false);
        $("#address").prop("disabled", false);
        $("#enrollDate").prop("disabled", false);
        

        fillData(resultObj);
        $("#change").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#name").focus();
    }
    $("#name").focus();
}

function resetForm() {
    $("#roll").val("")
    $("#name").val("");
    $("#class").val("");
    $("#birthDate").val("");
    $("#address").val("");
    $("#enrollDate").val("");

    $("#roll").prop("disabled", false);
    $("#save").prop("disabled", true);
    $("#change").prop("disabled", true);
    $("#reset").prop("disabled", true);

    $("#roll").focus();
    $("#name").prop("disabled", true);
    $("#class").prop("disabled", true);
    $("#birthDate").prop("disabled", true);
    $("#address").prop("disabled", true);
    $("#enrollDate").prop("disabled", true);
    document.getElementById("title").scrollIntoView();
}


function validateData() {
    var roll = $("#roll").val();
    if (roll === "") {
        alert("Student Roll No. is Required Value");
        $("#roll").focus();
        return "";
    }
    var name = $("#name").val();
    if (name === "") {
        alert("Student Name is Required Value");
        $("#name").focus();
        return "";
    }
    var studentClass = $("#class").val();
    if (studentClass === "") {
        alert("Class is Required Value");
        $("#class").focus();
        return "";
    }
    var birthDate = $("#birthDate").val();
    if (birthDate === "") {
        alert("Birth Date is Required Value");
        $("#birthDate").focus();
        return "";
    }
    var address = $("#address").val();
    if (address === "") {
        alert("Address  is Required Value");
        $("#address").focus();
        return "";
    }
    var enrollDate = $("#enrollDate").val();
    if (enrollDate === "") {
        alert("Enrollment Date  is Required Value");
        $("#enrollDate").focus();
        return "";
    }


    var jsonStrObj = {
        Roll_No: roll,
        Full_Name: name,
        Class: studentClass,
        Birth_Date: birthDate,
        Address: address,
        Enrollment_Date: enrollDate
    };
    return JSON.stringify(jsonStrObj);
}


function saveData() {
    var jsonStrObj = validateData();
    if (jsonStrObj === "") {
        return "";
    }
    // console.log(jsonStrObj);
    var putReqStr = createPUTRequest(connToken, jsonStrObj, DBName, RelationName);
    // alert(putReqStr);
    jQuery.ajaxSetup({ async: false });
    var resultObj = executeCommandAtGivenBaseUrl(putReqStr, jpdbBaseURL, jpdbIML);
    // alert(JSON.stringify(resultObj));
    jQuery.ajaxSetup({ async: true });
    alert("Succesfully Saved Student Data")
   
    $("#roll").focus();
    resetForm();

}

function changeData() {
    var jsonChg = validateData();
    if (jsonChg === "") {
        return "";
    }
    // $("#change").prop("disabled", true);
    var updateReqStr = createUPDATERecordRequest(connToken, jsonChg, DBName, RelationName, localStorage.getItem("rec_no"));
    // alert(updateReqStr);
    jQuery.ajaxSetup({ async: false });
    var resultObj = executeCommandAtGivenBaseUrl(updateReqStr, jpdbBaseURL, jpdbIML);
    // alert(JSON.stringify(resultObj));
    jQuery.ajaxSetup({ async: true });
    alert("Succesfully Updated Student Data")

    
    $("#roll").focus();
    resetForm();
}