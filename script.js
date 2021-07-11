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

// work out height of each element in view

// report that as a proportion of the viewport


/*
var rect = document.getElementById("services").getBoundingClientRect();
console.log("services", "top", rect.top, "bottom", rect.bottom);

var rect = document.getElementById("team").getBoundingClientRect();
console.log("team", "top", rect.top, "bottom", rect.bottom);

var rect = document.getElementById("contact").getBoundingClientRect();
console.log("contact", "top", rect.top, "bottom", rect.bottom);

var rect = document.getElementById("faqs").getBoundingClientRect();
console.log("faqs", "top", rect.top, "bottom", rect.bottom);
*/

window.setInterval(function() {
    var el = document.querySelector('nav .active');

    if (el) {
        el.classList.remove("active");
    }

    var most;

    [ "services", "team", "contact", "faqs"].forEach(function(id) {
        var val = isElementInViewport(document.getElementById(id));

        if (most == null || val > most[0]) {
            most = [ val, id ];
        }
    });

    document.querySelector("a[href='#" + most[1] + "']").classList.add("active");

}, 500);

var nav = document.querySelector("nav");

window.setInterval(function() {
    if (window.scrollY < 1200) {
        nav.style.display = 'none';
    } else {
        nav.style.display = 'block';
    }
}, 100);

function isElementInViewport (el) {
    // how much of the element is in view
    var rect = el.getBoundingClientRect();

    var heightInView = 0;
    var totalHeight = rect.bottom - rect.top

// element hidden OUTSIDE viewport
    if (rect.bottom < 0 || rect.top > window.innerHeight) {
        //console.log('element is outside viewport');
        return 0;
    }

// element overlaps with top of viewport (c)
    if (rect.top < 0 && rect.bottom < window.innerHeight) {
        heightInView = rect.bottom;
        //console.log('element overlaps with TOP of viewport');
        return heightInView / window.innerHeight;
    }

// element overlaps with bottom of viewport (d)
    if (rect.bottom > window.innerHeight && rect.top > 0) {
        //console.log('element overlaps with BOTTOM of viewport');
        heightInView = window.innerHeight - rect.top;
        return heightInView / window.innerHeight;
    }

// element entirely contained inside viewport

    if (rect.top > 0 && rect.bottom < window.innerHeight) {
        //console.log('element entirely contained in viewport');
        return (rect.bottom - rect.top) / window.innerHeight;
    }

// TODO ...


// element taking up full height of viewport

    if (rect.top < 0 && rect.bottom > window.innerHeight) {
        //console.log('element taking up entire viewport');
        return 1;
    }

    console.log('???');
    return 1;
    return window.innerHeight / totalHeight;


    /*
    console.log(heightInView / totalHeight);

    console.log("top", rect.top, "left", rect.left, "bottom", rect.bottom, "right", rect.right);
    console.log(window.innerHeight, window.innerWidth);

    console.log("cond1", rect.top >= 0);
    console.log("cond2", rect.left >= 0);
    console.log("cond3", rect.bottom <= window.innerHeight);

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
    */
    return false;
}
