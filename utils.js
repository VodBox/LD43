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

window.createCharacter = function(sheetUrl) {
    let c = new PIXI.Graphics();
    c.beginFill(0x999900);
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
