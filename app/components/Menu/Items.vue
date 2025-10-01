<template>
  <nav id="new-nav-menu"
       class="fixed top-0 right-0 flex flex-col w-full h-full p-[8vh] px-[13vw] md:px-[18vw] z-50 text-white opacity-0 transition-opacity duration-700 delay-600 bg-white lg:pt-[24vh] lg:pr-[4vw] lg:pb-[13vh] lg:pl-[10vw]"
       :class="[showSection ? 'opacity-100 visible' : 'invisible opacity-0']"
       ref="navSection"
       dir="rtl">

    <div class="relative flex flex-col md:justify-start justify-center items-start md:items-center flex-grow leading-[1.8em] lg:leading-[1.44em] md:flex-row-reverse
                text-[20px]
                md:leading-[1.44em]
                lg:text-[1.8vw]
                md:text-[23px]">
      <ul class="flex items-start justify-center font-medium lg:flex-row flex-col gap-y-2 gap-x-14"
          ref="itemsElement">

        <li
            v-for="(item, index) in menuItems"
            :key="item.name"
            :ref="el => refsArray[index] = el"
            :data-page="item.name"
            :class="{ 'selected-nav opacity-100 font-bold': route.name === item.name }"
        >
          <nuxt-link
              v-if="!item.external"
              :to="item.to"
              class="link-item relative inline-block transition-all text-[#000] leading-[1em]
             after:content-[''] before:content-['']
             after:absolute before:absolute
             after:bottom-[-0.33em] before:bottom-[-0.33em]
             after:left-0 before:left-0
             before:w-full
             after:h-[1px] before:h-[1px]
             lg:after:bottom-[-1em]
             lg:before:bottom-[-1em]
             before:opacity-10
             after:w-[16px]
             after:origin-top-left
             lg:text[2vw]"
              @click.native="itemClick"
          >
            {{ t(item.label) }}
          </nuxt-link>

          <a
              v-else
              :href="item.to"
              target="_blank"
              class="link-item relative inline-block transition-all text-[#000] leading-[1em]
             after:content-[''] before:content-['']
             after:absolute before:absolute
             after:bottom-[-0.33em] before:bottom-[-0.33em]
             after:left-0 before:left-0
             before:w-full
             after:h-[1px] before:h-[1px]
             lg:after:bottom-[-1em]
             lg:before:bottom-[-1em]
             before:opacity-10
             after:w-[16px]
             after:origin-top-left
             lg:text[2vw]"
          >
            {{ t(item.label) }}
          </a>
        </li>

      </ul>

      <SwitchLanguage class="mt-4 md:hidden"/>

      <div class="block lg:absolute lg:top-[calc(50%+1.44em)] lg:left-0 lg:h-[1px] lg:origin-top-left"
           ref="itemLine">
        <div class="absolute top-0 left-0 h-full bg-black origin-top-left first:w-[1px] first:opacity-10"
             ref="item_line1"></div>
        <div class="absolute top-0 left-0 h-full bg-black origin-top-left last:w-[16px]"
             ref="item_line2"></div>
      </div>
    </div>
    <div class="w-full flex flex-col justify-end">

      <nuxt-link @click.native="itemClick"
                 class="cubic-animation inline-block relative group origin-top-left lg:absolute lg:bottom-36 lg:left-[10vw] lg:inline-block"
                 :to="{name:'index'}">
        <span class="relative z-10 text-[#616161FF] text-[11px]">{{t('home')}}</span>
        <span
            class="absolute left-0 bottom-0 h-[1.5px] w-full bg-gray-700 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
      </nuxt-link>

      <ul class="text-[11px] text-[#616161FF] dir-ltr lg:flex lg:leading-[1em] mt-4 text-right md:text-left">
        <li class="after:inline-block after:ml-[-4px] after:py-0 after:px-[6px] after:content-['—']">
          All Rights Reserved
        </li>
        <li class="after:inline-block after:ml-[-4px] after:py-0 after:px-[6px] new-nav__credits">
          Presented By Pardad Team!
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>



