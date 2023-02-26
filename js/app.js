const loadData = async (searchText) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayData(data.data)
}

const displayData = phones => {
    const phoneContainer = document.getElementById('container');
    phoneContainer.innerHTML = '';
    //display 10 phone
    phones = phones.slice(0, 10)
    // No pone found
    const noPhone = document.getElementById('noPhone');
    if (phones.length === 0) {
        noPhone.classList.remove('hidden')
    }
    else {
        noPhone.classList.add('hidden')
    }
    //display phone
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('card', 'w-full', 'bg-base-100', 'shadow-xl', 'border');
        phoneDiv.innerHTML = `
            <figure class="px-10 pt-10">
                <img src="${phone.image}"
                    alt="Shoes"
                    class="rounded-xl" />
            </figure>
            <div
                class="card-body items-center text-center">
                <h2 class="card-title">${phone.phone_name}</h2>
                <p>If a dog chews shoes
                    whose shoes does he
                    choose?</p>
                <div class="card-actions">
                    <button
                        class="btn btn-primary">Buy
                        Now</button>
                </div>
            </div>
        `;
        phoneContainer.appendChild(phoneDiv)
        // console.log(phone)
    });
}

document.getElementById('search-button').addEventListener('click', function () {
    const searchText = document.getElementById('input-filed').value;
    loadData(searchText)
})
// loadData()