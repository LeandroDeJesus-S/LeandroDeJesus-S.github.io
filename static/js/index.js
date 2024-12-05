import { Paginator } from './paginator.js'

document.getElementById('backTopBtn').addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({top: 0, behavior: 'smooth'});
});


async function getData() {
    const data = await (await fetch('static/settings.json')).json();
    return data;
}


function updateProfile(data) {
    const { presentationText, socialLinks, imageUrl, technologies } = data.profile;
    const age = (new Date()).getFullYear() - 2002;
    const presentationTextFormatted = presentationText.replace('{idade}', age.toString());
    document.getElementById('profile__presentation').innerHTML = `<p>${presentationTextFormatted}</p>`;

    document.querySelector('#profilePhoto').innerHTML = `
        <img src="${imageUrl}" alt="foto de perfil de Leandro">
    `;


    document.getElementById('techList').innerHTML = technologies.map(tech => {
        return `<li><img width="24" src="${tech.iconUrl}" alt="${tech.name}" title="${tech.name}"></li>`;
    }).join('');

    document.getElementById('socialLinks').innerHTML = socialLinks.map(link => {
        return `<a target="_blank" href="${link.url}">
            <img width="28" height="28" src="${link.iconUrl}" alt="${link.name}" />
        </a>`
    }).join('');
}


function updateAbout(data) {
    const { firstSteps, presentMoment, futurePlans } = data.about;

    document.getElementById('about__start__text').innerHTML = `<p>${firstSteps}</p>`;
    document.getElementById('about__present__text').innerHTML = `<p>${presentMoment}</p>`;
    document.getElementById('about__future__text').innerHTML = `<p>${futurePlans}</p>`;
}


function updateProjects(projectsPaginator) {
    const projectsContainer = document.getElementById('projectsContainer');
    const seeMoreBtn = document.getElementById('projectsSeeMoreBtn');

    function renderProjects(){
        const projects = projectsPaginator.getPage();

        seeMoreBtn.style.display = projectsPaginator.hasNextPage ? 'block' : 'none';
        // seeMoreBtn.disbled = !projectsPaginator.hasNextPage;

        projectsContainer.innerHTML += projects.map((project) => {
            return `
            <article class="projects__content">
                <img src="${project.image}" alt="" class="project__img">
                <h3 class="project__name">${project.name}</h3>
                <div class="project__info">
                    <p class="project__description">
                        ${project.description}
                    </p>
                </div>
                <div class="project__repo_url">
                    <div class="project__repo_url_btn">
                        <a target="_blank" href="${project.githubUrl}" class="github-link">
                            <img title="Ver repositório" width="28" height="28" src="static/img/icons/icons8-github-28.png" alt="botão com icone do github para ver repositório" />
                        </a>
                    </div>
                </div>
            </article>
            `
        }).join('');
    }

    projectsPaginator._offset === 0 ? renderProjects() : null;

    seeMoreBtn.addEventListener('click', (e) => {
        e.preventDefault();
        renderProjects();
    })
}

function updateCertifications(certificationsPaginator) {
    const certificationsContainer = document.getElementById('certificationsContainer');
    const seeMoreBtn = document.getElementById('certificationsSeeMoreBtn');


    function rendercertifications(){
        const certifications = certificationsPaginator.getPage();

        seeMoreBtn.style.display = certificationsPaginator.hasNextPage ? 'block' : 'none';
        seeMoreBtn.disbled = !certificationsPaginator.hasNextPage;

        certificationsContainer.innerHTML += certifications.map((certification) => {
            return `
            <article class="certifications__content">
                <img src="${certification.image}" alt="" class="certification__img">
                <h3 class="certification__name">${certification.name}</h3>
                <div class="certification__info">
                    <div class="certification__info">
                        <p class="certification__description">Carga horária: ${certification.duration}</p>
                        <p class="certification__description">Concluído em: ${certification.endDate}</p>
                    </div>
                </div>
                <div class="certification__repo_url">
                    <div class="certification__repo_url_btn">
                        <a target="_blank" href="${certification.url}" class="github-link">
                            <img title="Ver certificado" width="28" height="28" src="static/img/icons/icons8-modo-de-exibição-24.png" alt="botão para ver certificado" />
                        </a>
                    </div>
                </div>
            </article>
            `
        }).join('');
    }

    certificationsPaginator._offset === 0 ? rendercertifications() : null;    

    seeMoreBtn.addEventListener('click', (e) => {
        e.preventDefault();
        rendercertifications();
    });
}

function updateServices(data) {
    const services = data.services;
    document.getElementById('servicesContainer').innerHTML = services.map(service => {
        return `<article class="service__card">
            <img src="${service.icon}" alt="">
            <h3 class="service__title">${service.title}</h3>
            <p class="service___description">${service.description}</p>
        </article>`
    }).join('');
}

function updateContact(data) {
    const emailListElement = document.getElementById('contactEmailList');
    emailListElement.innerHTML = data.contact.emails.map(email => {
        return `<li class="contact__emails__list_item">
            <a style="text-align: center;" href="mailto:${email}">${email}</a>
        </li>`;
    }).join('');
}

function handleWhatsappMessage() {
    const inputElement = document.getElementById('contactTextInput');
    const buttonElement = document.getElementById('contactButton');

    inputElement.addEventListener('keyup', (e) => {
        if (e.target.value) {
            buttonElement.classList.add('animate-scale');
        } else {
            buttonElement.classList.remove('animate-scale');
        }
    });

    buttonElement.addEventListener('click', e => {
        const text = inputElement.value.trim();
        
        if (text) {
            const encodedText = encodeURIComponent(text);
            window.open(`https://wa.me/5527988724130?text=${encodedText}`);
        } else {
            window.alert('Você não digitou sua mensagem!');
        }
    });
}

async function main() {
    const data = await getData();
    updateProfile(data);
    updateAbout(data);

    const projectsPaginator = new Paginator(data.projects);
    updateProjects(projectsPaginator);
    
    const certificationsPaginator = new Paginator(data.certifications);
    updateCertifications(certificationsPaginator);

    updateServices(data);
    updateContact(data);

    handleWhatsappMessage();
}


main()
