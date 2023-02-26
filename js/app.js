const loadData = async () => {
    const url = `https://openapi.programming-hero.com/api/phones?search=iphone`;
    const res = await fetch(url);
    const data = await res.json();
    displayData(data.data)
}

const displayData = phones => {
    const phoneContainer = document.getElementById('phone-container');
    phones.forEach(phone => {
        console.log(phone)
    });
}
loadData()