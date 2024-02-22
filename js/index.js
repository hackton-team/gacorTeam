let data = []

function addData() {
    let day = document.getElementById('day')
    let barang = document.getElementById('barang')
    let jumlah = document.getElementById('jumlah')
    let harga = document.getElementById('harga')
    let tanggal = document.getElementById('tanggal')
    if (barang.value === '' || jumlah.value === 0 || harga.value === 0 ||
        tanggal.value === 'mm/dd/yyyy') {
        alert("Data Belom di isi gan")
    } else {
        let id = 1
        if (data.length >= 1) {
            id = data[data.length - 1].id + 1
        }
        let obj = {
            id: id,
            day: day.value,
            barang: barang.value,
            jumlah: jumlah.value,
            harga: harga.value,
            date: tanggal.value,
            totalPrice: jumlah.value * harga.value
        }
        data.push(obj)
        console.log(data);
        day.selectedIndex = 0
        barang.value = ''
        jumlah.value = 0
        harga.value = 0
        tanggal.value = 'mm/dd/yyy'
        listData()
    }
}

function listData() {
    let container = document.getElementById('container')
    if (data.length === 0) {
        container.innerHTML = `
        <h1 id="title-text">List Pengeluaran</h1>
        <table id="list-data">
        <tr>
        <th>No</th>
        <th>Hari</th>
        <th>Total Pengeluaran</th>
        <th>Tanggal</th>
        <th>Action</th>
        </tr>
        <tr>
        <td colspan="5" style = "text-align: center;">Data Not Found</td>
        </tr>
        </table>
        `
    } else {
        let itemData = ''
        for (let i = 0; i < data.length; i++) {
            itemData += `
            <tr>
            <td>${i+1}</td>
            <td>${data[i].day}</td>
            <td>Rp. ${data[i].totalPrice}</td>
            <td>${data[i].date}</td>
            <td>
            <button id="edit-button" onclick="editData()">Edit</button>
            <button id="detail-button" onclick="searchId(${data[i].id})">Detail</button>
            <button id="delete-button" onclick="deleteData()">Delete</button>
            </td>
            </tr>
            `;
        }
        container.innerHTML = `
        <h1 id="title-text">List Pengeluaran</h1>
        <table id="list-data">
            <tr>
                <th>No</th>
                <th>Hari</th>
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

function searchId(id) {
    let dataIndex = {}
    for (let i = 0; i < data.length; i++) {
        if (id === data[i].id) {
            dataIndex = data[i]
            break
        }
    }
    showData(dataIndex)
}

function showData(data) {
    let container = document.getElementById("container");
    let text = document.getElementById("title-text").innerHTML = `<h1 id = "title-text">Detail Pengeluaran</h1>`;
    let button = `<button id="detail-button" onclick="listData()">List Data</button>`;
    container.innerHTML = `${text}
    <table id="list-data">
    <tr>
        <th>ID</th>
        <th>Hari</th>
        <th>Barang</th>
        <th>Jumlah</th>
        <th>Harga</th>
        <th>Total Pengeluaran</th>
        <th>Tanggal</th>
    </tr>
    <tr>
        <td>${data.id}</td>
        <td>${data.day}</td>
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