const {t} = useI18n()
const isVisible = ref(false);
const previousSelectedItem = ref(null);
const selectedItem = ref(null) //element.querySelector(".selected-nav");
const hoveredItem = ref(null);
const clearHoveredItemTimeout = ref(-1);
const itemLine = ref(null) //element.querySelector(".nav__item-line");
const itemLines = ref([])
const item_line1 = ref(null)
const item_line2 = ref(null)
const item1 = ref(null)
const item2 = ref(null)
const item3 = ref(null)
const item4 = ref(null)
const item5 = ref(null)
const item6 = ref(null)
const item7 = ref(null)
const itemLineIsVisible = ref(false);
const itemLine2Rect = ref(null)
const itemsElement = ref(null) //element.querySelector(".nav__items");
const itemsX = ref(0);
const itemElements = ref([]) //element.querySelectorAll(".nav__item");
const mouseDirection = ref(1);
const background = ref(null);
const timeline = ref(null);
const navSection = ref(null);
const showSection = ref(false);


const menuItems = [
  {name: 'category', label: 'menuItems.category', to: {name: 'category'}, ref: 'item1'},
  {name: 'technical-knowledge', label: 'menuItems.technicalKnowledge', to: {name: 'technical-knowledge'}, ref: 'item2'},
  {name: 'industrial-brands', label: 'menuItems.industrialBrands', to: {name: 'industrial-brands'}, ref: 'item3'},
  {name: 'product', label: 'menuItems.product', to: {name: 'product'}, ref: 'item4'},
  {name: 'about', label: 'menuItems.about', to: {name: 'about'}, ref: 'item5'},
  {name: 'contact', label: 'menuItems.contact', to: {name: 'contact'}, ref: 'item6'},
];
const refsArray = ref([]);

const route = useRoute()
const emit = defineEmits(['hide-menu'])


const init = () => {
  // Initialize event listeners
  selectedItem.value = document.querySelector('.selected-nav')
  Array.from(itemElements.value).forEach((item) => {
    item.addEventListener("mouseenter", onMouseHoverIn);
    item.addEventListener("mouseleave", onMouseHoverOut);
  });

  // Hide item line if no selected item
  if (!selectedItem.value) {
    itemLine.value.style.visibility = "hidden";
  }
  resize()

  // Initialize language select

}


const hide = () => {
  /*if (isVisible.value) {
    console.log('aaaa')


  }*/
  setTimeout(() => {
    /*   const rect = fl.element.getBoundingClientRect();*/

    animateOut();

  }, 0);
}

const animateIn = () => {
  if (timeline.value) {
    timeline.value.kill();
    clearGsapAnimationStyles(timeline.value);
  }

  /* const currentRect = fl.element.getBoundingClientRect();*/
  hoveredItem.value = null;
  itemLineIsVisible.value = false;
  resizeItemLine();

  timeline.value = new TimelineLite({
    delay: 0.1,
    onComplete: onAnimateInComplete,
  })
      /* .fromTo(
           background.element,
           0.4,
           { opacity: 0 },
           { opacity: 1, ease: Linear.easeNone },
           0
       )*/

      /*.fromTo(
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
              ease: Power2.easeInOut,
          },
          0.3
      )*/
      .addLabel("items", 0.3)
      .staggerFrom(
          itemElements.value,
          0.8,
          {y: 30, opacity: 0, ease: Power4.easeOut},
          0.08,
          "items"
      )

  /*.add(background.animateIn(), 0);*/

  if (selectedItem.value || hoveredItem.value) {
    const index = Array.prototype.indexOf.call(itemElements.value, selectedItem.value);
    const delay = 0.08 * index;
    if (timeline.value) {
      timeline.value
          .fromTo(
              itemLine.value,
              0.4,
              {opacity: 0},
              {opacity: 1, ease: Linear.easeNone},
              `items+=${delay}`
          )
          .fromTo(
              itemLine.value,
              0.8,
              {y: 30},
              {y: 0, data: {clear: false}, ease: Power3.easeOut},
              `items+=${delay}`
          )
          .from(
              itemLines.value[0],
              0.8,
              {scaleX: 0, ease: Power2.easeInOut, data: {clear: false}},
              `items+=${delay}`
          )
          .fromTo(
              itemLines.value[1],
              0.8,
              {scaleX: 0, x: 0},
              {scaleX: 1, ease: Power3.easeOut, data: {clear: false}},
              `items+=${delay + 0.3}`
          );
    }


  } else {
    TweenLite.set(itemLine, {y: 0});
  }
}

