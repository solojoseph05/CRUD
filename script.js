var selectRow = null;
var employees = [];

updateAfterPageRefresh();



function onSubmitForm(){
    if(validate()){
        var formData = readForm();
        if(selectRow == null){
            insertNewRecord(formData);
        }
        else{
            updateRecord(formData);
        }
        resetForm();
    }
    
    
}
function readForm(){
    var formData = {};
    formData["fullName"] = document.getElementById("fullName").value;
    formData["CodeP"] = document.getElementById("CodeP").value;
    formData["salary"] = document.getElementById("salary").value;
    formData["city"] = document.getElementById("city").value;
    return formData
}
function insertNewRecord(formData){
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow();
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = formData.fullName;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = formData.empCode;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = formData.salary;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = formData.city;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = `<a onClick=editForm(this)>Edit</a><a onClick=deleteRecord(this)>Delete</a>`
    employees.push(formData);
    localStorage.setItem("employees",JSON.stringify(employees));
}
function resetForm(){
    document.getElementById("fullName").value = "";
    document.getElementById("CodeP").value = "";
    document.getElementById("salary").value = "";
    document.getElementById("city").value = "";
    selectRow = null;
}
function deleteRecord(a){
    var row = a.parentElement.parentElement
    if(confirm("Estas seguro de eliminar esta fila")){
        document.getElementById("employeeList").deleteRow(row.rowIndex);
        employees.splice(row.rowIndex-1,1);
        localStorage.setItem("employees",JSON.stringify(employees));

    }
}
function editForm(a){
    selectRow = a.parentElement.parentElement;
    document.getElementById("fullName").value = selectRow.cells[0].innerHTML;
    document.getElementById("CodeP").value = selectRow.cells[1].innerHTML;
    document.getElementById("salary").value = selectRow.cells[2].innerHTML;
    document.getElementById("city").value = selectRow.cells[3].innerHTML;
}
function updateRecord(formData){
    selectRow.cells[0].innerHTML = formData.fullName;
    selectRow.cells[1].innerHTML = formData.empCode;
    selectRow.cells[2].innerHTML = formData.salary;
    selectRow.cells[3].innerHTML = formData.city;
    employees.splice(selectRow.rowIndex-1,1,{fullName:formData.fullName,empCode:formData.empCode,salary:formData.salary,city:formData.city});
    localStorage.setItem("employees",JSON.stringify(employees));
}
function validate(){
    isValid = true;
    if(document.getElementById("fullName").value == ""){
        isValid = false;
        document.getElementById("labelId").classList.remove("hide");
    }
    else{
        isValid = true;
        if(!document.getElementById("labelId").classList.contains("hide")){
            document.getElementById("labelId").classList.add("hide");
        }
    }
    return isValid;
}

function updateAfterPageRefresh(){
    if(localStorage.getItem("employees")==null){
        console.log("No hay nada en el almacenamiento local.")
    }
    else{
        employees = JSON.parse(localStorage.getItem("employees"));
        for (let index = 0; index < employees.length; index++) {
            let nombre = employees[index].fullName;
            let code = employees[index].empCode;
            let salario = employees[index].salary;
            let ciudad = employees[index].city;

            document.getElementById("tbody").innerHTML +=
            `<tr>
                <td>${nombre}</td>
                <td>${code}</td>
                <td>${salario}</td>
                <td>${ciudad}</td>
                <td><a onClick=editForm(this)>Edit</a><a onClick=deleteRecord(this)>Delete</a></td>
            </tr>
            `
            
        }
    }
    
}s