window.level5 = {
    name: "level5",
    load: function() {
        this.level = new PIXI.Container();

        this.loadItems = 3;
        this.loadedItems = 0;

        let bg = new PIXI.Sprite.from("levels/level5BG.png");
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

        let fg = new PIXI.Sprite.from("levels/level5FGAlt.png");
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

        let ground = new PIXI.Graphics();
        ground.beginFill(0x990000, 1);
        ground.drawRect(0, h*9/10, w, h/10);
        ground.endFill();

        let wall1 = new PIXI.Graphics();
        wall1.beginFill(0x009900, 1);
        wall1.drawRect(0, h/2-h/10, h/5-8, h/10);
        wall1.endFill();
        let wall2 = new PIXI.Graphics();
        wall2.beginFill(0x009900, 1);
        wall2.drawRect(w-h/10, 0, h/10, h/2);
        wall2.endFill();

        let roof1 = new PIXI.Graphics();
        roof1.beginFill(0x990000, 1);
        roof1.drawRect(0, 0, w*2/5, h/10);
        roof1.endFill();
        roof1.alpha = 0;

        let roof2 = new PIXI.Graphics();
        roof2.beginFill(0x990000, 1);
        roof2.drawRect(w*3/5, 0, w*2/5, h/10);
        roof2.endFill();
        roof2.alpha = 0;

        //this.breakable = new PIXI.Graphics();
        //this.breakable.beginFill(0xAA8855, 1);
        //this.breakable.drawRect(w*2/5, 0, w/5, h/10);
        //this.breakable.endFill();

        this.breakable = new PIXI.Sprite.from("levels/level5Break.png");
        this.breakable.x = w*2/5 - 2;
        this.breakable.width = w/5 + 2;
        this.breakable.height = h/10;
        this.breakable._texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
        this.breakable._texture.baseTexture.screen = this;
        this.breakable._texture.baseTexture.on('loaded', function() {
            this.screen.loadedItems++;
            if(this.screen.loadedItems == this.screen.loadItems) {
                this.screen.loaded = true;
            }
        });

        this.collisionSurfaces = [
            ground,
            wall1,
            wall2,
            roof1,
            roof2,
            this.breakable
        ];

        this.spikeSurfaces = [];

        this.level.addChild(bg);
        this.level.addChild(ground);
        this.level.addChild(wall1);
        this.level.addChild(wall2);
        this.level.addChild(roof1);
        this.level.addChild(roof2);
        this.level.addChild(this.breakable);
        this.level.addChild(fg);

        this.adj = [
            {
                level: window.level6,
                box: [w-h/40, h/2, h/20, h/2],
                offset: [-w*37/40, -h/2 + h/10]
            },
            {
                level: window.level2,
                box: [0, h/2, h/40, h/2],
                offset: [w*37/40, -h/2 + h/10]
            },
            {
                level: window.level3,
                box: [0, 0, h/40, h/2],
                offset: [w*37/40, h/2]
            },
            {
                level: window.level16,
                box: [0, 0, w, h/10],
                offset: [0, h*17/20]
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

        this.loaded = false;

        return this;
    },
    tick: function() {
        if(this.newGame) {
            this.newGame = false;
            this.startCutscene = true;
            for(let i = 0, l = characters.length; i < l; ++i) {
                characters[i].screen = "level5";
                characters[i].char.x = h*3*(i+1)/20;
                characters[i].char.y = h*7/10
            }
        }
    }
};
