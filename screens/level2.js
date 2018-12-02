window.level2 = {
    name: "level2",
    load: function() {
        this.level = new PIXI.Container();

        //
//
        this.loadItems = 2;
        this.loadedItems = 0;

        let bg = new PIXI.Sprite.from("levels/level2BG.png");
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

        let ground = new PIXI.Graphics();
        ground.beginFill(0x990000, 1);
        ground.drawRect(0, h*9/10, w, h/10);
        ground.endFill();
        ground.alpha = 0;

        let wall1 = new PIXI.Graphics();
        wall1.beginFill(0x009900, 1);
        wall1.drawRect(0, 0, h/10, h/2);
        wall1.endFill();
        wall1.alpha = 0;
        let wall2 = new PIXI.Graphics();
        wall2.beginFill(0x009900, 1);
        wall2.drawRect(w-h/10, h/2, h/10, h/2);
        wall2.endFill();
        wall2.alpha = 0;

        let roof = new PIXI.Graphics();
        roof.beginFill(0x990000, 1);
        roof.drawRect(0, 0, w, h/10);
        roof.endFill();
        roof.alpha = 0;

        let fg = new PIXI.Sprite.from("levels/level2FG.png");
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

        let spikes = new PIXI.Graphics();
        spikes.beginFill(0x000099, 1);
        spikes.drawRect(w/4 + w/32, h*3/4, w/4 - w/32, h/4);
        spikes.endFill();
        spikes.alpha = 0;

        let stair1 = createStairs(w*5/32, h*3/4 - h/10, w/8, h/4, false, 5);
        stair1.alpha = 0;
        let stair2 = createStairs(w/2, h*3/4 - h/10, w/8, h/4, true, 5);
        stair2.alpha = 0;

        this.collisionSurfaces = [
            ground,
            wall1,
            wall2,
            roof,
            stair1,
            stair2
        ];

        this.spikeSurfaces = [spikes];

        this.level.addChild(bg);
        this.level.addChild(ground);
        this.level.addChild(wall1);
        this.level.addChild(wall2);
        this.level.addChild(roof);
        this.level.addChild(spikes);
        this.level.addChild(stair1);
        this.level.addChild(stair2);
        this.level.addChild(fg);

        this.adj = [
            {
                level: window.level1,
                box: [0, h/2, h/40, h/2],
                offset: [w*37/40, 0]
            },
            {
                level: window.level5,
                box: [w-h/40, 0, h/20, h/2],
                offset: [-w*37/40, h/2 - h/10]
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
                characters[i].screen = "level1";
                characters[i].char.x = h*3*(i+1)/20;
                characters[i].char.y = h*7/10
            }
        }
    }
};
