$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear')
    });

});



// <!-- typed js effect ends -->

async function fetchData(type = "skills") {
    let response;
    type === "skills" ? 
        response = await fetch("skills.json") 
        : 
        response = await fetch("./projects/projects.json");
    const data = await response.json();
    return data;
}

function showSkills(skills) {
    let skillsContainer = document.getElementById("skillsContainer");
    let skillHTML = "";
    skills.forEach(skill => {
        skillHTML += `
        <div class="bar">
              <div class="info">
                <img src=${skill.icon} alt="skill" />
                <span>${skill.name}</span>
              </div>
            </div>`
    });
    skillsContainer.innerHTML = skillHTML;
}




fetchData().then(data => {
    showSkills(data);
});

fetchData("projects").then(data => {
    showProjects(data);
});

const cursor = document.getElementById('cursor');

// Update the position of the circle based on mouse movement
document.addEventListener('mousemove', (event) => {
  const mouseX = event.clientX + window.scrollX; // Account for horizontal scrolling
  const mouseY = event.clientY + window.scrollY; // Account for vertical scrolling

  // Adjust the position to center the circle correctly
  cursor.style.left = `${mouseX - cursor.offsetWidth / 2}px`;
  cursor.style.top = `${mouseY - cursor.offsetHeight / 2}px`;
});
