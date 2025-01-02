import { fetchMembers } from "./memberfetcdata.js";


const members = await fetchMembers(); // Fetch all data
const container = document.querySelector('#showCardSec');
const teamcontainer = document.querySelector('#team .teamcontainer');
const cardShowSec = document.querySelector('#team .teamcontainer .cardShowSec');
const cards = document.querySelector('#team .teamcontainer .cardShowSec .category_card_container .cards');

let selectMemberId = new URLSearchParams(window.location.search).get('id');
let selectMember = members.find(member => member._id === selectMemberId);

if (!selectMember || selectMember === undefined) {
    container.style.display = 'none';
    teamcontainer.style.display = 'block';
    cardShowSec.style.overflow = 'auto';
    cards.style.width = 'clamp(300px, 100%, 1152px)';
}
container.innerHTML = `
    <div class="container">
        <div class="info1 center">
            <div class="image">
                <img src="${selectMember.photo || '../image/placeholder.jpg'}" alt="Profile image" 
                     onerror="this.src='../image/placeholder.jpg'; this.style.border='2px solid red';"/>
            </div>
            <div class="quick_info">
                <div class="role_name">
                    <p class="name">${selectMember.name || 'Name not provided'}</p>
                    <p class="role">team ${selectMember.company_role || 'Role not specified'}</p>
                </div>
                <div>
                    <div class="socail_links center">
                        <ul class="center">
                            <li><a href="${selectMember.facebook || '#'}"><i class="fa-brands fa-facebook-f"></i></a></li>
                            <li><a href="${selectMember.twitter || '#'}"><i class="fa-brands fa-x-twitter"></i></a></li>
                            <li><a href="${selectMember.linkedin || '#'}"><i class="fa-brands fa-linkedin-in"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div class="info2 center">
            <div class="detail_info">
                <div>
                    <p class="titlePath">designation</p>
                    <p class="designation" style="font-size:14px; margin-top:5px">${selectMember.designation || 'designation not provided'}</p>
                </div>
                <div>
                    <p class="titlePath">Current</p>
                    <ul>
                    ${selectMember.affiliation?.current
        ? `
                            <li> ${selectMember.affiliation.current.role || 'Unknown Role'} -
                                ${selectMember.affiliation.current.department || 'Unknown Department'} ,
                                ${selectMember.affiliation.current.institution || 'Unknown Institution'}
                            </li>
                          ` : '<li>No current affiliation details available</li>'}
                    </ul>
                </div>
                <div>
                    <p class="titlePath">Education</p>
                    <ul>
                        ${selectMember.education?.map((edu, ind) => `
                            <li>
                                ${ind + 1}. 
                                ${edu.degree || 'Unknown Degree'} - 
                                ${edu.field} - 
                                ${edu.institution || 'Unknown Institution'}
                                ${edu.scholarship || ''}
                            </li>
                        `).join('') || '<li>No education details available</li>'}
                    </ul>
                </div>
                <div>
                    <p class="titlePath">Research Areas</p>
                    <ul class="research_areas">
                        ${selectMember.research_areas?.map((area, ind) =>
            `<li>${ind + 1}. ${area}</li>`).join('') || '<li>No research areas provided</li>'}
                    </ul>
                </div>
            </div>
            <div class="short_bio">
                <h1>Short Bio</h1>
                <p style="font-size:14px; margin-top:5px">${selectMember.bio || 'Bio not provided'}</p>
            </div>
        </div>
    </div>`;





