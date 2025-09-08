// ... (Bagian 'Memilih elemen HTML' tetap sama) ...
const namaInput = document.getElementById("nama-input");
const linkInput = document.getElementById("link-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");

// Cek apakah ada data di localStorage, jika tidak, mulai dengan array kosong
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Fungsi untuk menyimpan data ke localStorage
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}


// ... (Fungsi renderTodos() tetap sama) ...

// 3. Fungsi untuk menampilkan (render) semua todo
function renderTodos() {
  // Kosongkan dulu list-nya agar tidak ada duplikat
  todoList.innerHTML = "";

  // Loop setiap item di array 'todos'
  todos.forEach((todo) => {
    // Buat elemen <li> baru untuk setiap todo
    const div = document.createElement("div");
    div.className = "todo-item";

    // Isi konten HTML untuk item todo
    div.innerHTML = `
            <span><a href="${todo.link}" target="_blank">${todo.text}</a><button class="copy-btn" onclick="copyLink('${todo.link}')">&#128279;</button></span>
            <div class="button-area">
                <button class="edit-btn" data-id="${todo.id}">Edit</button>
                <button class="delete-btn" data-id="${todo.id}">Hapus</button>
            </div>
        `;

    // Tambahkan elemen <div> yang sudah jadi ke dalam <ul>
    todoList.appendChild(div);
  });
}

// Panggil fungsi renderTodos agar daftar tugas langsung tampil saat halaman dimuat
renderTodos();

// Event listener untuk tombol 'Tambah'
addBtn.addEventListener("click", function () {
  // 1. Ambil teks dari kotak input
  const newTodoText = namaInput.value.trim();
  const newLinkText = linkInput.value.trim();

  // 2. Pastikan input tidak kosong
  if (newTodoText !== "" && newLinkText !== "") {
    // 3. Buat objek todo baru
    const newTodo = {
      id: Date.now(), // Gunakan timestamp sebagai ID unik
      text: newTodoText,
      link: newLinkText,
    };

    // 4. Tambahkan todo baru ke dalam array 'todos'
    todos.push(newTodo);
    saveTodos(); // <-- TAMBAHKAN INI

    // 5. Kosongkan kembali input field
    namaInput.value = "";
    linkInput.value = "";
  }
  renderTodos();
});

// Event listener untuk tombol di dalam list (Edit & Hapus)
todoList.addEventListener("click", function (event) {
  const target = event.target; // Element yang di-klik

  // --- LOGIKA HAPUS (DELETE) ---
  if (target.classList.contains("delete-btn")) {
    // Ambil ID dari atribut data-id
    const idToDelete = parseInt(target.getAttribute("data-id"));

    // Buat array baru yang isinya semua todo KECUALI yang ID-nya mau dihapus
    todos = todos.filter((todo) => todo.id !== idToDelete);
    saveTodos(); // <-- TAMBAHKAN INI

    // Tampilkan ulang daftar tugas
    renderTodos();
  }

  // --- LOGIKA EDIT (UPDATE) ---
  if (target.classList.contains("edit-btn")) {
    // Ambil ID dari atribut data-id
    const idToEdit = parseInt(target.getAttribute("data-id"));

    // Arahkan pengguna ke halaman edit.html dengan membawa ID di URL
    window.location.href = `edit.html?id=${idToEdit}`;
  }
});



  function copyLink(url) {
    navigator.clipboard.writeText(url);
    alert("Link disalin!");
  }
