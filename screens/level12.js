window.level12 = {
    name: "level12",
    load: function() {
        this.level = new PIXI.Container();

        let bg = new PIXI.Graphics();
        bg.beginFill(0, 0);
        bg.drawRect(0, 0, w, h);
        bg.endFill();

        let ground = new PIXI.Graphics();
        ground.beginFill(0x990000, 1);
        ground.drawRect(0, h*9/10, w, h/10);
        ground.endFill();

        let trap = new PIXI.Graphics();
        trap.beginFill(0x55FFAA, 1);
        trap.drawRect(w/4, 0, w/2, h/10);
        trap.endFill();
        let trapSpikes = new PIXI.Graphics();
        trapSpikes.beginFill(0x000099, 1);
        trapSpikes.drawRect(w/4, h/20, w/2, h/20);
        trapSpikes.endFill();

        let wall1 = new PIXI.Graphics();
        wall1.beginFill(0x009900, 1);
        wall1.drawRect(0, 0, h/10, h/2);
        wall1.endFill();
        let wall2 = new PIXI.Graphics();
        wall2.beginFill(0x009900, 1);
        wall2.drawRect(w-h/10, 0, h/10, h/2);
        wall2.endFill();

        let roof = new PIXI.Graphics();
        roof.beginFill(0x990000, 1);
        roof.drawRect(0, 0, w, h/10);
        roof.endFill();

        this.collisionSurfaces = [
            ground,
            wall1,
            wall2,
            roof,
            trap
        ];

        this.spikeSurfaces = [trapSpikes];

        this.level.addChild(bg);
        this.level.addChild(ground);
        this.level.addChild(wall1);
        this.level.addChild(wall2);
        this.level.addChild(roof);
        this.level.addChild(trap);
        this.level.addChild(trapSpikes);

        this.adj = [
            {
                level: window.level11,
                box: [w-h/40, h/2, h/20, h/2],
                offset: [-w*37/40, -h/2 + h/10]//+h/20]
            },
            {
                level: window.level13,
                box: [0, h/2, h/40, h/2],
                offset: [w*37/40, 0]
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
