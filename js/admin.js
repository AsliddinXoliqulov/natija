function addProduct() {
    const image = document.getElementById('image').value;
    const tetle = document.getElementById('tetle').value;
    const rating = parseFloat(document.getElementById('rating').value);
    const oldprice = parseInt(document.getElementById('oldprice').value);
    const Price = parseInt(document.getElementById('Price').value);
    const aksiya = document.getElementById('aksiya').checked;
    const orginal = document.getElementById('orginal').checked;
  
    if (!image || !tetle || isNaN(rating) || isNaN(oldprice) || isNaN(Price)) {
      alert("Iltimos, barcha maydonlarni to‘ldiring.");
      return;
    }
  
    const product = {
      image,
      liked: false,       
      orginal,
      aksiya,
      tetle,
      rating,
      oldprice,
      Price
    };
  
    fetch("https://67f57460913986b16fa4a14c.mockapi.io/imtihon2/Cards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(product)
    })
      .then(res => res.json())
      .then(data => {
        console.log("Mahsulot yuborildi:", data);
  
        document.querySelectorAll('input').forEach(el => el.value = '');
        document.getElementById('aksiya').checked = false;
        document.getElementById('orginal').checked = false;
  
        const notif = document.getElementById('notif');
        notif.textContent = "Mahsulot muvaffaqiyatli yuborildi!";
        notif.classList.remove('hidden');
        setTimeout(() => notif.classList.add('hidden'), 2000);
      })
      .catch(error => {
        console.error("Xatolik yuz berdi:", error);
        alert("Xatolik: Mahsulot yuborilmadi.");
      });
  }
  