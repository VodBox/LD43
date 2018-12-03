window.level13 = {
    name: "level13",
    load: function() {
        this.level = new PIXI.Container();

        this.loadItems = 3;
        this.loadedItems = 0;

        let bg = new PIXI.Sprite.from("levels/level13BG.png");
        bg.width = w;
        bg.height = h;
        bg._texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
        bg._texture.baseTexture.screen = this;
        bg._texture.baseTexture.on('loaded', function() {
            this.screen.loadedItems++;
            if(this.screen.loadedItems == this.screen.loadItems) {
                this.screen.loaded = true;
            }
        });

        let fg = new PIXI.Sprite.from("levels/level13FG.png");
        fg.width = w;
        fg.height = h;
        fg._texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
        fg._texture.baseTexture.screen = this;
        fg._texture.baseTexture.on('loaded', function() {
            this.screen.loadedItems++;
            if(this.screen.loadedItems == this.screen.loadItems) {
                this.screen.loaded = true;
            }
        });

        let roof = new PIXI.Graphics();
        roof.beginFill(0x990000, 1);
        roof.drawRect(0, 0, w, h/10);
        roof.endFill();

        let wall1 = new PIXI.Graphics();
        wall1.beginFill(0x009900, 1);
        wall1.drawRect(0, h/2, h/10, h/2);
        wall1.endFill();

        let wall2 = new PIXI.Graphics();
        wall2.beginFill(0x009900, 1);
        wall2.drawRect(w-h/10, 0, h/10, h/2);
        wall2.endFill();

        let floor1 = new PIXI.Graphics();
        floor1.beginFill(0x990000, 1);
        floor1.drawRect(0, h*9/10, w*2/5, h/10);
        floor1.endFill();
        floor1.alpha = 0;

        let floor2 = new PIXI.Graphics();
        floor2.beginFill(0x990000, 1);
        floor2.drawRect(w*3/5, h*9/10, w*2/5, h/10);
        floor2.endFill();
        floor2.alpha = 0;

        //this.breakable = new PIXI.Graphics();
        //this.breakable.beginFill(0xAA8855, 1);
        //this.breakable.drawRect(w*2/5, h*9/10, w/5, h/10);
        //this.breakable.endFill();
        //this.breakable.isBreakable = true;
        //this.breakable.breakX = 0;
        //this.breakable.breakY = 4;

        this.breakable = new PIXI.Sprite.from("levels/level13Break.png");
        this.breakable.x = w*2/5-2;
        this.breakable.y = h*9/10;
        this.breakable.width = w/5;
        this.breakable.height = h/10+2;
        this.breakable._texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
        this.breakable._texture.baseTexture.screen = this;
        this.breakable._texture.baseTexture.on('loaded', function() {
            this.screen.loadedItems++;
            if(this.screen.loadedItems == this.screen.loadItems) {
                this.screen.loaded = true;
            }
        });
        this.breakable.isBreakable = true;
        this.breakable.breakX = 0;
        this.breakable.breakY = 4;
        this.breakable.breakHook = function() {
            this.alpha = 0;
        };

        this.collisionSurfaces = [
            roof,
            wall1,
            wall2,
            floor1,
            floor2,
            this.breakable
        ];

        this.spikeSurfaces = [];

        this.level.addChild(bg);
        this.level.addChild(roof);
        this.level.addChild(wall1);
        this.level.addChild(wall2);
        this.level.addChild(floor1);
        this.level.addChild(floor2);
        this.level.addChild(fg);
        this.level.addChild(this.breakable);

        this.adj = [
            {
                level: window.level12,
                box: [w-h/40, h/2, h/20, h/2],
                offset: [-w*37/40, 0]
            },
            {
                level: window.level14,
                box: [0, 0, h/40, h/2],
                offset: [w*37/40, h/2 - h/10]
            },
            {
                level: window.level15,
                box: [0, h*39/40, w, h/10],
                offset: [0, -h*2/3]
            }
        ];

        this.level.interactive = true;
        this.level.click = function(e) {
            for(let i = 0, l = this.adj.length; i < l; ++i) {
                let adj = this.adj[i];
                if(e.data.global.x > adj.box[0]
                    && e.data.global.x < adj.box[0] + adj.box[2]
                    && e.data.global.y > adj.box[1]
                    && e.data.global.y < adj.box[1] + adj.box[3]) {
                    stage.loadScreen = levels[adj.level.name];
                }
            }
        };
        this.level.adj = this.adj;

        this.loaded = true;

        return this;
    },
    tick: function() {
        if(this.newGame) {
            this.newGame = false;
            this.startCutscene = true;
            for(let i = 0, l = characters.length; i < l; ++i) {
                characters[i].screen = "level7";
                characters[i].char.x = h*3*(i+1)/20;
                characters[i].char.y = h*7/10;
            }
        }
    }
};