const animateOut = (rect) => {
  if (timeline.value) {
    timeline.value.kill();
    clearGsapAnimationStyles(timeline.value)
  }

  /*TweenLite.set(fl.element, { clearProps: "x, y, scale" });
  const currentRect = fl.element.getBoundingClientRect();*/

  /*if (hoveredItem) {
      background.clearBoxesOffset();
  }*/

  timeline.value = new TimelineLite({onComplete: onAnimateOutComplete})
      /*.set(navSection.value, { visibility: "inherit" })*/
      /*.to(
          background.element,
          0.4,
          { opacity: 0, ease: Linear.easeNone },
          0.3
      )
      .from(
          fl.element,
          1.3,
          {
              x: rect.x - currentRect.x,
              y: rect.y - currentRect.y,
              scale: rect.width / currentRect.width,
              ease: Power4.easeInOut,
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
              ease: Power2.easeInOut,
          },
          0.2
      )*/
      .addLabel("items", 0.1)
      .staggerTo(
          itemElements.value,
          0.4,
          {y: 30, opacity: 0, ease: Power2.easeOut},
          window.innerWidth < 700 ? -0.06 : 0.06,
          "items"
      )

  /*.add(background.animateOut, 0);*/

  const targetItem = hoveredItem.value || selectedItem.value || previousSelectedItem.value;
  if (targetItem) {
    const index = Array.prototype.indexOf.call(itemElements.value, targetItem);
    const delay = 0.06 * index;

    timeline.value.to(
        itemLine.value,
        0.4,
        {y: 30, opacity: 0, ease: Power2.easeOut, data: {clear: false}},
        `items+=${delay}`
    );
  }
}

const resize = (event) => {
  const rect = itemsElement.value.getBoundingClientRect();
  itemsX.value = rect.x;
  resizeItemLine();
  /*if (event) {
    background.resize();
  }*/
}

const resizeItemLine = () => {
  if (selectedItem.value) {
    const linkRect = selectedItem.value.querySelector(".link-item").getBoundingClientRect();
    TweenLite.set(itemLine.value, {x: linkRect.x - itemsX.value});

    TweenLite.set(itemLines.value[0], {scaleX: linkRect.width});
  }
}

const moveItemLineToItem = (item) => {


  const linkRect = item ? item.children[0].getBoundingClientRect() : itemLine.value.getBoundingClientRect();

  const currentX = itemLine.value._gsTransform ? itemLine.value._gsTransform.x : 0;


  if (!selectedItem.value && !itemLineIsVisible.value) {
    TweenLite.set(itemLine.value, {x: linkRect.x - itemsX.value});
    mouseDirection.value = 0;
  } else {

    mouseDirection.value = currentX < linkRect.x ? 1 : -1;
  }

  const line1 = itemLines.value[0];
  const line2 = itemLines.value[1];

  TweenLite.killTweensOf([line1, line2, itemLine.value]);

  const timeline2 = new TimelineMax();

  if (mouseDirection.value === 0) {

    timeline2.fromTo(
        line2,
        0.4,
        {scaleX: 0, x: 0},
        {scaleX: 1, ease: Power3.easeOut}
    );
  } else if (mouseDirection.value === 1) {
    timeline2.fromTo(
        line2,
        0.4,
        {x: 0},
        {scaleX: linkRect.width / itemLine2Rect.value.width, ease: Power3.easeOut, immediateRender: false}
    );

    if (item) {
      timeline2.to(
          line2,
          0.4,
          {scaleX: 1, x: linkRect.width - itemLine2Rect.value.width, ease: Power3.easeOut}
      );
    }
  } else {
    timeline2
        .to(
            line2,
            0.4,
            {scaleX: linkRect.width / itemLine2Rect.value.width, x: 0, ease: Power3.easeOut, immediateRender: false}
        )
        .to(
            line2,
            0.4,
            {scaleX: 1, ease: Power3.easeOut}
        );
  }

  new TimelineMax()
      .to(
          line1,
          0.7,
          {scaleX: linkRect.width, ease: Power3.easeOut},
          0
      )
      .add(timeline2, 0)
      .set(itemLine.value, {visibility: "inherit", opacity: 1}, 0)
      .to(
          itemLine.value,
          0.7,
          {x: linkRect.x - itemsX.value, ease: Power3.easeOut},
          0
      );
}

