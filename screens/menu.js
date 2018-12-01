window.menu = {
    name: "menu",
    load: function() {
        let c = new PIXI.Container();

        let title = new PIXI.Text('TEMPORARY TITLE',{fontFamily : 'Roboto', fontSize: h/10, fill : 0xffffff, align : 'center'});
        title.anchor = {
            x: 0.5, y: 0
        };
        title.x = w/2;
        title.y = h/2 - h/5;

        this.buttons = [];

        this.buttons.push(createButton(w/2 - h/5, h/2, h/2.5, h/20, {
            text: "Start Game",
            color: 0,
            size: 20
        }, 0x333333, function(e) {
            levels['level1'].newGame = true;
            stage.loadScreen = levels['level1'];
        }));

        this.buttons.push(createButton(w/2 - h/5, h/2 + h/16, h/2.5, h/20, {
            text: "Options",
            color: 0,
            size: 20
        }, 0x333333));

        this.buttons.push(createButton(w/2 - h/5, h/2 + h/8, h/2.5, h/20, {
            text: "Help",
            color: 0,
            size: 20
        }, 0x333333));

        var userAgent = navigator.userAgent.toLowerCase();
        if (userAgent.indexOf(' electron/') > -1) {
            this.buttons.push(createButton(w/2 - h/5, h/2 + h*3/16, h/2.5, h/20, {
                text: "Quit",
                color: 0,
                size: 20
            }, 0x333333, function(e) {
                require('electron').remote.app.quit();
            }));
        }

        for(let i = 0, l = this.buttons.length; i < l; i++) {
            c.addChild(this.buttons[i]);
        }
        c.addChild(title);

        c.mouse = function(x, y, down) {
            if(down) {
                for(let i = 0, l = this.buttons.length; i < l; i++) {
                    console.log(this.buttons[i]);
                }
            }
        };

        c.key = function(keyCode) {

        };

        c.adj = {
            right: "level2"
        };

        this.loaded = true;

        this.level = c;
        return this;
    }
};
