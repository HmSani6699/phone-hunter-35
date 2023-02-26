const loadData = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayData(data.data, dataLimit)
}

const displayData = (phones, dataLimit) => {
    const phoneContainer = document.getElementById('container');
    phoneContainer.innerHTML = '';
    //display 10 phone
    const showAll = document.getElementById('showAll')
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAll.classList.remove('hidden')
    }
    else {
        showAll.classList.add('hidden')
    }
    // No pone found
    const noPhone = document.getElementById('noPhone');
    if (phones.length === 0) {
        noPhone.classList.remove('hidden');
        spinner(false)
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
                        <label for="my-modal" class="btn btn-primary"
                         onclick="loadDisplayDetails('${phone.slug}')">Details</label>
                </div>
            </div>
        `;
        phoneContainer.appendChild(phoneDiv);

        //loading spinner 
        spinner(false)
    });
}

const common = (number) => {
    //loading spinner
    spinner(true)
    const searchText = document.getElementById('input-filed').value;
    loadData(searchText, number);
}

document.getElementById('search-button').addEventListener('click', function () {
    common(10)
});
// show all 
document.getElementById('show-all-button').addEventListener('click', function () {
    common()
});

document.getElementById('input-filed').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        common(10)
    }
});


//spinner 
const spinner = (isLoading) => {
    const loadIngSpinner = document.getElementById('loadingSpinner')
    if (isLoading) {
        loadIngSpinner.classList.remove('hidden')
    }
    else {
        loadIngSpinner.classList.add('hidden')
    }
}

// details display
const loadDisplayDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayDetails(data.data)
}

const displayDetails = (phone) => {
    const images = document.getElementById('images');
    images.setAttribute('src', `${phone.image}`)
    document.getElementById('title').innerText = phone.name;

}

