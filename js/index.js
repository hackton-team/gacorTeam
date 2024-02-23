let database = []

function addData(id = null) {
    let barang = document.getElementById('barang')
    let jumlah = document.getElementById('jumlah')
    let harga = document.getElementById('harga')
    let tanggal = document.getElementById('tanggal')

    if (id === null) {
        addNewData(barang, jumlah, harga, tanggal);
    } else {
        editData(id);
    }
}

function addNewData(barang, jumlah, harga, tanggal) {
    let id = 1
    if (database.length >= 1) {
        id = database[database.length - 1].id + 1
    }

    let obj = {
        id: id,
        barang: barang.value,
        jumlah: jumlah.value,
        harga: harga.value,
        date: tanggal.value,
        totalPrice: jumlah.value * harga.value
    }
    database.push(obj);

    barang.value = ''
    jumlah.value = ''
    harga.value = ''
    tanggal.value = 'mm/dd/yyy'
    listData()
}

function listData() {
    let tableData = document.getElementsByClassName('table-data')[0]
    if (database.length === 0) {
        tableData.innerHTML = `
        <table>
          <tr>
            <th>No.</th>
            <th>Total</th>
            <th>Pengeluaran</th>
            <th>Tanggal</th>
            <th>Action</th>
          </tr>
          <tr>
            <td colspan="4" class="empty">Data no matches</td>
          </tr>
        </table>
        `
    } else {
        let itemData = ''
        for (let i = 0; i < database.length; i++) {
            itemData += `
            <tr>
            <td>${i+1}</td>
            <td>Rp. ${database[i].totalPrice}</td>
            <td>${database[i].date}</td>
            <td>
            <button id="edit-button" onclick="searchEditID(${database[i].id})">Edit</button>
            <button id="detail-button" onclick="searchId(${database[i].id})">Detail</button>
            <button id="delete-button" onclick="deleteData(${database[i].id})">Delete</button>
            </td>
            </tr>
            `; //bakal isi terus
        }
        tableData.innerHTML = `
        <table>
            <tr>
                <th>No</th>
                <th>Total Pengeluaran</th>
                <th>Tanggal</th>
                <th>Action</th>
            </tr>
            ${itemData}
        </table>
    `;
    }
}
listData()
function deleteData(id) {
    let index = -1;
    for (let i = 0; i < database.length; i++) {
        if (database[i].id === id) {
            index = i;
            break;
        }
    }
    if (index !== -1) {
        database.splice(index, 1); // Remove the element from the array
        listData(); // Update the displayed data
        alert('Data berhasil dihapus');
        console.log(database);
    }
}

function searchId(id) {
    let dataIndex = {}
    for (let i = 0; i < database.length; i++) {
        if (id === database[i].id) {
            dataIndex = database[i]
            break
        }
    }
    console.log(dataIndex);
    showData(dataIndex)
}

function showData(data) {
    let tableData = document.getElementsByClassName('table-data')[0]
    let button = `<button id="detail-button" onclick="listData()">List Data</button>`;
    tableData.innerHTML = `
    <table>
    <tr>
        <th>ID</th>
        <th>Barang</th>
        <th>Jumlah</th>
        <th>Harga</th>
        <th>Total Pengeluaran</th>
        <th>Tanggal</th>
    </tr>
    <tr>
        <td>${data.id}</td>
        <td>${data.barang}</td>
        <td>${data.jumlah}</td>
        <td>Rp. ${data.harga}</td>
        <td>Rp. ${data.totalPrice}</td>
        <td>${data.date}</td>
        </table>
    </tr>
    <br>
    ${button}`;
}

function searchEditID(id) {
    let dataIndex = {}
    for (let i = 0; i < database.length; i++) {
        if (id === database[i].id) {
            dataIndex = database[i]
            break
        }
    }
    showEditData(dataIndex)
}

function showEditData(data) {
    let buttonEdit = document.getElementById('buttonAdd');
    let barang = data.barang;
    let jumlah = data.jumlah;
    let harga = data.harga;
    let tanggal = data.date;
    let id = data.id
    buttonEdit.innerHTML = `<button type="button" onclick="editData(${id})" id="buttonAdd" class="btn">Edit data</button>`;
    document.getElementById('barang').value = barang;
    document.getElementById('jumlah').value = jumlah;
    document.getElementById('harga').value = harga;
    document.getElementById('tanggal').value = tanggal;
}

function editData(id) {
    let index = -1;
    for (let i = 0; i < database.length; i++) {
        if (database[i].id === id) {
            index = i;
            break;
        }
    }
    if (index !== -1) {
        let barang = document.getElementById('barang').value;
        let jumlah = document.getElementById('jumlah').value;
        let harga = document.getElementById('harga').value;
        let tanggal = document.getElementById('tanggal').value;
        
        let oldID = database[index].id;

        database[index].barang = barang;
        database[index].jumlah = jumlah;
        database[index].harga = harga;
        database[index].date = tanggal;
        database[index].totalPrice = jumlah * harga;
        listData();

        if(oldID !== id){
            for(let i = 0; i < database.length; i++){
                if(database[i].id === oldID){
                    database[i].id = id;
                    break;
                }
            }
        }
    }
    document.getElementById('barang').value = '';
    document.getElementById('jumlah').value = '';
    document.getElementById('harga').value = '';
    document.getElementById('tanggal').value = 'mm/dd/yyyy';

    let buttonEdit = document.getElementById('buttonAdd');
    buttonEdit.innerHTML = `<button type="submit" onclick="addData()" id="buttonAdd" class="btn">Tambahkan data</button>`;

    alert('Data berhasil di edit');

    console.log(database);
}