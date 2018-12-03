window.level17 = {
    name: "level17",
    load: function() {
        this.level = new PIXI.Container();

        this.loadItems = 3;
        this.loadedItems = 0;

        let bg = new PIXI.Sprite.from("levels/level17BG.png");
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

        let fg = new PIXI.Sprite.from("levels/level17FG.png");
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

        let floor = new PIXI.Graphics();
        floor.beginFill(0x990000, 1);
        floor.drawRect(0, h*9/10, w, h/10);
        floor.endFill();

        //this.breakable = new PIXI.Graphics();
        //this.breakable.beginFill(0xAA8855, 1);
        //this.breakable.drawRect(w-h/10, h/2, h/10, h/2);
        //this.breakable.endFill();
        this.breakable = new PIXI.Sprite.from("levels/level17Break.png");
        this.breakable.x = w-h/10;
        this.breakable.y = h/2;
        this.breakable.width = h/10;
        this.breakable.height = h/2-h/10;
        this.breakable._texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
        this.breakable._texture.baseTexture.screen = this;
        this.breakable._texture.baseTexture.on('loaded', function() {
            this.screen.loadedItems++;
            if(this.screen.loadedItems == this.screen.loadItems) {
                this.screen.loaded = true;
            }
        });
        this.breakable.isBreakable = true;
        this.breakable.breakX = 4;
        this.breakable.breakY = 4;
        this.breakable.breakHook = function() {
            let l = levels['level8'];
            let b = l.breakable;
            b.alpha = 0;
            l.collisionSurfaces.splice(l.collisionSurfaces.indexOf(b), 1);
            this.alpha = 0;
        };

        this.collisionSurfaces = [
            roof,
            wall1,
            wall2,
            floor,
            this.breakable
        ];

        this.spikeSurfaces = [];

        this.level.addChild(bg);
        this.level.addChild(roof);
        this.level.addChild(wall1);
        this.level.addChild(wall2);
        this.level.addChild(floor);
        this.level.addChild(fg);
        this.level.addChild(this.breakable);

        this.adj = [
            {
                level: window.level8,
                box: [w-h/40, h/2, h/20, h/2],
                offset: [-w*37/40, 0]
            },
            {
                level: window.level16,
                box: [0, 0, h/40, h/2],
                offset: [w*37/40, h/2 - h/10]
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
