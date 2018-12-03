window.menu = {
    name: "menu",
    load: function() {
        let c = new PIXI.Container();

        this.loadItems = 5;
        this.loadedItems = 0;

        window.ambientSound = new Howl({
          src: ['AmbientLoop.ogg', 'AmbientLoop.mp3', 'AmbientLoop.wav'],
          loop: true,
          volume: 0.5
        });

        window.walkSound = new Howl({
            src: ['WalkSound.ogg', 'WalkSound.mp3', 'WalkSound.wav'],
            sprite: {
                walk1: [0, 2000],
                walk2: [2000, 4000],
                walk3: [6000, 40000],
                walk4: [10000, 4000],
                walk5: [14000, 4000]
            },
            volume: 0.23
        });

        window.itemSound = new Howl({
            src: ['Pickup.ogg', 'Pickup.mp3', 'Pickup.wav'],
            volume: 0.23
        });

        window.dropSound = new Howl({
            src: ['Putdown.ogg', 'Putdown.mp3', 'Putdown.wav'],
            volume: 0.23
        });

        ambientSound.once('load', function(){
          this.loadedItems++;
          if(this.loadedItems == this.loadItems) {
              this.loaded = true;
          }
        });

        walkSound.once('load', function(){
          this.loadedItems++;
          if(this.loadedItems == this.loadItems) {
              this.loaded = true;
          }
        });

        itemSound.once('load', function(){
          this.loadedItems++;
          if(this.loadedItems == this.loadItems) {
              this.loaded = true;
          }
        });

        dropSound.once('load', function(){
          this.loadedItems++;
          if(this.loadedItems == this.loadItems) {
              this.loaded = true;
          }
        });

        bg = new PIXI.Sprite.from("menuBG.png");
        bg._texture.baseTexture.screen = this;
        bg._texture.baseTexture.on('loaded', function() {
            this.screen.loadedItems++;
            if(this.screen.loadedItems == this.screen.loadItems) {
                this.screen.loaded = true;
            }
        });

        let title = new PIXI.Text('TOMBSTONES AND TRIBULATIONS',{fontFamily : 'Roboto', fontSize: h/12, fill : 0xffffff, align : 'center'});
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
            ambientSound.play();
        }));

        //this.buttons.push(createButton(w/2 - h/5, h/2 + h/16, h/2.5, h/20, {
        //    text: "Options",
        //    color: 0,
        //    size: 20
        //}, 0x333333));
//
        this.buttons.push(createButton(w/2 - h/5, h/2 + h/16, h/2.5, h/20, {
            text: "Help",
            color: 0,
            size: 20
        }, 0x333333, function(e) {
            alert("Your goal is to get as many of the characters to the exit as possible. Be warned, not everyone can be saved, and some sacrifices may have to be made along the way. Some will perish, others will be left behind...\n\nCONTROLS:\n\nA & D to move left and right.\nW or Space to jump.\nW to climb ladders or ropes.\nE to use a picked up item, or take another characters item.\nQ to drop an item.");
        }));

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

        c.addChild(bg);

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
