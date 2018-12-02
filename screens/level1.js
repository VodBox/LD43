window.level1 = {
    name: "level1",
    load: function() {
        this.level = new PIXI.Container();

        //let bg = new PIXI.Graphics();
        //bg.beginFill(0, 0);
        //bg.drawRect(0, 0, w, h);
        //bg.endFill();

        this.loadItems = 2;
        this.loadedItems = 0;

        let bg = new PIXI.Sprite.from("levels/level1BG.png");
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
        ground.drawRect(0, 0, w, h/10);
        ground.endFill();
        ground.y = h*9/10;

        let wall1 = new PIXI.Graphics();
        wall1.beginFill(0x009900, 1);
        wall1.drawRect(0, 0, h/10, h);
        wall1.endFill();
        let wall2 = new PIXI.Graphics();
        wall2.beginFill(0x009900, 1);
        wall2.drawRect(0, 0, h/5, h/2);
        wall2.endFill();
        wall2.x = w-h/5;

        let roof = new PIXI.Graphics();
        roof.beginFill(0x990000, 1);
        roof.drawRect(0, 0, w, h/10);
        roof.endFill();
        roof.ceiling = true;

        let fg = new PIXI.Sprite.from("levels/level1FG.png");
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

        this.collisionSurfaces = [
            ground,
            wall1,
            wall2,
            roof
        ];

        this.spikeSurfaces = [];

        this.level.addChild(bg);
        this.level.addChild(ground);
        this.level.addChild(wall1);
        this.level.addChild(wall2);
        this.level.addChild(roof);
        this.level.addChild(fg);

        this.adj = [
            {
                level: window.level2,
                box: [w-h/40, h/2, h/20, h/2],
                offset: [-w*36/40, 0]
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
                characters[i].screen = "level1";
                characters[i].char.x = h*3*(i+1)/20;
                characters[i].char.y = h*6/10
            }
        }
    }
};
