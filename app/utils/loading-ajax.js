
let element = ''
let line = ''
let lineBackground = ''
let lineProgress = ''
let progress = 0
let progressTween = ''
let timeline = ''
let isComplete = false
const defaultStepOnline = 0.65;
const defaultSpeedOnline = 4;
const defaultSpeedSubLine = 0.8;

export function init(page) {
    /*this.pageId = page.id;*/
    element = document.querySelector(".ajax-loading");
    line = element.querySelector(".ajax-loading__line");
    lineBackground = element.querySelector(".ajax-loading__line__background");
    lineProgress = element.querySelector(".ajax-loading__line__progress");
    progress = 0;
    timeline = null;
    isComplete = false;

}

export function dispose() {
    // Dispose resources
}

export function animateSubLine(speed = defaultSpeedSubLine) {
    progress = 0;
    isComplete = false;
    element.style.display = "flex";
    element.style.visibility = "inherit";

    const timeline = new TimelineLite()
        .set(line, {scaleY: 1})
        .set(lineProgress, {scaleY: 0})
        .fromTo(
            lineBackground, speed,
            {scaleY: 0},
            {
                scaleY: 1, ease: Power3.easeOut, onComplete: animateOnLine(defaultStepOnline, defaultSpeedOnline)
            }
        );


}

function animateFinish(speed) {

    const timeline = new TimelineLite()
        .to(line, speed, {scaleY: 0, ease: Power3.easeInOut} , speed);

    timeline.to(line, speed, {yPercent: -100, ease: Power3.easeInOut ,onComplete:onAnimateFinishComplete} ,speed);
}

function resize() {
    // Handle resize logic
}





function animateOnLine(step = 0.65, speed = 4) {
    if (!progress) {
        progressTween = TweenLite.to(lineProgress, speed, {
            scaleY: step,
            ease: Power2.easeInOut,
            onComplete: animateOnLineFull
        });
    }
}

function animateOnLineFull(duration = 1, speed = 0.7) {
    if (!progress) {
        progressTween = TweenLite.to(lineProgress, speed, {
            scaleY: duration,
            ease: Power2.easeInOut,
            onComplete: animateFinish(defaultSpeedSubLine)
        });
    }
}


function onAnimateFinishComplete() {
    element.style.display = "flex";
    element.style.visibility = "hidden";
    TweenLite.set(line, {clearProps: "all"});
}

/*init()

setTimeout(() => {
    animateSubLine()
},100)*/




