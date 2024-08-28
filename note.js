
    let record = [];

    const viewuser = () => {

        let alldata = JSON.parse(localStorage.getItem('take')) || [];
        let tbl = "";
        alldata.map((val) => {
            return (
                tbl += `
                <div class="col-md-3 mt-5">
                        <div class="card" style="width: 18rem;background-color:white;border:1px solid black;text-align:center;padding:20px;">
                            <div class="card-body">
                                <p class="card-text" style="font-size:20px;">Title:- ${val.title}</p>
                                <p class="card-text" style="font-size:20px;">Take Note :- ${val.take}</p>
                              <div class="d-flex mt-5">
                                <div class="...">
                                    <button onclick="deletetitle(${val.id})" style="display:block;width:50px;height: 50px;border-radius:50%;font-size:20px;background-color:black;color:white;border:1px solid white"><i class="fa-solid fa-trash"></i></button>
                                </div>
                                <div class="justify-content-end d-bolck">
                                    <button onclick="edittitle(${val.id})" style="display:block;width:50px;height: 50px;border-radius:50%;font-size:20px;margin-left:100px;background-color:black;color:white;border:1px solid white"><i class="fa-regular fa-pen-to-square"></i></button>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            )
        })
        document.getElementById('record').innerHTML = tbl;
    }
    viewuser();

    const addtitle = () => {
        let title = document.getElementById('title').value;
        let take = document.getElementById('take').value;

        if (!title || !take) {
            alert("Please fill in both title and take fields.");
            return false;
        }

        let obj = {
            id: Math.floor(Math.random() * 10000),
            title: title,
            take: take
        }

        if (localStorage.getItem('take')=== null || localStorage.getItem('take') === undefined){
            record.push(obj);
            localStorage.setItem('take', JSON.stringify(record));
        } else {
            let old = JSON.parse(localStorage.getItem('take'));
            old.push(obj);
            localStorage.setItem('take', JSON.stringify(old));
        }
        alert('add note');
        viewuser();
    };

    const deletetitle = (id) => {
        let alldata = JSON.parse(localStorage.getItem('take'));
        let deletet = alldata.filter((val) => val.id != id);
        localStorage.setItem('take', JSON.stringify(deletet));
        alert("note deleted...");
        viewuser();
    }

    const edittitle = (id) =>{

        let alldata=JSON.parse(localStorage.getItem('take'));
        let editt=alldata.find((val)=> val.id == id);
        document.getElementById('take').value=editt.take;
        document.getElementById('title').value=editt.title;
        document.getElementById('editid').value=id;
        viewuser();
    }

    const updatetitle = () => {
    let alldata = JSON.parse(localStorage.getItem('take'));
    let take = document.getElementById('take').value;
    let title = document.getElementById('title').value;
    let id = document.getElementById('editid').value;

    let found = false;

    alldata = alldata.map((val) => {
        if (val.id == id) {
            val.take = take;
            val.title = title;
            found = true;
        }
        return val;
    });

    if (!found) {
        alert("Note not found for update.");
        return;
    }

    localStorage.setItem('take', JSON.stringify(alldata));
    alert("Update successful");
    viewuser();
};

