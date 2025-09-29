let element = document.querySelector(".nav");
let isVisible = false;
let previousSelectedItem = null;
let selectedItem = element.querySelector(".nav__item--selected");
let hoveredItem = null;
let clearHoveredItemTimeout = -1;
let itemLine = element.querySelector(".nav__item-line");
let itemLines = itemLine.querySelectorAll(".nav__item-line div");
let itemLineIsVisible = false;
let itemLine2Rect =  itemLines[1].getBoundingClientRect();
let itemsElement =  element.querySelector(".nav__items");
let itemsX = 0;
let itemElements =  element.querySelectorAll(".nav__item");
let mouseDirection = 1;
let background = new Bb();
let timeline = null;




const init = ()=>{
    // Initialize event listeners
    onKeyUpHandler = onKeyUp.bind(this);
    Array.from(itemElements).forEach((item) => {
        item.addEventListener("mouseenter", onItemRollOver.bind(this));
        item.addEventListener("mouseleave", onItemRollOut.bind(this));
    });

    // Hide item line if no selected item
    if (!selectedItem) {
        itemLine.style.visibility = "hidden";
    }

    // Initialize language select

}

const setSelectedItem = (page)=> {
    if (!selectedItem || page !== selectedItem.getAttribute("data-page")) {
        if (selectedItem) {
            previousSelectedItem = selectedItem;
            selectedItem.classList.remove("nav__item--selected");
        } else {
            previousSelectedItem = null;
            itemLine.style.visibility = "";
        }

        selectedItem = document.querySelector(`.nav__item[data-page="${page}"]`);
        if (selectedItem) {
            selectedItem.classList.add("nav__item--selected");
            resizeItemLine();
        }
    }
}

const setVisibility =(isVisible)=> {
    if (isVisible !== isVisible) {
        isVisible = isVisible;
        document.body.classList.toggle("nav-visible", isVisible);
        emit("visibilityChange", { isVisible: isVisible });
    }
}




const show =()=> {
    if (!isVisible) {
        const rect = fl.element.getBoundingClientRect();
        setVisibility(true);
        window.addEventListener("keyup", onKeyUpHandler);
        background.start();
        animateIn(rect);
    }
}

const hide = ()=> {
    if (isVisible) {
        window.removeEventListener("keyup", onKeyUpHandler);
        setTimeout(() => {
            const rect = fl.element.getBoundingClientRect();
            setVisibility(false);
            animateOut(rect);
        }, 0);
    }
}

const animateIn = (rect)=> {
    if (timeline) {
        timeline.kill();
        Ds(timeline);
    }

    const currentRect = fl.element.getBoundingClientRect();
    hoveredItem = null;
    itemLineIsVisible = false;
    resizeItemLine();

    timeline = new Us({
        delay: 0.1,
        onComplete: onAnimateInComplete.bind(this),
    })
        .fromTo(
            background.element,
            0.4,
            { opacity: 0 },
            { opacity: 1, ease: Cs.easeNone },
            0
        )
        .from(
            fl.element,
            1.3,
            {
                x: rect.x - currentRect.x,
                y: rect.y - currentRect.y,
                scale: rect.width / currentRect.width,
                ease: Ns.easeInOut,
            },
            0
        )
        .fromTo(
            fl.maskRect,
            0.7,
            { attr: { width: document.body.classList.contains("page-id-home-screen-0") ? 1 : 0 } },
            {
                attr: { width: 1 },
                onUpdate:
                    app.browser !== "safari"
                        ? null
                        : () => {
                            fl.element.style.display = "none";
                            fl.element.offsetHeight;
                            fl.element.style.display = "";
                        },
                ease: Os.easeInOut,
            },
            0.3
        )
        .addLabel("items", 0.3)
        .staggerFrom(
            itemElements,
            0.8,
            { y: 30, opacity: 0, ease: Ns.easeOut },
            0.08,
            "items"
        )
        .fromTo(
            element.querySelector(".nav__footer"),
            1,
            { opacity: 0 },
            { opacity: 1, ease: Cs.easeNone },
            0.7
        )
        .add(background.animateIn(), 0);

    if (selectedItem) {
        const index = Array.prototype.indexOf.call(itemElements, selectedItem);
        const delay = 0.08 * index;

        timeline
            .fromTo(
                itemLine,
                0.4,
                { opacity: 0 },
                { opacity: 1, ease: Cs.easeNone },
                `items+=${delay}`
            )
            .fromTo(
                itemLine,
                0.8,
                { y: 30 },
                { y: 0, data: { clear: false }, ease: Fs.easeOut },
                `items+=${delay}`
            )
            .from(
                itemLines[0],
                0.8,
                { scaleX: 0, ease: Os.easeInOut, data: { clear: false } },
                `items+=${delay}`
            )
            .fromTo(
                itemLines[1],
                0.8,
                { scaleX: 0, x: 0 },
                { scaleX: 1, ease: Fs.easeOut, data: { clear: false } },
                `items+=${delay + 0.3}`
            );
    } else {
        Ss.set(itemLine, { y: 0 });
    }
}

