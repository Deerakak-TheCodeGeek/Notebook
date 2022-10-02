var form = document.getElementById('add-frm');
var items =document.getElementById('items');
var ntitle = document.getElementById('n-title');
var nbody = document.getElementById('n-body');
var tableDiv = document.getElementById('tbl-div');
var search = document.getElementById('srch');
var rstbtn =document.getElementById('reset')



var noteCount = 0;
var newNote = '';
var isUpdate = false;
var record = '';
var note = '';
var body = '';



window.onload = updateTable;

form.addEventListener('submit', addNote);

search.addEventListener('keyup',searchNote);

items.addEventListener('click',rNote);

items.addEventListener('click',vnuNote);

rstbtn.addEventListener('click',rstAll)

function updateTable(){
    if(noteCount>0){
        tableDiv.style.display = '';
        if(isUpdate){
            note.firstChild.textContent = ntitle.value;
            note.lastChild.textContent = nbody.value;
            isUpdate=false;
            noteCount--;
        }
        else{
            items.appendChild(newNote);
        }
    }
    else{
        tableDiv.style.display = 'none';
    }
}

function addNote(e){
    e.preventDefault();

    if(ntitle.value=='' || nbody.value==''){
        alert('Please Fill All Fields')
    }
    else{
        var tr =document.createElement('tr');
        tr.className='item';

        var td1 =document.createElement('td');
        td1.appendChild(document.createTextNode(ntitle.value));
        var span = document.createElement('span');
        span.className='note-body';
        span.appendChild(document.createTextNode(nbody.value));
        td1.appendChild(span);

        var td2 = document.createElement('td');
        td2.className = 'btcellv';
        var btn1 = document.createElement('button');
        btn1.appendChild(document.createTextNode('View'));
        btn1.setAttribute('id','vw');
        td2.appendChild(btn1);

        var td3 = document.createElement('td');
        td3.className = 'btcelld';
        var btn2 = document.createElement('button');
        btn2.appendChild(document.createTextNode('Delete'));
        btn2.setAttribute('id','del');
        td3.appendChild(btn2);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        noteCount+=1;

        newNote = tr;

        updateTable();
    }
    rstAll();
}

function searchNote(e){
    var stxt = e.target.value.toLowerCase();
    //console.log(stxt);

    var list = items.getElementsByClassName('item');
    //console.log(list);

    var listArr = Array.from(list);
    listArr.forEach(function(item){
        var nt = item.firstChild.textContent;
        if(nt.toLowerCase().indexOf(stxt) != -1){
            item.style.display = '';
        }
        else{
            item.style.display = 'none';
        }
    })

}

function rNote(e){
    if(e.target.id == 'del'){
        if(confirm('Are you sure?')){
            var tr = e.target.parentElement.parentElement;
            items.removeChild(tr);

            noteCount--;
            if(noteCount==0){
                updateTable();
            }
        }
    }
}

function vnuNote(e){
    if(e.target.id === 'vw'){
        record = e.target.parentElement.parentElement;
        note = record.firstChild;
        ntitle.value = note.firstChild.textContent;
        nbody.value = note.lastChild.textContent;
        isUpdate = true;
    }
}

function rstAll(){
    ntitle.value='';
    nbody.value='';
    isUpdate=false;
    newNote='';

}