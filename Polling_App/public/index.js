function Add_Row() {
	var table = document.getElementById("inpTable");
	var new_row = table.rows[2].cloneNode(true);
	new_row.id = "row";
	new_row.cells[0].innerHTML = "\<input type = \"text\"\/\>";
	new_row.cells[1].innerHTML = "\<input type = \"text\"\/\>";
	new_row.cells[2].innerHTML="\<select\>\
								\<option value=\"\" style=\"display:none\"\>Select one Poll\<\/option\>\
								\<option value=\"for\"\>For\<\/option\>\
								\<option value=\"against\">Against\<\/option\>\
								\<\/select\>";
	table.appendChild(new_row);
}

function Del_Row() {
	var table = document.getElementById("inpTable");
	var len = table.rows.length;
	if(len == 3) {
		console.log("At least one row should be present!");
	} else {	
		table.rows[len-1].style.border="0px";
		table.removeChild(table.rows[len-1]);
	}

}

function Print(arr) {
	for(let i = 0; i < arr.length; i++)
		console.log(`${arr[i]} `);
	console.log("\n");
}

function Populate_Table(ids, values, fors, agnsts, closed) {
	var for_tbl = document.getElementById("forTable");
	var agnst_tbl = document.getElementById("agstTable");
	var closed_tbl = document.getElementById("clsdTable");
	let for_vals = [], agnst_vals = [], clsd_vals = [];

	for(let i = 0; i < fors.length; i++) {
		for_vals.push(values[ids.indexOf(fors[i])]);
	}

	for(let i = 0; i < agnsts.length; i++) {
		agnst_vals.push(values[ids.indexOf(agnsts[i])]);
	}

	for(let i = 0; i < for_vals.length; i++) {
		let index = values.indexOf(for_vals[i]);
		values.splice(index, 1);
	}
	for(let i = 0; i < agnst_vals.length; i++) {
		let index = values.indexOf(agnst_vals[i]);
		values.splice(index, 1);
	}

	clsd_vals = values;

	/*console.log("FOR VALUES: ");
	Print(for_vals);
	console.log("AGAINST VALUES: ");
	Print(agnst_vals);
	console.log("CLOSED VALUES: ");
	Print(clsd_vals);*/

	let len = for_tbl.rows.length;
	for_tbl.rows[len-2].cells[0].innerHTML = fors;
	for_tbl.rows[len-2].cells[1].innerHTML = for_vals;

	let tmp = [];
	for(let i in for_vals) {
		tmp.push(parseInt(for_vals[i]));
	}

	let total = 0;
	for(let i in tmp) total += tmp[i];
	for_tbl.rows[len-1].cells[1].innerHTML = total;
	console.log(`For total is: ${total}`);

	len = agnst_tbl.rows.length;
	agnst_tbl.rows[len-2].cells[0].innerHTML = agnsts;
	agnst_tbl.rows[len-2].cells[1].innerHTML = agnst_vals;

	tmp = [];
	for(let i in agnst_vals) {
		tmp.push(parseInt(agnst_vals[i]));
	}

	total = 0;
	for(let i in tmp) total += tmp[i];
	agnst_tbl.rows[len-1].cells[1].innerHTML = total;
	console.log(`Against total is: ${total}`);

	len = closed_tbl.rows.length;
	closed_tbl.rows[len-1].cells[0].innerHTML = closed;
	closed_tbl.rows[len-1].cells[1].innerHTML = clsd_vals;

}

function Process_Data(ids, values, polls) {
	let for_c = 0; agnst_c = 0, for_poll = [], agnst_poll= [];

	for(let i = 0; i < ids.length; i++) {
		
		if(polls[i] === "for")
			for_poll.push(ids[i]);
		else
			agnst_poll.push(ids[i]);

	}

	let close_s = [], for_s = [], agnst_s = [];

	for_s = for_poll.filter(function(v){ return agnst_poll.indexOf(v) < 0;});
	agnst_s = agnst_poll.filter(function(v){ return for_poll.indexOf(v) < 0;});

	for(let i = 0; i < for_s.length; i++) {
		let index = for_poll.indexOf(for_s[i]);
		for_poll.splice(index, 1);
	}
	for(let i = 0; i < agnst_s.length; i++) {
		let index = agnst_poll.indexOf(agnst_s[i]);
		agnst_poll.splice(index, 1);
	}

	close_s = for_poll.concat(agnst_poll);

	Populate_Table(ids, values, for_s, agnst_s, close_s);

	/*console.log("For: ");
	Print(for_s);
	console.log("Against: ");
	Print(agnst_s);
	console.log("Common: ");
	Print(close_s);*/
}

function Submit_Data(ids, values, polls) {
	var resDiv = document.getElementById("result");
	resDiv.style.display = "block";
	document.getElementById("submit").disabled=true;
	document.getElementById("add").disabled=true;
	document.getElementById("delete").disabled=true;
	document.getElementById("cancel").disabled=true;
	document.getElementById("reset").style.display="block";
	document.getElementById("reset").disabled=false;
	Process_Data(ids, values, polls);
}

function Validate_Data() {
	var table = document.getElementById("inpTable");

	var inputs = [], polls = [];
	inputs = document.querySelectorAll('input');
	polls = document.querySelectorAll('select');

	let id_s = [], value_s = [], poll_s = [], finish_val = false;
	for(let i = 0, j = 1, k = 0; k < polls.length; i+=2, j+=2, k++) {

		let id_flg = false, val_flg = false, poll_flg = false;

		let val = inputs[i].value;
		if((val > 999) && (val < 10000)) {
			id_s.push(val);
			id_flg = true;
		}
		else {
			alert("Please enter 4 digit Id!");
			break;
		}

		if(id_flg){
			let val = inputs[j].value;
			if((val > 99999) && (val < 1000000)) {
				value_s.push(val);
				val_flg = true;
			}
			else {
				alert("Please enter 6 digit Value!");
				break;
			}
		}

		if(id_flg && val_flg) {
			let poll = polls[k].value;
			if(poll === "select") {
				alert("Please poll your Opinion!");
				break;
			}
			else {
				poll_flg = true;
				poll_s.push(poll);
			}
		}	

		if((k == (polls.length-1)) && id_flg && val_flg && poll_flg)
			finish_val = true;
	}

	if(finish_val)
		Submit_Data(id_s, value_s, poll_s);
}

function Cancel_Data() {
	
	var table = document.getElementById("inpTable");
	var len = table.rows.length;
	let i = len;

	while(i>3){
		table.rows[i-1].style.border="0px";
		table.removeChild(table.rows[i-1]);
		i--;
	}
	var inputs = [], polls = [];
	inputs = document.querySelectorAll('input');
	polls = document.querySelectorAll('select');
	for(let i = 0; i < inputs.length; i++) {
		inputs[i].value = "";
	}
	for(let i = 0; i < polls.length; i++) {
		polls[i].value = "select";
	}

	

}

function Reset_Data() {
	var resDiv = document.getElementById("result");
	resDiv.style.display = "none";
	document.getElementById("reset").disabled=true;
	document.getElementById("submit").disabled=false;
	document.getElementById("add").disabled=false;
	document.getElementById("delete").disabled=false;
	document.getElementById("cancel").disabled=false;
}
