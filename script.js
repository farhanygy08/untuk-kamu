// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: "AIzaSyArRsMBxciGokqx2_t68hRvV4rWEhDXyTE",
  authDomain: "pesan-anonim-4f546.firebaseapp.com",
  databaseURL: "https://pesan-anonim-4f546-default-rtdb.firebaseio.com/",
  projectId: "pesan-anonim-4f546",
  storageBucket: "pesan-anonim-4f546.appspot.com",
  messagingSenderId: "182851091807",
  appId: "1:182851091807:web:67b2c2c9c0fc069238caea",
  measurementId: "G-6WQLWK4XSQ"
};

// Inisialisasi Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Kirim Pesan
function kirimPesan() {
  const pesan = document.getElementById("pesanInput").value;
  if (pesan) {
    const pesanRef = database.ref("pesan").push();
    pesanRef.set({
      isi: pesan,
      waktu: new Date().toISOString()
    });
    document.getElementById("pesanInput").value = "";
  }
}

// Tampilkan Pesan
const pesanRef = database.ref("pesan");
pesanRef.on("value", (snapshot) => {
  const daftarPesan = document.getElementById("daftarPesan");
  daftarPesan.innerHTML = "";
  snapshot.forEach((childSnapshot) => {
    const data = childSnapshot.val();
    const div = document.createElement("div");
    div.textContent = data.isi;
    daftarPesan.prepend(div);
  });
});