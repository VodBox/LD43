window.youwin = {
    name: "youwin",
    load: function() {
        let c = new PIXI.Container();

        let title = new PIXI.Text('The End',{fontFamily : 'Roboto', fontSize: h/12, fill : 0xffffff, align : 'center'});
        title.anchor = {
            x: 0.5, y: 0
        };
        title.x = w/2;
        title.y = h/2 - h/5;

        this.survivors = new PIXI.Text('You saved X people',{fontFamily : 'Roboto', fontSize: h/20, fill : 0xffffff, align : 'center'})
        this.survivors.anchor = {
            x: 0.5, y: 0
        };
        this.survivors.x = w/2;
        this.survivors.y = h/2;

        this.buttons = [];

        var userAgent = navigator.userAgent.toLowerCase();
        if (userAgent.indexOf(' electron/') > -1) {
            this.buttons.push(createButton(w/2 - h/5, h/2 + h/8, h/2.5, h/20, {
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
        c.addChild(this.survivors);

        c.mouse = function(x, y, down) {
            if(down) {
                for(let i = 0, l = this.buttons.length; i < l; i++) {
                    console.log(this.buttons[i]);
                }
            }
        };

        c.key = function(keyCode) {

        };

        this.loaded = true;

        this.level = c;
        return this;
    }, tick: function() {
        this.survivors.text = "You saved " + this.saved + (this.saved != 1 ? " people." : " person.");
    }
};
