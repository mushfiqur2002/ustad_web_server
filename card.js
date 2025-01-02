import { fetchMembers } from "./memberfetcdata.js";

let selectMemberId = new URLSearchParams(window.location.search).get('id');
async function displayCards() {
    try {
        const members = await fetchMembers();
        const container = document.querySelector('.category_card_container');
        const groupedByRole = members.reduce((acc, item) => {
            if (!acc[item.company_role]) {
                acc[item.company_role] = [];
            }
            acc[item.company_role].push(item);
            return acc;
        }, {});

        const groupedByRoleArray = Object.entries(groupedByRole).map(([role, members]) => {
            return { role, members };
        });

        groupedByRoleArray.forEach(({ role, members }) => {
            console.log('Role:', role);
            console.log('Members:', members);
            let roleElement = role;
            let cardElement = members.filter((value) => value._id != selectMemberId).map(function (member) {
                const words = member.designation.split(' ');
                const truncatedDesignation = words.length > 4 ? words.slice(0, 3).join(' ') + '...' : member.designation;
                return `
                    <div class="card center">
                        <div class="info_container center">
                            <div class="center">
                                <img src="${member.photo}" onerror="this.style.border='2px solid red'"/>
                            </div>
                            <div class="info center">
                                <p class="name">${member.name}</p>
                                <p class="designation">${truncatedDesignation}</p>
                            </div>
                            <div class="description">
                                ${member.education.map(ed => {
                                return `
                                        <p>
                                            <span>${ed.degree}: </span>
                                            <span>${ed.field}</span>
                                            <span>${ed.institution} (${ed.status})</span>
                                        </p>
                                    `;
                                }).join('')}
                            </div>
                            <div class="link">
                                <a href="team.html?id=${member._id}">See more</a>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');

            container.innerHTML += `
                <div class="category_card center">
                    <h1>${roleElement}</h1>
                    <div class="cards">
                        ${cardElement}
                    </div>`
        });
    } catch (error) {
        console.error('Error displaying cards:', error);
    }
}
displayCards();