const animateOut = (rect)=> {
    if (timeline) {
        timeline.kill();
    }

    Ss.set(fl.element, { clearProps: "x, y, scale" });
    const currentRect = fl.element.getBoundingClientRect();

    if (hoveredItem) {
        background.clearBoxesOffset();
    }

    timeline = new Us({ onComplete: onAnimateOutComplete.bind(this) })
        .set(element, { visibility: "inherit" })
        .to(
            background.element,
            0.4,
            { opacity: 0, ease: Cs.easeNone },
            0.3
        )
        .from(
            fl.element,
            1.3,
            {
                x: rect.x - currentRect.x,
                y: rect.y - currentRect.y,
                scale: rect.width / currentRect.width,
                ease: Ns.easeInOut,
            },
            0
        )
        .set(fl.textPath, { visibility: "inherit" }, 0)
        .to(
            fl.maskRect,
            0.7,
            {
                attr: { width: document.body.classList.contains("page-id-home-screen-0") ? 1 : 0 },
                onUpdate:
                    app.browser !== "safari"
                        ? null
                        : () => {
                            fl.element.style.display = "none";
                            fl.element.offsetHeight;
                            fl.element.style.display = "";
                        },
                ease: Os.easeInOut,
            },
            0.2
        )
        .addLabel("items", 0.1)
        .staggerTo(
            itemElements,
            0.4,
            { y: 30, opacity: 0, ease: Os.easeOut },
            app.windowWidth < app.screenM ? -0.06 : 0.06,
            "items"
        )
        .to(
            element.querySelector(".nav__footer"),
            0.5,
            { opacity: 0, ease: Cs.easeNone },
            0
        )
        .add(background.animateOut(), 0);

    const targetItem = hoveredItem || selectedItem || previousSelectedItem;
    if (targetItem) {
        const index = Array.prototype.indexOf.call(itemElements, targetItem);
        const delay = 0.06 * index;

        timeline.to(
            itemLine,
            0.4,
            { y: 30, opacity: 0, ease: Os.easeOut, data: { clear: false } },
            `items+=${delay}`
        );
    }
}

const resize = (event)=> {
    const rect = itemsElement.getBoundingClientRect();
    itemsX = rect.x;
    resizeItemLine();
    if (event) {
        background.resize();
    }
}

const resizeItemLine=()=> {
    if (selectedItem) {
        const linkRect = selectedItem.querySelector(".nav__item__link").getBoundingClientRect();
        Ss.set(itemLine, { x: linkRect.x - itemsX });
        Ss.set(itemLines[0], { scaleX: linkRect.width });
    }
}

const moveItemLineToItem = (item)=> {
    const linkRect = item ? item.querySelector(".nav__item__link").getBoundingClientRect() : itemLine.getBoundingClientRect();
    const currentX = itemLine._gsTransform ? itemLine._gsTransform.x : 0;

    if (!selectedItem || !itemLineIsVisible) {
        Ss.set(itemLine, { x: linkRect.x - itemsX });
        mouseDirection = 0;
    } else {
        mouseDirection = currentX < linkRect.x ? 1 : -1;
    }

    const line1 = itemLines[0];
    const line2 = itemLines[1];
    Ss.killTweensOf([line1, line2, itemLine]);

    const timeline = new Us();

    if (mouseDirection === 0) {
        timeline.fromTo(
            line2,
            0.4,
            { scaleX: 0, x: 0 },
            { scaleX: 1, ease: Fs.easeOut }
        );
    } else if (mouseDirection === 1) {
        timeline.fromTo(
            line2,
            0.4,
            { x: 0 },
            { scaleX: linkRect.width / itemLine2Rect.width, ease: Fs.easeOut, immediateRender: false }
        );

        if (item) {
            timeline.to(
                line2,
                0.4,
                { scaleX: 1, x: linkRect.width - itemLine2Rect.width, ease: Fs.easeOut }
            );
        }
    } else {
        timeline
            .to(
                line2,
                0.4,
                { scaleX: linkRect.width / itemLine2Rect.width, x: 0, ease: Fs.easeOut, immediateRender: false }
            )
            .to(
                line2,
                0.4,
                { scaleX: 1, ease: Fs.easeOut }
            );
    }

    new Us()
        .to(
            line1,
            0.7,
            { scaleX: linkRect.width, ease: Fs.easeOut },
            0
        )
        .add(timeline, 0)
        .set(itemLine, { visibility: "inherit", opacity: 1 }, 0)
        .to(
            itemLine,
            0.7,
            { x: linkRect.x - itemsX, ease: Fs.easeOut },
            0
        );
}

const onKeyUp = (event)=> {
    if (event.keyCode === 27) {
        hide();
    }
}

const onItemRollOver = (event)=> {
    if (isVisible && (hoveredItem || event.currentTarget !== selectedItem) && hoveredItem !== event.currentTarget) {
        clearTimeout(clearHoveredItemTimeout);
        hoveredItem = event.currentTarget === selectedItem ? null : event.currentTarget;

        if (hoveredItem) {
            const index = Array.prototype.indexOf.call(itemElements, hoveredItem);
            background.offsetBoxes(index);
        }

        moveItemLineToItem(hoveredItem || selectedItem);
        itemLineIsVisible = true;
    }
}

const onItemRollOut = (event)=> {
    if (hoveredItem && isVisible) {
        clearHoveredItemTimeout = setTimeout(() => {
            hoveredItem = null;
            background.clearBoxesOffset();
            moveItemLineToItem(selectedItem);
            itemLineIsVisible = false;
        }, 300);
    }
}

const onAnimateInComplete = ()=> {
    Ds(timeline);
    timeline = null;
}

const onAnimateOutComplete = ()=>{
    Ds(timeline);
    timeline = null;
    background.pause();
}
