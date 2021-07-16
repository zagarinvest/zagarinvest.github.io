// make in-page nav links scroll smoothly to target section

document.querySelectorAll('nav a').forEach(function(node) {
    node.addEventListener('click', function(ev) {
        ev.preventDefault();
        var targetId = ev.target.getAttribute('href').substr(1);
        var target = document.getElementById(targetId);

        window.scrollTo({
            left: 0,
            top: target.offsetTop - 100,
            behavior: 'smooth'
        });
    });
});


// for a series of given elements, work out how much of the viewport is covered
// by each element

window.setInterval(function() {
    var el = document.querySelector('nav .active');

    if (el) {
        el.classList.remove("active");
    }

    var most;

    [ "services", "team", "contact", "faqs" ].forEach(function(id) {
        var val = isElementInViewport(document.getElementById(id));

        if (most == null || val > most[0]) {
            most = [ val, id ];
        }
    });

    document.querySelector("a[href='#" + most[1] + "']").classList.add("active");
}, 500);

var nav = document.querySelector("nav");

document.addEventListener('scroll', function(e) {
    var vis = window.scrollY >= 1200;
    vis = document.querySelector("header").getBoundingClientRect().bottom < 0;
    nav.style.display = vis ? 'block' : 'none';
});

// Determine the proportion than an element takes of the viewport 
function isElementInViewport (el) {
    var rect = el.getBoundingClientRect(),
        totalHeight = rect.bottom - rect.top,
        viewportHeight = window.innerHeight;

// element hidden OUTSIDE viewport
    if (rect.bottom < 0 || rect.top > viewportHeight) {
        return 0;
    }

// element overlaps with top of viewport (c)
    if (rect.top < 0 && rect.bottom < viewportHeight) {
        return rect.bottom / viewportHeight;
    }

// element overlaps with bottom of viewport (d)
    if (rect.bottom > viewportHeight && rect.top > 0) {
        return (viewportHeight - rect.top) / viewportHeight;
    }

// element entirely contained inside viewport
    if (rect.top > 0 && rect.bottom < viewportHeight) {
        return (rect.bottom - rect.top) / viewportHeight;
    }

// element taking up full height of viewport
    if (rect.top < 0 && rect.bottom > viewportHeight) {
        return 1;
    }

// ???
    return 0;
}
