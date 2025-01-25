// console.log(document.querySelector('img').getAttribute('picwidth'));
Array.from(document.getElementById('look-mouse').children).forEach(element => {
    SetPicture(element);
    SetSize(element);
    SetBackgroundSize(element);
    SetScale(element);
    SetPos(element);
    Mirror(element);
});

function SetPicture(element) {
    if (element.hasAttribute('bgpic')) element.style.backgroundImage = `url(${element.getAttribute('bgpic')})`;
}

function SetSize(element) {
    if (element.hasAttribute('size')) {
        let value = element.getAttribute('size').split(' ');
        if (value.length == 2) {
            if (value[0] != '~') element.style.width = value[0];
            if (value[1] != '~') element.style.height = value[1];
        }
    }
}

function SetBackgroundSize(element) {
    if (element.hasAttribute('bgsize')) element.style.backgroundSize = element.getAttribute('bgsize');
}

function SetScale(element) {
    if (element.hasAttribute('scale')) SetTranslateStyle(element, 'scale', element.getAttribute('scale'));
}

function SetPos(element) {
    if (element.hasAttribute('position')) {
        let value = element.getAttribute('position').split(' ');
        if (value.length == 2) {
            let x = '0px', y = '0px';
            if (value[0] != '~') {
                element.style.left = value[0];
                x = value[0]
            }
            if (value[1] != '~') {
                element.style.top = value[1]
                y = value[1]
            };
            element.setAttribute('defaultposition', `${x} ${y}`);
        }
    }
    else element.setAttribute('defaultposition', '0px 0px');
}

function Mirror(element) {
    if (element.hasAttribute('mirror')) SetTranslateStyle(element, 'scaleX', -1);
}