/*const onKeyUp = (event)=> {
  if (event.keyCode === 27) {
    hide();
  }
}*/

const onMouseHoverIn = (event) => {


  if (isVisible.value && (hoveredItem.value || event.currentTarget !== selectedItem.value) && hoveredItem.value !== event.currentTarget) {

    clearTimeout(clearHoveredItemTimeout.value);
    hoveredItem.value = event.currentTarget === selectedItem.value ? null : event.currentTarget;

    if (hoveredItem.value) {
      const index = Array.prototype.indexOf.call(itemElements.value, hoveredItem.value);
      /*background.offsetBoxes(index);*/
    }

    moveItemLineToItem(hoveredItem.value || selectedItem.value);
    itemLineIsVisible.value = true;

  }
}

const onMouseHoverOut = (event) => {

  if (hoveredItem.value && isVisible.value) {
    clearHoveredItemTimeout.value = setTimeout(() => {
      hoveredItem.value = null;
      /* background.clearBoxesOffset();*/

      moveItemLineToItem(selectedItem.value);
      if (!selectedItem.value) {
        TweenLite.to(itemLine.value, 0.3, {opacity: 0, ease: Power2.easeOut});
      }

      itemLineIsVisible.value = false;
    }, 300);
  }
}

const onAnimateInComplete = () => {

  timeline.value = null;
}

const onAnimateOutComplete = () => {

  timeline.value = null;
  menuSetVisibility(false)
  /*background.pause();*/
}
const clearGsapAnimationStyles = (animation) => {
  animation.getChildren().forEach(child => {
    const shouldClear = !child.vars.data || child.vars.data.clear !== false;
    if (child.target && child.vars?.css && shouldClear) {
      let props = Object.keys(child.vars.css)
          .map(prop => (prop === "autoAlpha" ? "opacity,visibility" : prop))
          .join(",");

      if (props) {
        const clearPropsRecursive = (element, props) => {
          if (Array.isArray(element)) {
            element.forEach(el => clearPropsRecursive(el, props));
          } else if (element.jquery || element.nodeType === 1 || typeof element === "string") {
            TweenLite.set(element, {clearProps: props});
          }
        };
        clearPropsRecursive(child.target, props);
      }
    }
  });
}


const showItems = (value) => {
  if (value === 'OPEN') {
    showMenu()
  } else {
    hideMenu()
  }
}


/*const menuSetSelectedItem = (item) => {
  if (menuState.selectedItem !== item) {
    if (menuState.selectedItem) {
      menuState.selectedItem.classList.remove("new-new-nav__item--selected");
    }
    menuState.selectedItem = item;
    if (menuState.selectedItem) {
      menuState.selectedItem.classList.add("new-new-nav__item--selected");
    }
  }
};*/
const menuSetVisibility = (visible) => {
  isVisible.value = visible;
  if (visible) {

    init()
    setTimeout(() => {
      animateIn();
    }, 100)


  } else {
    document.body.classList.remove('new-nav-visible')
    showSection.value = false
    emit('hide-menu', false)
  }

};

const showMenu = () => {
  if (!isVisible.value) {
    showSection.value = true
    document.body.classList.add('new-nav-visible')
    setTimeout(() => {
      menuSetVisibility(true);
    }, 5)
  }
};

const hideMenu = () => {
  if (isVisible.value) {

    hide()
  }
};


defineExpose({
  showItems
})

const itemClick = (item) => {
  if (item.target.pathname === route.fullPath) return

  emit('hide-menu', false)
}


onMounted(() => {
  [item1, item2, item3, item4, item5, item6 , item7].forEach((itemRef, i) => {
    itemRef.value = refsArray.value[i];
  });

  itemLines.value = [item_line1.value, item_line2.value]
  itemElements.value = [item1.value, item2.value, item3.value, item4.value, item5.value, item6.value , item7.value]
  itemLine2Rect.value = item_line2.value.getBoundingClientRect();
  selectedItem.value = document.querySelector('.selected-nav')

})
</script>