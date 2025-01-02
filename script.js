const menuBtn = document.querySelector('#menuBtn');
const closeBtn = document.querySelector('#closeBtn');
const sideBar = document.querySelector('#sideBar');

window.addEventListener('click', function () {
    sideBar.classList.remove('hidden');
});

menuBtn.addEventListener('click', function (event) {
    event.stopPropagation(); 
    sideBar.classList.toggle('hidden');
});

closeBtn.addEventListener('click', function (event) {
    event.stopPropagation();
    sideBar.classList.toggle('hidden');
});

sideBar.addEventListener('click', function (event) {
    event.stopPropagation();
});

// Select both .cards elements
// const cards = document.querySelectorAll('.cards');

// if (cards.length === 2) {
//     const [cards1, cards2] = cards; // Assuming there are exactly two cards

//     // Function to synchronize scroll positions
//     const syncScroll = (source, target) => {
//         target.scrollLeft = source.scrollLeft;
//     };

//     // Add event listeners to both elements
//     cards1.addEventListener('scroll', () => syncScroll(cards1, cards2));
//     cards2.addEventListener('scroll', () => syncScroll(cards2, cards1));
// }







