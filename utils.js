window.createButton = function(x, y, w, h, text, image, action) {
    let button;

    if(!isNaN(image)) {
        button = new PIXI.Graphics();
        button.beginFill(image, 1);
        button.drawRect(0, 0, w, h);
        button.endFill();
    } else {
        button = new PIXI.Sprite.from(image);
        button.width = w;
        button.height = h;
    }

    if(text) {
        let buttonText;

        if(typeof text == "object") {
            buttonText = new PIXI.Text(text.text, {
                fontFamily : 'Roboto',
                fontSize: (text.size ? text.size : 16),
                fill: (text.color ? text.color : 0xFFFFFF),
                align: 'center'
            });
        } else {
            buttonText = new PIXI.Text(text, {
                fontFamily : 'Roboto',
                fontSize: 16,
                fill: 0xFFFFFF,
                align: 'center'
            });
        }

        buttonText.anchor = {
            x: 0.5,
            y: 0.5
        };
        buttonText.x = w/2;
        buttonText.y = h/2;

        button.addChild(buttonText);
    }

    button.x = x;
    button.y = y;
    button.click = action;

    button.interactive = true;

    button.mouseover = function() {
        button.tint = 0x777777;
    };
    button.mouseout = function() {
        button.tint = 0xFFFFFF;
    };

    return button;
};

window.createStairs = function(x, y, w, h, dir, steps) {
    let con = new PIXI.Graphics();
    con.beginFill(0xFFFFFF, 1);
    for(let i = 0; i < steps; ++i) {
        con.drawRect(x + w*i/steps, (dir ? y + h*i/steps : (y+h) - h*(i+1)/steps), w/steps, (dir ? (steps-i)*h/steps : (i+1)*h/steps));
    }
    con.endFill();
    return con;
};

function hslToRgb(h, s, l){
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

window.createCharacter = function(sheetUrl, i) {
    let c = new PIXI.Graphics();
    let color = hslToRgb(i/11, 0.42, 0.40);
    c.beginFill(color[0]*256*256 + color[1]*256 + color[2]);
    c.drawRect(0, h*7/40*1/3-10, h/10, h*7/40*2/3+10);
    c.drawCircle(h/20, h*7/40*1/3-10, h/20);
    c.endFill();
    c.beginFill(0x000000, 0);
    c.drawRect(0, 0, h/10, h*7/40);
    c.endFill();
    c.anchor = {
        x: 0.5,
        y: 0
    };
    c.dx = 0;
    c.dy = 0;
    c.jumpDelay = 0;
    return {
        char: c,
        screen: 'level1',
        loaded: true,
        delay: 0
    };
};

window.createItem = function(image, useCb, tickCb, retrCb, loadCb, that) {
    let s = new PIXI.Sprite.from(image);
    s.use = useCb;
    s.tick = tickCb;
    s.retrieve = retrCb;
    s.anchor = {
        x: 0.5,
        y: 0.5
    };
    s._texture.baseTexture.screen = that;
    s._texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
    if(!s._texture.baseTexture.valid) {
        s._texture.baseTexture.on('loaded', loadCb);
    } else {
        window.setTimeout(loadCb, 100);
    }
    return s;
};
