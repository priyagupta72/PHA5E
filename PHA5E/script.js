gsap.from("h1, p", {
    opacity: 0,
    y: 50,
    stagger: 0.2, 
    duration: 1.2,
    ease: "power3.out"
});
gsap.from(".hero-image", {
    opacity: 0,
    scale: 0.5,
    stagger: 0.3,
    duration: 1.5,
    ease: "power3.out"
});

function openProject(projectPage) {
    window.location.href = projectPage;
}

const images = document.querySelectorAll('.hero-image');
const heroText = document.querySelector("h1");

const imageData = [
    { title: "BIGGER SCIENCE", subtitle: "Immersive Experience/WebGL/Gaming" },
    { title: "MUCEM", subtitle: "Experiential Website" },
    { title: "UGANISHA", subtitle: "Experiential Website/WebGL/3D" },
    { title: "OLIVE TREE", subtitle: "Interactive Installation/ Real Time" }
];

images.forEach((img, index) => {
    const heading = document.createElement("div");
    heading.classList.add("image-heading");
    heading.innerHTML = `
        <h2 style="font-family: 'Archivo Black', sans-serif; font-size: 2.5rem; margin: 0;">
            ${imageData[index]?.title || 'Title Here'}
        </h2>
        <p style="font-family: Arial, sans-serif; font-size: 1rem; margin: 5px 0 0;">
            ${imageData[index]?.subtitle || 'Subheading text'}
        </p>
    `;
    
    heading.style.position = "absolute";
    heading.style.opacity = "0"; 
    img.parentElement.appendChild(heading);

    const updateHeadingPosition = () => {
        const rect = img.getBoundingClientRect();
        heading.style.left = `${rect.left + window.scrollX + rect.width / 2 - heading.offsetWidth / 2 + 20}px`; 
        heading.style.top = `${rect.bottom + window.scrollY - 25}px`; 
    };
    
    setTimeout(updateHeadingPosition, 100);
    window.addEventListener("resize", updateHeadingPosition);
    window.addEventListener("scroll", updateHeadingPosition);

    img.addEventListener('mouseenter', () => {
        images.forEach(otherImg => {
            if (otherImg !== img) {
                gsap.to(otherImg, { opacity: 0, pointerEvents: "none", duration: 0.2 });
            }
        });
        gsap.to(img, { scale: 1.1, zIndex: 50, duration: 0.3, ease: "power2.out" });
        gsap.to(heroText, { color: "transparent", zIndex: 0, duration: 0.2 });
        heroText.style.webkitTextStroke = "0.3px white";
        gsap.to(heading, { opacity: 1, y: 0, duration: 0.3 });
    });

    img.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = img.getBoundingClientRect();
        const moveX = (e.clientX - (left + width / 2)) * 1.5;
        const moveY = (e.clientY - (top + height / 2)) * 1.5;
        gsap.to(img, { x: moveX, y: moveY, duration: 0.3, ease: "power2.out" });
    });

    img.addEventListener('mouseleave', () => {
        images.forEach(otherImg => {
            gsap.to(otherImg, { opacity: 1, pointerEvents: "auto", duration: 0.2 });
        });
        gsap.to(img, { x: 0, y: 0, scale: 1, zIndex: 4, duration: 2, ease: "power2.out" });
        gsap.to(heroText, { color: "white", zIndex: 3, duration: 0.2 });
        heroText.style.webkitTextStroke = "0px white";
        gsap.to(heading, { opacity: 0, y: 10, duration: 0.3 });
    });
});
